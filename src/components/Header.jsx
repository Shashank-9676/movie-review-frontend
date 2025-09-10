import { useNavigate} from 'react-router'
import Cookies from 'js-cookie'

function Header() {
    const navigate = useNavigate()
    const logOut = () => {
        Cookies.remove('jwt_token')
        navigate('/login')
    }

  return (
        <div className='w-screen bg-[#252b36] flex justify-between items-center px-3 shadow-xl'>
        <img onClick={() => navigate('/')} className='h-24 cursor-pointer p-2 mx-2' src="https://res.cloudinary.com/dnhc09agd/image/upload/v1757500993/bcc28474-b5bb-47b0-968c-f487dc94953d_cegkjh.png" alt="logo" />
        <button onClick={logOut} className='bg-blue-500 text-white p-3 rounded-lg px-5 mx-6 cursor-pointer'>Logout</button>
    </div>

  )
}

export default Header
