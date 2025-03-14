const { PrismaClient } = require  ('@prisma/client');
const prisma = new PrismaClient();


 const createReward = async (req, res) => {
  try {
    const { name, description, image } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        status: 'error',
        message: 'Name and description are required.',
        statusCode: 400
      });
    }
    const reward = await prisma.reward.create({
      data: {
        name,
        description,
        image,
      },
    });
    return res.status(201).json({
      status: 'success',
      message: 'Reward Created successfully.',
      statusCode: 201, 
      data: reward
    });
  } catch (error) {
    console.error('Error Creating reward', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error. Please try again later.',
      statusCode: 500, 
      data: null,
    });
  }
};


 const updateReward = async (req, res) => {
  try {
    const id  = req.params.id;
    const { name, description, image } = req.body;

    const reward = await prisma.reward.update({
      where: { id },
      data: { name, description, image },
    });
    return res.status(200).json({
      status: 'success',
      message: 'Reward Updated Successfully.',
      statusCode: 200, 
      data: reward,
    });
  } catch (error) {
    console.error('Error Updated Reward:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error. Please try again later.',
      statusCode: 500, 
      data: null,
    });
  }
};


 const deleteReward = async (req, res) => {
  try {
    const id = req.params.id;
    await prisma.ticket.deleteMany({
      where: { rewardId: id },
    });

    await prisma.reward.delete({
      where: { id },
    });
    return res.status(200).json({
      status: 'success',
      message: 'Reward and associated tickets deleted successfully',
      statusCode: 200, 
      data: users,
  });
} catch (error) {
  console.error('Error deleting Reward', error);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error. Please try again later.',
    statusCode: 500, 
    data: null,
  });
}
};


 const getRewards = async (req, res) => {
  try {
    const rewards = await prisma.reward.findMany();
    if (rewards.length > 0) {
      return res.status(200).json({
        status: 'success',
        message: 'Rewards fetched successfully.',
        statusCode: 200, 
        data: rewards,
      });
    } else {
      return res.status(404).json({
        status: 'error',
        message: 'No Reward found.',
        statusCode: 404
      });
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error. Please try again later.',
      statusCode: 500, 
      data: null,
    });
  }
};

module.exports = {
  createReward,
  updateReward,
  deleteReward,
  getRewards,
};