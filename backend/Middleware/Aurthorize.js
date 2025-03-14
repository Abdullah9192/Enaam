const authorize = (requiredPermissions) => {
  return (req, res, next) => {
    const userPermissions = req.user.permissions; 

    const hasPermission = requiredPermissions.some(permission => userPermissions.includes(permission));
    if (!hasPermission) {
      return res.status(403).json({
        status: 'error',
        message: 'Forbidden: You do not have the required permissions.',
        statusCode: 403,
      });
    }

    next();
  };
};

module.exports =  { authorize } ;
