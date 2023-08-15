import React from 'react'
import Layout from '../components/Screens/Layout'
import Welcome from './Welcome'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../features/auth/authSlice'
import { useEffect } from 'react'

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch])

  useEffect(() => {
    if(isError) {
      navigate("/")
    }
  }, [isError, navigate
  ])
  return (
    <Layout>
      <Welcome/>
    </Layout>
  )
}

export default Home