import React, {useEffect, useState} from "react";
import './chat.css';
import io from 'socket.io-client'

const socket = io.connect('http://localhost:3001')

function Chat() { 

  const [state, setState] = useState({ message: '', name: '' })
  const [chat, setChat] = useState([])

  useEffect(() => {
    socket.on('message', ({ name, message }) => {
      setChat([...chat, { name, message }]) //The "..." is the "Spread" operator which lets 
      //you expand an iterable like a string, object or array into its elements.
    })
  })

  const onTextChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const onMessageSubmit = e => {
    e.preventDefault()
    const { name, message } = state
    socket.emit('message', { name, message })
    setState({ message: '', name })
  }

  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        <h3 id="chatNameAndMessage">
          <span id="chatName">{name}</span> <span>{message}</span><br />
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
                name="name"
                onChange={e => onTextChange(e)}
                value={state.name}
                id="name-field"
                placeholder="Name"
              />
            </div>
            <div>
              <input type='text'
                name="message"
                onChange={e => onTextChange(e)}
                value={state.message}
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