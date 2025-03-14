const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


 const createQuestion = async (req, res) => {
  try {
    const { question, option1, option2, option3, option4, correctAnswer } = req.body;

    if (!question || !option1 || !option2 || !option3 || !option4 || !correctAnswer) {
      return res.status(400).json({
        status: 'error',
        message: 'All Fields are required.',
        statusCode: 400
      });
    }

    if (!['1', '2', '3', '4'].includes(correctAnswer)) {
      return res.status(400).json({
        status: 'error',
        message: 'Correct Answer must be 1, 2, 3, or 4.',
        statusCode: 400
      });
    }

    const newQuestion = await prisma.question.create({
      select: {
        question: true,
        option1: true,
        option2: true,
        option3: true,
        option4: true,
        correctAnswer: true,
      },
      data: {
        question,
        option1,
        option2,
        option3,
        option4,
        correctAnswer,
      },
    });
    return res.status(201).json({
      status: 'success',
      message: 'Question Created successfully.',
      statusCode: 201,
      newQuestion
    });
  } catch (error) {
    console.error('Error Creating Question', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error. Please try again later.',
      statusCode: 500,
      data: null,
    });
  }
};


 const updateQuestion = async (req, res) => {
  try {
    const id = req.params.id;
    const { question, optionA, optionB, optionC, optionD, correctAnswer } = req.body;
    const updatedQuestion = await prisma.question.update({
      where: { id },
      data: {
        question,
        optionA,
        optionB,
        optionC,
        optionD,
        correctAnswer,
      },
    });
    return res.status(200).json({
      status: 'success',
      message: 'Question Updated Successfully.',
      statusCode: 200,
      data: updatedQuestion,
    });
  } catch (error) {
    console.error('Error Updated Question:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error. Please try again later.',
      statusCode: 500,
      data: null,
    });
  }
};


 const deleteQuestion = async (req, res) => {
  try {
    const id = req.params.id;

    await prisma.question.delete({
      where: { id },
    });
    return res.status(200).json({
      status: 'success',
      message: 'Question deleted successfully',
      statusCode: 200,
    });
  } catch (error) {
    console.error('Error Deleting Question:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error. Please try again later.',
      statusCode: 500,
      data: null,
    });
  }
};


 const getQuestions = async (req, res) => {
  try {
    const questions = await prisma.question.findMany();
    if (questions.length > 0) {
      return res.status(200).json({
        status: 'success',
        message: 'Question fetched successfully.',
        statusCode: 200,
        questions,
      });
    } else {
      return res.status(404).json({
        status: 'error',
        message: 'No Questions found.',
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

module.exports = { createQuestion, updateQuestion, deleteQuestion, getQuestions };