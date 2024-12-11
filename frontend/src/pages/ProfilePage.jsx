import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore"
import { Camera, User } from "lucide-react"

const ProfilePage = () => {
  const { isUpdatingProfile, authUser ,updateProfile} = useAuthStore();
  const [selectedImage, setselectedImage] = useState(null);
  const handleImageUpload = async(e) => {
    const file=e.target.files[0];
    if(!file) return
    const reader=new FileReader();
    reader.readAsDataURL(file);
    reader.onload=async()=>{
      const base64Image=reader.result;
      setselectedImage(base64Image);
      await updateProfile({profilePic:base64Image}) 
    } 
  }
  return (
    <section className='container mx-auto flex justify-center pt-5'>
      <div className='w-[50%] rounded-lg bg-base-300 p-3'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold'>Profile</h1>
          <h5 className='mt-2'>Your Profile Information</h5>
        </div>
        <div className='flex flex-col items-center gap-4 mt-3'>
          <div className='relative'>
            <img src={selectedImage||authUser.profilePic || "/avatar.png"}
              alt="Avatar"
              className='size-32 rounded-full object-cover border-4'
            />
            <label
              htmlFor="Avatar-upload"
              className={`absolute bottom-0 right-0 bg-base-content rounded-full hover:scale-105 
              cursor-pointer p-2 transition-all duration-200 ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}
            >
              <Camera className='w-5 h-5 text-base-300' />
              <input
                type="file"
                id="Avatar-upload"
                className='hidden'
                accept='image/*'
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>
          <p className='text-sm text-zinc-400'>
                {isUpdatingProfile?"Uploading...":"Click the Camera icon to Update your Picture"}
          </p>
        </div>
        <div className='space-y-6'>
          <div className='space-y-1.5'>
            <div className='text-sm text-zinc-400 flex items-center gap-2'>
              <User className='w-4 h-4'/>
              <p className='font-semibold'>Full Name</p>
            </div>
            <p className='px-5 py-2.5 bg-base-200 rounded-lg border'>{authUser?.fullName}</p>
          </div>
          <div className='space-y-1.5'>
            <div className='text-sm text-zinc-400 flex items-center gap-2'>
              <User className='w-4 h-4'/>
              <p className='font-semibold'>Email Address</p>
            </div>
            <p className='px-5 py-2.5 bg-base-200 rounded-lg border'>{authUser?.email}</p>
          </div>
        </div>
        <div className='mt-6 bg-base-300 rounded-xl p-6'>
          <h2 className='text-lg font-medium mb-4'>Account Information</h2>
          <div className='text-sm space-y-3'>
            <div className='border-zinc-400 flex justify-between items-center py-2 border-b'>
              <span>Memeber Since</span>
              <span>{authUser.createdAt?.split("T")[0]}</span>
            </div>
            <div className='flex items-center justify-between'>
              <span>Account Status</span>
              <span className='text-green-500'>Active</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProfilePage
