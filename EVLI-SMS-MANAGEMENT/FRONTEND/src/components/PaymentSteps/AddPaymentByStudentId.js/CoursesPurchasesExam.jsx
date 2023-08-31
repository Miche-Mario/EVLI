import React, { useState, useEffect, useContext } from 'react'
import { AiOutlineAppstoreAdd } from 'react-icons/ai'
import { BsFillTrashFill } from "react-icons/bs"
import { StepperContext } from '../../../contexts/stepperContext'
import { BiTrash } from 'react-icons/bi'
import { MdOutlineAddToPhotos } from 'react-icons/md'
import DatePicker from "react-datepicker";
import axios from 'axios'
import { addDays } from 'date-fns';
import Moment from "moment"
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import es from 'date-fns/locale/es';

const CoursesPurchasesExam = () => {

  const { studentData, setStudentData } = useContext(StepperContext)
  const handleChangee = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value })
  }
  const [msg, setMsg] = useState("");

  //GET ALL EXMAS
  const [exam, setExams] = useState([]);
  const [examid, setExamId] = useState();
  const [exampriceid, setExamPriceId] = useState()
  const [examprice, setExamPrice] = useState();
  const getExams = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/exam`);
    setExams(response.data)
  }


  const getCurrencyDataFromLS = () => {
    const data = localStorage.getItem('currency');
    if (data) {
      return JSON.parse(data)
    } else {
      return []
    }
  }
  const [currency, setCurrency] = useState(getCurrencyDataFromLS())

  const [currencyvalue, setCurrencyValue] = useState(currency.length !== 0 ? currency.currencyvalue : 1);
  const [lecurrency, setLecurrency ] = useState(currency.length !== 0 ? currency.lecurrency : "XOF");




  
 

  const getExamPrice = async (e) => {

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/examprice`, {
        examid: parseInt(examid)
      });
      setExamPriceId(response.data.id)
      setExamDescription(response.data.description)
      setExamPrice(response.data.examprice * currencyvalue)
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
        console.log(msg)
      }
    }
  }

  useEffect(() =>{
  getExamPrice()}
  , [examid])

 

  // GET ALL ACCOMODATIONS
  const [accomodation, setAccomodation] = useState([]);
  const [accoid, setAccoId] = useState();
  const [accopriceid, setAccoPriceId] = useState();

  const [accoprice, setAccoPrice] = useState();
  const getAccomodaion = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/accomodations`);
    setAccomodation(response.data)
  }

  useEffect(() =>{
    getAccoPrice()}
    , [accoid])


  const getAccoPrice = async (e) => {

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/accomodationprice`, {
        accoid: parseInt(accoid)
      });
      setAccoPriceId(response.data.id)
      setAccoDescription(response.data.description)
      setAccoPrice(response.data.accomodationprice * currencyvalue)
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
        console.log(msg)
      }
    }
  }



    // GET ALL Other Fee
    const [otherfee, setOtherFee] = useState([]);
    const [otherFeeId, setOtherFeeId] = useState();
    const [otherFeePriceId, setOtherFeePriceId] = useState()
    const [otherfeeprice, setOtherFeeprice] = useState();
    const getOtherFee = async () => {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/otherfee`);
      setOtherFee(response.data)
    }
  
  
    const getOtherFeePrice = async (e) => {
  
      try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/otherfeeprice`, {
          otherFeeId: parseInt(otherFeeId)
        });
        setOtherFeePriceId(response.data.id)
        setOtherFeeDescription(response.data.description)
        setOtherFeeprice(response.data.feeprice * currencyvalue)
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
          console.log(msg)
        }
      }
    }
  
    useEffect(() =>{
      getOtherFeePrice()}
      , [otherFeeId])
  
  // GET ALL ITEMS
  const [item, setItems] = useState([]);
  const [purchaseid, setPurchaseId] = useState();
  const [purchasepriceid, setPurchasePriceId] = useState();
  const [purchaseprice, setPurchasePrice] = useState();
  const getItems = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/purchases`);

    setItems(response.data)
  }

  const getPurchasePrice = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/purchaseprice`, {
        purchaseid: parseInt(purchaseid)
      });
      setPurchasePriceId(response.data.id)
      setPurchaseDescription(response.data.description)
      setPurchasePrice(response.data.purchaseprice * currencyvalue)
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
        console.log(msg)
      }
    }
  }

  useEffect(() =>{
    getPurchasePrice()}
    , [purchaseid])


  const [registrationprice, setRegistrationprice] = useState(0);
  const [registrationname, setRegistrationname] = useState();
  const [registrationid, setRegistrationid] = useState();

  
