import config from "../../../config";
import { useAuth } from "../../../context/AuthContext";
import { privateGet } from "../../../utils/httpRequest";
import ChatRooms from "./components/ChatRooms";
import MainChat from "./components/MainChat";
import { useCallback, useEffect, useMemo, useState } from 'react';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

function AdminMessages() {

  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState({
    id: '',
    name: '',
    icon: '',
  });
  
  const nagivate = useNavigate();
  const { accessToken } = useAuth();

  useEffect(() => {
    const token = accessToken ? accessToken : sessionStorage.getItem('accessToken');
    const newSocket = io('http://localhost:5500/chat',{
      auth: {
        token: token
      }
    });
    setSocket(newSocket);

    newSocket.on('broadcastMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    newSocket.on('chatRoom', (chatRoom) => {
    })

    newSocket.on('updateMessageState', (message) => {
      console.log('updateMessageState', message);
      const list = loadingMessages.filter((mes) => mes !== message.content);
      setLoadingMessages(list);
      setMessages(messages => [...messages, message]);
    })

    const fetchData = async () => {
      const roomsResponse = await privateGet('/chat');
      const currentRoomResponse = await privateGet('/chat/most-recently-visited');
      
      setRooms(roomsResponse.data.data);
      setMessages(currentRoomResponse.data.data.messages);
      
      const roomData = roomsResponse.data.data.filter((room) => room.roomId === currentRoomResponse.data.data.roomId);
      setCurrentRoom(roomData[0]);
      newSocket.emit('joinRoom', currentRoomResponse.data.data.roomId);
    };

    fetchData();
    
    newSocket.on('unauthorized', (error) => {
      console.log('unauthorized', error);
      nagivate(config.routes.public.login);
    });
    
    return () => {
      newSocket.disconnect();
    };
  }, []);

  console.log('loadMessages', loadingMessages);
  const sendMessage = useCallback((input) => {
    console.log('sendMessage', input);
    console.log('socket', socket);
    if (socket && input) {
      console.log('sendMessage2', input);
      setLoadingMessages((prev) => [...prev, input]);
      socket.emit('sendMessage', input, currentRoom.roomId);
    }
  },[socket, currentRoom]);
  return ( <div className="w-full p-8 flex gap-8">
    <ChatRooms setCurrentRoom={setCurrentRoom} currentRoom={currentRoom} rooms={rooms}/>
    <MainChat currentRoom={currentRoom} messages={messages} loadingMessages={loadingMessages} sendMessage={sendMessage}/>
  </div> );
}

export default AdminMessages;