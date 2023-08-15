import React, { useState, useEffect } from 'react'
import { BiBookBookmark } from 'react-icons/bi'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Radio from '@mui/material/Radio';




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

const GroupStud = ({handleClose1}) => {
    const [open, setOpen] = useState(false);

    const [selectedValue, setSelectedValue] = useState('a');
    const [avalue, setAvalue] = useState(false)


    useEffect(() => {
        selectedValue === "b"
            ? setAvalue(true)
            : setAvalue(false)
        selectedValue === "a"
            ? setAvalue(false)
            : setAvalue(true)

    }, [selectedValue])

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };


    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Box sx={style} className='w-[52rem]' >
           <p class="text-white text-xl p-3  bg-dark-purple w-full">GROUP CLASSES STUDENTS</p>

        <div className='mt-3'>
            <div className='ml-4 mb-4'>
                <span className='text-base '> Selected Course </span> <span className='p-1 text-white text-xl w-auto bg-dark-purple rounded'>General English</span>
            </div>
            <div className='text-xl ml-3 text-blue-700'>GROUPS</div>
            <div className="bg-white  w-full ">
                <div className='flex'>
                <button onClick={handleOpen} className='bg-blue-600 rounded ml-3 text-gray-100 font-medium w-48 h-10 p-3 flex items-center justify-center' type="submit" name='Add'>
                    Add
                </button>
                <button onClick={handleOpen} className='bg-blue-600 rounded ml-3 text-gray-100 font-medium w-48 h-10 p-3 flex items-center justify-center' type="submit" name='Add'>
                    Send mail to group
                </button>
                </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} >
                        <p class="text-white text-xl p-3  bg-dark-purple w-full">Group Detail</p>
                        <form>
                            <div className='flex flex-row m-3 justify-around items-center'>
                                <div className=''>
                                    <label for="first_name" class="block mb-6 text-base font-medium text-gray-900 p-1 ">Name</label>
                                    <label for="first_name" class="block mb-5 text-base font-medium text-gray-900 p-1 ">Course</label>
                                    <label for="first_name" class="block mb-5 text-base font-medium text-gray-900 p-1 ">Start date</label>
                                    <label for="first_name" class="block mb-5 text-base font-medium text-gray-900 p-1 ">End date</label>
                                </div>
                                <div >
                                    
                                    <input type="text" id="first_name" class="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-2 " placeholder="name"  />
                                    <select id="countries" class="bg-gray-50 mb-4  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                        <option></option>
                                        <option value="US">myclassgroup</option>
                                        <option value="CA">secondgroup</option>
                                    </select>
                                    <input type="date" id="first_name" class="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-2 " placeholder="enrollement date"  />
                                   
                                    <input type="date" id="first_name" class="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-2 " placeholder="enrollement date"  />
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
                <fieldset className='m-3 h-52 mb-0 border border-dark-purple'>
                    <table className="w-full   ">
                        <thead>
                            <tr className="bg-gray-200  text-gray-600 uppercase text-sm leading-normal">
                                <th className=" py-3 px-3 text-center">N*</th>
                                <th className=" py-3 px-3 text-center">Course code</th>
                                <th className=" py-3 px-3 text-center">Course name </th>
                                <th className=" py-3 px-3 text-center">Type</th>
                                <th className=" py-3 px-3 text-center">Language</th>
                                <th className=" py-3 px-3 text-center">Action</th>


                            </tr>
                        </thead>
                        <tbody className="text-gray-600  text-sm font-light">
                            <tr className="border-b border-gray-200  hover:bg-gray-100">
                                <td className="p-0">
                                    <div className="flex items-center justify-center">
                                        <span className="font-medium uppercase">1</span>
                                    </div>
                                </td>

                                <td className="p-0">
                                    <div className="flex items-center justify-center">
                                        <span className="font-medium uppercase">EVLIEN</span>
                                    </div>
                                </td>


                                <td className=" py-3 px-3 text-center">
                                    <div className="flex items-center justify-center">
                                        <span className="font-medium">General ENglish</span>
                                    </div>
                                </td>

                                <td className=" py-3 px-3 text-center">
                                    <div className="flex items-center justify-center">
                                        <span className="font-medium">One on one</span>
                                    </div>
                                </td>

                                <td className=" py-3 px-3 text-center">
                                    <div className="flex items-center justify-center">
                                        <span className="font-medium">English</span>
                                    </div>
                                </td>

                                <td className=" py-3 px-3 text-center">
                                    <div className="flex item-center justify-center">
                                        <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                        </div>
                                        <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </div>
                                    </div>
                                </td>

                            </tr>




                        </tbody>
                    </table>
                </fieldset>
                <span className='text-sm ml-3 '>0 group</span>
                <div className='text-xl ml-3 text-blue-700'>STUDENTS IN SELECTED GROUP</div>

                <fieldset className='m-3 mb-0 h-52 border border-dark-purple'>
                    <table className="w-full   ">
                        <thead>
                            <tr className="bg-gray-200  text-gray-600 uppercase text-sm leading-normal">
                                <th className=" py-3 px-3 text-center">N*</th>
                                <th className=" py-3 px-3 text-center">Name</th>
                                <th className=" py-3 px-3 text-center">Email</th>
                                <th className=" py-3 px-3 text-center">Phone</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600  text-sm font-light">
                            <tr className="border-b border-gray-200  hover:bg-gray-100">
                                <td className="p-0">
                                    <div className="flex items-center justify-center">
                                        <span className="font-medium uppercase">1</span>
                                    </div>
                                </td>

                                <td className="p-0">
                                    <div className="flex items-center justify-center">
                                        <span className="font-medium uppercase">Miche Mario</span>
                                    </div>
                                </td>


                                <td className=" py-3 px-3 text-center">
                                    <div className="flex items-center justify-center">
                                        <span className="font-medium">michemario@mail.com</span>
                                    </div>
                                </td>

                                <td className=" py-3 px-3 text-center">
                                    <div className="flex items-center justify-center">
                                        <span className="font-medium">+229 96421088</span>
                                    </div>
                                </td>

                            </tr>




                        </tbody>
                    </table>
                </fieldset>
                <span className='text-sm ml-3 '>0 student in selected group</span>
                <div className='flex flex-row mr-20 justify-end mt-3 mb-3 '>
                                <button onClick={handleClose1} className='bg-blue-600 rounded text-gray-100 font-medium w-32 p-1 flex items-center justify-center' type="submit" name='Add'>
                                    Cancel
                                </button>
                            </div>
            </div>
        </div>
        </Box>
    )
}

export default GroupStud