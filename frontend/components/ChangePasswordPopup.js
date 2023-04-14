import { useState } from 'react';

const ChangePasswordPopup = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isOpen, setIsOpen] = useState(false); // State to track if the popup is open or closed

  const handleChangePassword = () => {
    // Add logic to handle password change
    // e.g., make API request to update password
    console.log('Password changed:', {
      currentPassword,
      newPassword,
      confirmPassword
    });
    // Reset form fields
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    // Close the popup
    setIsOpen(false);
  };

  return (
    <div>
      <button
        className="text-purple-500  hover:brightness-95  font-bold text-base"
        onClick={() => setIsOpen(true)} // Open the popup on button click
      >
        Edit
      </button>

      {/* Popup */}
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            {/* Popup overlay */}
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                {/* Popup */}
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                {/* Popup container */}
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                {/* Popup content */}
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    {/* Popup header */}
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                                    Change Password
                                </h3>
                                <div className="mt-2">
                                    <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                                        Current Password
                                    </label>
                                    <div className="mt-1">
                                        <input type="password" name="current-password" id="current-password" className="shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                                        New Password
                                    </label>
                                    <div className="mt-1">
                                        <input type="password" name="new-password" id="new-password" className="shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                                        Confirm Password
                                    </label>
                                    <div className="mt-1">
                                        <input type="password" name="confirm-password" id="confirm-password" className="shadow-sm focus:ring-purple-500 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Popup footer */}
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={handleChangePassword}>
                            Change Password
                        </button>
                        <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setIsOpen(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
        )}
          {/* ... Rest of the popup JSX */}
          {/* Add logic to close the popup */}
          <button
            className="absolute top-0 right-0 mt-4 mr-4 text-gray-600 hover:text-gray-800 focus:outline-none"
            onClick={() => setIsOpen(false)} // Close the popup on close button click
          >
            {/* Close button icon */}

            {/* Example: */}
            {/* <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"> */}
            {/*   <path */}
            {/*     strokeLinecap="round" */}
            {/*     strokeLinejoin="round" */}
            {/*     strokeWidth="2" */}
            {/*     d="M6 18L18 6M6 6l12 12" */}
            {/*   /> */}
            {/* </svg> */}
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M0 0h24v24H0z"
                fill="none"
              />
              <path
                d="M6 18L18 6M6 6l12 12"
                stroke="#4A5568"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* ... Rest of the popup JSX */}

        </div>
      )}
    

export default ChangePasswordPopup;