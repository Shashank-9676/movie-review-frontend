import { useState } from 'react';
import Cookies from 'js-cookie';
import './Login.css'
import { useNavigate, Navigate } from 'react-router';
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleLogin = async(e) => {
        e.preventDefault()
        const response = await fetch('https://movie-reviews-c3h8.onrender.com/auth/login', {
            method: 'POST',
            headers: {
                    "Content-Type": "application/json"
                },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        console.log(data)
        if (response.ok) {
            Cookies.set('jwt_token', data.jwt_token,{ expires: 30 })
            setError('')
            setUsername('')
            setPassword('')
            navigate('/', { replace: true });
        } else {
            setError(data.message)
        }
    }
    if(Cookies.get('jwt_token') !== undefined){
        return <Navigate to="/" replace />;
    }
    return (
      <div className="main-container">
            <form className='form-container' onSubmit={handleLogin}>
                <div className='input-cont'>
                    <label htmlFor="username" >Username *</label>
                    <input type="text" value={username} id='username'placeholder="Enter Username"onChange={(e) => setUsername(e.target.value)} required/>
                </div>
                <div className='input-cont'>
                    <label htmlFor="password">Password *</label>
                    <input type="password" value={password} id='password' placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <div>
                    <p className='error-msg'>{error}</p>
                    <button type="submit" className='login-button'>Login</button>
                    <p>Don't have an account? <a href="/signup">Signup</a></p>
                </div>
            </form>
      </div>
  )
}
export default Login