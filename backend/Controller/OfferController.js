const prisma = require ('../Config/database.js');

 const createOffer = async (req, res) => {
  try {
    const { title, image, description, offerType, durationInUTC } = req.body;

    if (!title || !image || !description || !offerType || !durationInUTC) {
      return res.status(400).json({
        status: 'error',
        message: 'All fields are required.',
        statusCode: 400,
      });
    }
    const originalDuration = durationInUTC;
    const [hours, minutes, seconds] = durationInUTC.split(':').map(Number);

    const now = new Date();
    const currentTimeInPKT = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Karachi" }));

    currentTimeInPKT.setHours(currentTimeInPKT.getHours() + hours);
    currentTimeInPKT.setMinutes(currentTimeInPKT.getMinutes() + minutes);
    currentTimeInPKT.setSeconds(currentTimeInPKT.getSeconds() + seconds);

    const expirationTimeInPKT = currentTimeInPKT.toISOString();

    const offer = await prisma.offer.create({
      data: {
        title,
        image,
        description,
        offerType,
        durationInUTC: expirationTimeInPKT, 
        originalDuration: originalDuration
      },
    });

    return res.status(201).json({
      status: 'success',
      message: 'Offer created successfully.',
      statusCode: 201,
      data: offer,
    });
  } catch (error) {
    console.error('Error creating offer:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error. Please try again later.',
      statusCode: 500,
      data: null,
    });
  }
};

 const getAllOffers = async (req, res) => {
  try {
    const offers = await prisma.offer.findMany();

    const currentTime = new Date();
    const updatedOffers = offers.map((offer) => {
    const expirationTime = new Date(offer.durationInUTC);
    const timeLeft = expirationTime - currentTime;


      const formatTime = (ms) => {
      const hours = Math.floor(ms / (1000 * 60 * 60));
      const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((ms % (1000 * 60)) / 1000);
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      };

      const formattedTimeLeft = timeLeft > 0 ? formatTime(timeLeft): '00:00:00'; 

      return {
        ...offer,
        timeLeft: formattedTimeLeft
      };
    });

    return res.status(200).json({
      status: 'success',
      message: 'Offers fetched successfully.',
      statusCode: 200,
      data: updatedOffers,
    });
  } catch (error) {
    console.error('Error fetching offers:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error. Please try again later.',
      statusCode: 500,
      data: null,
    });
  }
};

 const deleteOffer = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({
        status: 'error',
        message: 'Offer ID is required.',
        statusCode: 400,
      });
    }

    const offer = await prisma.offer.findUnique({ where: { id } });
    if (!offer) {
      return res.status(404).json({
        status: 'error',
        message: 'Offer not found.',
        statusCode: 404,
      });
    }

    await prisma.offer.delete({ where: { id } });

    return res.status(200).json({
      status: 'success',
      message: 'Offer deleted successfully.',
      statusCode: 200,
    });
  } catch (error) {
    console.error('Error deleting offer:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error. Please try again later.',
      statusCode: 500,
    });
  }
};

 const updateOffer = async (req, res) => {
  try {
    const id  = req.params.id;
    const { title, image, description, offerType, durationInUTC } = req.body;

    if (!id) {
      return res.status(400).json({
        status: 'error',
        message: 'Offer ID is required.',
        statusCode: 400,
      });
    }

    const offer = await prisma.offer.findUnique({ where: { id } });
    if (!offer) {
      return res.status(404).json({
        status: 'error',
        message: 'Offer not found.',
        statusCode: 404,
      });
    }

    let updatedData = { title, image, description, offerType };
    if (durationInUTC) {
      const [hours, minutes, seconds] = durationInUTC.split(':').map(Number);
      const expirationTime = new Date();
      expirationTime.setUTCHours(expirationTime.getUTCHours() + hours);
      expirationTime.setUTCMinutes(expirationTime.getUTCMinutes() + minutes);
      expirationTime.setUTCSeconds(expirationTime.getUTCSeconds() + seconds);
      updatedData.durationInUTC = expirationTime.toISOString();
    }

    const updatedOffer = await prisma.offer.update({
      where: { id },
      data: updatedData,
    });

    return res.status(200).json({
      status: 'success',
      message: 'Offer updated successfully.',
      statusCode: 200,
      data: updatedOffer,
    });
  } catch (error) {
    console.error('Error updating offer:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error. Please try again later.',
      statusCode: 500,
    });
  }
};

module.exports = { createOffer, getAllOffers, deleteOffer, updateOffer };