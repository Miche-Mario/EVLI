import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Layout from './Screens/Layout'
import { FaCamera } from 'react-icons/fa'
import ModalImage from "react-modal-image";
import { TiInfoOutline } from 'react-icons/ti'
import { GiTakeMyMoney } from 'react-icons/gi'
import { MdOutlinePayments } from "react-icons/md"
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Moment from "moment"
import Avatar from '../assets/avatar.png'

const style = {
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



const StudentProfile = () => {
    const [msg, setMsg] = useState("");

    const { user } = useSelector(
        (state) => state.auth
    );

    const { id } = useParams();
    const [student, setStudent] = useState()


    ////////////////////////// GET STUDENT DATA ////////////////////////////////////////////////////////////////////
    const getStudent = async () => {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/students/${id}`);
        setStudent(response.data)
    }


    const [program, setProgram] = useState()
    const getProgram = async (e) => {

        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/getprogram/${id}`);
            setProgram(response.data)
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
                console.log(msg)
            }
        }
    }














    const [showall, setShowAll] = useState()
    const [hideShowAll, setHideShowAll] = useState(false)

    useEffect(() => {
        getStudent();
        setShowAll(false)
        getProgram()
    }, [])

    function separator(numb) {
        var str = numb.toString().split(".");
        str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return str.join(".");
    }


    const [open1, setOpen1] = useState(false);
    const [va, setVa] = useState("");

    const [modalprogram, setProgramModal] = useState("");

    const handleOpen1 = (data) => {
      setOpen1(true);
      setProgramModal(data)    
    };
    const handleClose1 = () => {
      setOpen1(false);
    };

    return (
        <Layout>

<Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <p class="text-white text-xl p-3  bg-dark-purple w-full">PROGRAM DETAILS</p>
          {
            modalprogram && modalprogram.map((program, index) => (
                <>
                <div className='flex flex-row m-3 justify-center items-center'>
                <div className=''>
                  <p  class="  text-2xl font-bold text-gray-900 p-1">Course Description:</p>
                  <p  class="mt-2 text-2xl font-bold text-gray-900 p-1">Start Date:</p> 
                  <p  class="mt-2 text-2xl font-bold text-gray-900 p-1">End Date:</p>                      
                </div>
                <div >
                 
                  <p className='mb-2 ml-4 mt-2 bg-dark-purple text-xl text-white text-center rounded-lg block  w-[20rem] p-2'>{program.coursedescription}</p>
                  <p className='mb-2 ml-4 mt-2 bg-dark-purple text-xl text-white text-center rounded-lg block w-[20rem] p-2'>{Moment(program.startdate).format('YYYY-MM-DD')}</p>
                  <p className='mb-2 ml-4 mt-2 bg-dark-purple text-xl text-white text-center rounded-lg block w-[20rem] p-2'>{Moment(program.finaldate).format('YYYY-MM-DD')}</p>  
  
                </div>
             
            </div>
            <div className=' text-center'>-------------------------------------------------------------------------</div>
            </>
            ))
           }
        </Box>


      </Modal>
            <div>
                <div class="bg-gray-100">
                    <div class="container mx-auto my-5 p-5">
                        <div class="md:flex no-wrap md:-mx-2 ">
                            {/* Left Side */}
                            <div class="w-full md:w-3/12 md:mx-2">
                                {/* Profile Card */}
                                <div class="bg-white p-3 border-t-4 border-green-400">
                                    <div class="image overflow-hidden">
                                        <ModalImage
                                            small={(student && student.passportphotographg) ? student.passportphotographg : Avatar}
                                            large={(student && student.passportphotographg) ? student.passportphotographg : Avatar}
                                            alt=""
                                            hideDownload={true}
                                            hideZoom={true}
                                            className="modal-image"
                                        />
                                    </div>
                                    <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">{student && student.surnameg} {student && student.forenamesg}</h1>
                                    <h3 class="text-gray-600 font-lg text-semibold leading-6">{student && student.occupationg}</h3>
                                    <p class="text-sm text-gray-500 hover:text-gray-600 leading-6">{student && student.noteg}</p>
                                    <ul
                                        class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                        <li class="flex items-center py-3">
                                            <span>Status</span>
                                            <span class="ml-auto"><span
                                                class="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span></span>
                                        </li>
                                        <li class="flex items-center py-3">
                                            <span>Start Date</span>
                                            <span class="ml-auto">{student && Moment(student.startdate).format('YYYY-MM-DD')}</span>
                                        </li>
                                        <li class="flex items-center py-3">
                                            <span>End Date</span>
                                            <span class="ml-auto">{student && Moment(student.enddate).format('YYYY-MM-DD')}</span>
                                        </li>
                                    </ul>
                                </div>
                                {/* End of profile card */}
                                <div class="my-4"></div>
                                {/* Friends card */}
                                <div class="bg-white p-3 hover:shadow">
                                    <div class="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                                        <span class="text-green-500">
                                            <FaCamera style={{ fontSize: 45, }} />
                                        </span>
                                        <span>Passport Photograph</span>
                                    </div>
                                    <div>
                                        <div className='w-full h-auto'>
                                            <ModalImage
                                                 small={(student && student.idscang) ? student.idscang : Avatar}
                                                 large={(student && student.idscang) ? student.idscang : Avatar}
                                                alt=""
                                                hideDownload={true}
                                                hideZoom={true}
                                                className="modal-image"
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* End of friends card */}
                            </div>
                            {/* Right Side */}
                            <div class="w-full md:w-9/12 mx-2 h-64">
                                {/* Profile tab */}
                                {/* About Section */}
                                <div class="bg-white p-3 shadow-sm rounded-sm">
                                    <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                        <TiInfoOutline style={{ fontSize: 35 }} />
                                        <span class="tracking-wide font-bold text-xl">General Information</span>
                                    </div>
                                    <div class="text-gray-700">
                                        <div class="grid md:grid-cols-2 text-sm">
                                            <div class="grid grid-cols-2">
                                                <div class="px-4 py-2 font-semibold">First Name</div>
                                                <div class="px-4 py-2">{student && student.forenamesg}</div>
                                            </div>
                                            <div class="grid grid-cols-2">
                                                <div class="px-4 py-2 font-semibold">Last Name</div>
                                                <div class="px-4 py-2">{student && student.surnameg}</div>
                                            </div>
                                            <div class="grid grid-cols-2">
                                                <div class="px-4 py-2 font-semibold">Gender</div>
                                                <div class="px-4 py-2">{student && student.genderg}</div>
                                            </div>
                                            <div class="grid grid-cols-2">
                                                <div class="px-4 py-2 font-semibold">Date of Birth</div>
                                                <div class="px-4 py-2">{student && student.dateofbirthg}</div>
                                            </div>
                                            <div class="grid grid-cols-2">
                                                <div class="px-4 py-2 font-semibold">Date of Birth</div>
                                                <div class="px-4 py-2">{student && student.placeofbirthg}</div>
                                            </div>
                                            <div class="grid grid-cols-2">
                                                <div class="px-4 py-2 font-semibold">Citizenship</div>
                                                <div class="px-4 py-2">{student && student.citizenshipg}</div>
                                            </div>
                                            <div class="grid grid-cols-2">
                                                <div class="px-4 py-2 font-semibold">Email.</div>
                                                <div class="px-4 py-2">
                                                    <a class="text-blue-800" href="mailto:jane@example.com">{student && student.emailg}</a>
                                                </div>
                                            </div>
                                            <div class="grid grid-cols-2">
                                                <div class="px-4 py-2 font-semibold">Home Tel.</div>
                                                <div class="px-4 py-2">{student && student.telhomeg}</div>
                                            </div>
                                            <div class="grid grid-cols-2">
                                                <div class="px-4 py-2 font-semibold">Ghana Tel.</div>
                                                <div class="px-4 py-2">{student && student.telghanag}</div>
                                            </div>
                                            <div class="grid grid-cols-2">
                                                <div class="px-4 py-2 font-semibold">Current Address</div>
                                                <div class="px-4 py-2">{student && student.addressghanag}</div>
                                            </div>
                                            <div class="grid grid-cols-2">
                                                <div class="px-4 py-2 font-semibold">Home Address</div>
                                                <div class="px-4 py-2">{student && student.addresshomeg}</div>
                                            </div>
                                            <div class="grid grid-cols-2">
                                                <div class="px-4 py-2 font-semibold">Marital Status</div>
                                                <div class="px-4 py-2">{student && student.maritalg}</div>
                                            </div>
                                            <div class="grid grid-cols-2">
                                                <div class="px-4 py-2 font-semibold">Passport ID</div>
                                                <div class="px-4 py-2">{student && student.passportidg}</div>
                                            </div>
                                            <div class="grid grid-cols-2">
                                                <div class="px-4 py-2 font-semibold">Academic Level</div>
                                                <div class="px-4 py-2">{student && student.academicg}</div>
                                            </div>
                                            <div class="grid grid-cols-2">
                                                <div class="px-4 py-2 font-semibold">How did {student && student.genderg === "female" ? "she" : "he"} hear about us ?</div>
                                                <div class="px-4 py-2">{student && student.aboutidg}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {!showall &&
                                        <button
                                            onClick={() => setShowAll(true)}
                                            class="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">Show
                                            Full Information</button>}




                                    {showall && <>

                                        <button
                                            onClick={() => setShowAll(false)}
                                            class="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">Hide Source of Funding</button>

                                        <div class="flex items-center spac
                                    e-x-2 font-semibold text-gray-900 mt-4 leading-8">
                                            <GiTakeMyMoney style={{ fontSize: 35 }} />
                                            <span class="tracking-wide font-bold text-xl">Source of Funding</span>
                                        </div>
                                        <p className='mt-5 ml-3 text-lg font-semibold'>Emergency</p>
                                        <div class="text-gray-700">
                                            <div class="grid md:grid-cols-2 text-sm">
                                                <div class="grid grid-cols-2">
                                                    <div class="px-4 py-2 font-semibold">Surname</div>
                                                    <div class="px-4 py-2">{student && student.surnamee}</div>
                                                </div>
                                                <div class="grid grid-cols-2">
                                                    <div class="px-4 py-2 font-semibold">Firstname</div>
                                                    <div class="px-4 py-2">{student && student.forenamese}</div>
                                                </div>
                                                <div class="grid grid-cols-2">
                                                    <div class="px-4 py-2 font-semibold">Gender</div>
                                                    <div class="px-4 py-2">{student && student.gendere}</div>
                                                </div>
                                                <div class="grid grid-cols-2">
                                                    <div class="px-4 py-2 font-semibold">Relationship</div>
                                                    <div class="px-4 py-2">{student && student.relationshipe}</div>
                                                </div>
                                                <div class="grid grid-cols-2">
                                                    <div class="px-4 py-2 font-semibold">Occupation</div>
                                                    <div class="px-4 py-2">{student && student.occupatione}</div>
                                                </div>
                                                <div class="grid grid-cols-2">
                                                    <div class="px-4 py-2 font-semibold">Email</div>
                                                    <div class="px-4 py-2">{student && student.emaile}</div>
                                                </div>
                                                <div class="grid grid-cols-2">
                                                    <div class="px-4 py-2 font-semibold">Tel 1.</div>
                                                    <div class="px-4 py-2">{student && student.tel1e}</div>
                                                </div>
                                                <div class="grid grid-cols-2">
                                                    <div class="px-4 py-2 font-semibold">Tel 2.</div>
                                                    <div class="px-4 py-2">{student && student.tel2e}</div>
                                                </div>
                                                <div class="grid grid-cols-2">
                                                    <div class="px-4 py-2 font-semibold">Address</div>
                                                    <div class="px-4 py-2">{student && student.addresse}</div>
                                                </div>
                                            </div>

                                        </div>
                                        <p className='mt-5 ml-3 text-lg font-semibold'>Parent / Guardian</p>
                                        <div class="text-gray-700">
                                            <div class="grid md:grid-cols-2 text-sm">
                                                <div class="grid grid-cols-2">
                                                    <div class="px-4 py-2 font-semibold">Surname</div>
                                                    <div class="px-4 py-2">{student && student.surnamep}</div>
                                                </div>
                                                <div class="grid grid-cols-2">
                                                    <div class="px-4 py-2 font-semibold">Firstname</div>
                                                    <div class="px-4 py-2">{student && student.forenamesp}</div>
                                                </div>
                                                <div class="grid grid-cols-2">
                                                    <div class="px-4 py-2 font-semibold">Gender</div>
                                                    <div class="px-4 py-2">{student && student.genderp}</div>
                                                </div>
                                                <div class="grid grid-cols-2">
                                                    <div class="px-4 py-2 font-semibold">Relationship</div>
                                                    <div class="px-4 py-2">{student && student.relationshipp}</div>
                                                </div>
                                                <div class="grid grid-cols-2">
                                                    <div class="px-4 py-2 font-semibold">Occupation</div>
                                                    <div class="px-4 py-2">{student && student.occupationp}</div>
                                                </div>
                                                <div class="grid grid-cols-2">
                                                    <div class="px-4 py-2 font-semibold">Email</div>
                                                    <div class="px-4 py-2">{student && student.emailp}</div>
                                                </div>
                                                <div class="grid grid-cols-2">
                                                    <div class="px-4 py-2 font-semibold">Tel 1.</div>
                                                    <div class="px-4 py-2">{student && student.tel1p}</div>
                                                </div>
                                                <div class="grid grid-cols-2">
                                                    <div class="px-4 py-2 font-semibold">Tel 2.</div>
                                                    <div class="px-4 py-2">{student && student.tel2p}</div>
                                                </div>
                                                <div class="grid grid-cols-2">
                                                    <div class="px-4 py-2 font-semibold">Address</div>
                                                    <div class="px-4 py-2">{student && student.addressp}</div>
                                                </div>
                                            </div>




                                        </div>

                                        <p className='mt-5 ml-3 text-lg font-semibold'>Organisation</p>
                                        <div class="text-gray-700">
                                            <div class="grid md:grid-cols-2 text-sm">
                                                <div class="grid grid-cols-2">
                                                    <div class="px-4 py-2 font-semibold">Name</div>
                                                    <div class="px-4 py-2">{student && student.nameo}</div>
                                                </div>
                                                <div class="grid grid-cols-2">
                                                    <div class="px-4 py-2 font-semibold">Email</div>
                                                    <div class="px-4 py-2">{student && student.emailo}</div>
                                                </div>
                                                <div class="grid grid-cols-2">
                                                    <div class="px-4 py-2 font-semibold">Contact.</div>
                                                    <div class="px-4 py-2">{student && student.contacto}</div>
                                                </div>
                                                <div class="grid grid-cols-2">
                                                    <div class="px-4 py-2 font-semibold">Tel 1.</div>
                                                    <div class="px-4 py-2">{student && student.tel1o}</div>
                                                </div>
                                                <div class="grid grid-cols-2">
                                                    <div class="px-4 py-2 font-semibold">Tel 2.</div>
                                                    <div class="px-4 py-2">{student && student.tel2o}</div>
                                                </div>
                                                <div class="grid grid-cols-2">
                                                    <div class="px-4 py-2 font-semibold">Address</div>
                                                    <div class="px-4 py-2">{student && student.addresso}</div>
                                                </div>
                                            </div>




                                        </div></>}




                                </div>
                                {/* End of about section */}

                                <div class="my-4"></div>
                                {/* About Section */}
                                <div class="bg-white p-3 shadow-sm rounded-sm">
                                    <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                        <MdOutlinePayments style={{ fontSize: 35 }} />
                                        <span class="tracking-wide font-bold text-xl">Programs</span>
                                    </div>
                                    <div class="text-gray-700">
                                        <div class="text-gray-700">

                                            {
                                                program && program.map((program, index) => (
                                                    <>
                                                    <div class="grid md:grid-cols-2 text-sm">

                                                    <div class="grid grid-cols-2">

                                                        <div class="px-4 py-2 font-semibold">Course Description</div>

                                                    <div className='flex flew-row justify-between'>

                                                        <div class="px-4 py-2">{program.course.description}</div>
                                                        <div  class=" bg-green-500 cursor-pointer hover:shadow-lg rounded-lg p-2 text-white"
                                                              onClick={() => {handleOpen1(program.details);  console.log(program.details)}}
                                                        >
                                                            Details
                                                        </div>

                                                        </div>
   
                                                        <div className='flex flew-row justify-between'>
                                                        <div>
                                                            <div class="px-4 py-2 font-semibold">Start Date</div>
                                                            <div class="px-4 py-2 font-semibold">End Date</div>

                                                        </div>
                                                        <div>
                                                            <div class="px-4 py-2">{program.startdate}</div>
                                                            <div class="px-4 py-2">{program.enddate}</div>
                                                        </div>
                                                        </div>
                                                    </div>
                                                </div>
                                               <div>------------------------------------------------------------------------------</div>
</>
                                               
                                                ))
                                                
                                            }



                                        </div>

                                    </div>











                                </div>
                                {/* End of about section */}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default StudentProfile