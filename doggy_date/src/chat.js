import React, {useEffect, useState} from "react";
import './chat.css';
import io from 'socket.io-client'
const socket = io.connect('http://localhost:3001')

function Chat(props) { 
  console.log('test:chat');//for testing only
  
  var currentUser = (JSON.parse(localStorage.getItem('userInfo'))).userName;
  var currentMatch = props.matchUserName;
  var room = '';

  const [currentMessage, setCurrentMessage] = useState({ message: '', name: currentUser});
  const [chat, setChat] = useState([]);

  //Create a new room. The room name will be the two usernames with a 
  //dash inbetween. The user name that comes first alphabetically will 
  //come first in the room name. This ensures that the room name
  //is the same for both users. 
  if(currentUser <= currentMatch)
    room = currentUser + '-' + currentMatch;
  else
    room = currentMatch + '-' + currentUser;

  //Join the room:
  socket.emit('joinRoom', room);

  //Receive chat messages from other user and update the chat state variable to include new message:
  useEffect(() => {
    //On the front-end, socket.on listens for and catches messages from the server (sent by other clients).
    socket.on('message', ({ name, message }) => {
      //Add the new message to the chat state variable:
      setChat(chat => [...chat, { name, message }]) //The "..." is the "Spread" operator which lets 
      //you expand an iterable like a string, object or array into its elements. This can be used
      //to add a new object to the array. 
    })
  }, []);

  //When the props change, clear the chat by setting it to an empty array.
  //A change in props means the user has clicked on another match. 
  useEffect(() => {
    setChat([])
  }, [props]);

  //Get the current message input from the user and store in the currentMessage state variable:
  const onTextChange = e => {
    setCurrentMessage({ ...currentMessage, message: e.target.value });
  }

  //When the user submits the message, emit it to the socket.io server:
  const onMessageSubmit = e => {
    e.preventDefault();
    const { name, message } = currentMessage;
    //On the front-end, socket.emit sends messages to the server (which will be forwarded to the other clients).
    socket.emit('message', { name, message, room });
    setCurrentMessage({ ...currentMessage, message: '' });
  }

  //This is an attempt to ge the scroll bar to stay at the bottom of the chat history but it doesn't work.
  //I also tried doing it inside of useEffect():
  // var x = document.querySelector('render-chat');
  // x.scrollTop = x.scrollHeight;

  //Display the chat messges in the chat window:
  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        <h3 id="chatNameAndMessage">
          <span id="chatName">{name}</span><br /> <span id="chatMessage">{message}</span><br />
        </h3>
      </div>
    ))
  }

  return (
    <div>
        <div className="chatWindow">
          <h1>Chat</h1>
          <form onSubmit={onMessageSubmit} className="form">
            <div>
              <input type='text'
                name="message"
                onChange={e => onTextChange(e)}
                value={currentMessage.message}
                id="message-field"
                placeholder="Message"
              />
            </div>
            <input type="submit" value="Send" id="chatButton" />
            <div className="render-chat">
              {renderChat()}
            </div>
          </form>
        </div>
    </div>
  );
}
export default Chat;