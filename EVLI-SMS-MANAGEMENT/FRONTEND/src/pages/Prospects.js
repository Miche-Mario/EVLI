import { Checkbox } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Layout from '../components/Screens/Layout'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { getMe } from '../features/auth/authSlice'
import axios from 'axios'
import NoData from './NoData';

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
const Prospects = () => {



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
  }, [isError, navigate]);


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

  const [code, setCode] = useState("");


  const [open1, setOpen1] = useState(false);
  const handleOpen1 = (code) => {
    setOpen1(true);
    setCode(code)
  };
  const handleClose1 = () => {
    setOpen1(false);
  };


  const [open2, setOpen2] = useState(false);


  const [va, setVa] = useState("");

  const handleOpen2 = (uuid) => {
    setOpen2(true);
    setVa(uuid)
  };
  const handleClose2= () => {
    setOpen2(false);
  };





  const deleteProspect = async (userId) => {
    await axios.delete(`${process.env.REACT_APP_BASE_URL}/prospects/${userId}`, {
      user: user.id
    });
    getProspect();
    navigate(0);
  }
  ///////////////////////////////GET COURSES*/////////////////////

  const [courses, setCourses] = useState([]);

  const getCourses = async (e) => {

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/getcourses`,{
        classtype: "",
        language: "",
        active: ""
      });
      setCourses(response.data.rows)

      
    } catch (error) {
      if(error.response) {
        setMsg(error.response.data.msg);
      }
    }
  }

  ////////////////////////////GET LANGUAGE//////////////////////////
  
  const [languages, setLanguages] = useState([]);

  const getLanguages = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/language`);
    setLanguages(response.data)
  }


///////////////////////////////////GET ABOUT///////////////////////


const [abouts, setAbouts] = useState([]);

