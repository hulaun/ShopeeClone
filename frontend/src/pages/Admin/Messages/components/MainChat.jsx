import { IconButton } from "../../../../components/Buttons/Buttons";

function MainChat() {
  return ( <div className="basis-2/3 bg-white rounded-xl p-5 flex flex-col">
    <section className="flex gap-2 justify-between items-between w-full">
      <section className="flex items-center gap-2">
        <div className="h-10 aspect-square bg-primary rounded-full"></div>
        <div>
          <h1 className="text-2xl">John Doe</h1>
          <p className="text-grey-400">Online</p>
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
    <section className="grow flex flex-col justify-end items-start gap-1 pb-4">
      <div className="rounded-xl flex items-center gap-2">
        <div className="h-10 aspect-square bg-primary rounded-full"></div>
        <p className="text-sm bg-grey-100 p-3 rounded-full text-grey-500">Hello, how are you?</p>
      </div>
      <div className="rounded-xl flex items-center gap-2">
        <div className="h-10 aspect-square bg-primary rounded-full"></div>
        <p className="text-sm bg-grey-100 p-3 rounded-full text-grey-500">Hello, how are you?</p>
      </div>
    </section>
    <section className="relative">
      <input type="text" className="bg-grey-100 p-3 pl-10 rounded-lg w-full border border-grey-300" placeholder="Type a message" />
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20">
          <path fill="grey" d="M505 442.7L405.3 343c28.4-34.9 45.7-79.4 45.7-127C451 96.5 354.5 0 231 0S11 96.5 11 216s96.5 216 216 216c47.6 0 92.1-17.3 127-45.7l99.7 99.7c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-34zM231 392c-97.2 0-176-78.8-176-176S133.8 40 231 40s176 78.8 176 176-78.8 176-176 176z"/>
        </svg>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20">
          <path fill="grey" d="M505 442.7L405.3 343c28.4-34.9 45.7-79.4 45.7-127C451 96.5 354.5 0 231 0S11 96.5 11 216s96.5 216 216 216c47.6 0 92.1-17.3 127-45.7l99.7 99.7c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-34zM231 392c-97.2 0-176-78.8-176-176S133.8 40 231 40s176 78.8 176 176-78.8 176-176 176z"/>
        </svg>
      </div>
    </section>
  </div> );
}

export default MainChat;