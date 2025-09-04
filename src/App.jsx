import Login from './components/Login'
import Signup from './components/signup'
import Home from './components/Home'
import MovieDetail from './components/MovieDetail'
import { BrowserRouter, Routes, Route } from 'react-router'
import ProtectedRoute from './components/ProtectedRoute'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/movies/:id" element={<ProtectedRoute><MovieDetail /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
