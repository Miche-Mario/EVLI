import React, { useEffect, useState, useContext } from 'react'
import { StepperContext } from '../../../contexts/stepperContext'
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'

import '../paymentstyle.css'
import axios from 'axios'
const PaymentByStudentId = ({ handleClick }) => {
  const [msg, setMsg] = useState("");


  const { user} = useSelector(
    (state) => state.auth
  );
  /////////////////////////////////////////////////////////////GET INVOICE/////////////////////////////////////

  const [invoicedata, setInvoiceData] = useState([])
  const [invoicecode, setInvoicecode] = useState()

  const [prospectdata, setProspectData] = useState([])

  /////////////////////////////////////////////////////////////GET STUDENT DATA/////////////////////////////////////

  const [student, setStudent] = useState([]);
  const [studentid, setStudentId] = useState([]);


  const getStudent = async () => {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/studentbystudentid`, {
      studentid: studentid
    });
    setStudent(response.data)
  }


///////////////////////////////////////////////////////////////////////////////////////////////
  const { studentData, setStudentData } = useContext(StepperContext)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData,...student, [name]: value })
  }
  console.log(studentData)


const [paymentmethodd, setPaymentmethodd] = useState('')
const [paymentmethoddetails, setPaymentMethoddetails] = useState('')

const [paymentStatus, setPaymentStatus] = useState('')

var currentDate = new Date();

var month = currentDate.getMonth()+1;
if (month < 10) month = "0" + month;
var dateOfMonth = currentDate.getDate();
if (dateOfMonth < 10) dateOfMonth = "0" + dateOfMonth;
var year = currentDate.getFullYear();
var formattedDate = dateOfMonth + "/" + month + "/" + year + " " + currentDate.toLocaleTimeString();
console.log(formattedDate);

  /////////////////////////////////////////////////////////////GET PAYMENT METHOD/////////////////////////////////////


  const [paymentmethod, setPaymentMethod] = useState([]);

  const getPaymentMethods = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/paymentmethod`);
    setPaymentMethod(response.data)
  }




 useEffect(() => {
  getPaymentMethods()
 }, [])


 ///////////////////////SAVE PAYMENT///////////////////////////////////////////////////////

 const savePayment = async(e) => {
  if(paymentmethodd ==="") {
    toast.error("Please insert a payment method")

  } else {
    if ((studentData.firstpayed > studentData.total) || (studentData.firstpayed < 0)) {
      toast.error("Amount incorrect")
    } else {
  try {
     await axios.post(`${process.env.REACT_APP_BASE_URL}/createpayment`, {
      courselist: studentData.courseList.length > 0 ? studentData.courseList : {},
      examlist: studentData.examList.length > 0 ? studentData.examList : {},
      purchaselist:  studentData.purchaseList.length > 0 ? studentData.purchaseList : {},
      accolist: studentData.accoList.length > 0 ? studentData.accoList : {},
      otherlist: studentData.otherFeeList.length > 0 ? studentData.otherFeeList : {},
      registration: studentData.registrationList.length > 0 ? studentData.registrationList : {},
      currency: studentData.currency && studentData.currency,
      discount: studentData.discount && studentData.discount,
      total: studentData.total && studentData.total,
      subtotal: studentData.subtotal && studentData.subtotal,
      studdiscount: studentData.studdiscount && studentData.studdiscount,
      invoicecode: studentData.passportidg &&  studentData.passportidg,
      first: studentData.firstpayed !== 0 && studentData.firstpayed,
      balance: studentData && studentData.total === parseInt(studentData.firstpayed) ? 0 : (studentData.total - studentData.firstpayed),
      studentid: student && student.id,
      code: studentData &&  studentData.studdiscount.lecode !== "" && studentData.studdiscount.lecode,
      paymentmethod: paymentmethodd,
      timepayment: [{date : formattedDate, amount:  studentData.firstpayed !== 0 && studentData.firstpayed,details: paymentmethoddetails}],
      user: user.id
    });
    handleClick('next')
    toast.success("Payment Well Saved")
  } catch (error) {
    if (error.response) {
      setMsg(error.response.data.msg);
      toast.error("Something Wrong happen")
    }
  }
}
}
}



  
const [paymentstatuss, setPaymentStatuss] = useState([]);

