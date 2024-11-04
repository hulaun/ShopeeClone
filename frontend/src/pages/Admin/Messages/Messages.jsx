import { useAuth } from "../../../context/AuthContext";
import { privateGet } from "../../../utils/httpRequest";
import ChatRooms from "./components/ChatRooms";
import MainChat from "./components/MainChat";
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

function AdminMessages() {

  const { user } = useAuth();

  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const newSocket = io('http://localhost:5500/chat');
    setSocket(newSocket);

    newSocket.emit('joinRoom', 'admin');

    newSocket.on('broadcastMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    newSocket.on('chatRoom', (chatRoom) => {
      console.log('chatRoom', chatRoom);
    })

    const fetchRooms = async () => {
      const response = await privateGet('/chat');
      setRooms(response.data.data);
    };
    
    const fetchMostRecentlyVisitedRoom = async () => {
      const response = await privateGet('/chat/most-recently-visited');
      setMessages(response.data.data);
    };

    fetchRooms();
    fetchMostRecentlyVisitedRoom();

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = (input) => {
    if (socket && input) {
      socket.emit('sendMessage', input, rooms);
    }
  };
  return ( <div className="w-full p-8 flex gap-8">
    <ChatRooms rooms={rooms}/>
    <MainChat messages={messages} sendMessage={sendMessage}/>
  </div> );
}

export default AdminMessages;