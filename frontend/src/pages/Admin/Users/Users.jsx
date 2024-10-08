import { useEffect, useState } from "react";
import httpRequest from "../../../utils/httpRequest";
import Dropdown from "../../../components/Drowdown/Drowdown";


function AdminUsers() {
  const [users, setUsers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  
  
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

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
          className='bg-secondary py-3 px-7 rounded-full text-white flex gap-4 items-center'
          >
          <div>Add New</div>
          <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path fill="white" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/>
          </svg>
        </button>
    </header>
    <div className="grid grid-cols-12 p-3">
      <section className="flex col-start-2 col-span-3">
        <Dropdown styles="dropdown">
          <Dropdown.Button >Username</Dropdown.Button>
          <Dropdown.Menu styles="dropdown-menu">
            <Dropdown.Options styles="dropdown-option" id="ascending">Ascending</Dropdown.Options>
            <Dropdown.Options styles="dropdown-option" id="descending">Descending</Dropdown.Options>
          </Dropdown.Menu>
        </Dropdown>
      </section>
      <section className="flex col-span-3">
        <Dropdown styles="dropdown">
          <Dropdown.Button >Email</Dropdown.Button>
          <Dropdown.Menu styles="dropdown-menu">
            <Dropdown.Options styles="dropdown-option" id="ascending">Ascending</Dropdown.Options>
            <Dropdown.Options styles="dropdown-option" id="descending">Descending</Dropdown.Options>
          </Dropdown.Menu>
        </Dropdown>
      </section>
      <section className="flex col-span-3">
        <Dropdown styles="dropdown">
          <Dropdown.Button >Full Name</Dropdown.Button>
          <Dropdown.Menu styles="dropdown-menu">
            <Dropdown.Options styles="dropdown-option" id="ascending">Ascending</Dropdown.Options>
            <Dropdown.Options styles="dropdown-option" id="descending">Descending</Dropdown.Options>
          </Dropdown.Menu>
        </Dropdown>
      </section>
      <section className="flex">
        <Dropdown styles="dropdown">
          <Dropdown.Button >Role</Dropdown.Button>
          <Dropdown.Menu styles="dropdown-menu">
            <Dropdown.Options styles="dropdown-option" id="consumer">Consumer</Dropdown.Options>
            <Dropdown.Options styles="dropdown-option" id="vendor">Vendor</Dropdown.Options>
            <Dropdown.Options styles="dropdown-option" id="others">Others</Dropdown.Options>
          </Dropdown.Menu>
        </Dropdown>
      </section>
    </div>
    <div className="py-2 flex flex-col gap-2">
      {
        users.map((user) => (
          <div key={user.id} className="grid grid-cols-12 bg-white p-3 w-full rounded-lg items-center">
            <input type="checkbox" className="col-start-1 col-span-1 w-6 h-6" />
            <div className="flex items-center gap-2 col-start-2 col-span-3">
              <img src='https://picsum.photos/20/20' alt={user.fullName} className="h-10 w-10 rounded-full" />
              <div className="text-md text-gray-500 truncate">{user.username}</div>
            </div>
            <div className="col-span-3 text-sm text-gray-500 truncate">{user.email}</div>
            <div className="col-span-3 text-sm text-gray-500 truncate">{user.fullName}</div>
            <div className="text-sm text-gray-500">{user.role}</div>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 448 512">
                <path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"/>
              </svg>
            </div>
          </div>
        ))
      }
    </div>
    <div className="flex justify-end">
      <ul className="flex">
        <li className="border border-grey-400 bg-white p-2 rounded">Previous</li>
        <li className="border border-grey-400 bg-white p-2">1</li>
        <li className="border border-grey-400 bg-white p-2">2</li>
        <li className="border border-grey-400 bg-white p-2">3</li>
        <li className="border border-grey-400 bg-white p-2">Next</li>
      </ul>
    </div>
  </div> );
}

export default AdminUsers;