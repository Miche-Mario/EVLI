import React, { useEffect, useState, useContext } from 'react'
import { StepperContext } from '../contexts/stepperContext'
import { useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {PDFViewer} from '@react-pdf/renderer'
import './paymentstyle.css'
import axios from 'axios'
import Invoice from '../components/PaymentSteps/reports4/Invoice'


import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getMe } from '../features/auth/authSlice'





const GetReceipt = ({ click }) => {
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch])

  useEffect(() => {
    if (isError) {
      navigate("/")
    }
  }, [isError, navigate
  ])

  const { user} = useSelector(
    (state) => state.auth
  );


  //////////////////////////////////SEND DATA //////////////////////////////

  const [ studentData, setStudentData]  = useState()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value })
  }

/* 
  useEffect(() => {
    setStudentData({ ...studentData, invoicedata: invoicedata[0], prospectdata: prospectdata })
  }, [invoicedata, prospectdata]) */



  /////////////////////////////////////////////////////////////GET INVOICE/////////////////////////////////////

  const [invoicedata, setInvoiceData] = useState()
  const [paymentdata, setPaymentData] = useState()
  const [balance, setBalance] = useState();
  const [first, setFirst] = useState();
  const [second, setSecond] = useState();
  const [timepayment, setTimePayment] = useState();



  
  const [invoicecode, setInvoicecode] = useState()
  const [invoicedatatrue, setInvoicedatatrue] = useState(false)


  const { id } = useParams();

  const getPayment = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/paymentbyid/${id}`);
      response.data && setInvoiceData(response.data.invoice)
      response.data && setPaymentData(response.data)
      response.data && setBalance(response.data.balance)
      response.data && setFirst(response.data.first)
      response.data && setSecond(response.data.second ? response.data.second : 0)
      response.data && setTimePayment(response.data.timepayment)
      setStudentData({ ...studentData,...response.data.student, invoicedata: response.data.invoice, timepayment: response.data.timepayment, paymentdata: response.data })

}

console.log(studentData)

////////////////////////////////////////////////UPDATE PAYMENT///////////////////////////////
var currentDate = new Date();

var month = currentDate.getMonth()+1;
if (month < 10) month = "0" + month;
var dateOfMonth = currentDate.getDate();
if (dateOfMonth < 10) dateOfMonth = "0" + dateOfMonth;
var year = currentDate.getFullYear();
var formattedDate = dateOfMonth + "/" + month + "/" + year + " " + currentDate.toLocaleTimeString(); 


const [paymentmethodd, setPaymentmethodd] = useState('')
const [paymentmethoddetails, setPaymentMethoddetails] = useState('')

const [paymentStatus, setPaymentStatus] = useState('')


const updatePayment = async (e) => {
  if(paymentmethodd ==="") {
    toast.error("Please insert a payment method")

  } else {
    if ((studentData.firstpayed > paymentdata.balance) || (studentData.firstpayed < 0)) {
      toast.error("Amount incorrect")
    } else {
  try {
    await axios.patch(`${process.env.REACT_APP_BASE_URL}/payment/${id}`, {
      balance: balance - studentData.firstpayed,
      first: first + second,
      paying: studentData.firstpayed,
      timepayment: [...timepayment, {date: formattedDate, amount: studentData.firstpayed, details:paymentmethoddetails}],
      user: user.id
    });
    toast.success("Payment Well Saved")
  } catch (error) {
    if(error.response) {
      setMsg(error.response.data.msg);
    }
  }
}
}
}


  /////////////////////////////////////////////////////////////GET PAYMENT METHOD/////////////////////////////////////



  

  const [paymentmethod, setPaymentMethod] = useState([]);

  const getPaymentMethods = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/paymentmethod`);
    setPaymentMethod(response.data)
  }



  
  const [paymentstatuss, setPaymentStatuss] = useState([]);

  const getPaymentStatus = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/paymentstatuss`);
    setPaymentStatuss(response.data)
  }
  
  

 useEffect(() => {
  getPaymentMethods()
  getPayment()
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
      <ToastContainer style={{ fontSize: 20 }} position="top-right" />

       {/*  <div className=' ml-32 '>
          <div className='flex items-center ml-4 ' >
            <p className={`text-xl font-medium ${invoicedatatrue == true && "text-green-500"}`}>INVOICE ID</p>
            <input type='text' className={`ml-4 w-48 p-2 border ${invoicedatatrue == true && " text-2xl focus:border-green-500 border-green-500"} `}

              onKeyUpCapture={(e) => { getInvoiceData(e); setInvoicecode(e.target.value) }}
            />
          </div>
        </div>
 */}
{ studentData &&
        <>
        <PDFViewer width="1000" height="600" className="app" >
            <Invoice studentData={studentData}/>
        </PDFViewer>
    </>
       
}
      </div>
    </>
  )
}

export default GetReceipt