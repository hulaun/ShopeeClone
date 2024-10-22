import ChatRooms from "./components/ChatRooms";
import MainChat from "./components/MainChat";

function AdminMessages() {
  return ( <div className="w-full p-8 flex gap-8">
    <ChatRooms/>
    <MainChat/>
  </div> );
}

export default AdminMessages;