import React, { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom';
import Layout from '../components/Screens/Layout'
import { BiBookBookmark } from 'react-icons/bi'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import AddCourses from '../components/Courses/AddCourses';
import GroupStud from '../components/Courses/GroupStud';


import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../features/auth/authSlice'
import axios from "axios";


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
const Courses = () => {
  const { user } = useSelector(
    (state) => state.auth
);


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

  const [active, setActive] = useState("");
  const [classtypes, setClasstypes] = useState([]);
  const [isClasstype, setIsClasstype] = useState("");

  const getClasstypes = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/classtype`);
    setClasstypes(response.data)
  }

  const [languages, setLanguages] = useState([]);
  const [isLanguage, setIsLanguage] = useState("");

  const getLanguages = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/language`);
    setLanguages(response.data)
  }


  const [msg, setMsg] = useState("");

  const [courses, setCourses] = useState([]);
  const [count, setCount] = useState();

  const getCourses = async (e) => {

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/getcourses`,{
        classtype: isClasstype,
        language: isLanguage,
        active: active
      });
      setCourses(response.data.rows)
      setCount(response.data.count)
      
    } catch (error) {
      if(error.response) {
        setMsg(error.response.data.msg);
      }
    }
  }

useEffect(() => {
 
  getClasstypes();
  getLanguages();
},[])


const deleteCourses = async (userId) => {
  await axios.delete(`${process.env.REACT_APP_BASE_URL}/courses/${userId}`);
  getCourses();
  navigate(0);
}

  const [open1, setOpen1] = useState(false);
  const [va, setVa] = useState("");
  const [code, setCode] = useState("");
  const [isLoading, setLoading] = useState(true); // Loading state


  const handleOpen1 = (uuid) => {
    setOpen1(true);
    setVa(uuid)
  };
  const handleClose1 = () => {
    setOpen1(false);
  };

  const [open, setOpen] = useState(false);

  useEffect(() => { // useEffect hook
  setTimeout(() => { // simulate a delay
    getCourses();
      setLoading(false); //set loading state
   
   }, 1000);
  }, []);
  const [pricestimes, setPricestimes] = useState('')
  const getPricesTimes = async(id) => {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/prices/${id}`);
      setPricestimes(response.data);
    
    }
  
  const handleOpen = (code) => {
    setOpen(true);
    setCode(code)

  
    getPricesTimes();

  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Layout >
      <Modal
        open={open1}
        onClose={handleClose1}
      >
        <Box sx={style}>
          <div className='items-center p-3 '>
            <div className='text-center text-xl font-medium'>Would you really delete ?</div>
            <div className='flex items-center justify-center mt-3 mb-3'>
              <button className='bg-blue-600 rounded text-gray-100 ml-5 font-medium w-20 h-10 flex items-center justify-center'
                onClick={() => deleteCourses(va)}
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
        open={open}
        onClose={handleClose}
      >
        <Box className="center-col" sx={style1}>
         
            <div  className=' text-center bg-dark-purple p-2 text-white text-xl font-medium'>{code.coursecode}</div>
            <div className='flex flex-row m-3 justify-center items-center'>
              <div className=''>
                <p  class="  text-2xl font-bold text-gray-900 p-1">Course Name:</p>
                <p  class="mt-2 text-2xl font-bold text-gray-900 p-1">Subcourse Name:</p> 
                <p  class="mt-2 text-2xl font-bold text-gray-900 p-1">Class Type:</p>                      
                <p  class="mt-2 text-2xl font-bold text-gray-900 p-1">Language:</p>                      
                <p  class="mt-2 text-2xl font-bold text-gray-900 p-1">Status:</p>
                <p  class="mt-2 text-2xl font-bold text-gray-900 p-1">Tuition Fee:</p>                      
              </div>
              <div >
               
                <p className=" mt-2 ml-4 bg-dark-purple text-xl text-white text-center rounded-lg block  w-[20rem] p-2">{ code.course ? code.course.coursename : ""}</p>
                <p className='mb-2 ml-4 mt-2 bg-dark-purple text-xl text-white text-center rounded-lg block  w-[20rem] p-2'>{code.subcourse ? code.subcourse.subcoursename : "No Subcourse"}</p>
                <p className='mb-2 ml-4 mt-2 bg-dark-purple text-xl text-white text-center rounded-lg block w-[20rem] p-2'>{code.classtype ? code.classtype.classtypename : ""}</p>
                <p className='mb-2 ml-4 mt-2 bg-dark-purple text-xl text-white text-center rounded-lg block w-[20rem] p-2'>{code.language ? code.language.languagename : ""}</p>
                <p className={`mb-2 ml-4 mt-2 bg-dark-purple text-xl text-white text-center rounded-lg block w-[20rem] p-2 ${code.active ? "bg-green-600" : "bg-red" }`} >{code.active  ? "Active" : "Inactive"}</p>
                <p className='mb-2 ml-4 mt-2 bg-dark-purple text-xl text-white text-center rounded-lg block w-[20rem] p-2'>{code.fullduration ? code.fullprice : ""}</p>

              </div>
           
          </div>
         { code.fullprice === 0  &&  <div className='flex flex-col items-center justify-center mt-3'>
                  <p className='text-xl font-bold text-center mb-3  text-white rounded-lg p-3 bg-dark-purple w-[20rem] '>Price Table</p>
                    <table className="w-[40rem]">
                      <thead>
                        <tr  className=" border border-dark-purple bg-gray-200  text-gray-600 uppercase text-sm leading-normal">
                          <th className=" border border-dark-purple py-3 px-3 text-center">Week or Hour</th>
                          <th className=" border border-dark-purple py-3 px-3 text-center">Prices</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600  text-sm font-light">
                      
                      {pricestimes && pricestimes.map((time) => 
                      <tr key={time.uuid}  className=" border-gray-400  hover:bg-gray-100 border-b-2">
                        <td className="py-2 px-2  border border-dark-purple">
                              <div className="flex items-center justify-center">
                                <span className="font-bold text-xl uppercase">{time.times_timesid}</span>
                              </div>
                            </td>
                            <td className="  border border-dark-purple w-[20rem] h-12">
                              <div className="flex items-center justify-center  ">
                                <p className=" uppercase text-right w-[20rem] h-12 text-xl font-bold pr-2">{time.price}</p>
                              </div>
                            </td>
                      </tr>
                      )}
                      
                        
                      </tbody>
                    </table>
              </div>}
          <div className='flex justify-end mt-3 mb-3'>
              <button onClick={handleClose} className='bg-blue-600 rounded mr-20 text-gray-100 font-medium w-32 h-10 flex items-center justify-center'>
                Ok
              </button>
            </div>

        </Box>
      </Modal>

      
      <div>
        <div className='shadow-lg flex h-20 w-full flex-row bg-white border border-gray-300 rounded'>
          <div className='bg-blue-400 w-40 flex items-center justify-center text-3xl font-semibold text-center text-white'>{count}</div>
          <div className=' ml-3  flex items-center'>

            <p className='text-xl text-gray-900'>Class type</p>
            <select id="countries" class="ml-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-24 p-1"
                  value={isClasstype}
                  onChange={(e) => setIsClasstype(e.target.value)} 
                  onClick= {()=>getCourses()}
                  required
                  onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                >
                  <option value="" selected>All</option>
                  { classtypes.map((classtype, index) => (
                      <option value={classtype.id} >{classtype.classtypename}</option>
                  ))}
                </select>


            <p className='text-xl ml-3 text-gray-900'>Language</p>
            <select id="countries" class="ml-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-24 p-1"
                  value={isLanguage}
                  onClick= {()=>getCourses()}
                  onChange={(e) => setIsLanguage(e.target.value)} 
                  required
                  onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                >
                  <option value="" selected>All</option>
                  { languages.map((language, index) => (
                      <option value={language.id} >{language.languagename}</option>
                  ))}
                </select>
            
            <p className='text-xl ml-3 text-gray-900'>Status</p>
            <select id="countries" class="ml-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-24 p-1"
              value={active}
              onClick= {()=>getCourses()}
              onChange={(e)=> setActive(e.target.value)}
            >
              <option value="" select>All</option>
              <option  value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
            <div className='ml-[3em] w-auto'>

            <NavLink
              to="/addcourse"
            >
               { user && user.role === "admin" && <> 
              <button className='bg-blue-600 rounded text-gray-100 font-medium p-2 flex items-center justify-center' type="submit" name='Add'>
                Add<BiBookBookmark className='text-2xl ml-2' />
              </button>
              </>
              }
              </NavLink>

            </div>

          </div>


        </div>
        <div className="overflow-x-auto">
          <div className="max-w-screen   flex font-sans overflow-hidden">
            <div className="w-full">
              <div className="bg-white shadow-md rounded my-6">
                <table className="min-w-max w-full ">
                  <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                      <th className="py-3 px-3 text-center">N</th>
                      <th className="py-3 px-3 text-center">Course code</th>
                      <th className="py-3 px-3 text-center">Course name</th>
                      <th className="py-3 px-3 text-center">Subcourse name</th>
                      <th className="py-3 px-3 text-center">Type</th>
                      <th className="py-3 px-3 text-center">Language</th>
                      <th className="py-3 px-3 text-center">Tuition fee</th>
                      <th className="py-3 px-3 text-center">Fee type</th>
                      <th className="py-3 px-3 text-center">Duration</th>
                      <th className="py-3 px-3 text-center">Status</th>
                      <th className="py-3 px-3 text-center">Actions</th>

                    </tr>
                  </thead>
                  <tbody className="text-gray-600  text-sm font-light">
                    { courses.map((course, index) => (
                        <tr className="border-b border-gray-200  hover:bg-gray-100">

                        <td className=" py-3 px-3 text-center">
                          <div className="flex items-center justify-center">
                            <span className="font-medium uppercase">{index +1 }</span>
  
                          </div>
                        </td>
                        <td className=" py-3 px-3 text-center whitespace-nowrap">
                          <div className="flex items-center justify-center">
                            <span className="font-medium text-center">{course.coursecode}</span>
                          </div>
                        </td>
                        <td className=" py-3 px-3 text-center">
                          <div className="flex items-center justify-center">
                            <span className="font-medium">{course.course ? course.course.coursename : ""}</span>
                          </div>
                        </td>
                        <td className=" py-3 px-3 text-center">
                          <div className="flex items-center justify-center">
                            <span className="font-medium">{course.subcourse ? course.subcourse.subcoursename : "No Subcourse"}</span>
                          </div>
                        </td>
                        <td className=" py-3 px-3 text-center">
                          <span className="bg-green-600 text-white py-1 px-3 rounded-full text-xs">{course.classtype ? course.classtype.classtypename : "" }</span>
                        </td>
                        <td className=" py-3 px-3 text-center">
                          <div className="flex items-center justify-center">
                            <span className="font-medium">{course.language ? course.language.languagename : "" }</span>
                          </div>
                        </td>
                        <td className=" py-3 px-3 text-center">
                          <div className="flex items-center justify-center">
                            <span className="font-medium">{course.fullprice ? course.fullprice : "Timely Price"}</span>
                          </div>
                        </td>
                        <td className=" py-3 px-3 text-center">
                          <div className="flex items-center justify-center">
                            <span className="font-medium">Mensuel</span>
                          </div>
                        </td>
                        <td className=" py-3 px-3 text-center">
                          <div className="flex items-center justify-center">
                            <span className="font-medium">{course.fullduration}</span>
                          </div>
                        </td>
                        <td className=" py-3 px-3 text-center">
                          <div className="flex items-center justify-center">
                            <span className={`bg-green-600 text-white py-1 px-3 rounded-full text-xs ${course.active ? "bg-green-600" : "bg-red" }`} >{course.active  ? "Active" : "Inactive"}</span>
                          </div>
                        </td>
  
                        <td className=" py-3 px-3 text-center">
                          <div className="flex item-center justify-center">
                          
                            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                              onClick={() =>{ handleOpen(course); getPricesTimes(course.id)}}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </div>
                            { user && user.role === "admin" && <> 
                            <Link
                               to={`/course/edit/${course.id}`}
                            >
                            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                            </div>
                            </Link>
                            <div  className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                                onClick={() => handleOpen1(course.uuid)}
                           >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </div>

                            </>
                          }
                          </div>
                        </td>
                      </tr>
                    )) }





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

export default Courses