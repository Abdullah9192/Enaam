const dotenv = require( 'dotenv');
const express = require( 'express');
const prisma = require( './Config/database.js');
const UserRoutes = require( './Routes/UserRoutes.js');
const ProductRoutes = require( './Routes/ProductRoutes.js');
const RewardRoutes = require( './Routes/RewardRoutes.js');
const QuestionRoutes = require( './Routes/QuestionRoutes.js');
const AssignRole  = require( './Routes/AssignRolesRoute.js');
const OrderRoute = require( './Routes/OrderRoute.js');
const CartRoute = require( './Routes/CartRoute.js');
const AuthRoute = require( './Routes/AuthRoute.js');
const WinnerRoute = require( './Routes/WinnerRoute.js');
const OfferRoute = require( './Routes/OfferRoute.js');
const RefferUser = require( './Routes/RefferedUserRoute.js');
const Permission = require( './Routes/PermissionRoute.js');
const cors = require( 'cors');
const cookieParser = require( 'cookie-parser');
const errorHandler   = require( './Middleware/errorHandler.js'); 

const app = express();

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(errorHandler);

app.use('/users', UserRoutes);
app.use('/auth', AuthRoute);
app.use('/product', ProductRoutes);
app.use('/reward', RewardRoutes);
app.use('/question', QuestionRoutes);
app.use('/role', AssignRole);
app.use('/order', OrderRoute);
app.use('/cart', CartRoute);
app.use('/reffered', RefferUser);
app.use('/winner', WinnerRoute);
app.use('/offer', OfferRoute);
app.use('/permission', Permission);

const PORT = process.env.SERVER_PORT;
(async () => {
  try {
    console.log(process.env.DATABASE_URL);
    await prisma.$connect();
    console.log('Database connected successfully.');

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
})();