const getRegistration = async () => {
const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/registration`);
    setRegistrationid(response.data[0].id) 
    setRegistrationprice(response.data[0].registrationprice )
    setRegistrationname(response.data[0].registrationname)

  }
  



  // GET ALL COURSE
  const [course, setCourse] = useState([]);
  const getCourse = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/course`);
    setCourse(response.data)
  }
  const surnameg = studentData.surnameg;
  const forenamesg = studentData.forenamesg
  const studInfo = {surnameg, forenamesg}
  localStorage.setItem('studInfo', JSON.stringify(studInfo))

  
  const [options, setOptions] = useState(null);
  const [optionid, setOptionId] = useState(null);
  const [isoption, setIsOption] = useState()
  const getCourseSubcourse = async (e) => {

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/getsubcourse`, {
        courseid: programId,
      });
      setOptions(response.data)
      setIsOption(response.data[0].subcourse)
     
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  }



  //GET ALL TIMES
  const [times, setTimes] = useState([]);
  const getTimes = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/times`);
    setTimes(response.data)
  }
  // GET ALL COURSES
  const [price, setPrice] = useState();
  const [priceid, setPriceId] = useState();



  const [coursesid, setCoursesId] = useState()

  const getCoursesPrice = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/getcoursesprice`, {
        courseid: parseInt(programId),
        subcourseid: parseInt(optionid),
        duration: parseInt(laduration)
      });
      response.data.response ?  setPriceId(response.data.response.id) : setPriceId(response.data.id)
      response.data.response ?  setPrice(response.data.response.price * currencyvalue) : setPrice(response.data.fullprice * currencyvalue)
      response.data.fullprice &&  setPrice(response.data.fullprice * currencyvalue)
      
      response.data.fullprice &&  setCourseDescription(response.data.response.description)


      response.data.fullduration && setLaDuration(response.data.fullduration)
      response.data.description && setCourseDescription(response.data.description)
      response.data.coursesidd && setCoursesId(response.data.coursesidd)

  
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
        console.log(msg)
      }
    }
  }
  const [programId, setProgramId] = useState(null)



  useEffect(() =>{
    getCourseSubcourse()
  }, [programId])

  /*    useEffect(() => { // useEffect hook
       setTimeout(() => { // simulate a delay
  
        
        }, 1000);
       }, []);  */

///////////////////////////////////////////////////////////////////////////////


const [accoDiscounts, setAccoDiscounts] = useState([]);

const getAccoDiscounts = async () => {
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/accodiscount`);
  setAccoDiscounts(response.data)
}
//////////////////////////////////////////////////////////////

  useEffect(() => {
    getAccoDiscounts();
    getExams();
    getAccomodaion();
    getItems();
    getCourse();
    getCourseSubcourse();
    getTimes()
    getOtherFee()
    getRegistration()
  }, [])




  const [view, setView] = useState(false)
  const [oneOnOne, setOneOnOne] = useState(false)







  const changeOption = (e) => {
    setProgramId(e.target.value)

  }
  const [showOption, setShowOption] = useState(false)

  const click = () => {
    setShowOption(true)
    if (programId == 33) {
      setView(false)
    } else {
      setView(true)
    }
  }



  const oneOnChange = () => {
    setOneOnOne(!oneOnOne)
  }



  const getCourseDataFromLS = () => {
    const data = localStorage.getItem('courseList');
    if (data) {
      return JSON.parse(data)
    } else {
      return []
    }
  }
  const getExamDataFromLS = () => {
    const data = localStorage.getItem('examList');
    if (data) {
      return JSON.parse(data)
    } else {
      return []
    }
  }
  const getPurchaseDataFromLS = () => {
    const data = localStorage.getItem('purchaseList');
    if (data) {
      return JSON.parse(data)
    } else {
      return []
    }
  }
  const getAccoDataFromLS = () => {
    const data = localStorage.getItem('accoList');
    if (data) {
      return JSON.parse(data)
    } else {
      return []
    }
  }

  const getOtherFeeDataFromLS = () => {
    const data = localStorage.getItem('otherFeeList');
    if (data) {
      return JSON.parse(data)
    } else {
      return []
    }
  }


  const getRegistrationDataFromLS = () => {
    const data = localStorage.getItem('registration');
    if (data) {
      return JSON.parse(data)
    } else {
      return []
    }
  }



  const [lecoursename, setLeCoursename] = useState('')
  const [lesubcoursename, setLeSubcoursename] = useState('')
  const [lexamname, setLexamName] = useState('')
  const [lepurchasename, setLePurchaseName] = useState('')
  const [lacconame, setLacconame] = useState('')
  const [lotherfeename, setLotherFeeName] = useState('')


  const [laduration, setLaDuration] = useState('')


  useEffect(() =>{
    getCoursesPrice()}
    , [laduration])
    
  const [coursedescription, setCourseDescription] = useState('')
  const [examdescription, setExamDescription] = useState('');
  const [purchasedescription, setPurchaseDescription] = useState('')
  const [accodescription, setAccoDescription] = useState('')
  const [otherfeedescription, setOtherFeeDescription] = useState('')

  const [courseList, setCourseList] = useState(getCourseDataFromLS())
  const [examList, setExamList] = useState(getExamDataFromLS())
  const [purchaseList, setPurchaseList] = useState(getPurchaseDataFromLS())
  const [accoList, setAccoList] = useState(getAccoDataFromLS())
  const [otherFeeList, setOtherFeeList] = useState(getOtherFeeDataFromLS())
  const [registrationList, setRegistrationList] = useState(getRegistrationDataFromLS)

  const addCurency = (e) => {
 
    setCurrency( {lecurrency,currencyvalue});
  }

  const addCourse = (e) => {
    e.preventDefault(e);
    const uuid = Math.random() + 89
    const regir = registrationprice * currencyvalue;
    let acourse = {
      lecoursename,
      lesubcoursename,
      laduration,
      price ,
      lecurrency,
      coursedescription,
      regir,
      registrationname,
      uuid,
      priceid,
      coursesid,
      finaldate,
      startdate
    }
    const uuidd = 22
    let registration = {
      registrationname,
      regir,
      lecurrency,
      uuid

    }
    if(price && finaldate && startdate && laduration && finaldate > startdate) {
      setCourseList([...courseList, acourse]);
      if(courseList.length == 0)
      {setRegistrationList([...registrationList, registration]);}
  
      setOptionId(null)
      setOptionId(null)
      setLeSubcoursename(null)
    } else {
        toast.error("Something went wrong!")
    }
 

  }
  const addExam = (e) => {
    e.preventDefault(e);
    setExamButtonIsActif(prev => !prev)
    const uuid = Math.random() + 89
    let anexam = {
      lexamname,
      examprice,
      lecurrency,
      examdescription,
      uuid,
      exampriceid
    }

    if(exam) {
      setExamList([...examList, anexam]);
    }  else {
      toast.error("Something went wrong!")
     }
  }
  const [acotimes, setAcoTimes] = useState();
  const addAcco = (e) => {
    e.preventDefault(e);
    const uuid = Math.random() + 89
    let anacco = {
      lacconame,
      accoprice,
      accodescription,
      lecurrency,
      acotimes,
      uuid,
      accopriceid
    }
    setAccoList([...accoList, anacco]);
  }
  const [purchasetimes, setPurchaseTimes] = useState();

  const addPurchase = (e) => {
    e.preventDefault(e);
    const uuid = Math.random() + 89
    let apurchase = {
      lepurchasename,
      purchaseprice,
      lecurrency,
      purchasetimes,
      purchasedescription,
      uuid,
      purchasepriceid
    }
    if(purchaseprice && purchasetimes ){   
       setPurchaseList([...purchaseList, apurchase]);
    }   else {
      toast.error("Something went wrong!")
    }
  }

  const addOtherFee = (e) => {
    e.preventDefault(e);
    const uuid = Math.random() + 89
    let afee = {
      lotherfeename,
      otherfeeprice,
      lecurrency,
      otherfeedescription,
      uuid,
      otherFeePriceId
    }
    if(otherfeeprice) {
      setOtherFeeList([...otherFeeList, afee]);
    } else {
      toast.error("Something went wrong!")
    }
  }



  useEffect(() => {
    localStorage.setItem('courseList', JSON.stringify(courseList))
  }, [courseList])

  useEffect(() => {
    localStorage.setItem('examList', JSON.stringify(examList))
  }, [examList])

  useEffect(() => {
    localStorage.setItem('accoList', JSON.stringify(accoList))
  }, [accoList])

  useEffect(() => {
    localStorage.setItem('purchaseList', JSON.stringify(purchaseList))
  }, [purchaseList])

  useEffect(() => {
    localStorage.setItem('otherFeeList', JSON.stringify(otherFeeList))
  }, [otherFeeList])

  useEffect(() => {
    localStorage.setItem('registration', JSON.stringify(registrationList))
  }, [registrationList])

  useEffect(() => {
    localStorage.setItem('currency', JSON.stringify(currency))
  }, [currency])






  const deleteCourseFromList = (param) => {
    const filterr = courseList.filter((element, index) => {
      return element.uuid !== param;
    })
    setCourseList(filterr)
  }
  const deleteExamFromList = (param) => {
    const filterr = examList.filter((element, index) => {
      return element.uuid !== param;
    })
    setExamList(filterr)

  }

  const deleteAccoFromList = (param) => {
    const filterr = accoList.filter((element, index) => {
      return element.uuid !== param;
    })
    setAccoList(filterr)

  }

  const deletePurchaseFromList = (param) => {
    const filterr = purchaseList.filter((element, index) => {
      return element.uuid !== param;
    })
    setPurchaseList(filterr)

  }

  const deleteOtherFeeFromList = (param) => {
    const filterr = otherFeeList.filter((element, index) => {
      return element.uuid !== param;
    })
    setOtherFeeList(filterr)

  }

  const deleteRegistrationFromList = (param) => {
    const filterr = registrationList.filter((element, index) => {
      return element.uuid !== param;
    })
    setRegistrationList(filterr)
  }

  const handleChangeCurency = () => {
    var lecurrency = document.getElementById("lecurrency");
    var selectedText = lecurrency.options[lecurrency.selectedIndex].innerHTML;
    var selectedValue = lecurrency.value;
    setLecurrency(selectedText);
    

  }
  const handleChangeCourse = () => {
    var lecourse = document.getElementById("lecourse");
    var selectedText = lecourse.options[lecourse.selectedIndex].innerHTML;
    var selectedValue = lecourse.value;
    setLeCoursename(selectedText);
    setProgramId(selectedValue)

  }
  const handleChangeSubCourse = () => {
    var lesubcourse = document.getElementById("lesubcourse");
    var selectedText = lesubcourse.options[lesubcourse.selectedIndex].innerHTML;
    var selectedValue = lesubcourse.value;
    setLeSubcoursename(selectedText);

  }
  const [examButtonIsActif, setExamButtonIsActif] = useState(true)
  const handleChangeExam = () => {
    setExamButtonIsActif(false)
    var lexam = document.getElementById("lexam");
    var selectedText = lexam.options[lexam.selectedIndex].innerHTML;
    var selectedValue = lexam.value;
    setLexamName(selectedText);

  }
  const handleChangeAcco = () => {
    var lacco = document.getElementById("lacco");
    var selectedText = lacco.options[lacco.selectedIndex].innerHTML;
    var selectedValue = lacco.value;
    setLacconame(selectedText);
  }
  const [purchaseButtonActif, setPurchaseButtonActif] = useState(true)
  const handleChangePurchase = () => {
    var lepurchase = document.getElementById("lepurchase");
    var selectedText = lepurchase.options[lepurchase.selectedIndex].innerHTML;
    var selectedValue = lepurchase.value;
    setPurchaseButtonActif(false)
      setLePurchaseName(selectedText);
  
  }

  const handleChangeOtherFee = () => {
    var lotherfee = document.getElementById("lotherfee");
    var selectedText = lotherfee.options[lotherfee.selectedIndex].innerHTML;
    var selectedValue = lotherfee.value;
    setLotherFeeName(selectedText);
  }
  
  const  sumCoursePrice = courseList.reduce((accumulator, object) => {
    return accumulator + object.price;
  }, 0);

  const sumExamPrice = examList.reduce((accumulator, object) => {
    return accumulator + object.examprice;
  }, 0);

  let sumAccoPrice = accoList.reduce((accumulator, object) => {
    return accumulator + (object.accoprice * object.acotimes);
  }, 0);

  const sumPurchasePrice = purchaseList.reduce((accumulator, object) => {
    return accumulator + (object.purchaseprice * object.purchasetimes);
  }, 0);

  const sumOtherFeePrice = otherFeeList.reduce((accumulator, object) => {
    return accumulator +   object.otherfeeprice;
  }, 0);

