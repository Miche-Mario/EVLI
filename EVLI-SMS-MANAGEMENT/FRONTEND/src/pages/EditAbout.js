import React, {useEffect, useState} from 'react'
import Layout from '../components/Screens/Layout'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../features/auth/authSlice'
import axios from 'axios'
import { useParams } from 'react-router-dom';


const EditAbout = ({props}) => {
  
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

  const [aboutname, setAboutname] = useState("");



  const [msg, setMsg] = useState("");



  const { id } = useParams();
  const getAbout = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/about/${id}`);
    setAboutname(response.data.aboutname);

  }
  const updateAbout = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${process.env.REACT_APP_BASE_URL}/about/${id}`, {
        aboutname: aboutname,
      });
      navigate("/options");
    } catch (error) {
      if(error.response) {
        setMsg(error.response.data.msg);
      }
    }
  }

  useEffect(() => {
    getAbout();
    updateAbout();

  }, [])

 
  return (
    <Layout>
        <div className='mt-10 ml-5'>
            <p className='font-bold text-3xl'>Surveys</p>
            <p className='text-gray-400 text-2xl'>Edit Survey</p>
            <div className='bg-white h-[20rem] p-5  ml-1 mt-3 elevation'>
                <form onSubmit={updateAbout}>
                  
                  
                    <div className='mt-5'>
                      <label className='text-xl font-bold'>Survey Name</label>
                      <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " 
                        value={aboutname}
                        onChange={(e) => setAboutname(e.target.value)} 
                        required
                      />
                    </div>
                      <p className='text-sm text-center text-red'>{msg}</p>
                      <div className='flex flex-row  mt-3 mb-3'>
                        <button className='bg-blue-600 rounded text-gray-100 font-medium w-30 h-10 p-3 flex items-center justify-center' type="submit">
                          Update Suvey
                        </button>
                        <button  className='bg-blue-600 rounded text-gray-100 font-medium w-20 h-10 p-3 flex items-center justify-center ml-5'>
                          Cancel
                        </button>
            </div>
                </form>
            </div>

        </div>
    </Layout>
  )
}

export default EditAbout