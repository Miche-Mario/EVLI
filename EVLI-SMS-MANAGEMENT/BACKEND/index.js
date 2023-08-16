import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js"
import SequelizeStore from "connect-session-sequelize"
import UsersRoute from "./routes/UsersRoute.js"
import AboutsRoute from "./routes/AboutRoute.js"
import StudentsRoute from "./routes/StudentsRoute.js"
import CourseRoute from "./routes/CourseRoute.js"
import SubCourseRoute from "./routes/SubCourseRoute.js"
import PurchaseRoute from "./routes/PurchaseRoute.js";
import AuthRoute from "./routes/AuthRoute.js"
import ExamRoute from "./routes/ExamRoute.js"
import ClassTypeRoute from "./routes/ClassTypeRoute.js"
import StudentsCoursesRoute from "./routes/StudentsCoursesRoute.js";
import PriceTypeRoute from "./routes/PriceTypeRoute.js"
import StudentsPurchasesRoute from "./routes/StudentsPurchasesRoute.js"
import TimeRoute from "./routes/TimeRoute.js"
import PricesRoute from "./routes/PricesRoute.js";
import LanguagesRoute from "./routes/LanguagesRoute.js"
import StudentsAccomodations from "./routes/StudentsAccomodationsRoute.js";
import StudentsExams from "./routes/StudentsExmasRoute.js"
import PaymentMethodRoute from "./routes/PaymentMethodsRoute.js"
import OtherFeeRooute from "./routes/OtherFeeRoute.js"

import AccomodationRoute from "./routes/AccomodationRoute.js"
import CoursesRoute from "./routes/CoursesRoute.js"
import RegistrationRoute from "./routes/RegistrationRoute.js"

import PaymentRoute from "./routes/Payment.js"
import DiscountRoute from './routes/DiscountRoute.js'
import InvoiceRoute from './routes/Invoice.js'
import StudentOtherFeeRoute from "./routes/StudentsOtherFee.js" 
import CurrencyRoute from './routes/CurrencyRoute.js'
import GroupDiscountRoute from './routes/GroupDiscountRoute.js'
import AccoDiscountRoute from './routes/AccoDiscountRoute.js'

import ProspectRoute from "./routes/ProspectsRoute.js";
import ExpensesRoute from "./routes/ExpensesRoute.js"
import ExpensesType from "./routes/ExpensesType.js";
import LogRoute from "./routes/LogRoute.js"
import PaymentStatusRoute from "./routes/PaymentStatusRoute.js"
dotenv.config();

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});

(async()=> {
    await db.sync();
})()
app.use(cors({origin:true,credentials: true}));

app.use(express.json());
app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));
app.use(UsersRoute);
app.use(StudentsRoute);
app.use(AboutsRoute);
app.use(AuthRoute);
app.use(CourseRoute);
app.use(CoursesRoute);
app.use(SubCourseRoute);
app.use(PurchaseRoute);
app.use(ExamRoute);
app.use(AccomodationRoute);
app.use(TimeRoute);
app.use(PricesRoute);
app.use(LanguagesRoute);
app.use(PriceTypeRoute);
app.use(ClassTypeRoute);
app.use(StudentsCoursesRoute);
app.use(StudentsPurchasesRoute);
app.use(StudentsAccomodations);
app.use(StudentsExams);
app.use(PaymentMethodRoute);
app.use(OtherFeeRooute);
app.use(RegistrationRoute);
app.use(PaymentRoute);
app.use(InvoiceRoute);
app.use(DiscountRoute);
app.use(StudentOtherFeeRoute);
app.use(CurrencyRoute)
app.use(GroupDiscountRoute)
app.use(ProspectRoute)
app.use(ExpensesType)
app.use(ExpensesRoute)
app.use(LogRoute)
app.use(PaymentStatusRoute)

app.use(AccoDiscountRoute)




// Static Images Folder
app.use('/Images', express.static('./Images'))


store.sync();
app.listen(process.env.APP_PORT, () => {
    console.log('Server up and running...');
})