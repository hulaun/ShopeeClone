import { useEffect, useState } from "react";
import { IconButton } from "../../../../components/Buttons/Buttons";

function ChatRooms(rooms) {
  const [activeTab, setActiveTab] = useState('All');
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  console.log(rooms);
  const handleDate = (date) => {
    const serverDateStr = date;

    const serverDate = new Date(serverDateStr);

    const currentDate = new Date();

    const diffInMs = currentDate - serverDate;

    let diffInSeconds;
    let diffInMinutes;
    let diffInHours;

    if((diffInSeconds = Math.floor(diffInMs / 1000))<60){
      return `${diffInSeconds} seconds ago`;
    }
    if((diffInMinutes = Math.floor(diffInMs / 60000))<60){
      return `${diffInMinutes} minutes ago`;
    }
    if((diffInHours = Math.floor(diffInMs / 3600000))<24){
      return `${diffInHours} hours ago`;
    }
    return `${Math.floor(diffInMs / 86400000)} days ago`;
  }


  return (
    <div className="basis-1/3 bg-white rounded-xl p-5">
      <section className="flex items-center justify-between pb-2">
        <h1 className="text-2xl">Message</h1>
        <IconButton>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="10" height="10">
            <path fill="white" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/>
          </svg>
        </IconButton>
      </section>
      <section className="relative py-2">
        <input type="text" className="bg-grey-100 p-2 pl-4 rounded-lg w-full border border-grey-300" placeholder="Search" />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20">
            <path fill="grey" d="M505 442.7L405.3 343c28.4-34.9 45.7-79.4 45.7-127C451 96.5 354.5 0 231 0S11 96.5 11 216s96.5 216 216 216c47.6 0 92.1-17.3 127-45.7l99.7 99.7c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-34zM231 392c-97.2 0-176-78.8-176-176S133.8 40 231 40s176 78.8 176 176-78.8 176-176 176z"/>
          </svg>
        </div>
      </section>
      <section>
        <ul className="flex items-center py-2 justify-center">
          {['All', 'Personal', 'Teams'].map((tab) => (
            <li
              key={tab}
              className={`text-lg cursor-pointer relative p-2 ${activeTab === tab ? 'text-primary' : 'text-grey-400'}`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
              <span
                className={`absolute bottom-0 left-0 right-0 h-1 transition-all duration-300 ${activeTab === tab ? 'bg-primary' : 'bg-grey-200'}`}
              ></span>
            </li>
          ))}
        </ul>
      </section>
      <section className="flex flex-col gap-2 py-2">
        {rooms && rooms.rooms.map(room =>(
          <div key={room.roomId} className="flex items-center gap-2 hover:bg-grey-100 rounded-lg">
            <div className="w-12 aspect-square bg-primary rounded-full"></div>
            <div className="flex flex-col w-full">
              <div className="flex justify-between items-center">
                <h1 className="text-lg truncate">{room.roomName=='1on1'?room.senderName:room.roomName}</h1>
                <div className="text-grey-200">{handleDate(room.lastMessageAt)}</div>
              </div>
              <p className="text-sm">{room.lastMessage}</p>
            </div>
          </div>))
        }
      </section>
    </div>
  );
}

export default ChatRooms;