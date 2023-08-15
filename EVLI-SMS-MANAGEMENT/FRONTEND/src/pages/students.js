import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Layout from '../components/Screens/Layout'
import { TiUserAdd } from 'react-icons/ti'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios'
import Moment from 'moment'
import { useSelector } from 'react-redux'
import NoData from './NoData';

const Students = () => {

    const { user } = useSelector(
        (state) => state.auth
    );
    const style1 = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 1000,
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid darkblue',
        boxShadow: 24,
        p: 0,
        m: 0,
        height: 'auto'
    };


    const [students, setStudents] = useState([]);
    const [count, setCount] = useState();
    const [search, setSearch] = useState();



    const getStudents = async () => {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/students`);
        setStudents(response.data.rows)
        setCount(response.data.count)
    }

    const getStudentsByName = async (e) => {
        e.preventDefault()
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/studentbyname`, {
            search: search
        });
        setStudents(response.data.rows)
        setCount(response.data.count)
    }
    useEffect(() => {
        getStudents();
    }, [])

    console.log(students)

    const [open, setOpen] = useState(false);
    const [code, setCode] = useState("");

    const handleOpen = (code) => {
        setOpen(true);
        setCode(code)
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Layout>

            <div>
                <div className='shadow-lg flex h-20 w-full flex-row bg-white border border-gray-300 rounded'>
                    <div className='bg-blue-400 w-40 flex items-center justify-center text-3xl font-semibold text-center text-white'>{count}</div>
                    <div className='   w-50 flex items-center justify-center'>
                        <div className='text-2xl text-gray-900'>Student's name</div>
                        <div class="flex items-center px-8 mt-2 max-w-md mx-auto bg-white rounded " x-data="{ search: '' }">
                            <div class="w-full">
                                <input type="search" class="w-full border-gray-200 border-2 h-8 px-4 py-1 text-gray-800 bg-gray focus:outline-none"
                                    placeholder="search" x-model="search"
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyUpCapture={getStudentsByName}
                                />
                            </div>
                            <div>
                                <button onClick={getStudentsByName} class="flex items-center bg-blue-500 justify-center w-8 h-8 text-white rounded-r-lg"
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

                        <NavLink to="/addStudents">
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
                                            <th className="py-3 px-3 text-center">First name </th>
                                            <th className="py-3 px-3 text-center">Date of Birth</th>
                                            <th className="py-3 px-3 text-center">Gender</th>
                                            <th className="py-3 px-3 text-center">Citizenship</th>
                                            <th className="py-3 px-3 text-center">Email</th>
                                            <th className="py-3 px-3 text-center">Tel</th>
                                            <th className="py-3 px-3 text-center">Pro</th>
                                            <th className="py-3 px-3 text-center">Start</th>
                                            <th className="py-3 px-3 text-center">End</th>
                                            <th className="py-3 px-3 text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-600  text-sm font-light">

                                        {
                                          students  && students.map((stud, index) => (
                                                <tr key={stud.uuid} className="border-b border-gray-200  hover:bg-gray-100">
                                                    <td className=" py-3 px-3 text-center whitespace-nowrap">
                                                        <div className="flex items-center justify-center">
                                                            <span className="font-medium text-center">{stud.studentid}</span>
                                                        </div>
                                                    </td>
                                                    <td className=" py-3 px-3 text-center">
                                                        <div className="flex items-center justify-center">
                                                            {stud.idscang && <div className="mr-2">
                                                                <img className="w-6 h-6 rounded-full" src={stud.idscang} />
                                                            </div>}
                                                            <span className="font-medium uppercase">{stud.surnameg}</span>

                                                        </div>
                                                    </td>
                                                    <td className=" py-3 px-3 text-center whitespace-nowrap">
                                                        <div className="flex items-center justify-center">
                                                            <span className="font-medium text-center">{stud.forenamesg}</span>
                                                        </div>
                                                    </td>
                                                    <td className=" py-3 px-3 text-center">
                                                        <div className="flex items-center justify-center">
                                                            <span className="font-medium">{stud.dateofbirthg}</span>
                                                        </div>
                                                    </td>
                                                    <td className=" py-3 px-3 text-center">
                                                        <span className="bg-green-600 text-white py-1 px-3 rounded-full text-xs">{stud.genderg}</span>
                                                    </td>
                                                    <td className=" py-3 px-3 text-center">
                                                        <div className="flex items-center justify-center">
                                                            <span className="font-medium">{stud.citizenshipg}</span>
                                                        </div>
                                                    </td>
                                                    <td className=" py-3 px-3 text-center">
                                                        <div className="flex items-center justify-center">
                                                            <span className="font-medium">{stud.emailg}</span>
                                                        </div>
                                                    </td>
                                                    <td className=" py-3 px-3 text-center">
                                                        <div className="flex items-center justify-center">
                                                            <span className="font-medium">{stud.telghanag}</span>
                                                        </div>
                                                    </td>
                                                    <td className=" py-3 px-3 text-center">
                                                        <div className="flex items-center justify-center">
                                                            <span className="font-medium">{stud.citizenshipg}</span>
                                                        </div>
                                                    </td>
                                                    <td className=" py-3 px-3 text-center">
                                                        <div className="flex items-center justify-center">
                                                            <span className="font-medium">{Moment(stud.startdate).format('YYYY-MM-DD')}</span>
                                                        </div>
                                                    </td>
                                                    <td className=" py-3 px-3 text-center">
                                                        <div className="flex items-center justify-center">
                                                            <span className="font-medium">{Moment(stud.enddate).format('YYYY-MM-DD')} </span>
                                                        </div>
                                                    </td>
                                                    <td className=" py-3 px-3 text-center">
                                                        <div className="flex item-center justify-center">
                                                            <Link to={`/studentprofile/${stud.uuid}`}>

                                                                <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                                    </svg>
                                                                </div>
                                                            </Link>
                                                            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                                <NavLink to={`/editstudent/${stud.uuid}`}>
                                                                    <a>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                                        </svg>
                                                                    </a>
                                                                </NavLink>
                                                            </div>
                                                            {user && user.role === "admin" && <>
                                                                <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                    </svg>
                                                                </div>
                                                            </>
                                                            }


                                                            {user &&  user.role === "super" && <>
                                                                <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                    </svg>
                                                                </div>
                                                            </>
                                                            }
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

export default Students