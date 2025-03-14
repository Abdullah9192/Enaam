const prisma = require ('../Config/database.js');

 const getReferredUsers = async (req, res) => {
    const ambassadorId = req.params.id;
  
    try {
      const referrals = await prisma.ambassadorReferral.findMany({
        where: { ambassadorId },
        include: {
          ambassador: true,
          referredUser: true,  
        },
      });
  
      if (referrals.length === 0) {
        return res.status(404).json({
          status: 'error',
          message: 'No referrals found for this ambassador.',
        });
      }

      const referredUsers = referrals.map(referral => ({
        id: referral.referredUser.id,
        name: referral.referredUser.name,
        email: referral.referredUser.email,
      }));
  
      res.status(200).json({
        status: 'success',
        message: 'Referred users fetched successfully.',
        data: referredUsers,
      });
    } catch (error) {
      console.error('Error fetching referred users:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error. Please try again later.',
      });
    }
  };
  
module.exports = { getReferredUsers };