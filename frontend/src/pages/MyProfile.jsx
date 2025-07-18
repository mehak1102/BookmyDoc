// import React, { useContext, useState } from 'react'
// // import { assets } from '../assets/assets'
// import { AppContext } from '../context/AppContext'
// import {assets} from '../assets/assets'
// import axios from 'axios'
// import { toast } from 'react-toastify'

// const MyProfile = () => {

// const {userData,setUserData,token, backendUrl, loadUserProfileData} = useContext(AppContext)

// const [isEdit,setIsEdit] = useState(false)
// const [image,setImage]= useState(false)



// const updateUserProfileData = async () => {
// try {
//   const formData = new FormData()

//   formData.append('name',userData.name)
//   formData.append('phone',userData.phone)
//   formData.append('address', JSON.stringify(userData.address))
//   formData.append('gender',userData.gender)
//   formData.append('dob',userData.dob)
  
//   image && formData.append('image',image)

//   const {data} = await axios.post(backendUrl + '/api/user/update-profile', formData, {headers:{token}} )
   
//   if(data.success) {
//     toast.success(data.message)
//     await loadUserProfileData()
//     setIsEdit(false)
//     setImage(false)
//   } else {
//     toast.error(data.message)
//   }
  
// } catch (error) {
//   console.log(error);
//   toast.error(error.message) 
// }
// }



//   return userData && (
//     <div className='max-w-lg flex flex-col gap-2 text-sm'>
//       {
//         isEdit 
//         ? <label htmlFor="image">
//           <div className='inline-block relative cursor-pointer'>
//             <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image): userData.image} alt="" />

//             <img className='w-10 absolute bottom-12 right-12' src={image ? '': assets.upload_icon} alt="" />
//           </div>
//           {/* <div>
//   <img
//     src={image ? URL.createObjectURL(image) : userData.image}
//     alt=""
//     className="w-36 h-36 object-cover rounded"
//   />
//   {!image && (
//     <img
//       src={assets.upload_icon}
//       alt="Upload"
//       className="absolute top-2 right-2 w-6 h-6"
//     />
//   )}
// </div> */}
//           <input onChange={(e)=> setImage(e.target.files[0])} type="file"  id='image' hidden />
//         </label>
//         : <img className='w-36 rounded' src={userData.image} alt="" />

// }
//          {
//           isEdit
//           ? <input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4' type="text" value={userData.name} onChange={e =>setUserData(prev => ({...prev,name:e.target.value}))} />
//           : <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
//          }
//          <hr className='bg-zinc-400 h-[1px] border-none'></hr>
//          <div>
//           <p className='text-neutral-500 underline mt-3' >CONTACT INFORMATION</p>
//           <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
//             <p className='font-medium'>Email id:</p>
//             {/* <p>{userData.email}</p> */}
//             {
//           isEdit
//           ? <input className='bg-gray-100 max-w-52' type="text" value={userData.email} onChange={e =>setUserData(prev => ({...prev,email:e.target.value}))} />
//           : <p className='text-blue-500'>{userData.email}</p>
//          }
//             <p className='font-medium'>Phone:</p>
//              {
//           isEdit
//           ? <input className='bg-gray-100 max-w-52' type="text" value={userData.phone} onChange={e =>setUserData(prev => ({...prev,phone:e.target.value}))} />
//           : <p className='text-blue-400'>{userData.phone}</p>
//          }
//         <p  className='font-medium'>Address:</p>
//         {
//           isEdit
//           ? <p>
//             <input className='bg-gray-50' onChange={(e)=> setUserData(prev => ({...prev, address: {...prev.address, line1: e.target.value}}))} value={userData.address.line1} type="text" />
//             <br></br>
//             <input className='bg-gray-50' onChange={(e)=> setUserData(prev => ({...prev, address: {...prev.address, line2: e.target.value}}))} value={userData.address.line2} type="text" />
//           </p>
//           : <p className='text-gray-500'>
//             {userData.address.line1}
//             <br></br>
//             {userData.address.line2}
//           </p>
//         }
//           </div>
//          </div>
//          <div>
//           <p className='text-neutral-500 underline mt-3'>BASIS INFORMATION</p>
//           <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
//             <p  className='font-medium'>Gender:</p>
//         {
//                isEdit
//           ? <select className='max-w-20 bg-gray-100' onChange={(e)=> setUserData(prev => ({...prev, gender: e.target.value}))}  value={userData.gender}>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//             </select>
//           : <p className='text-gray-400'>{userData.gender}</p>
//          }
//          <p  className='font-medium'>Date Of Birth:</p>
//          {
//           isEdit 
//           ? <input className='max-w-28 bg-gray-100' type="date" onChange={(e)=> setUserData(prev => ({...prev, dob: e.target.value}))}  value={userData.dob} />
//           : <p className='text-gray-400'>{userData.dob}</p>
//          }
//           </div>
//          </div>
//        <div className='mt-10'>
//         {
//           isEdit
//           ? <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={updateUserProfileData}>Save Information</button>
//           : <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all'  onClick={()=> setIsEdit(true)}>Edit</button>
//         }
//        </div>
//     </div>
//   )
// }

