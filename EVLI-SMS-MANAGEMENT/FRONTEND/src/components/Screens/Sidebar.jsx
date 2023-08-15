import React, {useState} from 'react'
import Logo from '../../assets/logo.png'
import { MdOutlineDashboard } from 'react-icons/md'
import { IoSchoolOutline } from 'react-icons/io5'
import { BiBookBookmark } from 'react-icons/bi'
import { AiOutlineIdcard, AiOutlineLogout } from 'react-icons/ai'
import { BsArrowLeftShort } from "react-icons/bs"
import { ImCalculator } from 'react-icons/im'
import { NavLink, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { LogOut, reset} from '../../features/auth/authSlice'








const Sidebar = () => {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user} = useSelector(
      (state) => state.auth
    );

    const logout = () => {
        dispatch(LogOut());
        dispatch(reset());
        navigate("/");
    }


    const [open, setOpen] = useState(true)
    const Menus = [
        {title: "Home", icon: <MdOutlineDashboard/>, link: "/" },
        {title: "Sutudent", icon: <IoSchoolOutline/> ,  link: "/students"},
        {title: "Courses",icon: <BiBookBookmark/>,  link: "/courses"},
        {title: "Prospects", icon: <AiOutlineIdcard/>,  link: "/prospects"},

    ]

    
    return (
        <div className={`bg-dark-purple h-screen p-5 pt-8 ${open ? "w-62" : "w-20"} duration-300 h-screen relative`}>
                <BsArrowLeftShort 
                    className={`bg-white text-dark-purple text-3xl rounded-full absolute -right-3 top-7 border
                            border-dark-purple  cursor-pointer ${!open && "rotate-180"}`}
                    onClick={() => setOpen(!open )}
                    />
                
                    <div className='text-center'>
                    <img
                        src={Logo}
                        alt="Logo"
                        width={169}
                        height={140}
                        
                        className=  {` duration-200 ${open && " rotate-[360deg]"}`}
                    />
                    </div>
                 
                    <div className={`${!open && "hidden"} text-center text-white text-xl`}>SMS Registration <br/>and Account</div>
                   
  
                <ul className='pt-6  '>
                        {Menus.map((menu, index) => (
                            <>
                            <NavLink to={menu.link}>
                                <a>
                                    <li 
                                        key={index}
                                        className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md  ${menu.spacing ? 'mt-28': "mt-2"}`}
                                    >
                                        <span className='text-2xl block float-left'>{menu.icon}</span>
                                        <span className={`text-base font-medium flex-1 ${!open && "hidden"}`}>{menu.title}</span>
                                    </li>
                                </a>
                            </NavLink>
                            </>
                        ))}

                        { user && user.role === "admin" && <NavLink to="/expenses">
                                <a>
                                    <li
                                        className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md`}
                                    >
                                        <span className='text-2xl block float-left'><ImCalculator/></span>
                                        <span className={`text-base font-medium flex-1 ${!open && "hidden"}`}>Expenses</span>
                                    </li>
                                </a>
                        </NavLink>}
                    <li className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-28`}>
                        <button
                            onClick={logout}
                        >
                        <span className='text-2xl block float-left'><AiOutlineLogout/></span>
                        <span className={`text-base font-medium ml-4 flex-1 ${!open && "hidden"}`}>Logout</span>
                        </button>
                        

                    </li>
                </ul>
               
        </div>
    )
}
export default Sidebar

