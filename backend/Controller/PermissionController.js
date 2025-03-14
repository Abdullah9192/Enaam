const prisma = require ('../Config/database.js');

 const createPermission = async (req, res) => {
  const { name } = req.body;

  try {
    const permission = await prisma.permission.create({
      data: { name },
    });
    res.status(201).json({ message: 'Permission created successfully', permission });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create permission', details: error.message });
  }
};

 const assignPermissionToRole = async (req, res) => {
  const { roleId, permissionId } = req.body;

  try {
    const assignment = await prisma.rolePermission.create({
      data: { roleId, permissionId },
    });
    res.status(200).json({ message: 'Permission assigned successfully', assignment });
  } catch (error) {
    res.status(500).json({ error: 'Failed to assign permission', details: error.message });
  }
};

 const removePermissionFromRole = async (req, res) => {
  const { roleId, permissionId } = req.body;

  try {
    await prisma.rolePermission.delete({
      where: { roleId_permissionId: { roleId, permissionId } },
    });
    res.status(200).json({ message: 'Permission removed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove permission', details: error.message });
  }
};

 const getAllPermissions = async (req, res) => {
  try {
    const permissions = await prisma.permission.findMany();
    res.status(200).json(permissions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch permissions', details: error.message });
  }
};

module.exports = { createPermission, assignPermissionToRole, removePermissionFromRole, getAllPermissions };