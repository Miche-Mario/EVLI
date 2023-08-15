import React, {useEffect, useState} from 'react'
import Layout from '../components/Screens/Layout'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../features/auth/authSlice'
import axios from 'axios'
import { useParams } from 'react-router-dom';


const EditExpenses = ({props}) => {
  
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


  const { user} = useSelector(
    (state) => state.auth
  );


  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [exptype, setExpType] = useState("");


  const [msg, setMsg] = useState("");

  const [expensestype, setExpensesType] = useState([]);

  const getExpensesType = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/expensestype`);
    setExpensesType(response.data)
  }


  const { id } = useParams();
  const getExpenses = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/expenses/${id}`);
    setDate(response.data.date);
    setAmount(response.data.amount);
    setDescription(response.data.description)
    setExpType(response.data.exptype)
  }
  const updateExpenses = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${process.env.REACT_APP_BASE_URL}/expenses/${id}`, {
        date: date,
        amount: amount,
        description: description,
        exptype: exptype,
        user: user.id
      });
      navigate("/expenses");
    } catch (error) {
      if(error.response) {
        setMsg(error.response.data.msg);
      }
    }
  }

  useEffect(() => {
    getExpensesType()
    getExpenses();
    updateExpenses();

  }, [])

 
  return (
    <Layout>
        <div className='mt-10 ml-5'>
            <p className='font-bold text-3xl'>Expenses</p>
            <p className='text-gray-400 text-2xl'>Edit Expenses</p>
            <div className='bg-white h-[20rem] p-5  ml-1 mt-3 elevation'>
                <form onSubmit={updateExpenses}>
                  
                  
                    <div className='mt-5'>
                      <label className='text-xl font-bold'>Date</label>
                      <input type="date" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " 
                        value={date}
                        onChange={(e) => setDate(e.target.value)} 
                        
                      />
                    </div>
                    <div className='mt-5'>
                      <label className='text-xl font-bold'>Category</label>
                      <select id="countries" class="bg-gray-50 mb-4  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                        onChange={(e) => setExpType(e.target.value)}
                        value={exptype}
                >
                  <option></option>
                  {
                    expensestype.map((item, index) => (
                      <option value={item.id}>{item.expensestypename}</option>
                    ))
                  }
                </select>
                    </div>
                    <div className='mt-5'>
                      <label className='text-xl font-bold'>Amount</label>
                      <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " 
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)} 
                        
                      />
                    </div>
                    <div className='mt-5'>
                      <label className='text-xl font-bold'>Description</label>
                      <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} 
                        required
                      />
                    </div>
                  
                      <p className='text-sm text-center text-red'>{msg}</p>
                      <div className='flex flex-row  mt-3 mb-3'>
                        <button className='bg-blue-600 rounded text-gray-100 font-medium w-30 h-10 p-3 flex items-center justify-center' type="submit">
                          Update Expenses
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

export default EditExpenses