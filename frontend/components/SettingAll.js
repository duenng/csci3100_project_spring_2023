import { EyeIcon, EyeSlashIcon } from '@heroicons/react/outline';
import { Icon } from '@iconify/react';
import { useState } from "react";

function SettingAll() {
  const [userId, setUserId] = useState(1); // Example user data
  const [email, setEmail] = useState('example@example.com'); // Example user data
  const [password, setPassword] = useState('password123'); // Example user data
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleDeleteAccount = () => {
    // Logic for deleting user account
    alert('Account deleted!');
  };

  return (
    <>
    <div className="pr-[00px] xl:ml-[370px] border-l border-r xl:min-w-[576px] sm:ml-[15%] max-w-xl ml-[px] flex-grow sm:pl-0 min-w-[15%]">
    <div className= " rounded-sm sticky z-30 top-0 flex  h-14 items-center bg-opacity-75 backdrop-blur-sm bg-violet-500" onClick={()=>handleTop()}>
          <h1 className=" font-bold dark:text-gray-800 text-white text-2xl ml-6" >Setting</h1>
        </div>
    

    <div>
        <h2 className="mt-4 mb-4  items-center font-bold dark:text-white  text-2xl ml-6">Account</h2>
        <p className="my-2 ml-8 mr-8 mb-8 mt-8">See information of your account, managing authentication keys, including email, password and linked accounts rom third-party provider, or deleting your account. </p>
        <div className="ml-4 flex-row">
          <div className="font-bold flex h-12">User ID: 
            <div className='pl-8 items-center'>{userId}</div>
          </div>
          <hr className="my-2" /> {/* Horizontal line */}
          <div className="font-bold flex h-12">Email: 
            <p className="pl-8 items-center">{email}</p>
          </div>
          <hr className="my-2" /> {/* Horizontal line */}
          <div className="font-bold flex h-12">Password:
          <p className='pl-8'>{showPassword ? password : '**********'}</p>
          <Icon Icon={showPassword ? EyeSlashIcon : EyeIcon} className="h-5 w-5 ml-2" onClick={handlePasswordToggle} />
          </div>
          <hr className="my-2" /> {/* Horizontal line */}
          
          <button className="bg-purple-500 text-white hover:brightness-95 rounded-full w-56 h-12 font-bold shadow-md text-lg " Icon={EyeSlashIcon} onClick={handlePasswordToggle}>
            {showPassword ? 'Hide Password' : 'Show Password'}
          </button>
          <button className="bg-purple-500 text-white hover:brightness-95 rounded-full w-56 h-12 font-bold shadow-md text-lg ">Edit</button>
          <button onClick={handleDeleteAccount}>Delete Account</button>
        </div>
      </div>
      </div>
      </>
  )
}

export default SettingAll