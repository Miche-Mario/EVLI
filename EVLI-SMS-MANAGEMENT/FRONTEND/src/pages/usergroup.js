import { Checkbox } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Layout from '../components/Screens/Layout'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import Image from 'next/image'
import Icon from '../assets/images.png'


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',

  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid darkblue',
  boxShadow: 24,
  p: 0,
  m: 0,
  height: 'auto'
};
const usergroup = () => {

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  const [open1, setOpen1] = useState(false);
  const handleOpen1 = () => {
    setOpen1(true);
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
        <Box sx={style} className='w-[32rem]'>
          <p class="text-white text-xl p-3  bg-dark-purple w-full">GROUP DETAILS</p>
          <form>
            <div className='flex flex-row m-3 justify-around items-center'>
              <div className=''>
                <label for="first_name" class="block mb-6 text-base font-medium text-gray-900 p-1">Name</label>
                        

              
              </div>
              <div >
              <input type="text" id="first_name" class="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-1.5 " placeholder="name" />

               
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




      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className='w-[52rem]' >
        <p class="text-white text-xl p-3  bg-dark-purple w-full">GROUP RIGHTS</p>

                  <div className='flex items-end'>


                      <Image
                          src={Icon}
                          alt="Logo"
                          width={169}
                          height={140}

                          className={` duration-200 ${open && " rotate-[360deg]"}`}
                      />
                      <div className=' text-green-600'>Group Admins has unlimited rights. Its rights can not be changed <br/> You can change access rights and allowed actions for 
                      other user groups. You can also define new user groups</div>
        </div>
        <div className='flex'>
            <p className='text-xl mt-1 ml-8 text-gray-900'>Expense type</p>
            <select id="countries" class="ml-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[40rem] p-1">
              <option value="US">All</option>
              <option value="CA">Accessoires</option>
              <option value="CA">Bills</option>
              <option value="CA">Cleaning</option>
              <option value="CA">Salaries</option>
            </select>
           
          </div>
          <div className='flex flex-row items-center'>
            <div className='w-[23rem] m-3 h-[27rem] border-2 border-dark-purple'>
                
                <div className='p-6'>
                    <p className='text-green-400 font-medium'>Access rights</p>
                    <Checkbox checked={true}/>
                    <span>Tools</span> <br/>

                    <Checkbox checked={true}/>
                    <span>Discount groups</span>
                    <br/>

                    <Checkbox checked={true}/>
                    <span>Options</span>
                    <br/>

                    <Checkbox checked={true}/>
                    <span>Expenses Types</span>
                    <br/>

                
                    
                </div>
            </div>

                <div className='w-[23rem] m-3 h-[27rem] border-2 border-dark-purple'>
                
                    <div className='p-6'>
                        <p className='text-green-400 font-medium'>Allowed actions</p>
                        <Checkbox checked={true}/>
                        <span>Add, edit, delete student course</span> <br/>

                        <Checkbox checked={true}/>
                        <span>Delete payments</span>
                        <br/>

                        <Checkbox checked={true}/>
                        <span>Edit course price</span>
                        <br/>

                        <Checkbox checked={true}/>
                        <span>Edit course price per class</span>
                        <br/>

                        
                        <Checkbox checked={true}/>
                        <span>Delete Expenses</span>
                        <br/>
                        
                </div>
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
 
        </Box>


      </Modal>




      <div className='m-3'>
        <fieldset className='border  rounded border-dark-purple'>
          <legend className='p-1 ml-3 text-xl text-blue-700'>ITEMS FOR SALE</legend>
        
        
            <div className='flex items-end'>
          
       
            <Image
                        src={Icon}
                        alt="Logo"
                        width={169}
                        height={140}
                        
                        className=  {` duration-200 ${open && " rotate-[360deg]"}`}
                    />
           
            <button onClick={handleOpen} className='mb-3 bg-blue-600 rounded ml-6 text-gray-100 font-medium w-48 h-10 p-3 flex items-center justify-center' type="submit" name='Add'>
              Add
            </button>
            <button onClick={handleOpen1} className='mb-3 bg-blue-600 rounded ml-6 text-gray-100 font-medium w-48 h-10 p-3 flex items-center justify-center' type="submit" name='Add'>
              User group rights
            </button>
           
          </div>

          <fieldset className='m-3 mb-0 h-52 border border-dark-purple'>
            <table className="w-full   ">
              <thead>
                <tr className="bg-gray-200  text-gray-600 uppercase text-sm leading-normal">
                  <th className=" py-3 px-3 text-center">N</th>
                  <th className=" py-3 px-3 text-center">Name</th>
                  <th className=" py-3 px-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-600  text-sm font-light">
                <tr className=" border-gray-400  hover:bg-gray-100 border-b-2">
                  <td className="p-0">
                    <div className="flex items-center justify-center">
                      <span className="font-medium uppercase">1</span>
                    </div>
                  </td>
                  <td className=" py-3 px-3 text-center">
                    <div className="flex items-center justify-center">
                      <span className="font-medium">Admins</span>
                    </div>
                  </td>
                 
                  <td className=" py-3 px-3 text-center">
                    <div className="flex item-center justify-center">
                      
                      <div onClick={handleOpen} className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                        
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </div>
                      <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </div>
                    </div>
                  </td>


                </tr>

                <tr className=" border-gray-400  hover:bg-gray-100 border-b-2">
                  <td className="p-0">
                    <div className="flex items-center justify-center">
                      <span className="font-medium uppercase">2</span>
                    </div>
                  </td>
                  <td className=" py-3 px-3 text-center">
                    <div className="flex items-center justify-center">
                      <span className="font-medium">BAsic users</span>
                    </div>
                  </td>
                 
                  <td className=" py-3 px-3 text-center">
                    <div className="flex item-center justify-center">
                      
                      <div onClick={handleOpen} className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                        
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </div>
                      <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </div>
                    </div>
                  </td>


                </tr>


                <tr className=" border-gray-400  hover:bg-gray-100 ">
                  <td className="p-0">
                    <div className="flex items-center justify-center">
                      <span className="font-medium uppercase">1</span>
                    </div>
                  </td>
                  <td className=" py-3 px-3 text-center">
                    <div className="flex items-center justify-center">
                      <span className="font-medium">Super user</span>
                    </div>
                  </td>
                 
                  <td className=" py-3 px-3 text-center">
                    <div className="flex item-center justify-center">
                      
                      <div onClick={handleOpen} className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                        
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </div>
                      <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </div>
                    </div>
                  </td>


                </tr>
                



              </tbody>
            </table>
          </fieldset>
          <div className='m-6 flex justify-end'>

  
         
          </div>
        </fieldset>
      </div>






















     
    </Layout>
  )
}

export default usergroup