let newSumAccoPrice = 0;
if(accoList &&  accoList.length > 0 ) {
  if( accoDiscounts.length > 0 && accoList[0].acotimes >= parseInt(accoDiscounts[0].from) ){ 
    newSumAccoPrice = sumAccoPrice -  ((sumAccoPrice * accoDiscounts[0].pourcentage) / 100);
  } else {
    newSumAccoPrice = sumAccoPrice;
  }
} 
sumAccoPrice = newSumAccoPrice;

  let total; 
  let subtotal;
  let discount=0;
  let fee;
  let table = [];



  const[groupdiscount, setGroupdiscount] = useState(1)

  const getGroupDiscount = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/groupdiscount`);
    response.data && setGroupdiscount(response.data[0].pourcentage)
  }

  const [studentdiscount, setStudentDiscount] = useState(1);
  const [studentdiscountid, setStudentDiscountid] = useState('');

  const [lecode, setLecode] = useState('')

const getStudentDiscount = async (e) => {
  e.preventDefault()
  const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/discountcode`, {
    code: lecode
  });
  response.data && response.data.pourcentage ? setStudentDiscount(response.data.pourcentage) : setStudentDiscount(1)
  response.data && response.data.id ? setStudentDiscountid(response.data.id) : setStudentDiscountid('')

}


