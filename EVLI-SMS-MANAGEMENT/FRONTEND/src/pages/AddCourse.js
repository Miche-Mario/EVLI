import React, { useEffect, useState } from 'react'
import Layout from '../components/Screens/Layout'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../features/auth/authSlice'
import axios from 'axios'
import { useParams } from 'react-router-dom';


const AddCourse = ({ props }) => {

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

  const [languages, setLanguages] = useState([]);

  const getLanguages = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/language`);
    setLanguages(response.data)
  }
  const [times, setTimes] = useState("");
  const [priceduration, setPriceduration] = useState(0)
  const [msg, setMsg] = useState("");

  
  const [classtypes, setClasstypes] = useState([]);

  const getClasstypes = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/classtype`);
    setClasstypes(response.data)
  }
  const [allCourse, setAllCourse] = useState([]);

  const getCourse = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/courselist`);
    setAllCourse(response.data)
  }


  const getTimes = async (e) => {  
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/time`, {
        number: parseInt(priceduration) ,
      });
      setTimes(response.data);
      //setPriceduration(response.data.length)
  }

 


  useEffect(() => {
  getTimes();
  getLanguages();
  getClasstypes();
  getCourse();
  },[])

  const [course, setCourse] = useState('');
  const [courseidd, setCourseidd] = useState('');

  const [subCource, setSubCourse] = useState('');
  const [description, setDescription] = useState('');
  const [classtype, setClasstype] = useState('');
  const [fullduration, steFullduration] = useState('');
  const [fullprice, setFullprice] = useState('');
  const [language, setLanguage] = useState('');

  const [getPrices, setGetPrices] = useState([])


  const updatePrices = index => e => {
    let newPrice = [...getPrices];
    newPrice[index] = e.target.value;
    setGetPrices(newPrice);
    
  }

  const saveCourses =  (e) => {
    var keyCode = e.keyCode || e.which;
  if (keyCode !== 13) { 
    e.preventDefault();
    try {
       axios.post(`${process.env.REACT_APP_BASE_URL}/courses`, {
        coursename: course,
        courseidd: courseidd,
        subcoursename: subCource,
        language_languageid: language,
        classtype_classtypeid: classtype,
        description: description,
        fullprice: fullprice,
        fullduration: fullduration,
        times: times,
        prices: getPrices
        
      });
      navigate("/courses");

    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  }}











  const [ifSubCourse, setIfSubCourse] = useState(false)
  const ifsubcourse = () => {
    setIfSubCourse(!ifSubCourse)
  }

  const [newCourse, setNewCourse] = useState(false)
  const ifnewcourse = () => {
    setNewCourse(!newCourse)
  }

 
  

  const [ifFullPrice, setIfFullPrice] = useState(true)
  const iffullprice = () => {
    setIfFullPrice(!ifFullPrice)
  }
  console.log(getPrices)
  return (
    <Layout>
      <div className='mt-10 ml-5'>
        <p className='font-bold text-3xl'>Course</p>
        <p className='text-gray-400 text-2xl'>Add New Course</p>
        <div className='bg-white h-full p-5  ml-1 mt-3 elevation'>
          <form onSubmit={(e) => {saveCourses(e)}}>
            <div className='flex items-start justify-around'>
              <div>
              <div className='flex items-center mt-5'>
                <p className='text-lg font-medium text-gray-600 '>Create from an existed course?</p>
                <input type="checkbox" onClick={ifnewcourse} className="w-5 ml-5 h-5"
                onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                />
              </div>
              <label className='text-xl font-bold'>Course name</label>
              {newCourse ?
              <div>
              <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[35rem] p-2.5"
                value={courseidd}
                onChange={(e) => setCourseidd(e.target.value)} 
                onClick={(e) => {setCourse(null); setSubCourse(null)}}
                required
                onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                >
                  <option></option>
                  { allCourse.map((course, index) => (
                      <option value={course.id}>{course.coursename}</option>
                  ))} 
                  
                </select>
              </div>
              : 
              <div>
              <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[35rem] p-2.5 "
                value={course}
                onChange={(e) => setCourse(e.target.value)} 
                required
                onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}

                />
                </div>
                }
               
              <div className='flex items-center mt-5'>
                <p className='text-lg font-medium text-gray-600 '>Create a Subcourse?</p>
                <input type="checkbox" onClick={ifsubcourse} className="w-5 ml-5 h-5"
                onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                />
              </div>
              {ifSubCourse && 
                <div className='mt-3'>
                  <label className='text-xl font-bold '>Subcourse name</label>
                  <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[35rem] p-2.5 "
                    defaultValue={" "}
                    value={subCource}
                    onChange={(e) => setSubCourse(e.target.value)} 
                    onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                  />
                </div>
              }
              <div className='mt-3'>
                <label className='text-xl font-bold '>Language</label>
                <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[35rem] p-2.5"
                value={language}
                onChange={(e) => setLanguage(e.target.value)} 
                required
                onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                >
                  <option></option>
                  { languages.map((language, index) => (
                      <option value={language.id}>{language.languagename}</option>
                  ))} 
                  
                </select>
              </div>
              <div className='mt-3'>
                <label className='text-xl font-bold '>Class Type</label>
                <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[35rem] p-2.5"
                  value={classtype}
                  onChange={(e) => setClasstype(e.target.value)} 
                  required
                  onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                >
                  <option></option>
                  { classtypes.map((classtype, index) => (
                      <option value={classtype.id}>{classtype.classtypename}</option>
                  ))}
                </select>
              </div>
              <div className='mt-3'>
                  <label className='text-xl font-bold '>Description</label>
                  <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[35rem] p-2.5 "
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} 
                    required
                    onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                  />
                </div>
              <div className='flex items-center mt-5'>
                <p className='text-lg font-medium text-gray-600 '>Full Price ?</p>
                <input type="checkbox" defaultChecked onClick={iffullprice} className="w-5 ml-5 h-5"/>
              </div>
              {ifFullPrice && 
                <>
                  
                  <div className='mt-3'>
                    <label className='text-xl font-bold '>Duration</label>
                    <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[35rem] p-2.5 "
                      placeholder='00'
                      value={fullduration}
                      onChange={(e) => steFullduration(e.target.value)} 
                      required={ifFullPrice ? true : false}  
                      onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                    />
                  </div>
                  <div className='mt-3'>
                      <label className='text-xl font-bold '>Price</label>
                      <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[35rem] p-2.5 "
                        placeholder='00'
                        value={fullprice}
                        onChange={(e) => setFullprice(e.target.value)} 
                        required={ifFullPrice ? true : false}   
                        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                      />
                  </div>
                </>
              }
              </div>
              <div>
              {!ifFullPrice && 
                <>
                  <div className='mt-3'>
                    <label className='text-xl font-bold '>Duration (Weeks - Hour)</label>
                    <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[30rem] p-2.5 " 
                      onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                      onKeyUpCapture={(e) =>  {getTimes(e); setPriceduration(e.target.value)}} 
                      required={!ifFullPrice ? true : false}
                      onChange={(e) => steFullduration(e.target.value)} 
                      />
                  </div>

                  <div className='mt-3'>
                  <label className='text-xl font-bold '>Price Table</label>
                    <table className="w-[40rem]">
                      <thead>
                        <tr  className=" border border-dark-purple bg-gray-200  text-gray-600 uppercase text-sm leading-normal">
                          <th className=" border border-dark-purple py-3 px-3 text-center">Week or Hour</th>
                          <th className=" border border-dark-purple py-3 px-3 text-center">Prices</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600  text-sm font-light">
                        { times.map((time, index) => (
                            <tr key={time.uuid} className=" border-gray-400  hover:bg-gray-100 border-b-2">
                            <td className="py-2 px-2  border border-dark-purple">
                              <div className="flex items-center justify-center">
                                <span className="font-bold text-xl uppercase">{time.time}</span>
                              </div>
                            </td>
                            <td className="  border border-dark-purple w-[20rem] h-12">
                              <div className="flex items-center justify-center  ">
                                <input className=" uppercase text-right w-[20rem] h-12 text-xl font-bold pr-2" placeholder="00"
                                  
                                  value={getPrices[index]}
                                  onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                                  onChange={updatePrices(index)}
                                />
                              </div>
                            </td>
                          </tr>
                         ))} 
                      </tbody>
                    </table>
              </div>
                </>
              }
              </div>
            </div>
            <div className='flex flex-row justify-around  mt-3 mb-3'>
              <button className='bg-blue-600 rounded text-gray-100 font-medium w-20 h-10 flex items-center justify-center' type="submit">
                Save
              </button>
              <button className='bg-blue-600 rounded text-gray-100 font-medium w-20 h-10 flex items-center justify-center'>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default AddCourse