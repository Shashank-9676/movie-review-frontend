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
      <div className="h-screen w-screen flex items-center justify-center">
        
  <form
    className="flex flex-col bg-white items-center justify-center rounded-xl px-5 py-10 shadow-md shadow-black/20"
    onSubmit={handleLogin}
  >
    <div className="flex flex-col pb-2.5 w-full px-6">
        <h1 className='font-bold text-center text-3xl text-gray-800 pb-3'>Login</h1>
      <label htmlFor="username" className="text-base font-medium">
        Username *
      </label>
      <input
        type="text"
        value={username}
        id="username"
        placeholder="Enter Username"
        onChange={(e) => setUsername(e.target.value)}
        required
        className="mt-2 p-2 border-2 border-gray-300 rounded-md bg-transparent outline-none text-base"
      />
    </div>

    <div className="flex flex-col pb-2.5 w-full px-6">
      <label htmlFor="password" className="text-base font-medium">
        Password *
      </label>
      <input
        type="password"
        value={password}
        id="password"
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
        required
        className="mt-2 p-2 border-2 border-gray-300 rounded-md bg-transparent outline-none text-base"
      />
    </div>

    <div className="w-full px-6">
      <p className="text-red-500 text-base">{error}</p>
      <button onClick={handleLogin}
        type="submit"
        className="w-full py-2 px-4 rounded-md bg-indigo-500 text-white text-base cursor-pointer mt-2"
      >
        Login
      </button>
      <p className="mt-2 text-center text-sm">
        Don’t have an account?{" "}
        <span onClick={() => navigate("/signup")} className="text-indigo-600 hover:underline cursor-pointer">
          Signup
        </span>
      </p>
    </div>
  </form>
</div>

  )
}
export default Login