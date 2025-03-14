const { PrismaClient } = require ('@prisma/client');
const prisma = new PrismaClient();


 const createProduct = async (req, res) => {
  try {
    const { name, description, image, rewardId, price, quantity } = req.body;

    if (!name || !description || !rewardId || !price || !quantity) {
      return res.status(400).json({
        status: 'error',
        message: 'All Fields are required.',
        statusCode: 400
      });
    }

    const ticket = await prisma.ticket.create({
      data: {
        name,
        description,
        image,
        rewardId,
        price,
        totalTickets:quantity,
        remainingTickets: quantity,
        soldTickets:0
      },
    });
    return res.status(201).json({
      status: 'success',
      message: 'Ticket Created successfully.',
      statusCode: 201, 
      data: ticket
    });
  } catch (error) {
    console.error('Error Creating Tickets', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error. Please try again later.',
      statusCode: 500, 
      data: null,
    });
  }
};



 const updateProduct = async (req, res) => {
  try {
    const id  = req.params.id;
    const { price , name , description , image , rewardId , quantity }  = req.body;

    if (!price , !name , !description , !rewardId , !quantity) {
      return res.status(400).json({
        status: 'error',
        message: 'Fields are required to update.',
        statusCode: 400
      });
    }

    const updatedTicket = await prisma.ticket.update({
      where: { id },
      data: {price
        , name
        , description
        , image
        , rewardId
        , totalTickets:quantity
      } ,
    });
    return res.status(200).json({
      status: 'success',
      message: 'Ticket Updated Successfully.',
      statusCode: 200, 
      data: updatedTicket,
    });
  } catch (error) {
    console.error('Error Updated Tickets:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error. Please try again later.',
      statusCode: 500, 
      data: null,
    });
  }
};


 const deleteProduct = async (req, res) => {
  try {
    const id  = req.params.id;

    await prisma.ticket.delete({
      where: { id },
    });
    return res.status(200).json({
      status: 'success',
      message: 'Ticket deleted successfully',
      statusCode: 200, 
      data: users,
  });
  } catch (error) {
    console.error('Error Deleting Tickets:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error. Please try again later.',
      statusCode: 500, 
      data: null,
    });
  }
};


 const getProduct = async (req, res) => {
  try {
    const tickets = await prisma.ticket.findMany();
    if (tickets.length > 0) {
      return res.status(200).json({
        message: 'Tickets fetched successfully.',
        statusCode: 200,
        status: 'success',
        tickets
      });
    } else {
      return res.status(404).json({
        status: 'error',
        message: 'No Ticket found.',
        statusCode: 404,
        data: [] 
      });
    }
  } catch (error) {
    console.error('Error Fetching Tickets:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error. Please try again later.',
      statusCode: 500, 
      data: null 
    });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct
};