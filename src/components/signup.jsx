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
            navigate('/login')
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
<div className="flex items-center justify-center px-4 h-screen w-screen bg-[url('https://images.pexels.com/photos/956981/milky-way-starry-sky-night-sky-star-956981.jpeg')] bg-fixed bg-cover">
  <form className="p-8 rounded-2xl shadow-lg w-full max-w-md bg-white" onSubmit={handleSignup}>
    <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
    <div className="mb-4">
      <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username *</label>
      <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter Username" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
    </div>

    <div className="mb-4">
      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
      <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Your Name" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
    </div>

    <div className="mb-4">
      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
      <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
    </div>

    <div className="mb-4">
      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
      <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
    </div>

    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition">Signup</button>
    <p className="mt-4 text-sm text-center text-gray-600">Already have an account?<span className="text-blue-500 font-medium cursor-pointer hover:underline" onClick={() => navigate("/login")}>Login</span></p>
  </form>
</div>
    
)
}

export default Signup
