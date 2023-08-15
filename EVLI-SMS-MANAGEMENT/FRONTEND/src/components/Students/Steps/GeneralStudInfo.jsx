import React, { useState, useContext } from 'react'
import { StepperContext } from '../../../contexts/stepperContext'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Avatar from '../../../assets/avatar.png'
import Idscan from '../../../assets/idscan.jpg'
import axios from 'axios';
import { RiImageAddFill } from 'react-icons/ri'
import { useEffect } from 'react';

const GeneralStudInfo = () => {
  const { studentData, setStudentData } = useContext(StepperContext)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value })
  }
  const [img, setImg] = useState('')
  const [simg, ssetImg] = useState('')

  const onImageChange = (e) => {
    const [file] = e.target.files
    setImg(e.target.files[0]);
    ssetImg(URL.createObjectURL(file));
    setStudentData({ ...studentData, passportphotographg: e.target.files[0] })

  };


  const [img1, setImg1] = useState('')
  const [simg1, ssetImg1] = useState('')

  const onImageChange1 = (e) => {
    const [file] = e.target.files
    setImg1(e.target.files[0]);
    ssetImg1(URL.createObjectURL(file));
    setStudentData({ ...studentData, idscang: e.target.files[0] })
  };

  const [abouts, setAbouts] = useState([]);

  const getAbouts = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/abouts`);
    setAbouts(response.data)
  }

  const [citizenship, setCitizenship] = useState(["Afghan","Albanian","Algerian","American","Andorran","Angolan","Anguillan","Argentine","Armenian","Australian","Austrian","Azerbaijani","Bahamian","Bahraini","Bangladeshi","Barbadian","Belarusian","Belgian","Belizean","Beninese","Bermudian","Bhutanese","Bolivian","Botswanan","Brazilian","British","British Virgin Islander","Bruneian","Bulgarian","Burkinan","Burmese","Burundian","Cambodian","Cameroonian","Canadian,Cape Verdean","Cayman Islander,Central African","Chadian,Chilean","Chinese","Citizen of Antigua and Barbuda","Citizen of Bosnia and Herzegovina","Citizen of Guinea-Bissau","Citizen of Kiribati","Citizen of Seychelles","Citizen of the Dominican Republic","Citizen of Vanuatu","Colombian","Comoran","Congolese (Congo)","Congolese (DRC)","Cook Islander","Costa Rican","Croatian","Cuban","Cymraes","Cymro","Cypriot","Czech","Danish","Djiboutian","Dominican","Dutch","East Timorese","Ecuadorean","Egyptian,Emirati","English","Equatorial Guinean","Eritrean","Estonian","Ethiopian","Faroese","Fijian","Filipino","Finnish","French","Gabonese,Gambian","Georgian,German","Ghanaian","Gibraltarian,Greek","Greenlandic","Grenadian","Guamanian","Guatemalan","Guinean","Guyanese","Haitian","Honduran","Hong Konger","Hungarian","Icelandic,Indian","Indonesian","Iranian","Iraqi,Irish","Israeli,Italian","Ivorian","Jamaican","Japanese","Jordanian","Kazakh","Kenyan","Kittitian","Kosovan","Kuwaiti","Kyrgyz","Lao","Latvian","Lebanese","Liberian","Libyan","Liechtenstein citizen","Lithuanian","Luxembourger","Macanese","Macedonian","Malagasy","Malawian","Malaysian","Maldivian","Malian","Maltese","Marshallese","Martiniquais","Mauritanian","Mauritian","Mexican","Micronesian","Moldovan","Monegasque","Mongolian","Montenegrin","Montserratian","Moroccan","Mosotho","Mozambican","Namibian","Nauruan","Nepalese","New Zealander","Nicaraguan","Nigerian","Nigerien","Niuean","North Korean","Northern Irish","Norwegian","Omani","Pakistani","Palauan","Palestinian","Panamanian","Papua New Guinean","Paraguayan","Peruvian","Pitcairn Islander","Polish","Portuguese","Prydeinig","Puerto Rican","Qatari","Romanian","Russian","Rwandan","Salvadorean","Sammarinese","Samoan","Sao Tomean","Saudi Arabian","Scottish","Senegalese","Serbian","Sierra Leonean","Singaporean","Slovak","Slovenian","Solomon Islander","Somali","South African","South Korean","South Sudanese","Spanish","Sri Lankan","St Helenian","St Lucian","Stateless","Sudanese","Surinamese","Swazi","Swedish","Swiss,Syrian","Taiwanese","Tajik","Tanzanian","Thai","Togolese","Tongan","Trinidadian","Tristanian","Tunisian","Turkish","Turkmen","Turks and Caicos Islander","Tuvaluan","Ugandan","Ukrainian","Uruguayan","Uzbek","Vatican citizen,Venezuelan","Vietnamese","Vincentian","Wallisian","Welsh","Yemeni","Zambian,Zimbabwean"])
  const [maritalstatus, setMaritalStatus] = useState(["Single", "Married", "Divorced", "Widowed"]);
  const [academiclevel, setAcademinlevel] = useState(["Primary School", "Junior Secondary/High School","Senior Secondary School","Baccalaureate", "Bachelor degree", "Doctorat", "Phd"]);

  useEffect(() => {
    getAbouts()
  }, [])
  return (
    <div className='flex flex-row  w-full'>
      <div class=" bg-white w-[65rem]  border border-blue-300 p-3 pb-0">

        <form>
          <div class="grid gap-6 mb-6 lg:grid-cols-4">
           {/*  <div>
              <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900">Student ID</label>
              <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" required
                name="studentId"
              />
            </div> */}
            <div>
              <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900   ">Surname <strong className=' text-red font-medium'>(*)</strong></label>
              <input type="text" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder=""
                onChange={handleChange}
                name="surnameg"
                value={studentData["surnameg"] || ""}
                required
              />
            </div>
            <div>
              <label for="company" class="block mb-2 text-sm font-medium text-gray-900   ">Forenames <strong className=' text-red font-medium'>(*)</strong></label>
              <input type="text" id="company" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="" required
                onChange={handleChange}
                name="forenamesg"
                value={studentData["forenamesg"] || ""}
              />
            </div>
            <div>
              <label for="phone" class="block mb-2 text-sm font-medium text-gray-900   ">Gender</label>
              <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                onChange={handleChange}
                name="genderg"
                value={studentData["genderg"] || ""}
              >
                <option></option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label for="dateofbirth" class="block mb-2 text-sm font-medium text-gray-900 ">Date of Birth</label>
              <input type="date" id="dateofbirth" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required
                onChange={handleChange}
                name="dateofbirthg"
                value={studentData["dateofbirthg"] || ""}
              />
            </div>
            <div>
              <label for="placeofbirth" class="block mb-2 text-sm font-medium text-gray-900 ">Place of Birth</label>
              <input type="text" id="placeofbirth" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" required
                onChange={handleChange}
                name="placeofbirthg"
                value={studentData["placeofbirthg"] || ""}
              />
            </div>
            <div>
              <label for="Citizenship" class="block mb-2 text-sm font-medium text-gray-900 ">Citizenship <strong className=' text-red font-medium'>(*)</strong></label>
              <select type="text" id="Citizenship" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" required
                onChange={handleChange}
                name="citizenshipg"
                value={studentData["citizenshipg"] || ""}
              >
                 <option></option>
                {
                  citizenship.map((citi, index) => (
                    <option value={citi}>{citi}</option>
                  ))
                }
              </select>
            </div>
            <div>
              <label for="occupation" class="block mb-2 text-sm font-medium text-gray-900">Occupation</label>
              <input type="text" id="occupation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" required
                onChange={handleChange}
                name="occupationg"
                value={studentData["occupationg"] || ""}
              />
            </div>
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email Adress</label>
              <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="" required
                onChange={handleChange}
                name="emailg"
                value={studentData["emailg"] || ""}
              />
            </div>
            <div>
              <label for="phonehome" class="block mb-2 text-sm font-medium text-gray-900   ">Tel. (Home) <strong className=' text-red font-medium'>(*)</strong></label>
              <input type="text" id="phonehome" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required
                onChange={handleChange}
                name="telhomeg"
                value={studentData["telhomeg"] || ""}
              />
            </div>
            <div>
              <label for="phoneghana" class="block mb-2 text-sm font-medium text-gray-900   ">Tel. (Ghana)</label>
              <input type="text" id="phoneghana" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required
                onChange={handleChange}
                name="telghanag"
                value={studentData["telghanag"] || ""}
              />
            </div>
            <div>
              <label for="adresshome" class="block mb-2 text-sm font-medium text-gray-900   ">Adresse (Home)</label>
              <input type="text" id="adresshome" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" required
                onChange={handleChange}
                name="addresshomeg"
                value={studentData["addresshomeg"] || ""}
              />
            </div>
            <div>
              <label for="adressghana" class="block mb-2 text-sm font-medium text-gray-900   ">Adresse. (Ghana)</label>
              <input type="text" id="adressghana" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" required
                onChange={handleChange}
                name="addressghana"
                value={studentData["addressghana"] || ""}
              />
            </div>
            <div>
              <label for="marital" class="block mb-2 text-sm font-medium text-gray-900">Marital Status</label>
              <select type="text" id="marital" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" required
                onChange={handleChange}
                name="maritalg"
                value={studentData["maritalg"] || ""}
              >
                <option></option>
                {
                  maritalstatus.map((marital, index) => (
                    <option value={marital}>{marital}</option>
                  ))
                }
              </select>
            </div>
            <div>
              <label for="passport" class="block mb-2 text-sm font-medium text-gray-900 ">Passeport/ID No <strong className=' text-red font-medium'>(*)</strong></label>
              <input type="text" id="passport" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" required
                onChange={handleChange}
                name="passportidg"
                value={studentData["passportidg"] || ""}
              />
            </div>
            <div>
              <label for="academiclevelg" class="block mb-2 text-sm font-medium text-gray-900">Academic level</label>
              <select type="text" id="academiclevelg" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" required
                onChange={handleChange}
                name="academiclevelg"
                value={studentData["academiclevelg"] || ""}
              >
                <option></option>
                {
                  academiclevel.map((item, index) => (
                    <option value={item}>{item}</option>
                  ))
                }
              </select>
            </div>
            <div>
              <label for="note" class="block mb-2 text-sm font-medium text-gray-900">Note</label>
              <textarea type="text" id="note" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" required
                onChange={handleChange}
                name="noteg"
                value={studentData["noteg"] || ""}
              />
            </div>
            <div>
              <label for="about" class="block mb-2 text-sm font-medium text-gray-900">How did you hear about EVLI</label>
              <select id="about" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                onChange={handleChange}
                name="aboutidg"
                value={studentData["aboutidg"] || ""}
              >
                <option></option>
                {
                  abouts.map((about, index) => (
                    <option value={about.id}>{about.aboutname}</option>
                  ))
                }
              </select>
            </div>
          </div>
        </form>

      </div>
      <div class="ml-6">

        <div class="flex items-center justify-center w-full">
          <div className=''>
            <img class=" h-52"
              src={simg ? simg : Avatar}
              alt="" />
            <div className='-mt-10'>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Button variant="contained" component="label">
                  <RiImageAddFill style={{ fontSize: 20, marginRight: 4 }} />
                  Upload
                  <input onChange={onImageChange} hidden accept="image/*" name="passportphotographg" multiple type="file" />
                </Button>
                <IconButton color="primary" aria-label="upload picture" component="label">
                  <input hidden accept="image/*" type="file" />
                </IconButton>
              </Stack>
            </div>

          </div>
        </div>

        <p class="mt-2 text-center">Passport Photograph</p>

        <div class="flex items-center justify-center w-full">
          <div >
            <img class=" h-52"
              src={simg1 ? simg1 : Idscan}
              alt="" />
            <div className='-mt-10'>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Button variant="contained" component="label">
                  <RiImageAddFill style={{ fontSize: 20, marginRight: 4 }} />
                  Upload
                  <input onChange={onImageChange1} hidden accept="image/*" name="idscang" multiple type="file" />
                </Button>
                <IconButton color="primary" aria-label="upload picture" component="label">
                  <input hidden accept="image/*" type="file" />
                </IconButton>
              </Stack>
            </div>

          </div>
        </div>

        <p class="mt-2 text-center">ID SCAN</p>

      </div>
    </div>
  )
}

export default GeneralStudInfo