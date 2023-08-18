import { Checkbox } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Layout from '../components/Screens/Layout'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { getMe } from '../features/auth/authSlice'
import { BiEdit } from 'react-icons/bi'
import { MdDeleteSweep } from 'react-icons/md'
import axios from "axios"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 500,
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid darkblue',
    boxShadow: 24,
    p: 0,
    m: 0,
    height: 'auto'
  };

const Options = () => {

    
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch])

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
    if (user && user.role !== "admin") {
      navigate("/dashboard");
    }
  }, [isError, user, navigate]);
  const [msg, setMsg] = useState("");

  ////////////////////////  CURRENCY  ///////////////////////////////////////////////////////////////////////
  const [currency, setCurrency] = useState([]);

  const getCurrency = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/currency`);
    setCurrency(response.data)
  }

  
  const deleteCurency = async (userId) => {
    await axios.delete(`${process.env.REACT_APP_BASE_URL}/currency/${userId}`);
    getCurrency();
    navigate(0);
  }

  const [currencyname, setCurrencyname] = useState("");
  const [currencysymbol, setCurrencysymbol] = useState("");
  const [currencyvalue, setCurrencyvalue] = useState("");


  const saveCurrency = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/currency`, {
        name: currencyname,
        symbol: currencysymbol,
        value: currencyvalue
      });
      navigate(0);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  }

  useEffect(() => {
    getCurrency();
  }, [])

  const [openCu, setOpenCu] = useState(false);
  const handleOpenCu = () => {
    setOpenCu(true);
  };
  const handleCloseCu = () => {
    setOpenCu(false);
  };

  const [open1Cu, setOpen1Cu] = useState(false);
  const [vaCu, setVaCu] = useState("");

  const handleOpen1Cu = (uuid) => {
    setOpen1Cu(true);
    setVaCu(uuid)
  };
  const handleClose1Cu = () => {
    setOpen1Cu(false);
  };


  

////////////////////////  ABOUT  ///////////////////////////////////////////////////////////////////////

const [abouts, setAbouts] = useState([]);

