import React, { useState } from 'react';

function AdminDashboard() {

  const [dateDropdown, setDateDropdown] = useState(false);
  
  const handleDateDropdown = () => {
    setDateDropdown(!dateDropdown);
  }
  return (
    <div className='w-full p-8'>
      <header className='flex flex-row justify-between items-center'>
        <h1 className='text-2xl font-semibold'>Dashboard</h1>
        <button 
          className='bg-secondary py-3 px-7 rounded-md text-white flex gap-4 items-center'
          onClick={handleDateDropdown}>
          <div>Feb 2023</div>
          {dateDropdown? <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill='white' d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
          </svg>
          :
          <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill='white' d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"/>
          </svg>
          }
        </button>
      </header>
    </div>
  );
}

export default AdminDashboard;
