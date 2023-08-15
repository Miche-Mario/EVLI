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
const OtherFee = () => {


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





  const [otherfees, setOtherFees] = useState([]);

  const getOtherFee = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/otherfee`);
    setOtherFees(response.data)
  }

  const [registrationfee, setRegistrationFee] = useState([]);
  const [registrationname, setRegistrationname] = useState();
  const [registrationprice, setRegistrationprice] = useState()
  const [regisfee, setRegisfee] = useState()


  const getRegistrationFee = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/registration`);
    setRegistrationFee(response.data)
    setRegistrationname(response.data[0].registrationname)
    setRegistrationprice(response.data[0].registrationprice)
    setRegisfee(response.data[0].id)
  }
  const saveRegistrationfee = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/registration`, {
        registrationname: registrationname,
        registrationprice: registrationprice,
      });
      navigate(0);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  }
  const updateRegistrationfee = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${process.env.REACT_APP_BASE_URL}/registration/${regisfee}`, {
        registrationname: registrationname,
        registrationprice: registrationprice
      });
      navigate(0);
    } catch (error) {
      if(error.response) {
        setMsg(error.response.data.msg);
      }
    }
  }

  const deleteOtherFee = async (userId) => {
    await axios.delete(`${process.env.REACT_APP_BASE_URL}/otherfee/${userId}`);
    getOtherFee();
    navigate(0);
  }


  const [feename, setFeeName] = useState("");
  const [feeprice, setFeePrice] = useState("");
  const [description, setDescription] = useState("");

  const [msg, setMsg] = useState("");
  const saveOtherFee = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/otherfee`, {
        feename: feename,
        feeprice: feeprice,
        description: description
      });
      navigate(0);
      console.log("well")
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  }

  useEffect(() => {
    getOtherFee();
    saveOtherFee();
    getRegistrationFee();
  }, [])

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [open1, setOpen1] = useState(false);
  const [va, setVa] = useState("");

  const handleOpen1 = (uuid) => {
    setOpen1(true);
    setVa(uuid)
  };
  const handleClose1 = () => {
    setOpen1(false);
  };
  console.log()
  return (
    <Layout >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <p class="text-white text-xl p-3  bg-dark-purple w-full">OTHER FEE DETAILS</p>
          <form onSubmit={saveOtherFee}>
            <div className='flex flex-row m-3 justify-around items-center'>
              <div className=''>
                <label for="languagename" class="block mb-6 text-base font-medium text-gray-900 p-1">Name</label>
                <label for="languagename" class="block mb-6 text-base font-medium text-gray-900 p-1">Price</label>
                <label for="languagename" class="block mb-6 text-base font-medium text-gray-900 p-1">Description</label>
              </div>
              <div >
                <input type="text" id="languagename" class="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-1.5 "
                  placeholder="name"
                  value={feename}
                  onChange={(e) => setFeeName(e.target.value)}
                />
                <input type="text" id="languagename" class="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-1.5 "
                  placeholder="00"
                  value={feeprice}
                  onChange={(e) => setFeePrice(e.target.value)}
                />
                <input type="text" id="languagename" class="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-1.5 "
                  placeholder=""
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div >
              </div>
            </div>

            <p className='text-sm text-center text-red'>{msg}</p>
            <div className='flex flex-row justify-around  mt-3 mb-3'>
              <button className='bg-blue-600 rounded text-gray-100 font-medium w-20 h-10 flex items-center justify-center' type="submit">
                Save
              </button>
              <button onClick={handleClose} className='bg-blue-600 rounded text-gray-100 font-medium w-20 h-10 flex items-center justify-center'>
                Cancel
              </button>
            </div>
          </form>
        </Box>


      </Modal>


      <Modal
        open={open1}
        onClose={handleClose1}
      >
        <Box sx={style}>
          <div className='items-center p-3 '>
            <div className='text-center text-xl font-medium'>Would you really delete ?</div>
            <div className='flex items-center justify-center mt-3 mb-3'>
              <button className='bg-blue-600 rounded text-gray-100 ml-5 font-medium w-20 h-10 flex items-center justify-center'
                onClick={() => deleteOtherFee(va)}
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


      <div className='m-3'>
      <div className='mt-6'>
            <form onSubmit={updateRegistrationfee}>
              <div className='flex flex-row items-center p-3 bg-dark-purple w-7/12 rounded-xl shadow-lg'>
              <p class=" bg-white w-40 p-1 text-dark-purple rounded-lg  shadow-lg font-bold">REGISTRATION FEE</p>

                <p className=' ml-3 font-medium text-white'>Description:</p>
                <input className='ml-2 border p-1 w-32 rounded-lg border-gray-500' type="text" placeholder='Registration fee' 
                  value={registrationname}
                  onChange={(e) => setRegistrationname(e.target.value)}
                />
                <p className=' ml-4 font-medium text-white'>Fee:</p>
                <input className='ml-2 p-1 border w-32 rounded-lg text-right border-dark-purple' type="text" placeholder='00' 
                  value={registrationprice}
                  onChange={(e) => setRegistrationprice(e.target.value)}
                />
                <button className='ml-6 bg-blue-600 rounded text-gray-100 font-medium w-20 h-10 flex items-center justify-center' type="submit">
                  {registrationfee.length >1 ? "Update" :  "Save"}
              </button>
              </div>
            </form>
          </div>
        <div>
          <legend className='p-1 ml-3 text-xl text-blue-700'>Other Fees</legend>
          <div className='flex'>
            <button onClick={handleOpen} className='bg-blue-600 rounded ml-3 text-gray-100 font-medium w-48 h-10 p-3 flex items-center justify-center' type="submit" name='Add'>
              Add
            </button>
          </div>
          <div className='m-3 mb-0 '>
            <table className="w-[40rem]">
              <thead>
                <tr className=" border border-dark-purple bg-gray-200  text-gray-600 uppercase text-sm leading-normal">
                  <th className=" border border-dark-purple py-3 px-3 text-center">N</th>
                  <th className=" border border-dark-purple py-3 px-3 text-center">Name</th>
                  <th className=" border border-dark-purple py-3 px-3 text-center">Price</th>
                  <th className=" border border-dark-purple py-3 px-3 text-center">Description</th>
                  <th className=" border border-dark-purple py-3 px-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-600  text-sm font-light">
                {otherfees.map((fee, index) => (
                  <tr key={fee.uuid} className=" border-gray-400  hover:bg-gray-100 border-b-2">
                    <td className="p-0  border border-dark-purple">
                      <div className="flex items-center justify-center">
                        <span className="font-medium uppercase">{index + 1}</span>
                      </div>
                    </td>
                    <td className=" py-3 px-3 text-center  border border-dark-purple">
                      <div className="flex items-center justify-center">
                        <span className="font-medium uppercase">{fee.feename}</span>
                      </div>
                    </td>
                    <td className=" py-3 px-3 text-center  border border-dark-purple">
                      <div className="flex items-center justify-center">
                        <span className="font-medium uppercase">{fee.feeprice}</span>
                      </div>
                    </td>
                    <td className=" py-3 px-3 text-center  border border-dark-purple">
                      <div className="flex items-center justify-center">
                        <span className="font-medium uppercase">{fee.description}</span>
                      </div>
                    </td>
                    <td className=" py-3 px-3 text-center  border border-dark-purple">
                      <div className="flex item-center justify-center">
                        <div>
                          <Link
                            to={`/otherfee/edit/${fee.uuid}`}
                          >
                            <button className='flex items-center p-1 bg-green-600 text-white text-[1rem]'>
                              <BiEdit />Edit
                            </button>
                          </Link>

                        </div>
                        <div className='ml-3'>

                          <button
                            className='flex items-center p-1 bg-red text-white text-[1rem]'
                            onClick={() => handleOpen1(fee.uuid)}
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
         
        </div>
      </div>















    </Layout>
  )
}

export default OtherFee