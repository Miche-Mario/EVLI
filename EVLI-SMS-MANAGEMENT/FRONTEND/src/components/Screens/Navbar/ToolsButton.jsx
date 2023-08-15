import React from 'react'
import { Link, NavLink } from 'react-router-dom'

import { useSelector } from 'react-redux'

const ToolsButton = () => {

  const { user} = useSelector(
    (state) => state.auth
  );
  return (
    <div className="group inline-block text-light-dark ml-2 text-10">
      <button
        className="outline-offset-2outline-1  px-3 py-1 bg-dark-purple rounded-sm flex items-center w-auto"
      >
        <span className="pr-1 font-semibold flex-1 text-white">Tools</span>
        <span>
          <svg
            className="fill-current h-4 w-4 transform group-hover:-rotate-180 transition duration-150 ease-in-out"
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
                  { user && user.role === "admin" && <> 

             <li className="rounded-sm relative px-3 py-1 hover:bg-gray pl-6 cursor-pointer">
          <button
            className="w-full text-left flex items-center outline-none focus:outline-none"
          >
            <span className="pr-1 flex-1">Program Users</span>
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
            
            <NavLink to="/users">
            <a>
              <li className="rounded-sm px-3  py-1  pl-6 cursor-pointer">Users</li>
            </a>        
            </NavLink>
            <NavLink to="/usergroup">
            <a>
              <li className="rounded-sm px-3  py-1  pl-6 cursor-pointer">User group</li>
            </a>        
            </NavLink>   
          </ul>
        </li>
        <hr className='ml-2 mr-2 mb-2 mt-2'/>
        <NavLink to="/language">
            <a>
              <li className="rounded-sm px-3  py-1  pl-6 cursor-pointer">Languages</li>
            </a>        
        </NavLink> 
        <NavLink to="/discount">
            <a>
              <li className="rounded-sm px-3  py-1  pl-6 cursor-pointer">Students discounts</li>
            </a>        
        </NavLink> 
        <NavLink to="/paymentMethods">
            <a>
              <li className="rounded-sm px-3  py-1  pl-6 cursor-pointer">Payment Methods</li>
            </a>        
        </NavLink> 
        <NavLink to="/classtype">
            <a>
              <li className="rounded-sm px-3  py-1  pl-6 cursor-pointer">Class Type</li>
            </a>        
        </NavLink> 
        <NavLink to="/expensestype">
          <a>
        <li className="rounded-sm px-3 py-1 hover:bg-gray pl-6 cursor-pointer ">Expenses categories</li>
        </a>
        </NavLink>
        <hr className='ml-2 mr-2 mb-2 mt-2'/>
        <Link to="/options">
        <li className="rounded-sm px-3 py-1 hover:bg-gray pl-6 cursor-pointer ">Options</li>
        </Link>
        <hr className='ml-2 mr-2 mb-2 mt-2'/>
        <Link to="/payment">
        <li className="rounded-sm px-3 py-1 hover:bg-gray pl-6 cursor-pointer "> Add Payment</li>
        </Link>
        <Link to="/studentpayment">
        <li className="rounded-sm px-3 py-1 hover:bg-gray pl-6 cursor-pointer ">Payment</li>
        </Link>
        </>
        }

        { user && user.role === "super" && <> 
        <Link to="/payment">
        <li className="rounded-sm px-3 py-1 hover:bg-gray pl-6 cursor-pointer "> Add Payment</li>
        </Link>
        <Link to="/studentpayment">
        <li className="rounded-sm px-3 py-1 hover:bg-gray pl-6 cursor-pointer ">Payment</li>
        </Link>
        </>
}
      </ul>
    </div>
  )
}

export default ToolsButton