const getAbouts = async () => {
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/abouts`);
  setAbouts(response.data)
}


const deleteAbout = async (userId) => {
  await axios.delete(`${process.env.REACT_APP_BASE_URL}/about/${userId}`);
  getAbouts();
  navigate(0);
}

const [aboutname, setAboutname] = useState("");



const saveAbout = async (e) => {
  e.preventDefault();
  try {
    await axios.post(`${process.env.REACT_APP_BASE_URL}/about`, {
      aboutname: aboutname,
    });
    navigate(0);
  } catch (error) {
    if (error.response) {
      setMsg(error.response.data.msg);
    }
  }
}

useEffect(() => {
  getAbouts();
}, [])

const [openAb, setOpenAb] = useState(false);
const handleOpenAb = () => {
  setOpenAb(true);
};
const handleCloseAb = () => {
  setOpenAb(false);
};

const [open1Ab, setOpen1Ab] = useState(false);
const [vaAb, setVaAb] = useState("");

const handleOpen1Ab = (uuid) => {
  setOpen1Ab(true);
  setVaAb(uuid)
};
const handleClose1Ab = () => {
  setOpen1Ab(false);
};
///////////////////////////////////////////////////////////


  ////////////////////////  CURRENCY  ///////////////////////////////////////////////////////////////////////
  const [paymentstatus, setPaymentStatus] = useState([]);

  const getPaymentStatus = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/paymentstatuss`);
    setPaymentStatus(response.data)
  }

  
  const deletePaymentStatus = async (userId) => {
    await axios.delete(`${process.env.REACT_APP_BASE_URL}/paymentstatus/${userId}`);
    getPaymentStatus();
    navigate(0);
  }

  const [status, setStatus] = useState("");



  const savePaymentStatus = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/paymentstatus`, {
        status: status,
       
      });
      navigate(0);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  }

  useEffect(() => {
    getPaymentStatus();
  }, [])
const [openAbb, setOpenAbb] = useState(false);
const handleOpenAbb = () => {
  setOpenAbb(true);
};
const handleCloseAbb = () => {
  setOpenAbb(false);
};

const [open1Abb, setOpen1Abb] = useState(false);
const [vaAbb, setVaAbb] = useState("");

const handleOpen1Abb = (uuid) => {
  setOpen1Abb(true);
  setVaAbb(uuid)
};
const handleClose1Abb = () => {
  setOpen1Abb(false);
};


  return (
    
    <Layout>




<Modal
        open={openCu}
        onClose={handleCloseCu}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <p class="text-white text-xl p-3  bg-dark-purple w-full">CURRENCY DETAILS</p>
          <form onSubmit={saveCurrency}>
            <div className='flex flex-row m-3 justify-around items-center'>
              <div className=''>
                <label for="languagename" class="block mb-6 text-base font-medium text-gray-900 p-1">Currency Name</label>
                <label for="languagename" class="block mb-6 text-base font-medium text-gray-900 p-1">Currency Symbol</label>
                <label for="languagename" class="block mb-6 text-base font-medium text-gray-900 p-1">Currency Value</label>              
              </div>
              <div >
              <input type="text" id="languagename" class="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-1.5 " 
                placeholder="name" 
                value={currencyname}
                onChange={(e) => setCurrencyname(e.target.value)}  
              />
              <input type="text" id="languagename" class="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-1.5 " 
         
                value={currencysymbol}
                onChange={(e) => setCurrencysymbol(e.target.value)}  
              />
              <input type="text" id="languagename" class="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-1.5 " 
                placeholder="1%" 
                value={currencyvalue}
                onChange={(e) => setCurrencyvalue(e.target.value)}  
              />

              </div>
            </div>
            <p className='text-sm text-center text-red'>{msg}</p>
            <div className='flex flex-row justify-around  mt-3 mb-3'>
              <button className='bg-blue-600 rounded text-gray-100 font-medium w-20 h-10 flex items-center justify-center' type="submit">
                Save
              </button>
              <button onClick={handleCloseCu} className='bg-blue-600 rounded text-gray-100 font-medium w-20 h-10 flex items-center justify-center'>
                Cancel
              </button>
            </div>
          </form>
        </Box>


      </Modal>

      
      <Modal
        open={open1Cu}
        onClose={handleClose1Cu}
      >
        <Box sx={style}>
          <div className='items-center p-3 '>
            <div className='text-center text-xl font-medium'>Would you really delete ?</div>
            <div className='flex items-center justify-center mt-3 mb-3'>
              <button className='bg-blue-600 rounded text-gray-100 ml-5 font-medium w-20 h-10 flex items-center justify-center'
                onClick={() => deleteCurency(vaCu)}
              >
                Delete
              </button>
              <button onClick={handleClose1Cu} className='bg-blue-600 rounded ml-5 text-gray-100 font-medium w-20 h-10 flex items-center justify-center'>
                Cancel
              </button>
            </div>
          </div>

        </Box>
      </Modal>
      <div className='w-5/12 h-4/12 ml-3 shadow-xl p-3'>
        <div className='m-3'>
        <div>
          <legend className='p-1 ml-3 text-xl text-blue-700'>Currencies</legend>
            <div className='flex'>
            <button onClick={handleOpenCu} className='bg-blue-600 rounded ml-3 text-gray-100 font-medium w-48 h-10 p-3 flex items-center justify-center' type="submit" name='Add'>
              Add
            </button>
          </div>
          <div className='m-3 mb-0 '>
            <table className="w-[40rem]">
              <thead>
                <tr className=" border border-dark-purple bg-gray-200  text-gray-600 uppercase text-sm leading-normal">
                  <th className=" border border-dark-purple py-3 px-3 text-center">N</th>
                  <th className=" border border-dark-purple py-3 px-3 text-center">Name</th>
                  <th className=" border border-dark-purple py-3 px-3 text-center">Symbol</th>
                  <th className=" border border-dark-purple py-3 px-3 text-center">Value</th>
                  <th className=" border border-dark-purple py-3 px-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-600  text-sm font-light">
                {currency.map((currency, index) => ( 
                <tr key={currency.uuid} className=" border-gray-400  hover:bg-gray-100 border-b-2">
                  <td className="p-0  border border-dark-purple">
                    <div className="flex items-center justify-center">
                      <span className="font-medium uppercase">{index + 1}</span>
                    </div>
                  </td>
                  <td className=" py-3 px-3 text-center  border border-dark-purple">
                    <div className="flex items-center justify-center">
                      <span className="font-medium uppercase">{currency.name}</span>
                    </div>
                  </td>
                  <td className=" py-3 px-3 text-center  border border-dark-purple">
                    <div className="flex items-center justify-center">
                      <span className="font-medium uppercase">{currency.symbol}</span>
                    </div>
                  </td>
                  <td className=" py-3 px-3 text-center  border border-dark-purple">
                    <div className="flex items-center justify-center">
                      <span className="font-medium uppercase">{currency.value}</span>
                    </div>
                  </td>
                  <td className=" py-3 px-3 text-center  border border-dark-purple">
                  <div className="flex item-center justify-center">
                          <div>
                            <Link
                               to={`/currency/edit/${currency.uuid}`}
                            >
                              <button className='flex items-center p-1 bg-green-600 text-white text-[1rem]'>
                                <BiEdit />Edit
                              </button>
                            </Link>

                          </div>
                          <div className='ml-3'>

                            <button
                              className='flex items-center p-1 bg-red text-white text-[1rem]'
                                onClick={() => handleOpen1Cu(currency.uuid)}
                            >
                              <MdDeleteSweep size={20} />Delete
                            </button>
                          </div>
                        </div>
                  </td>
                </tr>))}
              </tbody>
            </table>
          </div>
          <div className='m-6 flex justify-end'>       
          </div>
        </div>
      </div>
        </div>
{/*         //////////////////////////////////////////////////////////////////////////////////////////////////////*/} 









<Modal
        open={openAb}
        onClose={handleCloseAb}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <p class="text-white text-xl p-3  bg-dark-purple w-full">SURVEY DETAILS</p>
          <form onSubmit={saveAbout}>
            <div className='flex flex-row m-3 justify-around items-center'>
              <div className=''>
                <label for="languagename" class="block mb-6 text-base font-medium text-gray-900 p-1">Survey Title</label>           
              </div>
              <div >
              <input type="text" id="languagename" class="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-1.5 " 
                placeholder="name" 
                value={aboutname}
                onChange={(e) => setAboutname(e.target.value)}  
              />
             

              </div>
            </div>
            <p className='text-sm text-center text-red'>{msg}</p>
            <div className='flex flex-row justify-around  mt-3 mb-3'>
              <button className='bg-blue-600 rounded text-gray-100 font-medium w-20 h-10 flex items-center justify-center' type="submit">
                Save
              </button>
              <button onClick={handleCloseAb} className='bg-blue-600 rounded text-gray-100 font-medium w-20 h-10 flex items-center justify-center'>
                Cancel
              </button>
            </div>
          </form>
        </Box>


      </Modal>

      
      <Modal
        open={open1Ab}
        onClose={handleClose1Ab}
      >
        <Box sx={style}>
          <div className='items-center p-3 '>
            <div className='text-center text-xl font-medium'>Would you really delete ?</div>
            <div className='flex items-center justify-center mt-3 mb-3'>
              <button className='bg-blue-600 rounded text-gray-100 ml-5 font-medium w-20 h-10 flex items-center justify-center'
                onClick={() => deleteAbout(vaAb)}
              >
                Delete
              </button>
              <button onClick={handleClose1Ab} className='bg-blue-600 rounded ml-5 text-gray-100 font-medium w-20 h-10 flex items-center justify-center'>
                Cancel
              </button>
            </div>
          </div>

        </Box>
      </Modal>
      <div className='w-5/12 h-4/12 ml-3 shadow-xl p-3'>
        <div className='m-3'>
        <div>
          <legend className='p-1 ml-3 text-xl text-blue-700'>Survey</legend>
            <div className='flex'>
            <button onClick={handleOpenAb} className='bg-blue-600 rounded ml-3 text-gray-100 font-medium w-48 h-10 p-3 flex items-center justify-center' type="submit" name='Add'>
              Add
            </button>
          </div>
          <div className='m-3 mb-0 '>
            <table className="w-[40rem]">
              <thead>
                <tr className=" border border-dark-purple bg-gray-200  text-gray-600 uppercase text-sm leading-normal">
                  <th className=" border border-dark-purple py-3 px-3 text-center">N</th>
                  <th className=" border border-dark-purple py-3 px-3 text-center">Survey name</th>
                  <th className=" border border-dark-purple py-3 px-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-600  text-sm font-light">
                {abouts.map((about, index) => ( 
                <tr key={currency.uuid} className=" border-gray-400  hover:bg-gray-100 border-b-2">
                  <td className="p-0  border border-dark-purple">
                    <div className="flex items-center justify-center">
                      <span className="font-medium uppercase">{index + 1}</span>
                    </div>
                  </td>
                  <td className=" py-3 px-3 text-center  border border-dark-purple">
                    <div className="flex items-center justify-center">
                      <span className="font-medium uppercase">{about.aboutname}</span>
                    </div>
                  </td>
                  
                  <td className=" py-3 px-3 text-center  border border-dark-purple">
                  <div className="flex item-center justify-center">
                          <div>
                            <Link
                               to={`/survey/edit/${about.uuid}`}
                            >
                              <button className='flex items-center p-1 bg-green-600 text-white text-[1rem]'>
                                <BiEdit />Edit
                              </button>
                            </Link>

                          </div>
                          <div className='ml-3'>

                            <button
                              className='flex items-center p-1 bg-red text-white text-[1rem]'
                                onClick={() => handleOpen1Ab(about.uuid)}
                            >
                              <MdDeleteSweep size={20} />Delete
                            </button>
                          </div>
                        </div>
                  </td>
                </tr>))}
              </tbody>
            </table>
          </div>
          <div className='m-6 flex justify-end'>       
          </div>
        </div>
      </div>
        </div>

















  {/* //  ////////////////////////////////////////////////ABOUT MODAL/////////////////////////////////////////////////////////////////////// */}
   <Modal
        open={openAbb}
        onClose={handleCloseAbb}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <p class="text-white text-xl p-3  bg-dark-purple w-full">Payment Status</p>
          <form onSubmit={savePaymentStatus}>
            <div className='flex flex-row m-3 justify-around items-center'>
              <div className=''>
                <label for="languagename" class="block mb-6 text-base font-medium text-gray-900 p-1">Status</label>           
              </div>
              <div >
              <input type="text" id="languagename" class="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-1.5 " 
                placeholder="name" 
                value={status}
                onChange={(e) => setStatus(e.target.value)}  
              />
             
              </div>
            </div>
            <p className='text-sm text-center text-red'>{msg}</p>
            <div className='flex flex-row justify-around  mt-3 mb-3'>
              <button className='bg-blue-600 rounded text-gray-100 font-medium w-20 h-10 flex items-center justify-center' type="submit">
                Save
              </button>
              <button onClick={handleCloseAbb} className='bg-blue-600 rounded text-gray-100 font-medium w-20 h-10 flex items-center justify-center'>
                Cancel
              </button>
            </div>
          </form>
        </Box>


      </Modal>

      
      <Modal
        open={open1Abb}
        onClose={handleClose1Abb}
      >
        <Box sx={style}>
          <div className='items-center p-3 '>
            <div className='text-center text-xl font-medium'>Would you really delete ?</div>
            <div className='flex items-center justify-center mt-3 mb-3'>
              <button className='bg-blue-600 rounded text-gray-100 ml-5 font-medium w-20 h-10 flex items-center justify-center'
                onClick={() => deletePaymentStatus(vaAbb)}
              >
                Delete
              </button>
              <button onClick={handleClose1Abb} className='bg-blue-600 rounded ml-5 text-gray-100 font-medium w-20 h-10 flex items-center justify-center'>
                Cancel
              </button>
            </div>
          </div>

        </Box>
      </Modal>
      <div className='w-5/12 h-4/12 ml-3 shadow-xl p-3'>
        <div className='m-3'>
        <div>
          <legend className='p-1 ml-3 text-xl text-blue-700'>Payment Status</legend>
            <div className='flex'>
            <button onClick={handleOpenAbb} className='bg-blue-600 rounded ml-3 text-gray-100 font-medium w-48 h-10 p-3 flex items-center justify-center' type="submit" name='Add'>
              Add
            </button>
          </div>
          <div className='m-3 mb-0 '>
            <table className="w-[40rem]">
              <thead>
                <tr className=" border border-dark-purple bg-gray-200  text-gray-600 uppercase text-sm leading-normal">
                  <th className=" border border-dark-purple py-3 px-3 text-center">N</th>
                  <th className=" border border-dark-purple py-3 px-3 text-center">Status</th>
                  <th className=" border border-dark-purple py-3 px-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-600  text-sm font-light">
                {paymentstatus.map((status, index) => ( 
                <tr key={status.uuid} className=" border-gray-400  hover:bg-gray-100 border-b-2">
                  <td className="p-0  border border-dark-purple">
                    <div className="flex items-center justify-center">
                      <span className="font-medium uppercase">{index + 1}</span>
                    </div>
                  </td>
                  <td className=" py-3 px-3 text-center  border border-dark-purple">
                    <div className="flex items-center justify-center">
                      <span className="font-medium uppercase">{status.status}</span>
                    </div>
                  </td>
                  
                  <td className=" py-3 px-3 text-center  border border-dark-purple">
                  <div className="flex item-center justify-center">
                          <div>
                            <Link
                               to={`/paymentstatus/edit/${status.uuid}`}
                            >
                              <button className='flex items-center p-1 bg-green-600 text-white text-[1rem]'>
                                <BiEdit />Edit
                              </button>
                            </Link>

                          </div>
                          <div className='ml-3'>

                            <button
                              className='flex items-center p-1 bg-red text-white text-[1rem]'
                                onClick={() => handleOpen1Abb(status.uuid)}
                            >
                              <MdDeleteSweep size={20} />Delete
                            </button>
                          </div>
                        </div>
                  </td>
                </tr>))}
              </tbody>
            </table>
          </div>
          <div className='m-6 flex justify-end'>       
          </div>
        </div>
      </div>
        </div>
        
    </Layout>
  )
}

export default Options