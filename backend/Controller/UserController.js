const bcrypt = require( 'bcrypt');
const prisma = require( '../Config/database.js');
const cookie = require( 'cookie');

 const createUser = async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;

  try {
    if (!name || typeof name !== 'string' || name.length < 3 || name.length > 50) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid name. Name must be between 3 and 50 characters long.',
        statusCode: 400,
      });
    }    

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid email address.',
        statusCode: 400,
      });
    }

    if (!password || password.length < 8) {
      return res.status(400).json({
        status: 'error',
        message: 'Password must be at least 8 characters long.',
        statusCode: 400,
      });
    }

    if (!/^\+\d{1,3}\d{8,12}$/.test(phoneNumber)) {
      return res.status(400).json({
        status: 'error',
        message: 'Phone number must include a +, country code (1-3 digits), and a valid local number (8-12 digits).',
        statusCode: 400,
      });
    }
    
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    const existingPhoneNo = await prisma.user.findUnique({
      where: { phoneNumber }
    });

    if (existingUser) {
      return res.status(400).json({
        status: 'error',
        message: 'Email is already registered.',
        statusCode: 400
      });
    }
    if (existingPhoneNo) {
      return res.status(400).json({
        status: 'error',
        message: 'Phone No is already registered.',
        statusCode: 400
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phoneNumber
      }
    });
    const userRole = await prisma.userRole.create({
      data: {
        userId: user.id,  
        roleId: 2,        
      }
    });

    return res.status(201).json({
      status: 'success',
      message: 'Users Created successfully.',
      statusCode: 201
    });
  } catch (error) {
    console.error('Error Creating users:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error. Please try again later.',
      statusCode: 500, 
      data: null,
    });
  }
};

 const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        userRoles: {
          include: { role: true }, 
        },
      },
    });
    if (users.length > 0) {
      return res.status(200).json({
        status: 'success',
        message: 'Users fetched successfully.',
        statusCode: 200, 
        data: users,
      });
    } else {
      return res.status(404).json({
        status: 'error',
        message: 'No users found.',
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

 const getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { userRoles: { include: { role: true } } } // Include roles
    });
    if (user) {
      return res.status(200).json({
        status: 'success',
        message: 'User fetched successfully.',
        statusCode: 200, 
        data: user,
      });
    } else {
      return res.status(404).json({
        status: 'error',
        message: 'No user found.',
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

 const updateUser = async (req, res) => {
  const id = req.params.id;
  const { name, email, phoneNumber } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { id }
    });
    if (user.length > 0) {
      const updatedUser = await prisma.user.update({
        where: { id },
        data: { name, email, phoneNumber }
      });

      return res.status(200).json({
        status: 'success',
        message: 'Users Updated successfully.',
        statusCode: 200, 
        data: updatedUser,
      });
    } else {
      return res.status(404).json({
        status: 'error',
        message: 'No user found.',
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

 const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (user) {
      await prisma.userRole.deleteMany({ where: { userId: id } }); 
      await prisma.user.delete({
        where: { id },
      });
      
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('accessToken', '', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'Strict',
          expires: new Date(0),
          path: '/',
        })
      );
      return res.status(200).json({
        status: 'success',
        message: 'User deleted successfully.',
        statusCode: 200, 
        data: user,
      });
    }
    else {
      return res.status(404).json({
        status: 'error',
        message: 'No user found.',
        statusCode: 404
      });
    }
  }  catch (error) {
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
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser
};