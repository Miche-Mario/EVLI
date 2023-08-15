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
const StudentsDiscounts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch])

  useEffect(() => {
    if(isError) {
      navigate("/")
    }
  }, [isError, navigate
  ])

  const [msg, setMsg] = useState("");

  const [groupdiscounts, setGroupDiscount] = useState([]);

  const getGroupDiscounts = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/groupdiscount`);
    setGroupDiscount(response.data)
  }

  


  const [groupname, setGroupname] = useState("");
  const [grouppourcentage, setGrouppourcentage] = useState("");


  const saveGroupDiscount = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/groupdiscount`, {
        name: groupname,
        pourcentage: grouppourcentage,
      });
      navigate(0);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  }

  useEffect(() => {
    getGroupDiscounts();
  }, [])

  const [openGd, setOpenGd] = useState(false);
  const handleOpenGd = () => {
    setOpenGd(true);
  };
  const handleCloseGd = () => {
    setOpenGd(false);
  };

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



const [accoDiscounts, setAccoDiscounts] = useState([]);

const getAccoDiscounts = async () => {
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/accodiscount`);
  setAccoDiscounts(response.data)
}



const [accoFrom, setAccoFrom] = useState("");
const [accopourcentage, setAccoPourcentage] = useState("");


const saveAccoDiscount = async (e) => {
  e.preventDefault();
  try {
    await axios.post(`${process.env.REACT_APP_BASE_URL}/accodiscount`, {
      from: accoFrom,
      pourcentage: accopourcentage,
    });
    navigate(0);
  } catch (error) {
    if (error.response) {
      setMsg(error.response.data.msg);
    }
  }
}

useEffect(() => {
  getAccoDiscounts();
}, [])

const [openAcco, setOpenAcco] = useState(false);
const handleOpenAcco = () => {
  setOpenAcco(true);
};
const handleCloseAcco = () => {
  setOpenAcco(false);
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const [studentdiscounts, setStudentDiscounts] = useState([]);

const getStudentDiscount = async () => {
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/discount`);
  setStudentDiscounts(response.data)
}
const [code, setCode] = useState("");
const [pourcentage, setPourcentage] = useState("");


const makeid = (length) => {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}




const saveStudentDiscount = async (e) => {
  e.preventDefault();
  try {
    await axios.post(`${process.env.REACT_APP_BASE_URL}/discount`, {
      code:makeid(5),
      pourcentage: pourcentage,
    });
    navigate(0);
  } catch (error) {
    if (error.response) {
      setMsg(error.response.data.msg);
    }
  }
}

useEffect(() => {
  getStudentDiscount();
}, [])

