import { Checkbox } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Layout from '../components/Screens/Layout'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Moment from "moment"


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
const Logs = () => {


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


    const [logs, setLogs] = useState([]);
    const [startDate, setStartDate] = useState("2020-05-22 09:40:49")
    const [endDate, setEndDate] = useState(new Date())
  
    const getLogs = async () => {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/log`, {
        startDate: startDate,
        endDate: endDate,
      });
      setLogs(response.data)
    }
   

    useEffect(() => {
        getLogs();
      }, [])

      const [open1, setOpen1] = useState(false);
      const [va, setVa] = useState("");
    
      const handleOpen1 = (uuid) => {
        setOpen1(true);
        setVa(uuid)
      };
      const handleClose1 = () => {
        setOpen1(false);
      };


      const deleteLog = async (userId) => {
        await axios.delete(`${process.env.REACT_APP_BASE_URL}/log/${userId}`);
        getLogs();
        navigate(0);
      }
    
    
    return (
        <Layout> 
            <Modal
                    open={open1}
                    onClose={handleClose1}
                >
                    <Box sx={style}>
                    <div className='items-center p-3 '>
                        <div className='text-center text-xl font-medium'>Would you really delete ?</div>
                        <div className='flex items-center justify-center mt-3 mb-3'>
                        <button className='bg-blue-600 rounded text-gray-100 ml-5 font-medium w-20 h-10 flex items-center justify-center'
                            onClick={() => deleteLog(va)}
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
            <div className='m-10'>
                <div className=' bg-primary flex p-7 flex-row rounded-xl'>
                    <p className=' font-bold text-2xl text-white'>
                        Logs
                    </p>
                    <div className='flex ml-3 items-start'>
                        <div className=' flex'>
                            <p className='text-xl ml-8 mt-1 text-gray-200'>From date</p>
                            <input type="date"
                                id="first_name" class=" ml-3 bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-50 p-1.5 " placeholder="name"
                                onChange={(e) => { setStartDate(e.target.value); getLogs() }}
                            />
                        </div>
                        <div className=' flex'>
                            <p className='text-xl mt-1 ml-8 text-gray-200'>To date</p>
                            <input
                                type="date"
                                id="first_name"
                                class=" ml-3 bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-50 p-1.5 "
                                placeholder="name"
                                onChange={(e) => { setEndDate(e.target.value); getLogs() }}

                            />
                        </div>
                    </div>
                </div>
                <div className=' bg-gray-300 rounded-xl m-5 p-5'>
                    {
                        logs.map((item, index) => (
                            <div>
                                <div className='flex items-center justify-between mt-5 mb-3'>
                                <div className='flex items-center'>
                                    <p className=' bg-green-600 mr-4 rounded-full p-1'></p>
                                    <p className=' font-bold text-gray-900 mr-5 text-xl italic'>{Moment(item.date).format('YYYY-MM-DD')}:</p>
                                    <p className=' font-bold text-gray-900 mr-5 text-lg'>{item.user.username}</p>
                                    <p className=' font-bold text-green-900 mr-5 text-lg'>{item.info}</p>
                                </div>
                                <div>
                                    <button 
                                        className=' bg-red w-24  h-7 text-center rounded-xl font-semibold text-white'
                                        onClick={() => handleOpen1( item.uuid)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <hr/>
                        </div>
                        ))
                    }
                   
                </div>
                
                   
               
            </div>

        </Layout>
    )
}

export default Logs