useEffect(() => {
  getGroupDiscount()
},[])



  const NumberOfCourse = courseList.length

  const fixfee = courseList.length !== 0 ? registrationprice * currencyvalue : 0;

 if(NumberOfCourse <= 1 ) {
  total = Math.round((sumCoursePrice + sumExamPrice + sumAccoPrice + sumPurchasePrice + fixfee + sumOtherFeePrice) * (studentdiscount));
 }
else {
  for(let i=1; i<NumberOfCourse; i++) {
      fee = groupdiscount !== 1 ? (courseList[i].price * groupdiscount)/100 : courseList[i].price;
    
     table[i] = fee
     discount = table.reduce((a, b) => a + b, 0)
  }

  total = Math.round(studentdiscount === 1 ?  (courseList[0].price + (sumCoursePrice - courseList[0].price) - discount) + sumExamPrice + sumAccoPrice + sumAccoPrice + sumPurchasePrice + sumOtherFeePrice + fixfee : (sumCoursePrice - (sumCoursePrice * studentdiscount)/100) + sumExamPrice + sumAccoPrice + sumAccoPrice + sumPurchasePrice + fixfee + sumOtherFeePrice);
}

subtotal = Math.round(sumCoursePrice + sumExamPrice + sumAccoPrice + sumAccoPrice + sumPurchasePrice + sumOtherFeePrice  + fixfee + sumOtherFeePrice);


useEffect(() => {
  localStorage.setItem('total', JSON.stringify(total));
  localStorage.setItem('subtotal', JSON.stringify(subtotal));
  localStorage.setItem('discount', JSON.stringify(discount));
}, [total, subtotal, discount])



///////////////////////////////////////////DATE RANGE//////////////////////////

const [startdate, setStartDate] = useState();
const [finaldate, setFinalDate] = useState();



useEffect(() => {
  localStorage.setItem('startdate', JSON.stringify(startdate));
}, [startdate])

useEffect(() => {
  localStorage.setItem('finaldate', JSON.stringify(finaldate));
}, [finaldate])
///////////////////////////////////////////////////////// ////////


useEffect(() => {
  addCurency()
}, [])

const getStudentDiscountFromLS = () => {
  const data = localStorage.getItem('studdiscount');
  if (data) {
    return JSON.parse(data)
  } else {
    return []
  }
}
const [studdiscount, setStudDiscount] = useState(getStudentDiscountFromLS())

const addStudDiscount = (e) => {
 
  setStudDiscount({lecode,studentdiscountid, groupdiscount});
}


useEffect(() => {
  addStudDiscount()
}, [groupdiscount])

useEffect(() => {
  localStorage.setItem('studdiscount', JSON.stringify(studdiscount))
}, [studdiscount])


/* 
let shirt = 0;

function isShirt(pruchase) {
  return pruchase.lepurchasename  == 'Tee-Shirt';
}
shirt = purchaseList.find(isShirt) ? purchaseList.find(isShirt) : 0;
const shirtprice = shirt ? shirt.purchaseprice : 0;
console.log(studentData)
useEffect(() => {
  setStudentData({...studentData, "Tshirtprice": shirtprice})
}, [shirtprice])


let book = 0;
function isBook(pruchase) {
  return pruchase.lepurchasename  == 'Books';
}
book = purchaseList.find(isBook) ? purchaseList.find(isBook) : 0 ;
const bb = book ? book.purchaseprice : 0;
setBookprice(bb)
useEffect(() => {
  localStorage.setItem('bookprice', JSON.stringify(bookprice))
}, [bookprice])

useEffect(() => {
  setStudentData({...studentData, "bookprice": bookprice})
}, [bookprice])
 */

