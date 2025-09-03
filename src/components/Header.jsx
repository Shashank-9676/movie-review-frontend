import { useNavigate} from 'react-router'
import Cookies from 'js-cookie'

function Header() {
    const navigate = useNavigate()
    const logOut = () => {
        Cookies.remove('jwt_token')
        navigate('/login')
    }

  return (
        <div className='w-screen flex justify-between items-center mt-3 shadow-xl'>
        <img className='h-24 fill-gray-500 drop-shadow-lg drop-shadow-gray-500/50 rounded-4xl' src="https://res.cloudinary.com/dnhc09agd/image/upload/v1756905081/unnamed_gchvae.webp" alt="logo" />
        <button onClick={logOut} className='bg-blue-500 text-white p-3 rounded-lg px-5 mx-6 cursor-pointer'>Logout</button>
    </div>

  )
}

export default Header
