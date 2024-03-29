import {useState,useEffect} from 'react' 
import {FaUser} from 'react-icons/fa'
import {useSelector,useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'


import { register,reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
function Register() {
    
    const [formData,setFormData] = useState({
        name:'',
        email:'',
        phone:'',
        password:'',
        password2:''
    })
    const {name,email,phone,password,password2} = formData

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const {user,isError,isSucces,isLoading ,message} = useSelector((state) => state.auth) 

	useEffect (()=>{
		if(isError){
			toast.error(message)
		}
		if(isSucces || user){
			navigate('/')
		}
		dispatch(reset())
	},[user,isError,isSucces,message,navigate,dispatch])


	const onChange =(e)=>{
		setFormData((prevState)=>({
			...prevState,
			[e.target.name]:e.target.value
		}))
	}
	const onSubmit =(e)=>{
		e.preventDefault()
		if(!name.trim() || !email.trim() || !password.trim() || !password2.trim() || !phone.trim()) {
			toast.warning("Please fill all the fields")
		} else {
			if(password !== password2){
				toast.error('Password do not match')
			} else {

				const userData = {
					name,
					email,
					phone,
					password
				}

				dispatch(register(userData))
			}
		
		}
	}

	if(isLoading){
		return <Spinner/>
	}
  return (
   <>
        <section className='heading'>
			<h1> <FaUser/> Register</h1>
			<p>Please create an account </p>
        </section>
        <section className="form">
			<form action="" onSubmit={onSubmit}>
				<div className="form-group">
					<input type="text" className="form-control" id='name' name='name' value={name} placeholder='Enter your name' onChange={onChange}  />
				</div>
				<div className="form-group">
					<input type="email" className="form-control" id='email' name='email' value={email} placeholder='Enter your email' onChange={onChange}  />
				</div>
				<div className="form-group">
					<input type="mobile" className="form-control" id='phone ' name ='phone' value={phone} placeholder='Enter your phone number ' onChange={onChange}  />
				</div>
				<div className="form-group">
					<input type="password" className="form-control" id='password' name='password' value={password} placeholder='Enter your password' onChange={onChange}  />
				</div>
				<div className="form-group">
					<input type="password" className="form-control" id='password2' name='password2' value={password2} placeholder='Confirm password' onChange={onChange}  />
				</div>
				<div className="form-group">
					<button type='submit' className='btn btn-block'>Submit</button>
				</div>
			</form>
          
        </section>
    </>
  )
}

export default Register
