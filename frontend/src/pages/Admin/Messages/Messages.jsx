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
  const [currentRoom, setCurrentRoom] = useState({});
  
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

    newSocket.on('updateRoomsLastMessage', (chatRoom) => {
      setRooms((prevRooms) => {
        const newRooms = prevRooms.map((room) => {
          if (room.roomId === chatRoom.roomId) {
            return chatRoom;
          }
          return room;
        });
        return newRooms;
      })
    })

    newSocket.on('updateMessageState', (data) => {
      console.log('updateMessageState', data.newMessage);
      const list = loadingMessages.filter((mes) => mes !== data.newMessage.content);
      setLoadingMessages(list);
      setMessages(messages => [...messages, data.newMessage]);
    })

    const fetchData = async () => {
      const roomsResponse = await privateGet('/chat');
      const currentRoomResponse = await privateGet('/chat/most-recently-visited');
      const roomData = roomsResponse.data.data.find((room) => room.roomId === currentRoomResponse.data.data.roomId);

      setRooms(roomsResponse.data.data);
      setMessages(currentRoomResponse.data.data.messages);
      setCurrentRoom(roomData);
      newSocket.emit('joinRoom', currentRoomResponse.data.data.roomId);
    };

    fetchData();

    newSocket.on('unauthorized', (error) => {
      console.log('unauthorized: ', error);
      nagivate(config.routes.public.login);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = useCallback((input) => {
    if (socket && input) {
      setLoadingMessages((prev) => [...prev, input]);
      socket.emit('sendMessage', input, currentRoom.roomId);
    }
  },[socket, currentRoom]);

  const handleChangeRoom = useCallback((roomId) => {
    socket.emit('switchRoom', currentRoom.roomId, roomId);
    const roomData = rooms.find((room) => room.roomId === roomId);
    const fetchData=async()=>{
      const currentRoomResponse = await privateGet(`/chat/${roomId}`);
      setMessages(currentRoomResponse.data.data.messages);
      setCurrentRoom(roomData);
    }

    fetchData();
  },[socket, rooms]);

  return ( <div className="w-full p-8 flex gap-8">
    <ChatRooms handleChangeRoom={handleChangeRoom} setCurrentRoom={setCurrentRoom} currentRoom={currentRoom} rooms={rooms}/>
    <MainChat currentRoom={currentRoom} messages={messages} loadingMessages={loadingMessages} sendMessage={sendMessage}/>
  </div> );
}

export default AdminMessages;