import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Dashboard() { 

  const navigate = useNavigate()

  const {user} = useSelector((state) => state.auth)

  useEffect(()=>{
    if(!user) {
      navigate('/login')
    }
  },[user,navigate])
  return (
    <div>
      <h2>Dashboard</h2>
      {
        user&&<h1>Welcome {user.name}</h1>
      }
    </div>
  )
}

export default Dashboard