const getPaymentStatus = async () => {
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/paymentstatuss`);
  setPaymentStatuss(response.data)
}




useEffect(() => {

  getPaymentStatus();
}, [])


  /////////////////////////////////////////////////////////////
  function separator(numb) {
    var str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
  }

  return (



    <>

      <div className='mt-3 h-full'>
      <ToastContainer style={{fontSize: 20}} position="top-right"/>
        <div className=' ml-32 '>
          <div className='flex items-center ml-4 ' >
            <p className={`text-xl font-medium ${student && "text-green-500"}`}>STUDENT ID</p>
            <input type='text' className={`ml-4 w-48 p-2 border ${student && " text-2xl focus:border-green-500 border-green-500"} `}

              onKeyUpCapture={(e) => { getStudent(e); setStudentId(e.target.value) }}
            />
          </div>
        </div>


        <div>
          <div className="containerr mt-3">

            <div className="body-sectionn">
              <div className='mt-3'>
                <div className='flex flex-row '>
                  <div className='text-xl font-medium'>Receiving from:</div>
                  <div className='ml-4 font-bold text-xl uppercase'>{student && student.forenamesg} {student && student.surnameg}</div>
                </div>
                <p className='ml-[9.5rem] text-lg uppercase'>
               {/*    {invoicedata && invoicedata[0].courselist.length > 0 && invoicedata[0].courselist[0].lesubcoursename}
                  {invoicedata && invoicedata[0].courselist.length > 0 && " ENGLISH PROGRAMS"}
                  {invoicedata && invoicedata[0].courselist.length > 1 && "WITH "}
                  {invoicedata && invoicedata[0].courselist.length > 1 && invoicedata[0].courselist[1].lesubcoursename}
                  {invoicedata && invoicedata[0].courselist.length > 1 && " PREPARATIONS"}
                  {invoicedata && invoicedata[0].courselist.length > 2 && " WITH " + invoicedata[0].courselist[2].laduration + " WEEKS COMPUTER LITERACY"}
                  {invoicedata && invoicedata[0].courselist.length > 0 && " WITH "}
                  {invoicedata && invoicedata[0].examlist.length > 0 && invoicedata[0].examlist[0].lexamname}
                  {invoicedata && invoicedata[0].accolist.length > 0 && " WITH " + invoicedata[0].accolist[0].acotimes + " WEEKS ACCOMODATION"}


 */}


                </p>
              </div>
              <br />
                <table className="table-bordered">
                  <thead>
                    <tr>
                      <th className="ww-20">Quantity</th>
                      <th className="ww-32">Description</th>
                      <th className="ww-20">Unit Price</th>
                      <th className="ww-20">Line Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      studentData && studentData.registrationList.length >= 0 && studentData.registrationList.map((regis, index) => (
                        <tr key={index * (Math.random() * 3)}>
                          <td>1</td>
                          <td className="ww-32">{regis.registrationname}</td>
                          <td>{regis.lecurrency} {separator(regis.regir)}</td>
                          <td>{regis.lecurrency} {separator(regis.regir)}</td>
                        </tr>
                      ))

                    }

                 {
                     studentData.courseList.length >= 0 && studentData.courseList.map((course, index) => (
                        <tr key={index * (Math.random() * 3)}>
                          <td>1</td>
                          <td>{course.coursedescription}</td>
                          <td>{course.lecurrency} {separator(course.price)}</td>
                          <td>{course.lecurrency} {separator(course.price)}</td>
                        </tr>
                      ))

                    }
  
                    {
                      studentData && studentData.examList.length >= 0 && studentData.examList.map((exam, index) => (
                        <tr key={index * (Math.random() * 3)}>
                          <td>1</td>
                          <td>{exam.examdescription}</td>
                          <td>{exam.lecurrency} {separator(exam.examprice)}</td>
                          <td>{exam.lecurrency} {separator(exam.examprice)}</td>
                        </tr>
                      ))

                    }
  
                    {
                      studentData && studentData.purchaseList.length >= 0 && studentData.purchaseList.map((pur, index) => (
                        <tr key={index * (Math.random() * 3)}>
                          <td>1</td>
                          <td>{pur.purchasedescription}</td>
                          <td>{pur.lecurrency} {separator(pur.purchaseprice)}</td>
                          <td>{pur.lecurrency} {separator(pur.purchaseprice)}</td>
                        </tr>
                      ))

                    }
                
                    {
                      studentData && studentData.accoList.length >= 0 && studentData.accoList.map((acco, index) => (
                        <tr key={index * (Math.random() * 3)}>
                          <td>{acco.acotimes}</td>
                          <td>{acco.accodescription}</td>
                          <td>{acco.lecurrency} {separator(acco.accoprice)}</td>
                          <td>{acco.lecurrency} {separator(acco.acotimes * acco.accoprice)}</td>
                        </tr>
                      ))
                      }

           { studentData && studentData.otherFeeList.length >= 0 && studentData.otherFeeList.map((other, index) => (
                        <tr key={index * (Math.random() * 3)}>
                          <td>1</td>
                          <td>{other.otherfeedescription}</td>
                          <td>{other.lecurrency} {separator(other.otherfeeprice)}</td>
                          <td>{other.lecurrency} {separator(other.otherfeeprice)}</td>
                        </tr>
                      ))

                    }

                    <tr>
                      <td colspan="3" className="text-right">Subtotal:</td>
                      <td className='font-bold'> {studentData && studentData.currency.lecurrency} {studentData && separator(studentData && studentData.subtotal)}</td>
                    </tr>
                    <tr>
                      <td colspan="3" className="text-right">Discount:</td>
                      <td className='font-bold'> {studentData && studentData.currency.lecurrency} {studentData && studentData.discount ?  studentData.discount  : "0,00"}</td>
                    </tr>
                    <tr>
                      <td colspan="3" className="text-right">Total:</td>
                      <td className='font-bold'> {studentData && studentData.currency.lecurrency} {studentData && separator(studentData && studentData.total)}</td>
                    </tr>
                    <tr>
                      <td colspan="3" className="text-right">Amount Paid 1st:</td>
                      <td className='font-bold flex justify-center items-center'>{studentData && studentData.currency.lecurrency}
                        <input type="number" className='p-1 border ml-1 border-red text-red w-28 text-center text-bold'
                          onChange={handleChange}
                          name="firstpayed"
                          value={studentData["firstpayed"] || ""}
                          required
                        />

                      </td>
                    </tr> 
                   
                  </tbody>
                </table>
                <br />
                <div className='flex flex-row items-center'>
                  <h3 className="heading">Payment Mode:</h3>
                  <select id="countries" className="ml-3 3bg-gray-50 mb-4   text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 p-2.5"
                    required
                    onClick={(e)=> setPaymentmethodd(e.target.value)}
                  >
                    <option></option>
                    {paymentmethod.map((pm, index) => (
                        <option value={pm.id}>{pm.paymentname}</option>
                    ))}
                  </select>


                </div>

                <div className='flex flex-row items-center'>
                  <h3 className="heading w-[13rem]">Payment Mode details:</h3>
                  <textarea rows={4} cols={6} type="text"  className="ml-3 3bg-gray-50 mb-4   text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[15rem] p-1"
                    name='paymentmethoddetails'
                    value={paymentmethoddetails}
                    onChange={(e) => setPaymentMethoddetails(e.target.value)}
                  >        </textarea>


                </div>






             
                <div className='flex justify-end'>
                  <button
                  
                    onClick={(e) => savePayment(e)}
                    className=' w-48 bg-blue-400 text-white  uppercase py-2 px-4
                                rounded-xl font-semibold cursor-pointer  
                              hover:bg-blue-600 hover:text-white transition duration-200 ease-in-out '
                  >
                    Save
                  </button>
                </div>


            </div>



          </div>
        </div>
      </div>
    </>
  )
}

export default PaymentByStudentId