useEffect(() => {
  setStudentData({...studentData,courseList, examList, accoList,purchaseList, otherFeeList, total, subtotal, discount, registrationList, currency, studdiscount, finaldate, startdate})
}, [])
useEffect(() => {
  setStudentData({...studentData,examList, courseList})
}, [courseList])

 useEffect(() => {
  setStudentData({...studentData,examList, courseList})
}, [examList])

useEffect(() => {
  setStudentData({...studentData,examList, courseList, accoList})
}, [accoList])

useEffect(() => {
  setStudentData({...studentData,examList, courseList, accoList, purchaseList})
}, [purchaseList])

useEffect(() => {
  setStudentData({...studentData,examList, courseList, accoList, purchaseList, otherFeeList})
}, [otherFeeList])

useEffect(() => {
  setStudentData({...studentData,examList, courseList, accoList, purchaseList, otherFeeList, total})
}, [total])

useEffect(() => {
  setStudentData({...studentData,examList, courseList, accoList, purchaseList, otherFeeList, total, subtotal})
}, [subtotal])

useEffect(() => {
  setStudentData({...studentData,examList, courseList, accoList, purchaseList, otherFeeList, total, subtotal, discount})
}, [discount])


useEffect(() => {
  setStudentData({...studentData,examList, courseList, accoList, purchaseList, otherFeeList, total, subtotal, discount, registrationList, })
}, [registrationList])

useEffect(() => {
  setStudentData({...studentData,examList, courseList, accoList, purchaseList, otherFeeList, total, subtotal, registrationList, currency })
}, [currency])

useEffect(() => {
  setStudentData({...studentData,examList, courseList, accoList, purchaseList, otherFeeList, total, subtotal, registrationList, currency,studdiscount })
}, [studdiscount])


useEffect(() => {
  setStudentData({...studentData,examList, courseList, accoList, purchaseList, otherFeeList, total, subtotal, registrationList, currency,studdiscount, finaldate })
}, [finaldate])

useEffect(() => {
  setStudentData({...studentData,examList, courseList, accoList, purchaseList, otherFeeList, total, subtotal, registrationList, currency,studdiscount, finaldate, startdate })
}, [startdate])




function separator(numb) {
  var str = numb.toString().split(".");
  str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return str.join(".");
}


console.log( examprice && examprice);
const [currencies, setCurrencies] = useState([]);

