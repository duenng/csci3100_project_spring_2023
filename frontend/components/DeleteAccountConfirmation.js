import React, { useState } from "react";

const DeleteAccountConfirmation = () => {
  const [showConfirmation, setShowConfirmation] = useState(false); // State to track if confirmation dialog is shown

  const handleDelete = () => {
    // Add logic to delete the account
    // e.g., make API request to delete account
    console.log("Account deleted!");
    // Close the confirmation dialog
    setShowConfirmation(false);
  };

  return (
    <div>
      <div className="mt-2 mb-2">
        I confirm that all data will be deleted permanently and cannot be
        recovered.
      </div>
      <button
        className="bg-red-500 text-white hover:bg-red-700 rounded-md px-4 py-2 mt-2 "
        onClick={() => setShowConfirmation(true)} // Show confirmation dialog on button click
      >
        Delete Account
      </button>

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed z-10 inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white w-96 p-4 rounded-md">
            <h2 className="text-lg font-bold mb-4">Confirm Account Deletion</h2>
            <p className="mb-4">
              Are you sure you want to delete your account? This action cannot
              be undone.
            </p>
            <div className="flex justify-end">
              <button
                className="bg-red-500 text-white hover:bg-red-700 rounded-md px-4 py-2 mr-2"
                onClick={handleDelete} // Delete account on confirmation
              >
                Delete
              </button>
              <button
                className="bg-gray-300 text-gray-700 hover:bg-gray-400 rounded-md px-4 py-2"
                onClick={() => setShowConfirmation(false)} // Close confirmation dialog on cancel
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteAccountConfirmation;
