const prisma = require ('../Config/database.js');

const createRole = async (req, res) => {
  const { name } = req.body;

  try {
    const existingRole = await prisma.role.findUnique({
      where: { name },
    });

    if (existingRole) {
      return res.status(400).json({
        status: 'error',
        message: 'Role already Exist.',
        statusCode: 400
      });
    }

    const newRole = await prisma.role.create({
      data: { name },
    });
    return res.status(201).json({
      status: 'success',
      message: 'Role Created successfully.',
      statusCode: 201, 
      data: newRole
    });
  } catch (error) {
    console.error('Error Creating Role:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error. Please try again later.',
      statusCode: 500, 
      data: null,
    });
  }
};

const getAllRoles = async (req, res) => {
  try {
    const roles = await prisma.role.findMany();
    if (roles.length > 0) {
      return res.status(200).json({
        status: 'success',
        message: 'Roles fetched successfully.',
        statusCode: 200, 
        data: roles,
      });
    } else {
      return res.status(404).json({
        status: 'error',
        message: 'No Role found.',
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

const assignRole = async (req, res) => {
  const { id } = req.params; 
  const { roleId } = req.body; 

  try {
    const user = await prisma.user.findUnique({ where: { id } });
    const role = await prisma.role.findUnique({ where: { id: roleId } });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User Not Found.',
        statusCode: 404
      });
    }
    if (!role) {
      return res.status(404).json({
        status: 'error',
        message: 'Role Not Found.',
        statusCode: 404
      });
    }

    const existingAssignment = await prisma.userRole.findUnique({
      where: {
        userId_roleId: { userId: id, roleId } 
      }
    });

    if (existingAssignment) {
      return res.status(400).json({
        status: 'error',
        message: 'Role Already Assigned to this user.',
        statusCode: 400
      });
    }

    await prisma.userRole.create({
      data: {
        userId: id,
        roleId,
        assignedAt: new Date(),
      }
    });
    return res.status(200).json({
      status: 'success',
      message: 'Role Assign successfully.',
      statusCode: 200, 
      data: existingAssignment,
    });
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

const removeRole = async (req, res) => {
  const { id } = req.params; 
  const { roleId } = req.body; 

  try {
    const userRole = await prisma.userRole.findUnique({
      where: {
        userId_roleId: { userId: id, roleId }
      }
    });

    if (!userRole) {
      return res.status(400).json({
        status: 'error',
        message: 'Role not assign to this user.',
        statusCode: 400
      });
    }

    await prisma.userRole.delete({
      where: {
        userId_roleId: { userId: id, roleId }
      }
    });
    return res.status(200).json({
      status: 'success',
      message: 'Role Removed successfully.',
      statusCode: 200, 
      data: userRole,
    });
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
  createRole,
  getAllRoles,
  assignRole,
  removeRole
};