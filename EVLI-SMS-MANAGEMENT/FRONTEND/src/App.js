import './App.css';
import {BrowserRouter, Routes,Route} from 'react-router-dom'

import Login from "./pages/Login"
import Students from './pages/students';
import AddStudents from './pages/AddStudents'
import Courses from './pages/Courses';
import Prospects from './pages/Prospects'; 
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import axios from "axios";
import EditUser from './pages/EditUser';
import Language from './pages/Language'
import ClassType from './pages/Classtype'
import EditLanguage from './pages/EditLanguage'
import PaymentMethods from "./pages/PaymentMethods"
import EditPaymentMethods from "./pages/EditPaymentMethod"
import EditClassType from "./pages/EditClasstype.js"
import PriceType from './pages/Pricetype';
import EditPriceType from './pages/EditPriceType';
import AddCourse from './pages/AddCourse';
import EditCourse from './pages/EditCourse'
import ItemsSale from './pages/Itemssale'
import EditItemSale from "./pages/EditItemsSale"
import Accomodation from "./pages/Accomodation"
import EditAccomodation from './pages/EditAccomodation'
import Exams from './pages/Exams';
import EditExam from './pages/EditExam';
import OtherFee from './pages/OtherFee';


import Complete from './components/Students/Steps/Complete';
import EditOtherFee from './pages/EditOtherFee';
import StudentProfile from './components/StudentProfile';
import Options from './pages/Options';
import EditCurrency from './pages/EditCurrency';
import EditAbout from './pages/EditAbout';
import StudentsDiscounts from './pages/StudentsDiscounts';
import EditGroupDiscount from './pages/EditGroupDiscount';
import AddPayment from './pages/AddPayment';
import EditStudent from './pages/EditStudent';
import StudentPayment from './pages/StudentPayment';
import EditPayment from './pages/EditPayment';
import AddPaymentByStudentId from './pages/AddPaymentByStudentId';
import AddStudentsParam from './pages/AddStudentsParam';
import ExpensesType from './pages/ExpensesType';
import Expenses from './pages/Expenses';
import EditExpensesType from './pages/EditExpensesType';
import EditExpenses from './pages/EditExpenses';
import Logs from './pages/Logs';
import EditAccoDiscount from './pages/EditAccoDiscount';
import EditPaymentStatus from './pages/EditPaymentStatus';
import GetReceipt from './GetReceipt/GetReceipt';
axios.defaults.withCredentials = true;

function App() {
  return (
   <div>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/students' element={<Students/>}/>
            <Route path='/addStudents' element={<AddStudents/>}/>
            <Route path='/addStudents/:id' element={<AddStudentsParam/>}/>

            <Route path='/courses' element={<Courses/>}/>
            <Route path='/prospects' element={<Prospects/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/users' element={<Users/>}/>
            <Route path='/language' element={<Language/>}/>
            <Route path='/classtype' element={<ClassType/>}/>
            <Route path='/pricetype' element={<PriceType/>}/>
            <Route path='/users/edit/:id' element={<EditUser/>}/>
            <Route path='/classtype/edit/:id' element={<EditClassType/>}/>
            <Route path='/pricetype/edit/:id' element={<EditPriceType/>}/>
            <Route path='/language/edit/:id' element={<EditLanguage/>}/>
            <Route path='/course/edit/:id' element={<EditCourse/>}/>
            <Route path='/accomodation/edit/:id' element={<EditAccomodation/>}/>
            <Route path='/purchase/edit/:id' element={<EditItemSale/>}/>
            <Route path='/exam/edit/:id' element={<EditExam/>}/>
            <Route path='/paymentmethods/edit/:id' element={<EditPaymentMethods/>}/>
            <Route path='/otherfee/edit/:id' element={<EditOtherFee/>}/>
            <Route path='/paymentmethods' element={<PaymentMethods/>}/>
            <Route path="/addcourse" element={<AddCourse/>}/>
            <Route path="/itemssale" element={<ItemsSale/>}/>
            <Route path="/accomodations" element={<Accomodation/>}/>
            <Route path="/exams" element={<Exams/>}/>
            <Route path="/invoice" element={<Complete/>}/>
            <Route path="/otherfee" element={<OtherFee/>}/>
            <Route path="/payment" element={<AddPayment/>}/>
            <Route path="/options" element={<Options/>}/>
            <Route path="/discount" element={<StudentsDiscounts/>}/>

            <Route path='/currency/edit/:id' element={<EditCurrency/>}/>
            <Route path='/groupdiscount/edit/:id' element={<EditGroupDiscount/>}/>
            <Route path='/accodiscount/edit/:id' element={<EditAccoDiscount/>}/>

            <Route path='/survey/edit/:id' element={<EditAbout/>}/>

            <Route path='/paymentstatus/edit/:id' element={<EditPaymentStatus/>}/>


            <Route path='/editstudent/:id' element={<EditStudent/>}/>
            <Route path='/editpayment/:id' element={<EditPayment/>}/>


            <Route path='/studentprofile/:id' element={<StudentProfile/>}/>
            <Route path="/studentpayment" element={<StudentPayment/>}/>
            <Route path="/addstudentpayment" element={<AddPaymentByStudentId/>}/>

            <Route path='/expensestype' element={<ExpensesType/>}/>
            <Route path='/expensetype/edit/:id' element={<EditExpensesType/>}/>
            <Route path='/studentpayment/getreceipt/:id' element={<GetReceipt/>}/>

            <Route path='/expenses/edit/:id' element={<EditExpenses/>}/>


            <Route path='/expenses' element={<Expenses/>}/>
            <Route path='/logs' element={<Logs/>}/>





        </Routes>
      </BrowserRouter>
   </div>
  );
}

export default App;
