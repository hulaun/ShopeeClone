import { useAuth } from "../../../context/AuthContext";
import { privateGet } from "../../../utils/httpRequest";
import ChatRooms from "./components/ChatRooms";
import MainChat from "./components/MainChat";
import { useEffect, useMemo, useState } from 'react';
import io from 'socket.io-client';

function AdminMessages() {

  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState({
    id: '',
    name: '',
    icon: '',
  });

  useEffect(() => {
    const newSocket = io('http://localhost:5500/chat');
    setSocket(newSocket);

    newSocket.on('broadcastMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    newSocket.on('chatRoom', (chatRoom) => {
      console.log('chatRoom', chatRoom);
    })

    const fetchData = async () => {
      const roomsResponse = await privateGet('/chat');
      const currentRoomResponse = await privateGet('/chat/most-recently-visited');
      
      setRooms(roomsResponse.data.data);
      setMessages(currentRoomResponse.data.data.messages);
      
      const roomData = roomsResponse.data.data.filter((room) => room.roomId === currentRoomResponse.data.data.roomId);
      setCurrentRoom(roomData[0]);
    };
    
    fetchData();
    return () => {
      newSocket.disconnect();
    };
  }, []);

  
  const sendMessage = useMemo((input) => {
    if (socket && input) {
      socket.emit('sendMessage', input, rooms);
    }
  },[]);
  return ( <div className="w-full p-8 flex gap-8">
    <ChatRooms setCurrentRoom={setCurrentRoom} currentRoom={currentRoom} rooms={rooms}/>
    <MainChat currentRoom={currentRoom} messages={messages} sendMessage={sendMessage}/>
  </div> );
}

export default AdminMessages;