const jwt = require( 'jsonwebtoken');
const prisma = require( '../Config/database.js');
const authenticate = async (req, res, next) => {
  const cookies = req.cookies;
  if(!cookies) return res.status(401).json({status: 'error', message: 'UnAurthorized - No Cookies Found', statusCode: 401,})
  const token = req.cookies.accessToken;
  // const authHeader = req.headers.authorization;
  // const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: 'UnAurthorized - Token Not Found in Request.Headers',
      statusCode: 401,
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    
    const userId = decoded.id;
    const userRoles = await prisma.userRole.findMany({
      where: { userId },
      include: {
        role: {
          include: {
            rolePermissions: {
              include: { permission: true }, 
            },
          },
        },
      },
    });

    if (userRoles.length > 0) {
      const permissions = new Set();
      userRoles.forEach((userRole) => {
        if (userRole.role?.rolePermissions?.length) {
          userRole.role.rolePermissions.forEach((rp) => {
            if (rp.permission?.name) {
              permissions.add(rp.permission.name.toLowerCase());
            }
          });
        }
      });
      req.user.permissions = [...permissions];
    } else {
      req.user.permissions = [];
    }
    next();
    
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return regenerateAccessToken(req, res);
    }

    return res.status(401).json({
      status: 'error',
      message: 'UnAurthorized - Token Verification Failed',
      statusCode: 401,
    })
  }
};

const regenerateAccessToken = (req, res) => {
  const { userId } = req.user; 
  if (!userId) {
    return res.status(401).json({
      status: 'error',
      message: 'User ID missing in token.',
      statusCode: 401,
    });
  }
      prisma.user.findUnique({ where: { id: userId } })
      .then(user => {
        if (!user) {
          return res.status(404).json({
            status: 'error',
            message: 'User not found.',
            statusCode: 404,
          });
        }

      const newAccessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: 450000 });

      res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        maxAge: 450000, 
        path: '/',
      });

      return res.json({
        message: 'Token refreshed',
        accessToken: newAccessToken
      });
    })
    .catch(() => {
      console.error('Error during logout:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error. Please try again later.',
        statusCode: 500,
      });
    });
};

module.exports = { authenticate , regenerateAccessToken };
