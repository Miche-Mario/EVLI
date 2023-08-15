import { NavLink } from 'react-router-dom'
import React from 'react'

import { useSelector } from 'react-redux'

const ProgramButton = () => {

  
  const { user} = useSelector(
    (state) => state.auth
  );
  return (
    <div className="group inline-block text-light-dark text-10">
      <button
        className="outline-offset-2outline-1  px-3 py-1 bg-dark-purple rounded-sm flex items-center w-auto"
      >
        <span className="pr-1 font-semibold flex-1 text-white">Program</span>
        <span>
          <svg
            className="fill-current text-white h-4 w-4 transform group-hover:-rotate-180 transition duration-150 ease-in-out"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill='#fff'
          >
            <path
              d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
            />
          </svg>
        </span>
      </button>
      <ul
        className="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-32"
      >
        <NavLink to="/students">
            <a>
              <li className="rounded-sm px-3  py-1  pl-6 cursor-pointer">Students</li>
            </a>        
        </NavLink>
        <NavLink to="/courses">
            <a>
              <li className="rounded-sm px-3 py-1  pl-6 cursor-pointer">Courses</li>
            </a>        
        </NavLink>
        <NavLink to="/prospects">
            <a>
              <li className="rounded-sm px-3 py-1  pl-6 cursor-pointer">Prospects</li>
            </a>        
        </NavLink>
        
       
        { user && user.role === "admin"&& <> <li className="rounded-sm relative px-3 py-1 hover:bg-gray pl-6 cursor-pointer">
          <button
            className="w-full text-left flex items-center outline-none focus:outline-none"
          >
            <span className="pr-1 flex-1">Expenses</span>
            <span className="mr-auto">
              <svg
                className="fill-current h-4 w-4 transition duration-150 ease-in-out"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </span>
          </button>
          <ul
            className="bg-white border rounded-sm absolute top-0 right-0 transition duration-150 ease-in-out origin-top-left min-w-32"
          >
            <NavLink to="/expenses">
            <a>
              <li className="rounded-sm px-3  py-1  pl-6 cursor-pointer">Expenses</li>
            </a>        
            </NavLink>
            <NavLink to="/expensestype">
            <a>
              <li className="rounded-sm px-3  py-1  pl-6 cursor-pointer">Expenses Type</li>
            </a>        
            </NavLink>
          </ul>
        </li>
        
        <NavLink to="/itemssale">
            <a>
              <li className="rounded-sm px-3  py-1  pl-6 cursor-pointer">Items for sale</li>
            </a>        
            </NavLink>  
            
            <NavLink to="/accomodations">
            <a>
              <li className="rounded-sm px-3  py-1  pl-6 cursor-pointer">Accomodations</li>
            </a>        
            </NavLink>  
            
            <NavLink to="/exams">
            <a>
              <li className="rounded-sm px-3  py-1  pl-6 cursor-pointer">Exams</li>
            </a>        
            </NavLink>
            
            <NavLink to="/otherfee">
            <a>
              <li className="rounded-sm px-3  py-1  pl-6 cursor-pointer">Other Fee</li>
            </a>        
            </NavLink>  </>}

             
        { user  && user.role === "super" && <> <li className="rounded-sm relative px-3 py-1 hover:bg-gray pl-6 cursor-pointer">
          <button
            className="w-full text-left flex items-center outline-none focus:outline-none"
          >
            <span className="pr-1 flex-1">Expenses</span>
            <span className="mr-auto">
              <svg
                className="fill-current h-4 w-4 transition duration-150 ease-in-out"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </span>
          </button>
          <ul
            className="bg-white border rounded-sm absolute top-0 right-0 transition duration-150 ease-in-out origin-top-left min-w-32"
          >
            <NavLink to="/expenses">
            <a>
              <li className="rounded-sm px-3  py-1  pl-6 cursor-pointer">Expenses</li>
            </a>        
            </NavLink>
           
          </ul>
        </li>
        
       </>}
                
      </ul>

      
    </div>
  )
}

export default ProgramButton