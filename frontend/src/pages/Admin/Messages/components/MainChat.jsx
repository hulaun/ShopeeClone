import { memo, useEffect, useRef } from "react";
import { IconButton } from "../../../../components/Buttons/Buttons";
import { useAuth } from "../../../../context/AuthContext";

const MainChat =memo(({currentRoom, messages, loadingMessages, sendMessage})=> {
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const { currentUser } = useAuth();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  }

  const handleSendMessage = () => {
    sendMessage(inputRef.current.value);
    inputRef.current.value = '';
  }

  useEffect(()=>{
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  },[messages])

  return ( <div className="bg-white rounded-xl p-5 flex flex-col w-full min-w-36">
    <section className="flex gap-2 justify-between items-between w-full">
      <section className="flex items-center gap-2">
        <img src={currentRoom.senderIcon} className="h-10 aspect-square rounded-full"></img>
        <div>
          <h1 className="text-2xl">{currentRoom.roomName}</h1>
          {/* //TODO */}
          <p className="text-grey-400">Online </p>
        </div>
      </section>
      <section>
        <IconButton>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="10" height="10">
            <path fill="white" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/>
          </svg>
        </IconButton>
      </section>
    </section>
    <section className="grow mb-4 pr-2 overflow-y-scroll max-h-full scrollbar scrollbar-w-1 scrollbar-thumb-rounded-full scrollbar-thumb-grey-200">
      <div className="flex flex-col gap-1 min-h-full justify-end">
        {
          messages && messages.map((message, index) =>
            (message.senderId === currentUser.id) 
            ?
              (<div key={index} className="rounded-xl flex items-center gap-2 justify-end">
                <p 
                  onMouseEnter={() => console.log('hover')}
                  className="block text-sm bg-grey-100 p-3 rounded-full text-grey-500">
                  {message.message}
                </p>
              </div>)
            :
              (<div 
                key={index} className="rounded-xl flex items-center gap-2">
                <img src={message.senderIcon} className="h-10 aspect-square rounded-full" alt="sender icon"></img>
                <p className="text-sm bg-grey-100 p-3 rounded-full text-grey-500">{message.message}</p>
              </div>)
          )
        }
        {
          loadingMessages && loadingMessages.map((message, index) => (
            <div key={index} className="rounded-xl flex items-center gap-2 justify-end">
              <p className="block text-sm bg-grey-100 p-3 rounded-full text-grey-500">{message}</p>
            </div>))
        }
        <div ref={messagesEndRef} />
      </div>
    </section>
    <section className="relative">
      <input onKeyDown={handleKeyDown} ref={inputRef} type="text" className="bg-grey-100 p-3 pl-10 rounded-lg w-full border border-grey-300" placeholder="Type a message" />
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20">
          <path fill="grey" d="M505 442.7L405.3 343c28.4-34.9 45.7-79.4 45.7-127C451 96.5 354.5 0 231 0S11 96.5 11 216s96.5 216 216 216c47.6 0 92.1-17.3 127-45.7l99.7 99.7c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-34zM231 392c-97.2 0-176-78.8-176-176S133.8 40 231 40s176 78.8 176 176-78.8 176-176 176z"/>
        </svg>
      </div>
      <button onClick={handleSendMessage} className="absolute inset-y-0 right-0 flex items-center pr-3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
        </svg>
      </button>
    </section>
  </div> );
})

export default MainChat;