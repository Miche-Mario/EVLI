import React, {useEffect, useState} from 'react'
import Layout from '../components/Screens/Layout'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../features/auth/authSlice'
import axios from 'axios'
import { useParams } from 'react-router-dom';


const EditAccoDiscount = ({props}) => {
  
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

  const [from, setAccoFrom] = useState("");
  const [accoPourcentage, setAccoPourcentage] = useState("");


  const [msg, setMsg] = useState("");



  const { id } = useParams();
  const getAccoDiscount = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/accodiscount/${id}`);
    setAccoFrom(response.data.from);
    setAccoPourcentage(response.data.pourcentage);
  }
  const updateAccoDiscount = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${process.env.REACT_APP_BASE_URL}/accodiscount/${id}`, {
        from: from,
        pourcentage: accoPourcentage,
      });
      navigate("/discount");
    } catch (error) {
      if(error.response) {
        setMsg(error.response.data.msg);
      }
    }
  }

  useEffect(() => {
    getAccoDiscount();
    updateAccoDiscount();

  }, [])

 
  return (
    <Layout>
        <div className='mt-10 ml-5'>
            <p className='font-bold text-3xl'>Accomodation Group</p>
            <p className='text-gray-400 text-2xl'>Edit Accomodation Discount</p>
            <div className='bg-white h-[20rem] p-5  ml-1 mt-3 elevation'>
                <form onSubmit={updateAccoDiscount}>
                  
                  
                    <div className='mt-5'>
                      <label className='text-xl font-bold'>From</label>
                      <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " 
                        value={from}
                        onChange={(e) => setAccoFrom(e.target.value)} 
                        required
                      />
                    </div>
                    <div className='mt-5'>
                      <label className='text-xl font-bold'>Pourcentage</label>
                      <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " 
                        value={accoPourcentage}
                        onChange={(e) => setAccoPourcentage(e.target.value)} 
                        required
                      />
                    </div>
                  
                  
                      <p className='text-sm text-center text-red'>{msg}</p>
                      <div className='flex flex-row  mt-3 mb-3'>
                        <button className='bg-blue-600 rounded text-gray-100 font-medium w-30 h-10 p-3 flex items-center justify-center' type="submit">
                          Update Accomodation Discount
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

export default EditAccoDiscount