import { useState } from 'react';
import {useNavigate, Navigate} from 'react-router'
import Cookies from 'js-cookie';
function Signup() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()
    const handleSignup = async(e) => {
        
        e.preventDefault()
        const response = await fetch('https://movie-reviews-c3h8.onrender.com/auth/register',{
            method:"POST",
            headers: {
                    "Content-Type": "application/json"
                },
            body: JSON.stringify({username, password,name,email})
        })
        const data = await response.json()
        if(response.ok){
            Navigate('/login')
            setEmail('')
            setName('')
            setError('')
            setPassword('')
            setUsername('')
        }else{
            setError(data.message)
        }
    }
    if (Cookies.get('jwt_token') !== undefined) {
        return <Navigate to="/" replace />;
    }
    return (

    <div className="main-container">
            <form className='form-container' onSubmit={handleSignup}>
                <div className='input-cont'>
                    <label htmlFor="username" >Username *</label>
                    <input type="text" id='username' value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter Username" required />
                </div>
                <div className='input-cont'>
                    <label htmlFor="name" >Name *</label>
                    <input type="text" id='name' value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Your Name" required />
                </div>
                <div className='input-cont'>
                    <label htmlFor="email" >Email *</label>
                    <input type="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" required />
                </div>
                <div className='input-cont'>
                    <label htmlFor="password">Password *</label>
                    <input type="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' required />
                </div>
                <div>
                    <p className='error-msg'>{error}</p>
                <button type="submit" className='login-button'>Signup</button>
                <p>Already have an account? <span className='text-blue-500 cursor-pointer' onClick={() => navigate('/login')}>Login</span></p>
                </div>
            </form>
      </div>
    
  )
}

export default Signup
