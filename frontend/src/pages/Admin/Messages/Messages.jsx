import ChatRooms from "./components/ChatRooms";
import MainChat from "./components/MainChat";
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

function AdminMessages() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const newSocket = io('http://localhost:5500/chat');
    console.log(newSocket)
    setSocket(newSocket);

    newSocket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (socket && input) {
      socket.emit('chatMessage', input);
      setInput('');
    }
  };
  return ( <div className="w-full p-8 flex gap-8">
    <ChatRooms/>
    <MainChat/>
  </div> );
}

export default AdminMessages;