const { PrismaClient } = require ( '@prisma/client');
const bcrypt = require ( 'bcrypt');
const cookie = require ( 'cookie');
const { generateAccessToken } = require ( '../Utils/regenerateAccessToken.js');

const prisma = new PrismaClient();

 const login = async (req, res) => {
  const { email, password , phoneNumber} = req.body;

  try {
    let user;
    if (email) {
      user = await prisma.user.findUnique({
        where: { email },
        include: {
          userRoles: {
            include: {
              role: true, 
            },
          },
        },
      });
    } else if (phoneNumber) {
      user = await prisma.user.findUnique({
        where: { phoneNumber },
        include: {
          userRoles: {
            include: {
              role: true, 
            },
          },
        },
      });
    }

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found.',
        statusCode: 404,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials.',
        statusCode: 401,
      });
    }

    const accessToken = generateAccessToken(user);

    res.cookie('accessToken', accessToken, {
      httpOnly: false,
      // secure: process.env.NODE_ENV !== 'development',
      // sameSite: 'none',
      // maxAge: 3600000, 
      // path: '/',
    });

    const { password: _, userRoles, ...userData } = user; 
    const roles = userRoles.map((userRole) => userRole.role.name);
    return res.status(200).json({
      status: 'success',
      message: 'Login successfully.',
      statusCode: 200,
      accessToken,
      data: { ...userData, roles } 
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error.',
      statusCode: 500,
    });
  }
};


 const logoutUser = async (req, res) => {
  const id  = req.params.id; 

  try {
    if (!id) {
      return res.status(400).json({
        status: 'error',
        message: 'User ID is required.',
        statusCode: 400,
      });
    }

    res.setHeader(
      'Set-Cookie',
      cookie.serialize('accessToken', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'Strict',
        maxAge: 0, 
        path: '/', 
      })
    );

    return res.status(200).json({
      status: 'success',
      message: 'User logged out successfully.',
      statusCode: 200,
    });
  } catch (error) {
    console.error('Error during logout:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error. Please try again later.',
      statusCode: 500,
    });
  }
};

module.exports = { login, logoutUser };