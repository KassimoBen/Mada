import { createContext, useContext, useState, useEffect } from 'react'
import { api } from './api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Vérifier si l'utilisateur est connecté au chargement
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      api.get('/auth/me')
        .then(d => {
          setUser(d.user)
          setError(null)
        })
        .catch(err => {
          console.error('Erreur auth:', err)
          localStorage.removeItem('token')
          setError(null) // Ne pas afficher l'erreur au démarrage
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    const data = await api.post('/auth/login', { email, password })
    localStorage.setItem('token', data.token)
    setUser(data.user)
    setError(null)
    return data
  }

  const register = async (data) => {
    const res = await api.post('/auth/register', data)
    localStorage.setItem('token', res.token)
    setUser(res.user)
    setError(null)
    return res
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    setError(null)
  }

  const updateProfile = async (profileData) => {
    const res = await api.put('/auth/profile', profileData)
    setUser(res.user)
    setError(null)
    return res
  }

  const isAdmin = () => user?.role === 'admin'

  return (
    <AuthContext.Provider value={{ 
      user, 
      setUser,
      loading, 
      error, 
      login, 
      register, 
      logout, 
      updateProfile,
      isAdmin,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth doit être utilisé dans AuthProvider')
  }
  return context
}
