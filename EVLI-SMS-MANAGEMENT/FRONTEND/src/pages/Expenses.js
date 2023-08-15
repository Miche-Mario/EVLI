import { Checkbox } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Layout from '../components/Screens/Layout'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios'
import Moment from 'moment'



import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getMe } from '../features/auth/authSlice'


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
const Expenses = () => {



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

  const { user} = useSelector(
    (state) => state.auth
  );

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };



  const [expensestype, setExpensesType] = useState([]);
  const [sum, setSum] = useState(0);

  const getExpensesType = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/expensestype`);
    setExpensesType(response.data)
  }

  const [startDate, setStartDate] = useState("2020-05-22 09:40:49")
  const [endDate, setEndDate] = useState(new Date())
  const [expenses, setExpenses] = useState();

  const getExpenses = async () => {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/expensesbetweeen`, {
      startDate: startDate,
      endDate: endDate,
    });
    setExpenses(response.data)
  }

  const summ = expenses && expenses[expenses.length - 1].reduce((accumulator, object) => {
    return accumulator + object.amount;
  }, 0);; 


  const [userid, setUserId] = useState()
  
  useEffect(() => {
    getExpensesType()
    getExpenses()
    setUserId(user)
  }, [])

console.log(userid && userid);
  const [expensestypeId, setExpensesTypeId] = useState()
  const [amount, setAmount] = useState()
  const [description, setDescription] = useState()
  const [date, setDate] = useState()
  const [msg, setMsg] = useState()

  const saveExpenses = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/expenses`, {
        exptype: expensestypeId,
        amount: amount,
        description: description,
        date: date,
       
        user: user.id
      });
      navigate(0)
      console.log('ok');

    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
        console.log(error);
      }
    }
  }
  const [open2, setOpen2] = useState(false);

  const [va, setVa] = useState("");

  const handleOpen2 = (uuid) => {
    setOpen2(true);
    setVa(uuid)
  };
  const handleClose2= () => {
    setOpen2(false);
  };

  const deleteExpenses = async (userId) => {
    await axios.delete(`${process.env.REACT_APP_BASE_URL}/expenses/${userId}`, {
      user: user.id
    });
    getExpenses ();
    navigate(0);
  }

  console.log(expenses);
  return (
    <Layout >

<Modal
        open={open2}
        onClose={handleClose2}
      >
        <Box sx={style}>
          <div className='items-center p-3 '>
            <div className='text-center text-xl font-medium'>Would you really delete ?</div>
            <div className='flex items-center justify-center mt-3 mb-3'>
              <button className='bg-blue-600 rounded text-gray-100 ml-5 font-medium w-20 h-10 flex items-center justify-center'
                onClick={() => deleteExpenses(va)}
              >
                Delete
              </button>
              <button onClick={handleClose2} className='bg-blue-600 rounded ml-5 text-gray-100 font-medium w-20 h-10 flex items-center justify-center'>
                Cancel
              </button>
            </div>
          </div>

        </Box>
      </Modal>


      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <p class="text-white text-xl p-3  bg-dark-purple w-full">EXPENSES DETAILS</p>
          <form onSubmit={saveExpenses}>
            <div className='flex flex-row m-3 justify-around items-center'>
              <div className=''>
                <label for="first_name" class="block mb-6 text-base font-medium text-gray-900 p-1">Expense Type</label>
                <label for="first_name" class="block mb-5 text-base font-medium text-gray-900 p-1">Amount</label>
                <label for="first_name" class="block mb-5 text-base font-medium text-gray-900 p-1">Description</label>
                <label for="first_name" class="block mt-10 mb-5 text-base font-medium text-gray-900 p-1">Date</label>


              </div>
              <div >

                <select id="countries" class="bg-gray-50 mb-4  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                  onChange={(e) => setExpensesTypeId(e.target.value)}

                >
                  <option></option>
                  {
                    expensestype.map((item, index) => (
                      <option value={item.id}>{item.expensestypename}</option>
                    ))
                  }
                </select>
                <input type="text" id="first_name" class="bg-gray-50 border mb-4  text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-1.5 " placeholder="0000"
                  onChange={(e) => setAmount(e.target.value)}
                />
                <textarea rows={3} type="text" id="first_name" class="bg-gray-50 border mb-4   border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-1.5 " placeholder=""
                  onChange={(e) => setDescription(e.target.value)}
                />
                <input type="date" id="first_name" class="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-1.5 " placeholder="00"
                  onChange={(e) => setDate(e.target.value)}

                />

              </div>
            </div>
            <div className='flex flex-row justify-around  mt-3 mb-3'>
              <button className='bg-blue-600 rounded text-gray-100 font-medium w-20 h-10 flex items-center justify-center' type="submit" name='Add'>
                Ok
              </button>
              <button onClick={handleClose} className='bg-blue-600 rounded text-gray-100 font-medium w-20 h-10 flex items-center justify-center' type="submit" name='Add'>
                Cancel
              </button>
            </div>
          </form>
        </Box>


      </Modal>




      <div className='m-3'>
        <fieldset className='border  rounded border-dark-purple'>
          <legend className='p-1 ml-3 text-xl text-blue-700'>EXPENSES</legend>
          <div className='flex ml-3 items-start'>
            <div className=' flex'>
              <p className='text-xl ml-8 mt-1 text-gray-900'>From date</p>
              <input type="date"
                id="first_name" class=" ml-3 bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-50 p-1.5 " placeholder="name"
                onChange={(e) => { setStartDate(e.target.value); getExpenses() }}
              />
            </div>


            <div className=' flex '>
              <p className='text-xl mt-1 ml-8 text-gray-900'>To date</p>
              <input
                type="date"
                id="first_name"
                class=" ml-3 bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-50 p-1.5 "
                placeholder="name"
                onChange={(e) => { setEndDate(e.target.value); getExpenses() }}

              />
            </div>




            <button onClick={handleOpen} className='bg-blue-600 rounded ml-3 text-gray-100 font-medium w-48 h-10 p-3 flex items-center justify-center' type="submit" name='Add'>
              Add
            </button>

          </div>

          <fieldset className='m-3 mb-0 h-52 border border-dark-purple'>
            <table className="w-full   ">
              <thead>
                <tr className="bg-gray-200  text-gray-600 uppercase text-sm leading-normal">
                  <th className=" py-3 px-3 text-center">Date of expense</th>
                  <th className=" py-3 px-3 text-center">Category</th>
                  <th className=" py-3 px-3 text-center">Amount</th>
                  <th className=" py-3 px-3 text-center">Description</th>
                  <th className=" py-3 px-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-600  text-sm font-light">
                {expenses &&
                  expenses.map((item, index) => (

                 item.amount && 
                    <tr key={item.uuid} className="border-b border-gray-200  hover:bg-gray-100">


                      <td className="p-0">
                        <div className="flex items-center justify-center">
                          <span className="font-medium uppercase">{Moment(item.date).format('YYYY-MM-DD')}</span>
                        </div>
                      </td>
                      <td className=" py-3 px-3 text-center">
                        <div className="flex items-center justify-center">
                          <span className="font-medium">{item.expensestype && item.expensestype.expensestypename}</span>
                        </div>
                      </td>

                      <td className=" py-3 px-3 text-center">
                        <div className="flex items-center justify-center">
                          <span className="font-medium">{item.amount}</span>
                        </div>
                      </td>


                      <td className=" py-3 px-3 text-center">
                        <div className="flex items-center justify-center">
                          <span className="font-medium">{item.description}</span>
                        </div>
                      </td>

                      <td className=" py-3 px-3 text-center">
                        <div className="flex item-center justify-center">

                          <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                          <Link
                               to={`/expenses/edit/${item.uuid}`}
                            >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                            </Link>
                          </div>
                          <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                                onClick={() => handleOpen2(item.uuid)}

                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </div>
                        </div>
                      </td>


                    </tr>
                  ))
                }




              </tbody>
            </table>
          </fieldset>
          <div className='m-6 flex justify-end'>


            <span className='text-sm ml-3 p-2 '>Total for selected period</span>
            <span className='text-right border-2  border-b-slate-900 p-1 w-32 font-medium'>{summ}</span>

          </div>
        </fieldset>
      </div>























    </Layout>
  )
}

export default Expenses