const getAbouts = async () => {
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/abouts`);
  setAbouts(response.data)
}
  /////////////////////////////////////////GET PROSPECTS//////////////////////////////*



  const [prospectdata, setProspectData] = useState()

  const [count, setCount] = useState();

  const getProspect = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/prospects`);
    setProspectData(response.data.rows)
    setCount(response.data.count)

  }


  useEffect(() => {
    getProspect()
    getCourses()
    getLanguages()
    getAbouts()
  }, [])


  ///////////////////////////////////////SAVE PROSPECT////////////////////////////
  const [surnameg, setSurnameg] = useState()
  const [forenamesg, setForenamesg] = useState()
  const [genderg, setGenderg] = useState()
  const [citizenshipg, setCitizenship] = useState()
  const [emailg, setEmailg] = useState()
  const [telhomeg, setTelhomeg] = useState()
  const [aboutidg, setAboutidg] = useState()
  const [startdate, setStartdate] = useState()
  const [coursewish, setCoursewish] = useState()

  const [maritalg, setMaritalg] = useState()


  const [msg, setMsg] = useState()

  const saveProspect = async (e) => {
    e.preventDefault();
    try {
       await axios.post(`${process.env.REACT_APP_BASE_URL}/prospectsin`, {
            surnameg: surnameg,
            forenamesg: forenamesg,
            genderg: genderg,
            maritalg: maritalg,
            citizenshipg: citizenshipg,
            startdate: startdate,
            emailg: emailg,
            telhomeg: telhomeg,
            coursewish: coursewish,
            about_aboutid: aboutidg,
            isstudent: false,
            user: user.id
      });
      console.log('ok');
      navigate(0);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  }


  const [citizenshipp, setCitizenshipp] = useState(["Afghan", "Albanian", "Algerian", "American", "Andorran", "Angolan", "Anguillan", "Argentine", "Armenian", "Australian", "Austrian", "Azerbaijani", "Bahamian", "Bahraini", "Bangladeshi", "Barbadian", "Belarusian", "Belgian", "Belizean", "Beninese", "Bermudian", "Bhutanese", "Bolivian", "Botswanan", "Brazilian", "British", "British Virgin Islander", "Bruneian", "Bulgarian", "Burkinan", "Burmese", "Burundian", "Cambodian", "Cameroonian", "Canadian,Cape Verdean", "Cayman Islander,Central African", "Chadian,Chilean", "Chinese", "Citizen of Antigua and Barbuda", "Citizen of Bosnia and Herzegovina", "Citizen of Guinea-Bissau", "Citizen of Kiribati", "Citizen of Seychelles", "Citizen of the Dominican Republic", "Citizen of Vanuatu", "Colombian", "Comoran", "Congolese (Congo)", "Congolese (DRC)", "Cook Islander", "Costa Rican", "Croatian", "Cuban", "Cymraes", "Cymro", "Cypriot", "Czech", "Danish", "Djiboutian", "Dominican", "Dutch", "East Timorese", "Ecuadorean", "Egyptian,Emirati", "English", "Equatorial Guinean", "Eritrean", "Estonian", "Ethiopian", "Faroese", "Fijian", "Filipino", "Finnish", "French", "Gabonese,Gambian", "Georgian,German", "Ghanaian", "Gibraltarian,Greek", "Greenlandic", "Grenadian", "Guamanian", "Guatemalan", "Guinean", "Guyanese", "Haitian", "Honduran", "Hong Konger", "Hungarian", "Icelandic,Indian", "Indonesian", "Iranian", "Iraqi,Irish", "Israeli,Italian", "Ivorian", "Jamaican", "Japanese", "Jordanian", "Kazakh", "Kenyan", "Kittitian", "Kosovan", "Kuwaiti", "Kyrgyz", "Lao", "Latvian", "Lebanese", "Liberian", "Libyan", "Liechtenstein citizen", "Lithuanian", "Luxembourger", "Macanese", "Macedonian", "Malagasy", "Malawian", "Malaysian", "Maldivian", "Malian", "Maltese", "Marshallese", "Martiniquais", "Mauritanian", "Mauritian", "Mexican", "Micronesian", "Moldovan", "Monegasque", "Mongolian", "Montenegrin", "Montserratian", "Moroccan", "Mosotho", "Mozambican", "Namibian", "Nauruan", "Nepalese", "New Zealander", "Nicaraguan", "Nigerian", "Nigerien", "Niuean", "North Korean", "Northern Irish", "Norwegian", "Omani", "Pakistani", "Palauan", "Palestinian", "Panamanian", "Papua New Guinean", "Paraguayan", "Peruvian", "Pitcairn Islander", "Polish", "Portuguese", "Prydeinig", "Puerto Rican", "Qatari", "Romanian", "Russian", "Rwandan", "Salvadorean", "Sammarinese", "Samoan", "Sao Tomean", "Saudi Arabian", "Scottish", "Senegalese", "Serbian", "Sierra Leonean", "Singaporean", "Slovak", "Slovenian", "Solomon Islander", "Somali", "South African", "South Korean", "South Sudanese", "Spanish", "Sri Lankan", "St Helenian", "St Lucian", "Stateless", "Sudanese", "Surinamese", "Swazi", "Swedish", "Swiss,Syrian", "Taiwanese", "Tajik", "Tanzanian", "Thai", "Togolese", "Tongan", "Trinidadian", "Tristanian", "Tunisian", "Turkish", "Turkmen", "Turks and Caicos Islander", "Tuvaluan", "Ugandan", "Ukrainian", "Uruguayan", "Uzbek", "Vatican citizen,Venezuelan", "Vietnamese", "Vincentian", "Wallisian", "Welsh", "Yemeni", "Zambian,Zimbabwean"])
  const [maritalstatus, setMaritalStatus] = useState(["Single", "Married", "Divorced", "Widowed"]);


  const handleCourseChange = () => {
    var lexam = document.getElementById("lecourse");
    var selectedText = lexam.options[lexam.selectedIndex].innerHTML;
    var selectedValue = lexam.value;
    setCoursewish(selectedText);
  }

  console.log(prospectdata);

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
                onClick={() => deleteProspect(va)}
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
          <p class="text-white text-xl p-3  bg-dark-purple w-full">WAITING LIST EDIT</p>
          <form onSubmit={saveProspect}>
            <div className='flex flex-row m-3 justify-around items-center'>
              <div className=''>
                <label for="first_name" class="block mb-6 text-base font-medium text-gray-900 p-1">Surname</label>
                <label for="first_name" class="block mb-5 text-base font-medium text-gray-900 p-1">Forenames</label>
                <label for="first_name" class="block mb-5 text-base font-medium text-gray-900 p-1">Gender</label>
                <label for="first_name" class="block mb-5 text-base font-medium text-gray-900 p-1">Marital Status</label>
                <label for="first_name" class="block mb-5 text-base font-medium text-gray-900 p-1">CoCiti</label>
                <label for="first_name" class="block mb-5 text-base font-medium text-gray-900 p-1">Enquery date</label>
                <label for="first_name" class="block mb-5 text-base font-medium text-gray-900 p-1">Email</label>
                <label for="first_name" class="block mb-5 text-base font-medium text-gray-900 p-1">Phone</label>
                <label for="first_name" class="block mb-5 text-base font-medium text-gray-900 p-1">Course</label>
                <label for="first_name" class="block mb-5 text-base font-medium text-gray-900 p-1">How did you hear about us ?</label>



              </div>
              <div >
                <input                 
                  onChange={(e) => setSurnameg(e.target.value) }
                  type="text" id="first_name" 
                  class="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-1.5 " placeholder="surname" 
                />
                <input 
                  onChange={(e) => setForenamesg(e.target.value) }
                  type="text" id="first_name" 
                  class="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-1.5 " 
                  placeholder="forenames" 
                />
                
                <select type="text" id="marital" class="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-1.5 " placeholder="" required
                  onChange={(e) => setGenderg(e.target.value) }
                  name="maritalg"
                >
                  <option></option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>   


                <select type="text" id="marital" class="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-1.5 " placeholder="" required
                  onChange={(e) => setMaritalg(e.target.value) }
                  name="maritalg"
                >
                  <option></option>
                  {
                    maritalstatus.map((marital, index) => (
                      <option value={marital}>{marital}</option>
                    ))
                  }
                </select>                
                
                <select type="text" id="Citizenship" class="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-1.5 " placeholder="" required
                  onChange={(e) => setCitizenship(e.target.value) }
                  name="citizenshipg"
                >
                  <option></option>
                  {
                    citizenshipp.map((citi, index) => (
                      <option value={citi}>{citi}</option>
                    ))
                  }
                </select>
                <input 
                  onChange={(e) => setStartdate(e.target.value) }
                  type="date" 
                  id="first_name" 
                  class="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-1.5 " 
                  placeholder="name" 
                />
                <input 
                  onChange={(e) => setEmailg(e.target.value) }
                  type="email" 
                  id="first_name" 
                  class="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-1.5 " 
                  placeholder="email"
                />
                <input 
                  onChange={(e) => setTelhomeg(e.target.value) }
                  type="text" 
                  id="first_name" 
                  class="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-1.5 " 
                  placeholder="phone" 
                />
                
                <select 
                  id="lecourse" 
                  onChange={handleCourseChange} 
                  class="bg-gray-50 mb-4  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                  >
                <option></option>
                  {
                    courses.map((course, index) => (
                      <option value={course.id} >{course.course.coursename} { course.subcourse && course.subcourse.subcoursename}</option>
                    ))
                  }
                </select>
             
                <select 
                  onChange={(e) => setAboutidg(e.target.value) }
                  id="countries" 
                  class="bg-gray-50 mb-4  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                  >
                <option></option>
                  {
                    abouts.map((ab, index) => (
                      <option value={ab.id}>{ab.aboutname}</option>
                    ))
                  }
                </select>
              </div>
            </div>
            <div className='flex flex-row justify-around  mt-3 mb-3'>
              <button  className='bg-blue-600 rounded text-gray-100 font-medium w-20 h-10 flex items-center justify-center' type="submit" name='Add'>
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
      >
        <Box className="center-col" sx={style1}>
         
            <div  className=' text-center bg-dark-purple p-2 text-white text-xl font-medium'>Prospect details</div>
            <div className='flex flex-row m-3 justify-center items-center'>
              <div className=''>
                <p  class="  text-2xl font-bold text-gray-900 p-1">Forenames:</p>
                <p  class="mt-2 text-2xl font-bold text-gray-900 p-1">Surname:</p> 
                <p  class="mt-2 text-2xl font-bold text-gray-900 p-1">Gender:</p>                      
                <p  class="mt-2 text-2xl font-bold text-gray-900 p-1">Marital Status:</p>                      
                <p  class="mt-2 text-2xl font-bold text-gray-900 p-1">Citizenship:</p>
                <p  class="mt-2 text-2xl font-bold text-gray-900 p-1">Enquery date:</p>    
                <p  class="mt-2 text-2xl font-bold text-gray-900 p-1">Email address:</p>                      
                <p  class="mt-2 text-2xl font-bold text-gray-900 p-1">Phne number:</p>                      
                <p  class="mt-2 text-2xl font-bold text-gray-900 p-1">Course:</p>                      
                <p  class="mt-2 text-2xl font-bold text-gray-900 p-1">Survey:</p>                      
              </div>
              <div >
               
                <p className=" mt-2 ml-4 bg-dark-purple text-xl text-white text-center rounded-lg block  w-[20rem] p-2">{ code.forenamesg ? code.forenamesg : "No data"}</p>
                <p className='mb-2 ml-4 mt-2 bg-dark-purple text-xl text-white text-center rounded-lg block  w-[20rem] p-2'>{code.surnameg ? code.surnameg : "No data"}</p>
                <p className='mb-2 ml-4 mt-2 bg-dark-purple text-xl text-white text-center rounded-lg block w-[20rem] p-2'>{code.genderg ? code.genderg : "No data"}</p>
                <p className='mb-2 ml-4 mt-2 bg-dark-purple text-xl text-white text-center rounded-lg block w-[20rem] p-2'>{code.citizenshipg ? code.citizenshipg : "No data"}</p>
                <p className='mb-2 ml-4 mt-2 bg-dark-purple text-xl text-white text-center rounded-lg block w-[20rem] p-2'>{code.startdate ? code.startdate : "No data"}</p>
                <p className='mb-2 ml-4 mt-2 bg-dark-purple text-xl text-white text-center rounded-lg block w-[20rem] p-2'>{code.emailg ? code.emailg : "No data"}</p>
                <p className='mb-2 ml-4 mt-2 bg-dark-purple text-xl text-white text-center rounded-lg block w-[20rem] p-2'>{code.telhomeg ? code.telhomeg : "No data"}</p>
                <p className='mb-2 ml-4 mt-2 bg-dark-purple text-xl text-white text-center rounded-lg block w-[20rem] p-2'>{code.coursewish ? code.coursewish : "No data"}</p>
                <p className='mb-2 ml-4 mt-2 bg-dark-purple text-xl text-white text-center rounded-lg block w-[20rem] p-2'>{code.about ? code.about.aboutname : "No data"}</p>




              </div>
           
          </div>
      
          <div className='flex justify-end mt-3 mb-3'>
              <button onClick={handleClose1} className='bg-blue-600 rounded mr-20 text-gray-100 font-medium w-32 h-10 flex items-center justify-center'>
                Ok
              </button>
            </div>

        </Box>
      </Modal>




      <div className='m-3'>
        <fieldset className='border  rounded border-dark-purple'>
          <legend className='p-1 ml-3 text-xl text-blue-700'>PROSPECTS</legend>
          <div className='flex ml-3 items-center'>

         



           
            <button onClick={handleOpen} className='bg-blue-600 rounded ml-3 text-gray-100 font-medium w-48 h-10 p-3 flex items-center justify-center' type="submit" name='Add'>
              Add
            </button>

          </div>

          <fieldset className='m-3 mb-0  border border-dark-purple'>
            <table className="w-full   ">
              <thead>
                <tr className="bg-gray-200  text-gray-600 uppercase text-sm leading-normal">
                  <th className=" py-3 px-3 text-center">Surname</th>
                  <th className=" py-3 px-3 text-center">Forenames</th>
                  <th className=" py-3 px-3 text-center">Gender</th>
                  <th className=" py-3 px-3 text-center">Citizenship</th>
                  <th className=" py-3 px-3  text-center">Inquiry date</th>
                  <th className=" py-3 px-3 text-center">Email</th>
                  <th className=" py-3 px-3 text-center">Phone</th>
                  <th className=" py-3 px-3 text-center">Course</th>
                  <th className=" py-3 px-3 text-center">Survey</th>
                  <th className=" py-3 px-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-600  text-sm font-light">
                { prospectdata &&  prospectdata.map((prospect, index) => (
                  <tr className="border-b border-gray-200  hover:bg-gray-100">
                    <td className="p-0">
                      <div className="flex items-center justify-center">
                        <span className="font-medium uppercase">{prospect.surnameg}</span>
                      </div>
                    </td>

                    <td className="p-0">
                      <div className="flex items-center justify-center">
                        <span className="font-medium uppercase">{prospect.forenamesg}</span>
                      </div>
                    </td>
                    <td className=" py-3 px-3 text-center">
                      <div className="flex items-center justify-center">
                        <span className="font-medium">{prospect.genderg}</span>
                      </div>
                    </td>
                    <td className=" py-3 px-3 text-center">
                      <div className="flex items-center justify-center">
                        <span className="font-medium">{prospect.citizenshipg}</span>
                      </div>
                    </td>
                    <td className=" py-3 px-3 text-center">
                      <div className="flex items-center justify-center">
                        <span className="font-medium">{prospect.startdate}</span>
                      </div>
                    </td>
                    <td className=" py-3 px-3 text-center">
                      <div className="flex items-center justify-center">
                        <span className="font-medium">{prospect.emailg}</span>
                      </div>
                    </td>
                    <td className=" py-3 px-3 text-center">
                      <div className="flex items-center justify-center">
                        <span className="font-medium">{prospect.telhomeg}</span>
                      </div>
                    </td>
                    <td className=" py-3 px-3 text-center">
                      <div className="flex items-center justify-center">
                        <span className="font-medium">{prospect.coursewish}</span>
                      </div>
                    </td>
                    <td className=" py-3 px-3 text-center">
                      <div className="flex items-center justify-center">
                        <span className="font-medium">{prospect.about && prospect.about.aboutname}</span>
                      </div>
                    </td>


                    <td className=" py-3 px-3 text-center">
                      <div className="flex item-center justify-center">
                        <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                              onClick={() => handleOpen1(prospect)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </div>
                        <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                        <NavLink to={`/addStudents/${prospect.uuid}`}>
                          <a>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                          </a>
                          </NavLink>
                        </div>
                        <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                                                          
                                onClick={() => handleOpen2(prospect.uuid)}

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
          <span className='text-sm ml-3 '>{count} student in selected group</span>
        </fieldset>
      </div>




    </Layout>
  )
}

export default Prospects