// export default MyProfile





import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData()
      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)
      image && formData.append('image', image)

      const { data } = await axios.post(
        backendUrl + '/api/user/update-profile',
        formData,
        { headers: { token } }
      )

      if (data.success) {
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return userData && (
    <div className='max-w-3xl mx-auto px-4 sm:px-8 md:px-12 py-8 text-sm'>
      <div className='flex items-start gap-6 mb-8'>
        {isEdit ? (
          <label htmlFor="image" className="relative cursor-pointer">
            <img
              className='w-36 h-36 object-cover rounded opacity-80'
              src={image ? URL.createObjectURL(image) : userData.image}
              alt="profile"
            />
            <img
              className='w-10 absolute bottom-2 right-2'
              src={image ? '' : assets.upload_icon}
              alt="upload"
            />
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden />
          </label>
        ) : (
          <img className='w-36 h-36 object-cover rounded' src={userData.image} alt="profile" />
        )}

        <div className='flex-1'>
          {isEdit ? (
            <input
              className='text-3xl font-semibold text-gray-800 bg-gray-100 px-3 py-1 rounded w-full max-w-xs'
              type="text"
              value={userData.name}
              onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
            />
          ) : (
            <p className='text-3xl font-semibold text-neutral-800'>{userData.name}</p>
          )}
          <p className='text-gray-400 mt-1'>{userData.email}</p>
        </div>
      </div>

      <hr className='mb-6 border-gray-300' />

      {/* Contact Info */}
      <div className='mb-6'>
        <p className='text-lg font-medium text-primary mb-4 underline'>Contact Information</p>
        <div className='grid grid-cols-[120px_1fr] gap-y-3'>
          <p className='font-medium'>Phone:</p>
          {isEdit ? (
            <input className='bg-gray-100 px-3 py-1 rounded w-full max-w-xs' type="text"
              value={userData.phone}
              onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
            />
          ) : <p className='text-blue-600'>{userData.phone}</p>}

          <p className='font-medium'>Address:</p>
          {isEdit ? (
            <div className='space-y-1'>
              <input
                className='bg-gray-100 px-3 py-1 rounded w-full'
                placeholder="Line 1"
                value={userData.address.line1}
                onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
              />
              <input
                className='bg-gray-100 px-3 py-1 rounded w-full'
                placeholder="Line 2"
                value={userData.address.line2}
                onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
              />
            </div>
          ) : (
            <p className='text-gray-600'>
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          )}
        </div>
      </div>

      {/* Basic Info */}
      <div className='mb-10'>
        <p className='text-lg font-medium text-primary mb-4 underline'>Basic Information</p>
        <div className='grid grid-cols-[120px_1fr] gap-y-3'>
          <p className='font-medium'>Gender:</p>
          {isEdit ? (
            <select
              className='bg-gray-100 px-3 py-1 rounded w-32'
              onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
              value={userData.gender}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : <p className='text-gray-600'>{userData.gender}</p>}

          <p className='font-medium'>Date of Birth:</p>
          {isEdit ? (
            <input
              className='bg-gray-100 px-3 py-1 rounded w-40'
              type="date"
              value={userData.dob}
              onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
            />
          ) : <p className='text-gray-600'>{userData.dob}</p>}
        </div>
      </div>

      {/* Button */}
      <div>
        {isEdit ? (
          <button
            onClick={updateUserProfileData}
            className='bg-primary text-white px-6 py-2 rounded-full hover:opacity-90 transition-all'
          >
            Save Changes
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className='border border-primary text-primary px-6 py-2 rounded-full hover:bg-primary hover:text-white transition-all'
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  )
}

export default MyProfile
