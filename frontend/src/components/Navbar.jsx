import { LogOut, MessageSquare, Settings, User } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

const Navbar = () => {
  const {logout,authUser}=useAuthStore();
  return (
    <header className='py-3 sticky top-0 bg-base-100/5 backdrop-blur-sm'>
      <nav className='w-[97%] mx-auto flex justify-between'>
        <div>
          <Link to="/" className='flex items-center group cursor-pointer gap-2'>
            <div className='bg-primary/10 size-10 flex justify-center items-center rounded-lg group-hover:bg-primary/20'>
              <MessageSquare className='size-6 text-primary' />
            </div>
            <h1 className='text-lg font-bold'>
              Converse
            </h1>
          </Link>
        </div>
        <div className='flex gap-2'>
          <div className='flex items-center'>
            <Link to="/settings" className='btn btn-sm gap-2 transition-colors'><Settings className='size-5' /><span className='hidden sm:inline'>Settings</span></Link>
          </div>
          {authUser && (
            <>
              <div className='flex items-center'>
                <Link to="/profile" className='btn btn-sm gap-2 transition-colors'><User className='size-5' /><span className='hidden sm:inline'>Profile</span></Link>
              </div>

              <button onClick={logout} className='flex items-center gap-2'>
                <LogOut className='size-5'/>
                <span className='hidden sm:inline'>Log Out</span>
              </button>
              
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