const getCurrencies = async () => {
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/currency`);
  setCurrencies(response.data)
}

useEffect(() => {
  getCurrencies()
}, [])


console.log(optionid)

  return (
    <div className='flex flex-row w-full'>
          <ToastContainer style={{fontSize: 20}} position="top-right"/>

      <div>



        <div className='m-5'>
        <div>
            <p className='text-lg font-medium text-gray-600 mb-1 '>Choose Currency</p>
            <select class="bg-blue-100 border border-gray-300 text-gray-900 text-xl p-2 focus:ring-blue-500 
            focus:border-blue-500 block w-[20rem]"
                onChange={(e) => {setCurrencyValue( e.target.value); handleChangeCurency(); getRegistration();}}
                id='lecurrency'
                onClick={addCurency}
            >  
            <option></option>  
              {
                currencies.map((currency, index) => (
                  <option value={currency.value}>{currency.symbol}</option>
                ))
              }
             


            </select>
          </div>
          <div className='flex'>
            
            <div className='mt-6'>
              <p className='text-lg font-bold text-gray-600 '>CHOOSE A COURSE</p>

              <select class="bg-blue-100 border border-gray-300 text-gray-900 text-xl p-2 
                                focus:ring-blue-500focus:border-blue-500 block w-[32rem]"
                onChange={(e) => { changeOption(e); handleChangee(e); handleChangeCourse();  }}
                onClick={() => { getCourseSubcourse(); click()}}
                name="coursee"
                id='lecourse'
              >
                <option value="33" className='text-md' >Our programme</option>
                {course.map((course) => (
                  <option className='text-xl' value={course.course_courseid}>{course.course.coursename}</option>
                ))}
              </select>
            </div>

          </div>
          {options  && isoption != null &&
            <div className='m-5'>

              <select class="bg-blue-100 border border-gray-300 text-gray-900 text-xl p-2 
                                focus:ring-blue-500 
                                focus:border-blue-500 block w-[32rem] "
                onChange={(e) => { setOptionId(e.target.value); handleChangeSubCourse() }}
                id='lesubcourse'
              >
                <option></option>
                {options.map((option) => (
                  <option value={option.subcourse.id}>{option.subcourse.subcoursename}</option>
                ))}
              </select>

            </div>
          }



          <div>
            {showOption && <div className='m-5'>
              <p className='text-lg font-medium text-gray-600 '>DURATION</p>
              <select class="bg-blue-100 border border-gray-300 text-gray-900 text-xl p-2 focus:ring-blue-500 
        focus:border-blue-500 block w-[21rem]"
                onChange={(e) => setLaDuration(e.target.value)}
                onClick={getCoursesPrice}
                name="durationn"
              >
                <option></option>
                {times.map((option) => (
                  <option value={option.id}>{option.time}</option>
                ))}
              </select>
              
        <div className=' ml-0 mt-4'>
          <div className='flex items-center'>
            <div className='text-xl font-bold w-24'>Start Date</div>
            <div className='ml-3  font-bold '>
            <input type="date" id="dateofbirth" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 ml-3 block w-[13.5rem] p-2.5 " 
                    onChange={(e) => setStartDate(e.target.value)}
                    name="startDate"
                    value={startdate}
              />
            </div>
          </div>

          <div className='flex items-center mt-5'>
            <div className='text-xl font-bold w-24'>End Date</div>
            <div className='ml-3  font-bold '>
              <input type="date" id="dateofbirth" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 ml-3 block w-[13.5rem] p-2.5 " 
                   onChange={(e) => setFinalDate(e.target.value)}
                   name="finaldate"
                   value={finaldate}
              />
            </div>
          </div>

         


        </div>
      
              <button
                onClick={addCourse}
                className='mt-4 border-blue-200 justify-between flex rounded-md p-1 border-2'>
                <MdOutlineAddToPhotos size={26} color="green" />
                <span className=' ml-2 text-lg text-green-600 font-medium'> Add a course</span>
              </button>
            </div>

            }
          </div>




        </div>








       

        {view && <div className='m-5'>

          <p className='text-lg font-medium text-gray-600 '>Exam</p>
          <div className='flex flex-row items-center'>
            <div>
              <select class="bg-blue-100 border border-gray-300 text-gray-900 text-xl p-2 focus:ring-blue-500 
        focus:border-blue-500 block w-[32rem]"
                id="lexam"
                onChange={(e) => { handleChangeExam(); setExamId(e.target.value) }}
                onClick={getExamPrice}
              >
                <option></option>
                {exam.map((exam) => (
                  <option value={exam.id}>{exam.examname}</option>
                ))}
              </select>
            </div>
            <button 
              className=' cursor-pointer' 
              disabled={examButtonIsActif}
              onClick={addExam}>
              <MdOutlineAddToPhotos style={{ fontSize: "45px", color: "green" }} />
            </button>

          </div>
        </div>}

        {view && <div className='m-5'>
          <p className='text-lg font-medium text-gray-600 '>Purchases</p>
          <div className='flex flex-row items-center'>
            <div>
              <select class="bg-blue-100 border border-gray-300 text-gray-900 text-xl p-2 focus:ring-blue-500 
        focus:border-blue-500 block w-[32rem]"
              id="lepurchase"
              onChange={(e) => { handleChangePurchase(); setPurchaseId(e.target.value) }}
              onClick={getPurchasePrice}
              >
                <option value="" className='text-md'></option>
                {item.map((item) => (
                  <option value={item.id}>{item.purchasename}</option>
                ))}
              </select>
            </div>
            <button disabled={purchaseButtonActif} className=' cursor-pointer' onClick={addPurchase}>
              <MdOutlineAddToPhotos style={{ fontSize: "45px", color: "green" }} />
            </button>

          </div>
          <select class="bg-blue-100 border border-gray-300 text-gray-900 mt-3 text-xl p-2 
        focus:ring-blue-500 
        focus:border-blue-500 block w-[20rem]"
               
                onChange={(e) => {setPurchaseTimes(e.target.value); setPurchaseButtonActif(false)}}
              >
                <option value="0" className='text-md'></option>
                <option value="1" className='text-md'>1</option>
                <option value="2" className='text-md'>2</option>
                <option value="3" className='text-md'>3</option>
                <option value="4" className='text-md'>4</option>
                <option value="5" className='text-md'>5</option>
                <option value="6" className='text-md'>6</option>
                <option value="7" className='text-md'>7</option>
                <option value="8" className='text-md'>8</option>
                <option value="9" className='text-md'>9</option>
                <option value="10" className='text-md'>10</option>
                <option value="11" className='text-md'>11</option>
                <option value="12" className='text-md'>12</option>

               
              </select>
        </div>}

        {view && <div className='m-5'>
          <p className='text-lg font-medium text-gray-600 '>Accommodation</p>
          <div className='flex flex-row items-center'>
            <div>
              <select class="bg-blue-100 border border-gray-300 text-gray-900 text-xl p-2 
        focus:ring-blue-500 
        focus:border-blue-500 block w-[32rem]"
                id="lacco"
                onChange={(e) => { handleChangeAcco(); setAccoId(e.target.value) }}
                onClick={getAccoPrice}
              >

                <option value="" className='text-md'></option>
                {accomodation.map((acco) => (
                  <option className='text-xl' value={acco.id}>{acco.accomodationname}</option>
                ))}
              </select>
            </div>
            <div className=' cursor-pointer' onClick={addAcco}>
              <MdOutlineAddToPhotos style={{ fontSize: "45px", color: "green" }} />
            </div>

          </div>
          <select class="bg-blue-100 border border-gray-300 text-gray-900 mt-3 text-xl p-2 
        focus:ring-blue-500 
        focus:border-blue-500 block w-[20rem]"
               
                onChange={(e) => setAcoTimes(e.target.value)}
              >
                <option value="0" className='text-md'></option>
                <option value="1" className='text-md'>1</option>
                <option value="2" className='text-md'>2</option>
                <option value="3" className='text-md'>3</option>
                <option value="4" className='text-md'>4</option>
                <option value="5" className='text-md'>5</option>
                <option value="6" className='text-md'>6</option>
                <option value="7" className='text-md'>7</option>
                <option value="8" className='text-md'>8</option>
                <option value="9" className='text-md'>9</option>
                <option value="10" className='text-md'>10</option>
                <option value="11" className='text-md'>11</option>
                <option value="12" className='text-md'>12</option>

               
              </select>
        </div>}

        {view && <div className='m-5'>
          <p className='text-lg font-medium text-gray-600 '>Other Fees</p>
          <div className='flex flex-row items-center'>
            <div>
              <select class="bg-blue-100 border border-gray-300 text-gray-900 text-xl p-2 
        focus:ring-blue-500 
        focus:border-blue-500 block w-[32rem]"
                id="lotherfee"
                onChange={(e) => { handleChangeOtherFee(); setOtherFeeId(e.target.value) }}
                onClick={getOtherFeePrice}
              >

                <option value="" className='text-md'></option>
                {otherfee.map((fee) => (
                  <option className='text-xl' value={fee.id}>{fee.feename}</option>
                ))}
              </select>
            </div>
            <div className=' cursor-pointer' onClick={addOtherFee}>
              <MdOutlineAddToPhotos style={{ fontSize: "45px", color: "green" }} />
            </div>

          </div>
        </div>}




      </div>


      <div className='ml-10 mt-12 w-full'>
        <div className="flex flex-row">
  
          <div className="ml-2 mb-5">
            <p className='text-lg font-medium text-gray-600 mb-1 '>Discount Code</p>
            <input type="text" class="bg-blue-100 border border-gray-300 text-gray-900 text-xl p-2 focus:ring-blue-500 
            focus:border-blue-500 block w-[20rem]"
         
                onKeyUpCapture={(e) => {getStudentDiscount(e);setLecode(e.target.value); addStudDiscount()}}
        
              />
          </div>
        </div>
       <div className='w-[43rem]'>
       <div className=' bg-dark-purple w-full p-1'>
            <div className='flex justify-end items-center'>
                <span className='text-white text-xl'>Total:</span>
                <span className='text-white ml-6 bg-red font-bold min-w-1 6 p-2 rounded-xl text-xl'>{separator(total)}</span>
            </div>
        </div>
        <div>
        {
          courseList.length > 0 &&
          <div>

            <div className='w-full bg-gray-300 text-right p-2 font-semibold border-b-2'>{registrationList[0].registrationname} : <span className='font-bold text-xl'>{registrationList[0].regir}</span></div>
            <table class="min-w-full shadow-lg border-collapse block md:table">
              <thead class="block md:table-header-group">
                <tr class="border border-gray-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                  <th class=" bg-dark-purple p-2 w-10 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">N</th>
                  <th class="bg-dark-purple w-48 p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">Course </th>
                  <th class="bg-dark-purple p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">Subcourse </th>
                  <th class="bg-dark-purple p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">Duration</th>
                  <th class="bg-dark-purple p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">Price</th>
                  <th class="bg-dark-purple p-2 w-32 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">Actions</th>
                </tr>
              </thead>
              <tbody class="block md:table-row-group">
                {courseList.map((course, index) => (
                  <tr class="bg-gray-300 border-b-2 block md:table-row">
                    <td class="p-3 w-10  text-center font-medium block md:table-cell">{index + 1}</td>
                    <td class="p-3 w-48 text-center font-medium block md:table-cell">{course.lecoursename}</td>
                    <td class="p-3 text-center font-medium block md:table-cell">{course.lesubcoursename}</td>
                    <td class="p-3 text-center font-medium block md:table-cell">{course.laduration}</td>
                    <td class="p-3 text-center font-medium block md:table-cell">{course.lecurrency} {course.price && separator(course.price)}</td>
                    <td class="p-3 w-32 text-center font-medium block md:table-cell">
                      <div onClick={() =>{ deleteCourseFromList(course.uuid); deleteRegistrationFromList(course.uuid)}} className=' cursor-pointer flex items-center p-2 shadow-md bg-white rounded-md'>
                        <BiTrash style={{ fontSize: "20px", color: 'red' }} />
                        <span className='ml-1 text-sm text-black'>Delete</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='mb-3 justify-end flex m-2'>
            <button onClick={()=>{setCourseList([]); setRegistrationList([])}} className='justify-center flex items-center cursor-pointer p-1 shadow-lg rounded-lg font-semibold bg-redd text-white w-64'>Remove All</button>
          </div>

          </div>

        }
        </div>
        <div>
          {
            examList.length > 0 && <>

            <table class="min-w-full shadow-lg border-collapse block md:table">
              <thead class="block md:table-header-group">
                <tr class="border border-gray-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                  <th class=" bg-dark-purple p-2 w-10 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">N</th>
                  <th class="bg-dark-purple p-2 w-48 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">Exam </th>
                  <th class="bg-dark-purple p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">Price</th>
                  <th class="bg-dark-purple p-2 w-32 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">Actions</th>
                </tr>
              </thead>
              <tbody class="block md:table-row-group">
                {examList.map((exam, index) => (
                  <tr class="bg-gray-300 border-b-2 block md:table-row">
                    <td class="p-3 w-10  text-center font-medium block md:table-cell">{index + 1}</td>
                    <td class="p-3 w-48 text-center font-medium block md:table-cell">{exam.lexamname}</td>
                    <td class="p-3 text-center font-medium block md:table-cell"> {exam.lecurrency} {exam.examprice}</td>
                    <td class="p-3 w-32 text-center font-medium block md:table-cell">
                      <div onClick={() => deleteExamFromList(exam.uuid)} className=' cursor-pointer flex items-center p-2 shadow-md bg-white rounded-md'>
                        <BiTrash style={{ fontSize: "20px", color: 'red' }} />
                        <span className='ml-1 text-sm text-black'>Delete</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='mb-3 justify-end flex items-center m-2'>
            <button onClick={()=>setExamList([])} className=' justify-center flex items-center cursor-pointer p-1 shadow-lg rounded-lg font-semibold bg-redd text-white w-64'>Remove All</button>
            </div>
            </>
          }
        </div>
        <div>
          { 
            purchaseList.length > 0 && <>
            <table class="min-w-full shadow-lg border-collapse block md:table">
              <thead class="block md:table-header-group">
                <tr class="border border-gray-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                  <th class=" bg-dark-purple p-2 w-10 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">N</th>
                  <th class="bg-dark-purple p-2 w-48 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">Purchase </th>
                  <th class="bg-dark-purple p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">Quantity</th>
                  <th class="bg-dark-purple p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">Price</th>
                  <th class="bg-dark-purple p-2 w-32 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">Actions</th>
                </tr>
              </thead>
              <tbody class="block md:table-row-group">
                {purchaseList.map((purchase, index) => (
                  <tr class="bg-gray-300 border-b-2 block md:table-row">
                    <td class="p-3 w-10  text-center font-medium block md:table-cell">{index + 1}</td>
                    <td class="p-3 w-48 text-center font-medium block md:table-cell">{purchase.lepurchasename}</td>
                    <td class="p-3 w-48 text-center font-medium block md:table-cell">{purchase.purchasetimes && purchase.purchasetimes }</td>
                    <td class="p-3 text-center font-medium block md:table-cell"> {purchase.lecurrency} { purchase.purchaseprice  && separator(purchase.purchaseprice)}</td>
                    <td class="p-3 w-32 text-center font-medium block md:table-cell">
                      <div onClick={() => deletePurchaseFromList(purchase.uuid)} className=' cursor-pointer flex items-center p-2 shadow-md bg-white rounded-md'>
                        <BiTrash style={{ fontSize: "20px", color: 'red' }} />
                        <span className='ml-1 text-sm text-black'>Delete</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='mb-3 justify-end flex items-center m-2'>
            <button onClick={()=>setPurchaseList([])} className=' justify-center flex items-center cursor-pointer p-1 shadow-lg rounded-lg font-semibold bg-redd text-white w-64'>Remove All</button>
            </div>
            </>
          }
        </div>
        <div>
          {
            accoList.length > 0 && <>
            <table class="min-w-full shadow-lg border-collapse block md:table">
              <thead class="block md:table-header-group">
                <tr class="border border-gray-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                  <th class=" bg-dark-purple p-2 w-10 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">N</th>
                  <th class="bg-dark-purple p-2 w-48 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">Accomodation </th>
                  <th class="bg-dark-purple p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">Duration</th>
                  <th class="bg-dark-purple p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">Price</th>
                  <th class="bg-dark-purple p-2 w-32 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">Actions</th>
                </tr>
              </thead>
              <tbody class="block md:table-row-group">
                {accoList.map((acco, index) => (
                  <tr class="bg-gray-300 border-b-2 block md:table-row">
                    <td class="p-3 w-10  text-center font-medium block md:table-cell">{index + 1}</td>
                    <td class="p-3 w-48 text-center font-medium block md:table-cell">{acco.lacconame}</td>
                    <td class="p-3 w-48 text-center font-medium block md:table-cell">{acco.acotimes}</td>
                    <td class="p-3 text-center font-medium block md:table-cell">{acco.lecurrency} { acco.accoprice && separator(acco.accoprice)}</td>
                    <td class="p-3 w-32 text-center font-medium block md:table-cell">
                      <div onClick={() => deleteAccoFromList(acco.uuid)} className=' cursor-pointer flex items-center p-2 shadow-md bg-white rounded-md'>
                        <BiTrash style={{ fontSize: "20px", color: 'red' }} />
                        <span className='ml-1 text-sm text-black'>Delete</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className=' justify-end flex items-center m-2'>
            <button onClick={()=>setAccoList([])} className=' justify-center flex items-center cursor-pointer p-1 shadow-lg rounded-lg font-semibold bg-redd text-white w-64'>Remove All</button>
            </div>
            </>
          }
        </div>
        <div>
          {
            otherFeeList.length > 0 && <>
            <table class="min-w-full shadow-lg border-collapse block md:table">
              <thead class="block md:table-header-group">
                <tr class="border border-gray-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                  <th class=" bg-dark-purple p-2 w-10 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">N</th>
                  <th class="bg-dark-purple p-2 w-48 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">other Fees </th>
                  <th class="bg-dark-purple p-2 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">Price</th>
                  <th class="bg-dark-purple p-2 w-32 text-white font-bold md:border md:border-grey-500 text-center block md:table-cell">Actions</th>
                </tr>
              </thead>
              <tbody class="block md:table-row-group">
                {otherFeeList.map((fee, index) => (
                  <tr class="bg-gray-300 border-b-2 block md:table-row">
                    <td class="p-3 w-10  text-center font-medium block md:table-cell">{index + 1}</td>
                    <td class="p-3 w-48 text-center font-medium block md:table-cell">{fee.lotherfeename}</td>
                    <td class="p-3 text-center font-medium block md:table-cell">{fee.lecurrency} { fee.otherfeeprice && separator(fee.otherfeeprice)}</td>
                    <td class="p-3 w-32 text-center font-medium block md:table-cell">
                      <div onClick={() => deleteOtherFeeFromList(fee.uuid)} className=' cursor-pointer flex items-center p-2 shadow-md bg-white rounded-md'>
                        <BiTrash style={{ fontSize: "20px", color: 'red' }} />
                        <span className='ml-1 text-sm text-black'>Delete</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className=' justify-end flex items-center m-2'>
            <button onClick={()=>setOtherFeeList([])} className=' justify-center flex items-center cursor-pointer p-1 shadow-lg rounded-lg font-semibold bg-redd text-white w-64'>Remove All</button>
            </div>
            </>
          }
        </div>
       </div>
      </div>





    </div>

  )
}

export default CoursesPurchasesExam