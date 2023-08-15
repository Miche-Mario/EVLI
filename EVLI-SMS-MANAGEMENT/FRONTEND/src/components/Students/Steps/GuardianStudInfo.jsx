import React, { useContext, useEffect, useState } from 'react'
import { StepperContext } from '../../../contexts/stepperContext'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const GuardianStudInfo = () => {
  const [myself, setMyself] = useState(false)
  const [parent, setParent] = useState(false)
  const [organisation, setOrganisation] = useState(false)
  const [onField, setOnField] = useState('')

  const { studentData, setStudentData } = useContext(StepperContext)
  const handleChangee = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value })
  }

useEffect(() => {
  console.log(studentData.passportidg);
  if (studentData.passportidg === undefined || studentData.passportidg === "") {
    toast.error("Please field in an ID or a Passport")
  }
  if (studentData.surnameg === undefined || studentData.surnameg === "") {
    toast.error("Please field in a surname")
  }
  if (studentData.forenamesg === undefined || studentData.forenamesg === "") {
    toast.error("Please field in a forename")
  }
}, [])
 

  const handleChange = (e) => {
    setOnField(e.target.value)
  }

  const onClick = () => {
    if (onField == "1") {
      setMyself(true);
      setParent(false);
      setOrganisation(false);
    }
    if (onField == "2") {
      setMyself(true);
      setParent(true);
      setOrganisation(false);
    }
    if (onField == "3") {
      setMyself(true);
      setParent(false);
      setOrganisation(true);
    }

    if (onField == "33") {
      setMyself(false);
      setParent(false);
      setOrganisation(false);
    }
  }

  return (
    <div>
      <div >
        <div className=' text-xl'>SOURCE OF FUNDING</div>
        <ToastContainer style={{fontSize: 20}} position="top-right"/>
        <select class="bg-blue-100 border border-gray-300 text-gray-900 text-xl p-3 focus:ring-blue-500 
        focus:border-blue-500 block  dark:bg-gray-700 w-[42rem] dark:border-gray-600 dark:placeholder-gray-400
         dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
         value={onField} onChange={handleChange} onClick={onClick}>
          <option value="33">Choose a source</option>
          <option value="1">Myself</option>
          <option value="2">Parent/Guardian</option>
          <option value="3">Organisation / Sponsor </option>
        </select>
      </div>
      <div className='flex flex-row justify-around'>
        {parent && <div className='p-2'>
          <p className='text-white text-xl font-medium p-3 mb-4 bg-dark-purple rounded-2xl'>Parent / Guardian </p>
          <form>
            <div class="grid gap-3 mb-6 lg:grid-cols-2">
              <div>
                <label for="surnamep" class="block mb-2 text-sm font-medium text-gray-900 ">Surname</label>
                <input type="text" id="surnamep" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" required 
                  onChange={handleChangee}
                  name="surnamep"
                  value={studentData["surnamep"] || ""}
                />
              </div>
              <div>
                <label for="forenamesp" class="block mb-2 text-sm font-medium text-gray-900   ">Forenames</label>
                <input type="text" id="forenamesp" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" required 
                  onChange={handleChangee}
                  name="forenamesp"
                  value={studentData["forenamesp"] || ""}
                />
              </div>
              <div>
                <label for="genderp" class="block mb-2 text-sm font-medium text-gray-900">Gender</label>
                <select id="genderp" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  onChange={handleChangee}
                  name="genderp"
                  value={studentData["genderp"] || ""}
                >
                  <option></option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>          
              </div>
              <div>
                <label for="relationshipp" class="block mb-2 text-sm font-medium text-gray-900">Relationship</label>
                <input type="text" id="relationshipp" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" required 
                  onChange={handleChangee}
                  name="relationshipp"
                  value={studentData["relationshipp"] || ""}
                />
              </div>
              <div>
                <label for="occupationp" class="block mb-2 text-sm font-medium text-gray-900">Occupation</label>
                <input type="text" id="occupationp" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" required 
                  onChange={handleChangee}
                  name="occupationp"
                  value={studentData["occupationp"] || ""}
                />
              </div>
              <div>
                <label for="emailp" class="block mb-2 text-sm font-medium text-gray-900   ">Email addess</label>
                <input type="email" id="emailp" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" required 
                  onChange={handleChangee}
                  name="emailp"
                  value={studentData["emailp"] || ""}
                />
              </div>
              <div>
                <label for="tel1p" class="block mb-2 text-sm font-medium text-gray-900 ">Tel 1</label>
                <input type="text" id="tel1p" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" required 
                  onChange={handleChangee}
                  name="tel1p"
                  value={studentData["tel1p"] || ""}
                />
              </div>
              <div>
                <label for="tel2p" class="block mb-2 text-sm font-medium text-gray-900   ">Tel 2</label>
                <input type="text" id="tel2p" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" required 
                  onChange={handleChangee}
                  name="tel2p"
                  value={studentData["tel2p"] || ""}
                />
              </div>
              <div>
                <label for="addressp" class="block mb-2 text-sm font-medium text-gray-900">Address</label>
                <input type="text" id="addressp" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="" required 
                  onChange={handleChangee}
                  name="addressp"
                  value={studentData["addressp"] || ""}
                />
              </div>


            </div>
          </form>

        </div>}
        {organisation && <div className='p-2'>
          <p className='text-white font-medium text-xl p-3 mb-4 bg-dark-purple rounded-2xl'>Organisation / Sponsor </p>
          <form>
            <div class="grid gap-3 mb-6 lg:grid-cols-2">
              <div>
                <label for="nameo" class="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
                <input type="text" id="nameo" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" required 
                  onChange={handleChangee}
                  name="nameo"
                  value={studentData["nameo"] || ""}
                />
              </div>
              <div>
                <label for="adresso" class="block mb-2 text-sm font-medium text-gray-900">Address</label>
                <input type="text" id="adresso" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" required 
                  onChange={handleChangee}
                  name="addresso"
                  value={studentData["addresso"] || ""}
                />
              </div>
              <div>
                <label for="telo" class="block mb-2 text-sm font-medium text-gray-900">Tel</label>
                <input type="text" id="telo" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="" required 
                  onChange={handleChangee}
                  name="tel1o"
                  value={studentData["tel1o"] || ""}
                />
              </div>
              <div>
                <label for="emailo" class="block mb-2 text-sm font-medium text-gray-900   ">Email Address</label>
                <input type="email" id="emailo" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" required 
                  onChange={handleChangee}
                  name="emailo"
                  value={studentData["emailo"] || ""}
                />
              </div>
              <div>
                <label for="contacto" class="block mb-2 text-sm font-medium text-gray-900   ">Contact Person</label>
                <input type="text" id="contacto" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" required 
                  onChange={handleChangee}
                  name="contacto"
                  value={studentData["contacto"] || ""}
                />
              </div>
              <div>
                <label for="visitors" class="block mb-2 text-sm font-medium text-gray-900   ">Tel</label>
                <input type="phone" id="visitors" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" required 
                  onChange={handleChangee}
                  name="tel2o"
                  value={studentData["tel2o"] || ""}
                />
              </div>
            </div>
          </form>
        </div>}
        {myself && <div className='p-2'>
          <p className='text-white text-xl p-3 mb-4 bg-dark-purple rounded-2xl'>Emergency</p>
          <form>
            <div class="grid gap-3 mb-6 lg:grid-cols-2">
              <div>
                <label for="surnamee" class="block mb-2 text-sm font-medium text-gray-900 ">Surname</label>
                <input type="text" id="surnamee" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" required 
                   onChange={handleChangee}
                   name="surnamee"
                   value={studentData["surnamee"] || ""}
                />
              </div>
              <div>
                <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900   ">Forenames</label>
                <input type="text" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" required 
                  onChange={handleChangee}
                  name="forenamese"
                  value={studentData["forenamese"] || ""}
                />
              </div>
              <div>
                <label for="gendere" class="block mb-2 text-sm font-medium text-gray-900   ">Gender</label>
                <select id="gendere" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  onChange={handleChangee}
                  name="gendere"
                  value={studentData["gendere"] || ""}
                >
                  <option></option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label for="relationshipe" class="block mb-2 text-sm font-medium text-gray-900">Relationship</label>
                <input type="text" id="relationshipe" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" required 
                  onChange={handleChangee}
                  name="relationshipe"
                  value={studentData["relationshipe"] || ""}
                />
              </div>
              <div>
                <label for="occupatione" class="block mb-2 text-sm font-medium text-gray-900">Occupation</label>
                <input type="text" id="occupatione" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" required 
                  onChange={handleChangee}
                  name="occupatione"
                  value={studentData["occupatione"] || ""}
                />
              </div>
              <div>
                <label for="emaile" class="block mb-2 text-sm font-medium text-gray-900">Email addess</label>
                <input type="email" id="emaile" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" required 
                  onChange={handleChangee}
                  name="emaile"
                  value={studentData["emaile"] || ""}
                />
              </div>
              <div>
                <label for="tel1e" class="block mb-2 text-sm font-medium text-gray-900 ">Tel 1</label>
                <input type="text" id="tel1e" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" required 
                  onChange={handleChangee}
                  name="tel1e"
                  value={studentData["tel1e"] || ""}
                />
              </div>
              <div>
                <label for="tel2e" class="block mb-2 text-sm font-medium text-gray-900   ">Tel 2</label>
                <input type="text" id="tel2e" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="" required 
                  onChange={handleChangee}
                  name="tel2e"
                  value={studentData["tel2e"] || ""}
                />
              </div>
              <div>
                <label for="addresse" class="block mb-2 text-sm font-medium text-gray-900">Address</label>
                <input type="text" id="addresse" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="" required 
                  onChange={handleChangee}
                  name="addresse"
                  value={studentData["addresse"] || ""}
                />
              </div>


            </div>
          </form>
        </div>}
      </div>
    </div>

  )
}

export default GuardianStudInfo