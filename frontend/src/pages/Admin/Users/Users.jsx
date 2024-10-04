import { useEffect, useState } from "react";
import httpRequest from "../../../utils/httpRequest";


function AdminUsers() {

  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await httpRequest.get("/user/page/1?limit=10")
      console.log(response)
      if (response.status === 200) {
        setUsers(response.data)
      }
    }
    fetchUsers()
  }, [])

  return ( <div className="w-full p-8">
    <header className="flex justify-between items-center">
      <h1 className="text-2xl font-semibold">Users List</h1>
      <button 
          className='bg-secondary py-3 px-7 rounded-md text-white flex gap-4 items-center'
          >
          <div>Add New</div>
          <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path fill="white" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/>
          </svg>
        </button>
    </header>
    <div className="py-2 flex flex-col gap-2">
      {
        users.map((user) => (
          <div key={user.id} className="flex items-center gap-3 bg-white p-3 w-full rounded-lg">
            <img src='https://picsum.photos/20/20' alt={user.fullName} className="h-10 w-10 rounded-full" />
            <div className="text-lg font-semibold">{user.fullName}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
        ))
      }
    </div>
  </div> );
}

export default AdminUsers;