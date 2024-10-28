"use client";
import * as Ably from "ably";
import { useState } from "react";
import {
  AblyProvider,
  ChannelProvider,
  useChannel,
  useConnectionStateListener,
} from "ably/react";

// Connect to Ably using the AblyProvider component and your API key
const client = new Ably.Realtime({ key: process.env.ABLY_KEY });

export default function Page({ params }: { params: { chatId: string } }) {
  return (
    <AblyProvider client={client}>
      <ChannelProvider channelName={params.chatId}>
        <Conversation chatId={params.chatId} />
      </ChannelProvider>
    </AblyProvider>
  );
}

function Conversation({ chatId }: { chatId: string }) {
  const [messages, setMessages] = useState<Ably.Message[]>([]);
  const [text, setText] = useState<string>("");
  const [username, setUsername] = useState<string>("User1"); // Хэрэглэгчийн нэр

  useConnectionStateListener("connected", () => {
    console.log("Connected to Ably!");
  });
  //
  const { channel } = useChannel(chatId, "message", (message) => {
    setMessages((PreviousMessages) => [message, ...PreviousMessages]);
  });

  //   const sendMessage = () => {
  //     channel.publish("message", text);
  //     setText("");
  //   };
  const sendMessage = () => {
    const message = {
      text: text,
      user: username, // Хэрэглэгчийн нэрийг оруулна
    };
    channel.publish("message", message);
    setText("");
  };

  return (
    <div className="m-5">
      <div className="flex gap-3">
        <input
          className="input input-bordered bg-gray-100"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="btn bg-pink-100 p-2 rounded-lg"
          onClick={sendMessage}
        >
          Publish
        </button>
      </div>
      {/* 
      {messages.map((message) => {
        return (
          <div key={message.id} className="chat chat-start">
            <div className="chat-bubble"> {message.data}</div>
          </div>
        );
      })} */}

      {messages.map((message) => {
        const isUser1 = message.data.user === "User1"; // Мессеж бичсэн хүний нэрийг шалгах
        return (
          <div
            key={message.id}
            className={`chat ${isUser1 ? "chat-end" : "chat-start"}`}
          >
            <div className="chat-bubble">{message.data.text}</div>
          </div>
        );
      })}
    </div>
  );
}
