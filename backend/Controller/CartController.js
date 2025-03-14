const prisma = require('../Config/database.js');

 const getCart = async (req, res) => {
  const userId = req.params.id;

  try {
    const cart = await prisma.shoppingCart.findUnique({
      where: { userId },
    });
    if (cart) {
      return res.status(200).json({
        status: 'success',
        message: 'Cart fetched successfully.',
        statusCode: 200, 
        ...cart,
      });
    } else {
      return res.status(404).json({
        status: 'error',
        message: 'No Cart found.',
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

 const updateCart = async (req, res) => {
  const userId = req.params.id; 
  const { cartItems, total, subTotal } = req.body; 

  try {
    const existingCart = await prisma.shoppingCart.findUnique({
      where: { userId },
    });

    if (existingCart) {
      const updatedCart = await prisma.shoppingCart.update({
        where: { userId },
        data: {
          cartItems, 
          total,     
          subTotal   
        },
      });
      return res.status(200).json({
        status: 'success',
        message: 'Cart Updated successfully.',
        statusCode: 200, 
        data: updatedCart,
      });
    } else {
      const newCart = await prisma.shoppingCart.create({
        data: {
          userId,     
          cartItems,  
          total,      
          subTotal    
        },
      });
      return res.status(201).json({
        status: 'success',
        message: 'Cart Created successfully.',
        statusCode: 201, 
        data: newCart,
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

module.exports = { getCart, updateCart };