import React from 'react'
import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Loader } from "lucide-react";
import Navbar from "./components/Navbar"
import Homepage from './pages/Homepage'
import SignUpPage from "./pages/SignUpPage"
import LogInPage from "./pages/LogInPage"
import SettingsPage from "./pages/SettingsPage"
import ProfilePage from "./pages/ProfilePage"
import { useAuthStore } from './store/useAuthStore'
import { Toaster } from 'react-hot-toast';
import { useThemeStore } from './store/useThemeStore';

const App = () => {
  const {theme}=useThemeStore();
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  console.log(onlineUsers);
  useEffect(() => {
    checkAuth()
  }, [checkAuth]);

  console.log({ authUser });
  if (isCheckingAuth && !authUser) return (
    <div className='flex items-center justify-center h-screen'>
      <Loader className='size-10 animate-spin' />
    </div>
  )

  return (
    <>
      <div data-theme={theme} className='min-h-screen flex flex-col'>
        <Navbar />
        <main className='w-full flex-1 h-full flex flex-col'>
          <Routes>
            <Route path='/' element={authUser ? <Homepage /> : <Navigate to="/login" />} />
            <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
            <Route path='/login' element={!authUser ? <LogInPage /> : <Navigate to="/" />} />
            <Route path='/settings' element={<SettingsPage />} />
            <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
          </Routes>
        </main>
        <Toaster />
      </div>
    </>
  )
}

export default App
