import React, { useContext, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StepperContext } from '../../contexts/stepperContext';
import { useDispatch, useSelector } from 'react-redux'

import axios from 'axios';
import './paymentstyle.css';
const AddPaymentStep1 = ({ open, setOpen }) => {
  const [msg, setMsg] = useState("");


  const { user} = useSelector(
    (state) => state.auth
  );

  /////////////////////////////////////////////////////////////GET INVOICE/////////////////////////////////////

  const [invoicedata, setInvoiceData] = useState([])
  const [invoicecode, setInvoicecode] = useState()
  const [invoicedatatrue, setInvoicedatatrue] = useState(false)

  const [prospectdata, setProspectData] = useState([])


  const getInvoiceData = async (e) => {

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/getinvoice`, {
        invoicecode: invoicecode
      });
      response.data && setInvoiceData(response.data)
      response.data.length > 0 ? setInvoicedatatrue(true) : setInvoicedatatrue(false)

      const responsee = await axios.post(`${process.env.REACT_APP_BASE_URL}/prospectbyid`, {
        prospectid: invoicecode
      });
      responsee.data && setProspectData(responsee.data);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
        console.log(msg)
        setInvoicedatatrue(false)
      }
    }
  }
  console.log(prospectdata && prospectdata.prospectid);
  //////////////////////////////////SEND DATA //////////////////////////////

  const { studentData, setStudentData } = useContext(StepperContext)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value })
  }


  useEffect(() => {
    setStudentData({ ...studentData, invoicedata: invoicedata[0], prospectdata: prospectdata })
  }, [invoicedata, prospectdata])
  ////////////////////////////////////////////SAVE STUDENT DATA/////////////////////////////////////////////////////////:

  const [paymentmethodd, setPaymentmethodd] = useState('')
  var currentDate = new Date();

  var month = currentDate.getMonth() + 1;
  if (month < 10) month = "0" + month;
  var dateOfMonth = currentDate.getDate();
  if (dateOfMonth < 10) dateOfMonth = "0" + dateOfMonth;
  var year = currentDate.getFullYear();
  var formattedDate = dateOfMonth + "/" + month + "/" + year + " " + currentDate.toLocaleTimeString();
  console.log(formattedDate);

  const saveStudent = async (e) => {
    e.preventDefault();
    if(paymentmethodd ==="") {
      toast.error("Please insert a payment method")

    } else {
      if ((studentData.firstpayed > invoicedata[0].total) || (studentData.firstpayed < 0)) {
        toast.error("Amount incorrect")
      } else {
  
        try {
          await axios.post(`${process.env.REACT_APP_BASE_URL}/students`, {
            surnameg: studentData.prospectdata.surnameg && studentData.prospectdata.surnameg,
            forenamesg: studentData.prospectdata.forenamesg && studentData.prospectdata.forenamesg,
            genderg: studentData.prospectdata.genderg && studentData.prospectdata.genderg,
            dateofbirthg: studentData.prospectdata.dateofbirthg && studentData.prospectdata.dateofbirthg,
            placeofbirthg: studentData.prospectdata.placeofbirthg && studentData.prospectdata.placeofbirthg,
            citizenshipg: studentData.prospectdata.citizenshipg && studentData.prospectdata.citizenshipg,
            occupationg: studentData.prospectdata.occupationg && studentData.prospectdata.occupationg,
            emailg: studentData.prospectdata.emailg && studentData.prospectdata.emailg,
            telhomeg: studentData.prospectdata.telhomeg && studentData.prospectdata.telhomeg,
            telghanag: studentData.prospectdata.telghanag && studentData.prospectdata.telghanag,
            addresshomeg: studentData.prospectdata.addresshomeg && studentData.prospectdata.addresshomeg,
            addressghanag: studentData.prospectdata.addresshomeg && studentData.prospectdata.addresshomeg,
            maritalg: studentData.prospectdata.maritalg && studentData.prospectdata.maritalg,
            passportidg: studentData.prospectdata.passportidg && studentData.prospectdata.passportidg,
            academicg: studentData.prospectdata.academicg && studentData.prospectdata.academicg,
            noteg: studentData.prospectdata.noteg && studentData.prospectdata.noteg,
            aboutidg: studentData.prospectdata.aboutidg && studentData.prospectdata.aboutidg,
            passportphotographg: studentData.prospectdata.passportphotographg,
            idscang: studentData.prospectdata.idscang && studentData.prospectdata.idscang,
            surnamee: studentData.prospectdata.surnamee && studentData.prospectdata.surnamee,
            forenamese: studentData.prospectdata.forenamese && studentData.prospectdata.forenamese,
            gendere: studentData.prospectdata.gendere && studentData.prospectdata.gendere,
            relationshipe: studentData.prospectdata.relationshipe && studentData.prospectdata.relationshipe,
            occupatione: studentData.prospectdata.occupatione && studentData.prospectdata.occupatione,
            emaile: studentData.prospectdata.emaile && studentData.prospectdata.emaile,
            tel1e: studentData.prospectdata.tel1e && studentData.prospectdata.tel1e,
            tel2e: studentData.prospectdata.tel2e && studentData.prospectdata.tel2e,
            addresse: studentData.prospectdata.addresse && studentData.prospectdata.addresse,
            surnamep: studentData.prospectdata.surnamep && studentData.prospectdata.surnamep,
            forenamesp: studentData.prospectdata.forenamesp && studentData.prospectdata.forenamesp,
            genderp: studentData.prospectdata.genderp && studentData.prospectdata.genderp,
            relationshipp: studentData.prospectdata.relationshipp && studentData.prospectdata.relationshipp,
            occupationp: studentData.prospectdata.occupationp && studentData.prospectdata.occupationp,
            emailp: studentData.prospectdata.emailp && studentData.prospectdata.emailp,
            tel1p: studentData.prospectdata.tel1p && studentData.prospectdata.tel1p,
            tel2p: studentData.prospectdata.tel2p && studentData.prospectdata.tel2p,
            addressp: studentData.prospectdata.addressp && studentData.prospectdata.addressp,
            nameo: studentData.prospectdata.nameo && studentData.prospectdata.nameo,
            addresso: studentData.prospectdata.addresso && studentData.prospectdata.addresso,
            tel1o: studentData.prospectdata.tel1o && studentData.prospectdata.tel1o,
            emailo: studentData.prospectdata.emailo && studentData.prospectdata.emailo,
            contacto: studentData.prospectdata.contacto && studentData.prospectdata.contacto,
            tel2o: studentData.prospectdata.tel2o && studentData.prospectdata.tel2o,
            isstudent: studentData && true,
            about_aboutid: studentData.prospectdata.aboutidg && studentData.prospectdata.aboutidg,
            startdate: studentData.prospectdata.startdate && studentData.prospectdata.startdate,
            enddate: studentData.prospectdata.enddate && studentData.prospectdata.enddate,
            prospectid: invoicecode,
            total: invoicedata && invoicedata[0].total,
            first: studentData.firstpayed !== 0 && studentData.firstpayed,
            balance: invoicedata && invoicedata[0].total === parseInt(studentData.firstpayed) ? 0 : (invoicedata[0].total - studentData.firstpayed),
            invoiceid: invoicedata && invoicedata[0].id,
            code: invoicedata && invoicedata[0].studdiscount.lecode !== "" && invoicedata[0].studdiscount.lecode,
            paymentmethod: paymentmethodd,
            timepayment: [{ date: formattedDate, amount: studentData.firstpayed !== 0 && studentData.firstpayed }],
            courselist: invoicedata && invoicedata[0].courselist,
            user: user.id
          });
          setOpen(true)
          toast.success("Payment Well Saved")
  
        } catch (error) {
          toast.error(error.response.data.msg)
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




  useEffect(() => {
    getPaymentMethods()
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

        <div className=' ml-32 '>
          <div className='flex items-center ml-4 ' >
            <p className={`text-xl font-medium ${invoicedatatrue == true && "text-green-500"}`}>INVOICE ID</p>
            <input type='text' className={`ml-4 w-48 p-2 border ${invoicedatatrue == true && " text-2xl focus:border-green-500 border-green-500"} `}
              value={invoicecode}
              onKeyUpCapture={(e) => { getInvoiceData(e); setInvoicecode(e.target.value) }}
              onChange={(e) => setInvoicecode(e.target.value)}
            />
          </div>
        </div>


        <div>
          <div className="containerr mt-3">

            <div className="body-sectionn">
              {invoicedatatrue && <div className='mt-3'>
                <div className='flex flex-row '>
                  <div className='text-xl font-medium'>Received from:</div>
                  <div className='ml-4 font-bold text-xl uppercase'>{prospectdata && prospectdata.forenamesg} {prospectdata && prospectdata.surnameg}</div>
                </div>
                <p className='ml-[9.5rem] text-lg uppercase'>
                  {invoicedata && invoicedata[0].courselist.length > 0 && invoicedata[0].courselist[0].lesubcoursename}
                  {invoicedata && invoicedata[0].courselist.length > 0 && " ENGLISH PROGRAMS"}
                  {invoicedata && invoicedata[0].courselist.length > 1 && "WITH "}
                  {invoicedata && invoicedata[0].courselist.length > 1 && invoicedata[0].courselist[1].lesubcoursename}
                  {invoicedata && invoicedata[0].courselist.length > 1 && " PREPARATIONS"}
                  {invoicedata && invoicedata[0].courselist.length > 2 && " WITH " + invoicedata[0].courselist[2].laduration + " WEEKS COMPUTER LITERACY"}
                  {invoicedata && invoicedata[0].courselist.length > 0 && " WITH "}
                  {invoicedata && invoicedata[0].examlist.length > 0 && invoicedata[0].examlist[0].lexamname}
                  {invoicedata && invoicedata[0].accolist.length > 0 && " WITH " + invoicedata[0].accolist[0].acotimes + " WEEKS ACCOMODATION"}





                </p>
              </div>}
              <br />
              <form>
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
                      invoicedatatrue && invoicedata[0].registration.length >= 0 && invoicedata[0].registration.map((regis, index) => (
                        <tr key={index * (Math.random() * 3)}>
                          <td>1</td>
                          <td className="ww-32">{regis.registrationname}</td>
                          <td>{regis.lecurrency} {separator(regis.regir)}</td>
                          <td>{regis.lecurrency} {separator(regis.regir)}</td>
                        </tr>
                      ))

                    }

                    {
                      invoicedatatrue && invoicedata[0].courselist.length >= 0 && invoicedata[0].courselist.map((course, index) => (
                        <tr key={index * (Math.random() * 3)}>
                          <td>1</td>
                          <td>{course.coursedescription}</td>
                          <td>{course.lecurrency} {separator(course.price)}</td>
                          <td>{course.lecurrency} {separator(course.price)}</td>
                        </tr>
                      ))

                    }

                    {
                      invoicedatatrue && invoicedata[0].examlist.length >= 0 && invoicedata[0].examlist.map((exam, index) => (
                        <tr key={index * (Math.random() * 3)}>
                          <td>1</td>
                          <td>{exam.examdescription}</td>
                          <td>{exam.lecurrency} {separator(exam.examprice)}</td>
                          <td>{exam.lecurrency} {separator(exam.examprice)}</td>
                        </tr>
                      ))

                    }

                    {
                      invoicedatatrue && invoicedata[0].purchaselist.length >= 0 && invoicedata[0].purchaselist.map((pur, index) => (
                        <tr key={index * (Math.random() * 3)}>
                          <td>1</td>
                          <td>{pur.purchasedescription}</td>
                          <td>{pur.lecurrency} {separator(pur.purchaseprice)}</td>
                          <td>{pur.lecurrency} {separator(pur.purchaseprice)}</td>
                        </tr>
                      ))

                    }
                    {
                      invoicedatatrue && invoicedata[0].accolist.length >= 0 && invoicedata[0].accolist.map((acco, index) => (
                        <tr key={index * (Math.random() * 3)}>
                          <td>{acco.acotimes}</td>
                          <td>{acco.accodescription}</td>
                          <td>{acco.lecurrency} {separator(acco.accoprice)}</td>
                          <td>{acco.lecurrency} {separator(acco.acotimes * acco.accoprice)}</td>
                        </tr>
                      ))

                    }

                    {
                      invoicedatatrue && invoicedata[0].otherlist.length >= 0 && invoicedata[0].otherlist.map((other, index) => (
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
                      <td className='font-bold'> {invoicedatatrue && invoicedata[0].currency.lecurrency} {invoicedatatrue && separator(invoicedata && invoicedata[0].subtotal)}</td>
                    </tr>
                    <tr>
                      <td colspan="3" className="text-right">Discount:</td>
                      <td className='font-bold'> {invoicedatatrue && invoicedata[0].currency.lecurrency} {invoicedatatrue && !invoicedata[0].discount ? invoicedata[0].discount : "0,00"}</td>
                    </tr>
                    <tr>
                      <td colspan="3" className="text-right">Total:</td>
                      <td className='font-bold'> {invoicedatatrue && invoicedata[0].currency.lecurrency} {invoicedatatrue && separator(invoicedata && invoicedata[0].total)}</td>
                    </tr>
                    <tr>
                      <td colspan="3" className="text-right">Amount Paid 1st:</td>
                      <td className='font-bold flex justify-center items-center'>{invoicedatatrue && invoicedata[0].currency.lecurrency}
                        <input type="number" className='p-1 border ml-1 border-red text-red w-28 text-center text-bold'
                          onChange={handleChange}
                          name="firstpayed"
                          value={studentData["firstpayed"] || ""}
                          required
                        />

                      </td>
                    </tr>
                    {/*   <tr>
                    <td colspan="3" className="text-right">Amount Paid 2nd:</td>
                    <td className='font-bold flex justify-center items-center'>{invoicedatatrue && invoicedata[0].currency.lecurrency}
                      <input type="text" className=' p-1 text-red border-red border ml-1 w-28 text-center text-bold' 
                      
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colspan="3" className="text-right">Balance:</td>
                    <td className='font-bold'> {invoicedatatrue && invoicedata[0].currency.lecurrency} 18,500</td>
                  </tr> */}
                  </tbody>
                </table>
                <br />
                <div className='flex flex-row items-center'>
                  <h3 className="heading">Payment Mode:</h3>
                  <select id="countries" className="ml-3 3bg-gray-50 mb-4   text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 p-2.5"
                    required
                    onChange={(e) => setPaymentmethodd(e.target.value)}
                  >
                    <option></option>
                    {paymentmethod.map((pm, index) => (
                      <option value={pm.id}>{pm.paymentname}</option>
                    ))}
                  </select>


                </div>

                <div className='flex flex-row items-center'>
                  <h3 className="heading">Payment Status:</h3>
                  <select id="countries" className="ml-3 3bg-gray-50 mb-4   text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-48 p-2.5"
                    required
                    onChange={(e) => setPaymentmethodd(e.target.value)}
                  >
                    <option></option>
                    {paymentmethod.map((pm, index) => (
                      <option value={pm.id}>{pm.paymentname}</option>
                    ))}
                  </select>


                </div>
                <div className='flex justify-end'>
                  <button

                    onClick={(e) => saveStudent(e)}
                    className=' w-48 bg-blue-400 text-white  uppercase py-2 px-4
                                rounded-xl font-semibold cursor-pointer  
                              hover:bg-blue-600 hover:text-white transition duration-200 ease-in-out '
                  >
                    Save
                  </button>
                </div>

              </form>

            </div>



          </div>
        </div>
      </div>
    </>
  )
}

export default AddPaymentStep1