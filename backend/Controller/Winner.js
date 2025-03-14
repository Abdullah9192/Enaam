const prisma = require('../Config/database.js');

 const winner = async (req, res) => {
    const {userid , name , reward , image} = req.body;
    try {
        if(!userid || !name || !reward || !image){
            return res.status(400).json({
                status: 'error',
                message: 'All fields are required.',
                statusCode: 400
              });
        }

        const winner = await prisma.winner.create({
            data: {
                userid,
                name,
                reward,
                image
            }
        });
        return res.status(201).json({
            status: 'success',
            message: 'Winner created successfully.',
            statusCode: 201, 
            data: winner
          });
    } catch (error) {
        console.error('Error Creating winner', error);
        res.status(500).json({
          status: 'error',
          message: 'Internal server error. Please try again later.',
          statusCode: 500, 
          data: null,
        });
    }
};

 const getWinners = async (req, res) => {
    try {
        const winners = await prisma.winner.findMany();
        return res.status(200).json({
          status: 'success',
          message: 'Winners fetched successfully.',
          statusCode: 200, 
          data: winners
        });
      } catch (error) {
        console.error('Error fetching winners:', error);
        res.status(500).json({
          status: 'error',
          message: 'Internal server error. Please try again later.',
          statusCode: 500, 
          data: null,
        });
      }
}

 const deleteWinner = async (req, res) => {
    try {
        const id = req.params.id;
        await prisma.winner.delete({
            where: { id }
        });
        return res.status(200).json({
            status: 'success',
            message: 'Winner deleted successfully.',
            statusCode: 200, 
            data: null
          });
    } catch (error) {
        console.error('Error deleting winner:', error);
        res.status(500).json({
          status: 'error',
          message: 'Internal server error. Please try again later.',
          statusCode: 500, 
          data: null,
        });
    }
}

module.exports = {
    winner,
    getWinners,
    deleteWinner
}