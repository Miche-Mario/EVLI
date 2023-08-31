import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Layout from '../components/Screens/Layout'
import { TiUserAdd } from 'react-icons/ti'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios'
import Moment from 'moment'
import { MdOutlinePayments } from "react-icons/md"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getMe } from '../features/auth/authSlice'
 
const StudentPayment = () => {

    const style2 = {
  position: 'absolute',
  margin: 20,
  width: "800px",
    top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid darkblue',
  boxShadow: 24,
  p: 0,
  m: 0,
  height: 'auto'
};
    const style = {
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid darkblue',
        boxShadow: 24,
        p: 0,
        m: 0,
        height: 'auto'
      };
      const style1 = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 700,
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid darkblue',
        boxShadow: 24,
        p: 0,
        m: 0,
        height: 'auto'
      };

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
    

    const [payments, setPayments] = useState([]);
    const [count, setCount] = useState();
    const [search, setSearch] = useState();



    const getPayment = async () => {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/payment`);
        setPayments(response.data.rows)
        setCount(response.data.count)
    }

    /* const getStudentsByName = async (e) => {
        e.preventDefault()
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/studentbyname`, {
            search: search
        });
        setStudents(response.data.rows)
        setCount(response.data.count)
    } */
    useEffect(() => {
        getPayment();
    }, [])

    console.log(payments)

    const [open, setOpen] = useState(false);
    const [code, setCode] = useState("");

    const handleOpen = (code) => {
        setOpen(true);
        setCode(code)
    };

    const handleClose = () => {
        setOpen(false);
    };

    ////////////////////////////GET STUDENT INVOICE///////////////////////////////
    function separator(numb) {
        var str = numb.toString().split(".");
        str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return str.join(".");
      }



      ////////////////////DELETE PROCESS///////////////////
      const [va, setVa] = useState("");
      const [open1, setOpen1] = useState(false);

      const handleOpen1 = (uuid) => {
        setOpen1(true);
        setVa(uuid)
      };
      const handleClose1 = () => {
        setOpen1(false);
      };

      const deleteLastPayment = async (userId) => {
        await axios.patch(`${process.env.REACT_APP_BASE_URL}/paymentt/${userId}`, {
          user: user.id
        });
        getPayment();
        navigate(0);
      }



      const handleOpen2 = (uuid) => {
        navigate(`getreceipt/${uuid}`);

      };

      ////////////////////DELETE PAYMENT TO PAYED///////////////////
      //const [va, setVa] = useState("");
      const [open1a, setOpen1a] = useState(false);


      const handleOpen1a = (uuid) => {
        setOpen1a(true);
        setVa(uuid)
      };
      const handleClose1a = () => {
        setOpen1a(false);
      };

      const UpdatePaymenttoPayed = async (userId) => {
        await axios.patch(`${process.env.REACT_APP_BASE_URL}/updatepaymenttopayed/${userId}`, {
          status: 2
        });
        getPayment();
        navigate(`getreceipt/${userId}`);
      }



    return (
        <Layout>
               <Modal
        open={open1}
        onClose={handleClose1}
      >
        <Box sx={style2}>
          <div className='items-center p-3 '>
            <div className='text-center text-xl font-medium'>Would you really delete ?</div>
            <div className='flex items-center justify-center mt-3 mb-3'>
              <button className='bg-blue-600 rounded text-gray-100 ml-5 font-medium w-20 h-10 flex items-center justify-center'
                onClick={() => deleteLastPayment(va)}
              >
                Delete
              </button>
              <button onClick={handleClose1} className='bg-blue-600 rounded ml-5 text-gray-100 font-medium w-20 h-10 flex items-center justify-center'>
                Cancel
              </button>
            </div>
          </div>

        </Box>
      </Modal>


      <Modal
        open={open1a}
        onClose={handleClose1a}
      >
        <Box sx={style2}>
          <div className='items-center p-3 '>
            <div className='text-center text-xl font-medium'>Please clear the payment. <br/><span className=' text-red font-bold text-xl'> Confirm it has been paid before you can add new payment!</span></div>
            <div className='flex items-center justify-center mt-8 mb-3'>
          
              <button onClick={handleClose1a} className='bg-blue-600 rounded ml-5 text-gray-100 font-medium w-32 h-12 p-4 flex items-center justify-center'>
                Cancel
              </button>
              <button className='bg-green-600 rounded text-white ml-5 font-medium w-29 p-4 h-12 flex items-center justify-center'
                onClick={() => UpdatePaymenttoPayed(va)}
              >
                Payment Payed
              </button>
            </div>
          </div>

        </Box>
      </Modal>


<Modal
        open={open}
        onClose={handleClose}
      >
        <Box className="center-col" sx={style1}>
         
            <div  className=' text-center bg-dark-purple p-2 text-white text-xl font-medium'>{}</div>
            {/* About Section */}
            <div class="bg-white p-3 shadow-sm rounded-sm">
                                    <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                        <MdOutlinePayments style={{ fontSize: 35 }} />
                                        <span class="tracking-wide font-bold text-xl">Student Courses and Payment</span>
                                    </div>
                                    <div class="text-gray-700">
                                    { code.invoice && <table className="table-bordered">
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
                       code.invoice &&  code.invoice.registration.length > 0 &&  code.invoice.registration.map((regis, index) => (
                        <tr key={index * (Math.random() * 3)}>
                          <td>1</td>
                          <td className="ww-32">{regis.registrationname}</td>
                          <td>{regis.lecurrency} {separator(regis.regir)}</td>
                          <td>{regis.lecurrency} {separator(regis.regir)}</td>
                        </tr>
                      ))

                    }

                    {
                       code.invoice &&  code.invoice.courselist.length > 0 &&  code.invoice.courselist.map((course, index) => (
                        <tr key={index * (Math.random() * 3)}>
                          <td>1</td>
                          <td>{course.coursedescription}</td>
                          <td>{course.lecurrency} {separator(course.price)}</td>
                          <td>{course.lecurrency} {separator(course.price)}</td>
                        </tr>
                      ))

                    }

                    {
                 code.invoice && code.invoice.examlist.length > 0 && code.invoice.examlist.map((exam, index) => (
                        <tr key={index * (Math.random() * 3)}>
                          <td>1</td>
                          <td>{exam.examdescription}</td>
                          <td>{exam.lecurrency} {separator(exam.examprice)}</td>
                          <td>{exam.lecurrency} {separator(exam.examprice)}</td>
                        </tr>
                      ))

                    }

                    {
                      code.invoice && code.invoice.purchaselist.length > 0 && code.invoice.purchaselist.map((pur, index) => (
                        <tr key={index * (Math.random() * 3)}>
                          <td>1</td>
                          <td>{pur.purchasedescription}</td>
                          <td>{pur.lecurrency} {separator(pur.purchaseprice)}</td>
                          <td>{pur.lecurrency} {separator(pur.purchaseprice)}</td>
                        </tr>
                      ))

                    }
                    {
                code.invoice && code.invoice.accolist.length > 0 && code.invoice.accolist.map((acco, index) => (
                        <tr key={index * (Math.random() * 3)}>
                          <td>{acco.acotimes}</td>
                          <td>{acco.accodescription}</td>
                          <td>{acco.lecurrency} {separator(acco.accoprice)}</td>
                          <td>{acco.lecurrency} {separator(acco.acotimes * acco.accoprice)}</td>
                        </tr>
                      ))

                    }

                    {
                    code.invoice && code.invoice.otherlist.length > 0 && code.invoice.otherlist.map((other, index) => (
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
                      <td className='font-bold'> {code.invoice && code.invoice.currency.lecurrency && code.invoice.currency.lecurrency} {code.invoice.subtotal && separator(code.invoice.subtotal)}</td>
                    </tr>
                    <tr>
                      <td colspan="3" className="text-right">Discount:</td>
                      <td className='font-bold'> {code.invoice && code.invoice.currency.lecurrency && code.invoice.currency.lecurrency} {code.invoice.discount ? code.invoice.discount : "0,00"}</td>
                    </tr>
                    <tr>
                      <td colspan="3" className="text-right">Total:</td>
                      <td className='font-bold'> {code.invoice && code.invoice.currency.lecurrency && code.invoice.currency.lecurrency} {code.invoice.total && separator(code.invoice.total)}</td>
                    </tr>
                    {code.invoice &&
                        code.timepayment.map((timep, index) => (
                            <tr>
                                <td colspan="3" className="text-right"> Amount Paid {index + 1}:<span className='ml-3 text-sm'>( {timep.date} -- {timep.details && timep.details} )</span></td>
                                <td className='font-bold flex justify-center items-center'>
                                {code.invoice && code.invoice.currency.lecurrency && code.invoice.currency.lecurrency} {separator(timep.amount)}
                                </td>
                            </tr>
                        ))
                    }
                   
                  <tr>
                    <td colspan="3" className="text-right">Balance:</td>
                    <td className='font-bold flex justify-center items-center'>
                    {code.invoice && code.invoice.currency.lecurrency} {code.invoice && separator(code.balance)}
                    </td>
                  </tr>
                   
                  
                  </tbody>
                                </table> }
                                    </div>











                                </div>
                                {/* End of about section */}


        </Box>
      </Modal>
         
            <div>
                <div className='m-5'>
                    <p className='text-2xl font-bold'>Student Payment</p>
                </div>
                <div className='shadow-lg flex h-20 w-full flex-row bg-white border border-gray-300 rounded'>
                    <div className='bg-blue-400 w-40 flex items-center justify-center text-3xl font-semibold text-center text-white'>{count}</div>
                    <div className='   w-50 flex items-center justify-center'>
                        <div className='text-2xl text-gray-900'>Student's name</div>
                        <div class="flex items-center px-8 mt-2 max-w-md mx-auto bg-white rounded " x-data="{ search: '' }">
                            <div class="w-full">
                                <input type="search" class="w-full border-gray-200 border-2 h-8 px-4 py-1 text-gray-800 bg-gray focus:outline-none"
                                    placeholder="search" x-model="search" 
                                    // onChange={(e) => setSearch(e.target.value)}
                                    // onKeyUpCapture={getStudentsByName}
                                />
                            </div>
                            <div>
                                <button /* onClick={getStudentsByName}  */class="flex items-center bg-blue-500 justify-center w-8 h-8 text-white rounded-r-lg"
                                >
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='flex mt-2 ml-[50] items-center justify-center'>

                        <NavLink to="/addstudentpayment">
                            <a>
                                <button className='bg-blue-600 rounded text-gray-100 font-medium w-32 h-10 flex items-center justify-center' type="submit" name='Add'>
                                    Add<TiUserAdd className='text-2xl   ' />
                                </button>
                            </a>
                        </NavLink>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <div className="max-w-screen max-h-screen  flex font-sans overflow-hidden">
                        <div className="w-full">
                            <div className="bg-white shadow-md rounded my-6">
                                <table className="min-w-max w-full ">
                                    <thead>
                                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                            <th className="py-3 px-3 text-center">Student ID</th>
                                            <th className="py-3 px-3 text-center">Surname</th>
                                            <th className="py-3 px-3 text-center">First name</th>
                                            <th className="py-3 px-3 text-center">Total</th>
                                            <th className="py-3 px-3 text-center">First Payment</th>
                                            <th className="py-3 px-3 text-center">Second Payment</th>
                                            <th className="py-3 px-3 text-center">Balance</th>
                                            <th className="py-3 px-3 text-center">Payment Method</th>
                                            <th className="py-3 px-3 text-center">Date of Payment</th>
                                            <th className="py-3 px-3 text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-600  text-sm font-light">

                                        {payments && 
                                            payments.map((pay, index) => (
                                                <tr key={pay.uuid} className="border-b border-gray-200  hover:bg-gray-100">
                                                    <td className=" py-3 px-3 text-center whitespace-nowrap">
                                                        <div className="flex items-center justify-center">
                                                            <span className="font-medium text-center">{pay.student.studentid}</span>
                                                        </div>
                                                    </td>
                                                    <td className=" py-3 px-3 text-center">
                                                        <div className="flex items-center justify-center">
                                                            {pay.student.idscang && <div className="mr-2">
                                                                <img className="w-6 h-6 rounded-full" src={pay.student.idscang} />
                                                            </div>}
                                                            <span className="font-medium uppercase">{pay.student.surnameg}</span>

                                                        </div>
                                                    </td>
                                                    <td className=" py-3 px-3 text-center whitespace-nowrap">
                                                        <div className="flex items-center justify-center">
                                                            <span className="font-medium text-center">{pay.student.forenamesg}</span>
                                                        </div>
                                                    </td>
                                                    <td className=" py-3 px-3 text-center">
                                                        <div className="flex items-center justify-center">
                                                            <span className={`font-medium rounded-lg p-1 text-white ${pay.balance == 0 ? " bg-green-600" : " bg-red"}`}>{pay.invoice.currency.lecurrency} {separator(pay.total)}</span>
                                                        </div>
                                                    </td>
                                                   
                                                    <td className=" py-3 px-3 text-center">
                                                        <div className="flex items-center justify-center">
                                                            <span className={`font-medium rounded-lg p-1 text-white ${pay.balance == 0 ? " bg-green-600" : " bg-red"}`}>{pay.invoice.currency.lecurrency} {separator(pay.first)}</span>
                                                        </div>
                                                    </td>
                                                    <td className=" py-3 px-3 text-center">
                                                        <div className="flex items-center justify-center">
                                                        {pay.second &&  <span className={`font-medium rounded-lg p-1 text-white ${pay.balance == 0 ? " bg-green-600" : " bg-red"}`}>{pay.invoice.currency.lecurrency} {separator(pay.second)}</span>}
                                                        </div>
                                                    </td>
                                                    <td className=" py-3 px-3 text-center">
                                                        <div className="flex items-center justify-center">
                                                            <span className={`font-medium rounded-lg p-1 text-white ${pay.balance == 0 ? " bg-green-600" : " bg-red"}`}>{pay.invoice.currency.lecurrency} {separator(pay.balance)}</span>
                                                        </div>
                                                    </td>
                                                    <td className=" py-3 px-3 text-center">
                                                        <div className="flex items-center justify-center">
                                                            <span className="font-medium">{pay.paymentmethod.paymentname}</span>
                                                        </div>
                                                    </td>
                                                    <td className=" py-3 px-3 text-center">
                                                        <div className="flex items-center justify-center">
                                                            <span className="font-medium">{Moment(pay.updatedAt).format('YYYY-MM-DD HH:mm:ss')}</span>
                                                        </div>
                                                    </td>
                                                    <td className=" py-3 px-3 text-center">
                                                        <div className="flex item-center justify-center">
                                                            
                                                            
                                                            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                                                            
                                                            onClick={() =>{ handleOpen(pay)}}
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                                </svg>
                                                            </div>
                                                      
                                                            { pay.balance !== 0 && pay.status !== 1 ? <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                                <NavLink to={`/editpayment/${pay.uuid}`}>
                                                                    <a>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                                        </svg>
                                                                    </a>
                                                                </NavLink>
                                                            </div>
                                                            
                                                          :

                                                          <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                                                            onClick={() => handleOpen1a(pay.uuid)}
                                                          >
                                                                <div>
                                                                    <a>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                                        </svg>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                          
                                                          }
                                                             <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                                                                 onClick={() => handleOpen1(pay.uuid)}
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                            </div> 

                                                            { pay.status == 2 && <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                                                                 onClick={() => handleOpen2(pay.uuid)}
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
                                                                </svg>

                                                            </div> }
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        }






                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default StudentPayment