const [openSd, setOpenSd] = useState(false);
const handleOpenSd = () => {
  setOpenSd(true);
};
const handleCloseSd = () => {
  setOpenSd(false);
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

const deleteDiscount = async (userId) => {
  await axios.delete(`${process.env.REACT_APP_BASE_URL}/discount/${userId}`);
  getStudentDiscount();
  navigate(0);
}
console.log(studentdiscounts)
  return (
    <Layout >
      <Modal
        open={openGd}
        onClose={handleCloseGd}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <p class="text-white text-xl p-3  bg-dark-purple w-full">DISCOUNT GROUP DETAILS</p>
          <form onSubmit={saveGroupDiscount}>
            <div className='flex flex-row m-3 justify-around items-center'>
              <div className=''>
                <label for="first_name" class="block mb-6 text-base font-medium text-gray-900 p-1">Name</label>
                <label for="first_name" class="block mb-6 text-base font-medium text-gray-900 p-1">Value[1%]</label>

              </div>
              <div >
              <input type="text" id="first_name" class="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-1.5 " placeholder="name" 
                value={groupname}
                onChange={(e) => setGroupname(e.target.value)}  
              />
              <input type="tex" id="first_name" class="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-1.5 " placeholder="00" 
                value={grouppourcentage}
                onChange={(e) => setGrouppourcentage(e.target.value)}  
              />

              </div>
            </div>
            <div className='flex flex-row justify-around  mt-3 mb-3'>
              <button className='bg-blue-600 rounded text-gray-100 font-medium w-20 h-10 flex items-center justify-center' type="submit" name='Add'>
                Ok
              </button>
              <button onClick={handleCloseGd} className='bg-blue-600 rounded text-gray-100 font-medium w-20 h-10 flex items-center justify-center' type="submit" name='Add'>
                Cancel
              </button>
            </div>
          </form>
        </Box>


      </Modal>

{/* //////////////////////////////////////////////////////////////////////////STUDENT DISCOUNT MODAL */}

<Modal
        open={openAcco}
        onClose={handleCloseAcco}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <p class="text-white text-xl p-3  bg-dark-purple w-full">Accomodation discount details</p>
          <form onSubmit={saveAccoDiscount}>
            <div className='flex flex-row m-3 justify-around items-center'>
              <div className=''>
                <label for="first_name" class="block mb-6 text-base font-medium text-gray-900 p-1">From</label>
                <label for="first_name" class="block mb-6 text-base font-medium text-gray-900 p-1">Value[1%]</label>

              </div>
              <div >
              <input type="text" id="first_name" class="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-1.5 " placeholder="name" 
                value={accoFrom}
                onChange={(e) => setAccoFrom(e.target.value)}  
              />
              <input type="tex" id="first_name" class="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-1.5 " placeholder="00" 
                value={accopourcentage}
                onChange={(e) => setAccoPourcentage(e.target.value)}  
              />

              </div>
            </div>
            <div className='flex flex-row justify-around  mt-3 mb-3'>
              <button className='bg-blue-600 rounded text-gray-100 font-medium w-20 h-10 flex items-center justify-center' type="submit" name='Add'>
                Ok
              </button>
              <button onClick={handleCloseAcco} className='bg-blue-600 rounded text-gray-100 font-medium w-20 h-10 flex items-center justify-center' type="submit" name='Add'>
                Cancel
              </button>
            </div>
          </form>
        </Box>


      </Modal>

{/* //////////////////////////////////////////////////////////////////////////Acco DISCOUNT MODAL */}

      <Modal
        open={openSd}
        onClose={handleCloseSd}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <p class="text-white text-xl p-3  bg-dark-purple w-full">STUDENT DISCOUNT DETAILS</p>
          <form onSubmit={saveStudentDiscount}>
            <div className='flex flex-row m-3 justify-around items-center'>
              <div className=''>
                <label for="first_name" class="block mb-6 text-base font-medium text-gray-900 p-1">Value[1%]</label>
                

              </div>
              <div >
             
              <input type="tex" id="first_name" class="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-1.5 " placeholder="00" 
                value={pourcentage}
                onChange={(e) => setPourcentage(e.target.value)}  
              />

              </div>
            </div>
            <div className='flex flex-row justify-around  mt-3 mb-3'>
              <button className='bg-blue-600 rounded text-gray-100 font-medium w-20 h-10 flex items-center justify-center' type="submit" name='Add'>
                Ok
              </button>
              <button onClick={handleCloseSd} className='bg-blue-600 rounded text-gray-100 font-medium w-20 h-10 flex items-center justify-center' type="submit" name='Add'>
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
                onClick={() => deleteDiscount(va)}
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




      <div className=' flex flex-col m-3 '>
        <div className='w-8/12 h-4/12 ml-3 shadow-xl p-3'>
        <legend className='p-1 ml-3 text-xl text-blue-700'>DISCOUNT GROUPS</legend>
        
        
        <div >
      <div className='m-3'>
      <div>
          <div className='flex'>
          <button onClick={handleOpenGd} className='bg-blue-600 rounded ml-3 text-gray-100 font-medium w-48 h-10 p-3 flex items-center justify-center' type="submit" name='Add'>
            Add
          </button>
        </div>
        <div className='m-3 mb-0 '>
          <table className="w-[40rem]">
            <thead>
              <tr className=" border border-dark-purple bg-gray-200  text-gray-600 uppercase text-sm leading-normal">
                <th className=" border border-dark-purple py-3 px-3 text-center">N</th>
                <th className=" border border-dark-purple py-3 px-3 text-center">Name</th>
                <th className=" border border-dark-purple py-3 px-3 text-center">Value [1%]</th>
                <th className=" border border-dark-purple py-3 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600  text-sm font-light">
              {groupdiscounts.map((gdis, index) => ( 
              <tr key={gdis.uuid} className=" border-gray-400  hover:bg-gray-100 border-b-2">
                <td className="p-0  border border-dark-purple">
                  <div className="flex items-center justify-center">
                    <span className="font-medium uppercase">{index + 1}</span>
                  </div>
                </td>
                <td className=" py-3 px-3 text-center  border border-dark-purple">
                  <div className="flex items-center justify-center">
                    <span className="font-medium uppercase">{gdis.name}</span>
                  </div>
                </td>
                <td className=" py-3 px-3 text-center  border border-dark-purple">
                  <div className="flex items-center justify-center">
                    <span className="font-medium uppercase">{gdis.pourcentage}</span>
                  </div>
                </td>
               
                <td className=" py-3 px-3 text-center  border border-dark-purple">
                <div className="flex item-center justify-center">
                        <div>
                          <Link
                             to={`/groupdiscount/edit/${gdis.uuid}`}
                          >
                            <button className='flex items-center p-1 bg-green-600 text-white text-[1rem]'>
                              <BiEdit />Edit
                            </button>
                          </Link>

                        </div>
                      {/*   <div className='ml-3'>

                          <button
                            className='flex items-center p-1 bg-red text-white text-[1rem]'
                              onClick={() => handleOpen1Gd(gdis.uuid)}
                          >
                            <MdDeleteSweep size={20} />Delete
                          </button>
                        </div> */}
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
        </div>


        <div className='w-8/12 h-4/12 ml-3 shadow-xl p-3'>
        <legend className='p-1 ml-3 text-xl text-blue-700'>Accommodation discount</legend>
        
        
        <div >
      <div className='m-3'>
      <div>
          <div className='flex'>
          <button onClick={handleOpenAcco} className='bg-blue-600 rounded ml-3 text-gray-100 font-medium w-48 h-10 p-3 flex items-center justify-center' type="submit" name='Add'>
            Add
          </button>
        </div>
        <div className='m-3 mb-0 '>
          <table className="w-[40rem]">
            <thead>
              <tr className=" border border-dark-purple bg-gray-200  text-gray-600 uppercase text-sm leading-normal">
                <th className=" border border-dark-purple py-3 px-3 text-center">N</th>
                <th className=" border border-dark-purple py-3 px-3 text-center">From</th>
                <th className=" border border-dark-purple py-3 px-3 text-center">Rate [1%]</th>
                <th className=" border border-dark-purple py-3 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600  text-sm font-light">
              {accoDiscounts.map((gdis, index) => ( 
              <tr key={gdis.uuid} className=" border-gray-400  hover:bg-gray-100 border-b-2">
                <td className="p-0  border border-dark-purple">
                  <div className="flex items-center justify-center">
                    <span className="font-medium uppercase">{index + 1}</span>
                  </div>
                </td>
                <td className=" py-3 px-3 text-center  border border-dark-purple">
                  <div className="flex items-center justify-center">
                    <span className="font-medium uppercase">{gdis.from}</span>
                  </div>
                </td>
                <td className=" py-3 px-3 text-center  border border-dark-purple">
                  <div className="flex items-center justify-center">
                    <span className="font-medium uppercase">{gdis.pourcentage}</span>
                  </div>
                </td>
               
                <td className=" py-3 px-3 text-center  border border-dark-purple">
                <div className="flex item-center justify-center">
                        <div>
                          <Link
                             to={`/accodiscount/edit/${gdis.uuid}`}
                          >
                            <button className='flex items-center p-1 bg-green-600 text-white text-[1rem]'>
                              <BiEdit />Edit
                            </button>
                          </Link>

                        </div>
                      {/*   <div className='ml-3'>

                          <button
                            className='flex items-center p-1 bg-red text-white text-[1rem]'
                              onClick={() => handleOpen1Gd(gdis.uuid)}
                          >
                            <MdDeleteSweep size={20} />Delete
                          </button>
                        </div> */}
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
        </div>

        <div className='w-8/12 h-4/12 ml-3 shadow-xl p-3'>
        <legend className='p-1 ml-3 text-xl text-blue-700'>STUDENT DISCOUNT</legend>
        
        
        <div >
      <div className='m-3'>
      <div>
          <div className='flex'>
          <button onClick={handleOpenSd} className='bg-blue-600 rounded ml-3 text-gray-100 font-medium w-48 h-10 p-3 flex items-center justify-center' type="submit" name='Add'>
            Add
          </button>
        </div>
        <div className='m-3 mb-0 '>
          <table className="w-[40rem]">
            <thead>
              <tr className=" border border-dark-purple bg-gray-200  text-gray-600 uppercase text-sm leading-normal">
                <th className=" border border-dark-purple py-3 px-3 text-center">N</th>
                <th className=" border border-dark-purple py-3 px-3 text-center">Code</th>
                <th className=" border border-dark-purple py-3 px-3 text-center">Value [1%]</th>
                
                <th className=" border border-dark-purple py-3 px-3 text-center">Student  ID</th>
                <th className=" border border-dark-purple py-3 px-3 text-center">Student Name</th>
                <th className=" border border-dark-purple py-3 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600  text-sm font-light">
              {studentdiscounts.map((dis, index) => ( 
              <tr key={dis.uuid} className=" border-gray-400  hover:bg-gray-100 border-b-2">
                <td className="p-0  border border-dark-purple">
                  <div className="flex items-center justify-center">
                    <span className="font-medium uppercase">{index + 1}</span>
                  </div>
                </td>
                <td className=" py-3 px-3 text-center  border border-dark-purple">
                  <div className="flex items-center justify-center">
                    <span className={`rounded-full p-2 m-1 ${!dis.used  ? "bg-green-500" : "bg-red"}`} ></span>
                    <span className="font-medium uppercase">{dis.code}</span>
                  </div>
                </td>
                <td className=" py-3 px-3 text-center  border border-dark-purple">
                  <div className="flex items-center justify-center">
                    <span className="font-medium uppercase">{dis.pourcentage}</span>
                  </div>
                </td>
                <td className=" py-3 px-3 text-center  border border-dark-purple">
                  <div className="flex items-center justify-center">
                    <span className="font-medium uppercase">{dis.student && dis.student.studentid}</span>
                  </div>
                </td>
                <td className=" py-3 px-3 text-center  border border-dark-purple">
                  <div className="flex items-center justify-center">
                    <span className="font-medium uppercase">{dis.student && dis.student.surnameg}</span>
                  </div>
                </td>
                
                
                <td className=" py-3 px-3 text-center  border border-dark-purple">
                <div className="flex item-center justify-center">
                      {/*   <div>
                          <Link
                             to={`/groupdiscount/edit/${dis.uuid}`}
                          >
                            <button className='flex items-center p-1 bg-green-600 text-white text-[1rem]'>
                              <BiEdit />Edit
                            </button>
                          </Link>

                        </div> */}
                        <div className='ml-3'>

                          <button
                            className='flex items-center p-1 bg-red text-white text-[1rem]'
                              onClick={() => handleOpen1(dis.uuid)}
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
        </div>
        
      
      </div>






















     
    </Layout>
  )
}

export default StudentsDiscounts