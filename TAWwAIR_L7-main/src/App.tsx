import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";


const socket = io("http://localhost:3000");


function App() {
   const [message, setMessage] = useState("");
   const [messages, setMessages] = useState([]);


   useEffect(() => {
       socket.on("message", (data) => {
           setMessages((prev) => [...prev, data]);
       });

       socket.on("new Temp", (data) => {
        setMessages((prev) => [...prev, data]);
    });

       return () => {
           socket.off("message");
           socket.off("new Temp");
       };
   }, []);


   const sendMessage = () => {
       if (message) {
           socket.emit("message", message);

           setMessage("");
          }
      };
     
      return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h2>Dynamiczna lista pomiarów</h2>
            <div>
                {messages.map((msg, index) => (
                    <p key={index}>
                        Temp: {msg.temperature}°C <br />
                        Wilgotność: {msg.humidity}% <br />
                        Ciśnienie: {msg.pressure} hPa <br />
                        <hr />
                    </p>
                ))}
            </div>
        </div>
    );
   }
   
   
   export default App;