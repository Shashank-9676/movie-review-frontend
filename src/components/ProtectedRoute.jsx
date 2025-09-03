
import React from 'react'
import { Navigate } from 'react-router'
import Cookies from 'js-cookie'
function ProtectedRoute({ children }) {
  const isLoggedIn = Cookies.get('jwt_token')

  if (!isLoggedIn) {
    return <Navigate to="/login" />
  }
  return (
    <div>
      {children}
    </div>
  )
}

export default ProtectedRoute
