const { PrismaClient } = require ('@prisma/client');
const prisma = new PrismaClient();

 const createOrder = async (req, res) => {
  try {
    const {
      name,
      email,
      phoneNumber,
      quantity,
      price,
      productName,
      rewardName,
      answer,
      ticketId,
      userId,
      referralCode,  
    } = req.body;

    if (!name || !email || !quantity || !price || !productName || !rewardName || !answer || !userId || !ticketId) {
      return res.status(400).json({
        status: 'error',
        message: 'All fields are required.',
        statusCode: 400,
      });
    }

    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
    });
    if(!ticket){
      return res.status(400).json({
        status: 'error',
        message: 'Ticket not found.',
        statusCode: 400,
      })
    }
    if (ticket.RemainingTickets < quantity) {
      return res.status(400).json({
        status: 'error',
        message: 'Insufficient quantity of tickets.',
        statusCode: 400,
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { ambassadorReferrals: true },
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found.',
        statusCode: 404,
      });
    }

    if (referralCode) {
      const ambassador = await prisma.user.findFirst({
        where: { phoneNumber: referralCode, userRoles: { some: { roleId: 3 } } },  
      });

      if (!ambassador) {
        return res.status(400).json({
          status: 'error',
          message: `Invalid referral code ${referralCode} or ambassador not found.`,
          statusCode: 400,
        });
      }

      const existingReferral = await prisma.ambassadorReferral.findFirst({
        where: {
          referredUserId: user.id,
          ambassadorId: ambassador.id,
        },
      });

      if (existingReferral) {
        return res.status(400).json({
          status: 'error',
          message: `You have already used the referral code ${referralCode}. You cannot use it again.`,
          statusCode: 400,
        });
      }
      await prisma.ambassadorReferral.create({
        data: {
          ambassador: { connect: { id: ambassador.id } },
          referredUser: { connect: { id: user.id } },
        },
      });
    }

    const invoiceId = `E-${Math.floor(10000 + Math.random() * 90000)}`;
    const generatedTicketIds = Array.from({ length: quantity }, () => `T-${Math.floor(10000 + Math.random() * 90000)}`);

    await prisma.ticket.update({
      where: { id: ticketId },
      data: {
        remainingTickets: ticket.remainingTickets - quantity,
        soldTickets: ticket.soldTickets + quantity
      },
    });

    const order = await prisma.order.create({
      data: {
        name,
        email,
        phoneNumber,
        quantity,
        price,
        productName,
        rewardName,
        answer,
        ticketId: generatedTicketIds,
        userId,
        invoiceId,
        referralCode: referralCode || null,  
      },
    });

    return res.status(201).json({
      status: 'success',
      message: 'Order created successfully.',
      data: order,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error.',
      statusCode: 500,
    });
  }
};

 const getAllOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany();
    if (orders.length > 0) {
      return res.status(200).json({
        status: 'success',
        message: 'Orders fetched successfully.',
        statusCode: 200, 
        data: orders,
      });
    } else {
      return res.status(404).json({
        status: 'error',
        message: 'No Orders found.',
        statusCode: 404
      });
    }
  } catch (error) {
    console.error('Error Fetching Orders:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error. Please try again later.',
      statusCode: 500, 
      data: null,
    });
  }
};

 const getOrdersByUserId = async (req, res) => {
  try {
    const userId = req.params.id;

    const orders = await prisma.order.findMany({
      where: { userId },
    });

    if (!orders.length) {
      return res.status(404).json({
        status: 'error',
        message: 'No Orders found for this user.',
        statusCode: 404
      });
    }
    return res.status(200).json({
      status: 'success',
      message: 'Order fetched successfully.',
      statusCode: 200, 
      data: orders,
    });
  } catch (error) {
    console.error('Error Fetching Orders:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error. Please try again later.',
      statusCode: 500, 
      data: null,
    });
  }
};

 const getSalesAndParticipants = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      select: {
        price: true,
        rewardName: true,
        ticketId: true, 
      },
    });

    const totalSales = orders.reduce((total, order) => total + parseFloat(order.price), 0);
    const rewardCounts = await prisma.order.groupBy({
      by: ['rewardName'],
      _count: {
        ticketId: true, 
      },
    });

    const participants = rewardCounts.map((item) => ({
      rewardName: item.rewardName,
      count: orders
        .filter((order) => order.rewardName === item.rewardName) 
        .reduce((ticketCount, order) => ticketCount + (Array.isArray(order.ticketId) ? order.ticketId.length : 1), 0), 
    }));

    const totalUsers = await prisma.user.count();
    return res.status(200).json({
      status: 'success',
      message: 'Data fetched successfully.',
      statusCode: 200,
      data: {
        totalSales,
        participants,
        totalUsers,
      },
    });
  } catch (error) {
    console.error('Error Fetching Data:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error. Please try again later.',
      statusCode: 500,
      data: null,
    });
  }
};

 const getSalesAndTicketsByDate = async (req, res) => {
  const { startDate, endDate } = req.body;
  try {
    if (!startDate || !endDate) {
      return res.status(400).json({
        status: 'error',
        message: 'Start date and end date are required.',
        statusCode: 400,
      });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    end.setHours(23, 59, 59, 999);

    const orders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: start,
          lte: end,
        },
      },
      select: {
        price: true,
        ticketId: true,
        rewardName: true,
        createdAt: true,
      },
    });
    const users = await prisma.user.findMany({
      where: {
        createdAt: {
          gte: start,
          lte: end,
        },
      },
    });

    if (orders.length === 0 && users.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'No orders or users found for the specified date range.',
        statusCode: 404,
        data: null,
      });
    }

    const totalSales = orders.reduce((total, order) => total + parseFloat(order.price), 0);
    const ticketCount = orders.reduce((total, order) => {
      if (order.ticketId) {
        return total + order.ticketId.length;
      }
      return total;
    }, 0);

    const rewardTicketCounts = {
      bike: 0,
      iphone: 0,
      airpod: 0,
    };
    orders.forEach((order) => {
      if (order.rewardName === 'Bike' && order.ticketId) {
        rewardTicketCounts.bike += order.ticketId.length;
      }
      if (order.rewardName === 'Iphone' && order.ticketId) {
        rewardTicketCounts.iphone += order.ticketId.length;
      }
      if (order.rewardName === 'Airpod' && order.ticketId) {
        rewardTicketCounts.airpod += order.ticketId.length;
      }
    });
    const totalUsers = users.length;
    return res.status(200).json({
      status: 'success',
      message: 'Sales and tickets fetched successfully.',
      statusCode: 200,
      data: {
        totalSales,
        ticketCount,
        rewardTicketCounts,
        totalUsers
      },
    });
  } catch (error) {
    console.error('Error Fetching Sales and Tickets by Date:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error. Please try again later.',
      statusCode: 500,
      data: null,
    });
  }
};


module.exports = {
  createOrder,
  getAllOrders,
  getOrdersByUserId,
  getSalesAndParticipants,
  getSalesAndTicketsByDate
};