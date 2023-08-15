import { Button, Checkbox } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Layout from '../components/Screens/Layout'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import Icon from '../assets/images.png'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { getMe } from '../features/auth/authSlice'
import { BiEdit } from 'react-icons/bi'
import { MdDeleteSweep } from 'react-icons/md'

import axios from "axios";




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: 500,
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',

  boxShadow: 24,
  p: 0,
  m: 0,

};
const Users = () => {


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



  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users`);
    setUsers(response.data)
  }

  const deleteUser = async (userId) => {
    await axios.delete(`${process.env.REACT_APP_BASE_URL}/users/${userId}`);
    getUsers();
    navigate(0);
  }


  useEffect(() => {
    getUsers();
    saveUser();
  }, [])


  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/users`, {
        name: name,
        password: password,
        username: username,
        role: role
      });
      navigate(0);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  }





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
  return (
    <Layout >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <p class="text-white text-xl p-3  bg-dark-purple w-full">USER DETAILS</p>
          <form onSubmit={saveUser}>
            <div className='flex flex-row m-3 justify-around items-center'>
              <div className=''>
                <label for="first_name" class="block mb-6 text-base font-medium text-gray-900 p-1">Name</label>
                <label for="first_name" class="block mb-5 text-base font-medium text-gray-900 p-1">Username</label>
                <label for="first_name" class="block mb-5 text-base font-medium text-gray-900 p-1">Password</label>
                <label for="first_name" class="block mb-5 text-base font-medium text-gray-900 p-1">User Group</label>


              </div>
              <div >
                <input type="text" id="first_name" class="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-1.5 "
                  placeholder="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <input type="text" id="first_name" class="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-1.5 "
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <input type="text" id="first_name" class="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-1.5 "
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <select id="countries" class="bg-gray-50 mb-4  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option></option>
                  <option value="admin">Admin</option>
                  <option value="user">Basic user</option>
                  <option value="super">Super user</option>
                </select>
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
                onClick={() => deleteUser(va)}
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
        <fieldset className=''>
          <legend className='p-1 ml-3 text-xl text-blue-700'>Users</legend>
          <div className='flex items-end'>
            <img
              src={Icon}
              alt="Logo"
              width={169}
              height={140}
              className={` duration-200 ${open && " rotate-[360deg]"}`}
            />
            <button onClick={handleOpen} className='mb-3 bg-blue-600 rounded ml-6 text-gray-100 font-medium w-48 h-10 p-3 flex items-center justify-center' type="submit" name='Add'>
              Add
            </button>
          </div>
          <div className='m-3 mb-0 border border-dark-purple'>
            <table className="w-full   ">
              <thead>
                <tr className="bg-gray-200  text-gray-600 uppercase text-sm leading-normal">
                  <th className="border border-dark-purple py-3 px-3 text-center">No</th>
                  <th className="border border-dark-purple py-3 px-3 text-center">Username</th>
                  <th className="border border-dark-purple py-3 px-3 text-center">Employee name</th>
                  <th className=" border border-dark-purple py-3 px-3 text-center">User group</th>
                  <th className="border border-dark-purple py-3 px-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-600  text-sm font-light">
                {
                  users.map((use, index) => (
                    <tr key={use.uuid} className=" border-gray-400  hover:bg-gray-100 border-b-2">
                      <td className="p-0 border border-dark-purple">
                        <div className="flex items-center justify-center">
                          <span className="font-medium uppercase">{index + 1}</span>
                        </div>
                      </td>
                      <td className="p-0 border border-dark-purple">
                        <div className="flex items-center justify-center">
                          <span className="font-medium uppercase">{use.username}</span>
                        </div>
                      </td>
                      <td className="border border-dark-purple py-3 px-3 text-center">
                        <div className="flex items-center justify-center">
                          <span className="font-medium">{use.name}</span>
                        </div>
                      </td>
                      <td className="border border-dark-purple py-3 px-3 text-center">
                        <div className="flex items-center justify-center">
                          <span className="font-medium">{use.role}</span>
                        </div>
                      </td>
                      <td className="border border-dark-purple py-3 px-3 text-center">
                        <div className="flex item-center justify-center">
                          <div>
                            <Link
                              to={`/users/edit/${use.uuid}`}
                            >
                              <button className='flex items-center p-1 bg-green-600 text-white text-[1rem]'>
                                <BiEdit />Edit
                              </button>
                            </Link>

                          </div>
                          <div className='ml-3'>

                            <button
                              className='flex items-center p-1 bg-red text-white text-[1rem]'
                              onClick={() => handleOpen1(use.uuid)}
                            >
                              <MdDeleteSweep size={20} />Delete
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
          <div className='m-6 flex justify-end'>
          </div>
        </fieldset>
      </div>
    </Layout>
  )
}

export default Users