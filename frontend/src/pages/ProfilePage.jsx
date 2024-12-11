import React from 'react'
import {useAuthStore} from "../store/useAuthStore"

const ProfilePage = () => {
  const{isUpdatingProfile,authUser}=useAuthStore();

  return (
    <section className='container mx-auto flex justify-center'>
      <div className='w-1/2'>
        
      </div>
    </section>
  )
}

export default ProfilePage
