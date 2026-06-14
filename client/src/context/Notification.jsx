import { createContext, useContext, useState, useCallback } from 'react'

const NotificationContext = createContext()

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState(null)

  const notify = useCallback((message, type = 'error') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 4000)
  }, [])

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      {notification && (
        <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-xl text-white text-sm font-medium animate-slide-up ${notification.type === 'error' ? 'bg-red-600' : notification.type === 'success' ? 'bg-green-600' : 'bg-ocean-600'}`}>
          <div className="flex items-center gap-2">
            <span>{notification.type === 'error' ? '!' : notification.type === 'success' ? '*' : 'i'}</span>
            <span>{notification.message}</span>
            <button onClick={() => setNotification(null)} className="ml-3 opacity-70 hover:opacity-100">X</button>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  )
}

export const useNotify = () => useContext(NotificationContext)
