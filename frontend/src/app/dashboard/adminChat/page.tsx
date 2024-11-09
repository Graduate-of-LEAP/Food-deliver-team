"use client";
import * as Ably from "ably";
import { useState } from "react";
import {
  AblyProvider,
  ChannelProvider,
  useChannel,
  useConnectionStateListener,
} from "ably/react";
import { api } from "@/lib/axios";
interface AdminChatProps {
  chatId: string; // chatId-ыг string төрөлтэй гэж тодорхойлж байна
}

export default function AdminChat({ chatId }: AdminChatProps) {
  // Chat
  //   const chatId = "672209096eb7dbab63313df6"; // Энд chatId-ийг тодорхойлоорой
  const [messages, setMessages] = useState<Ably.Message[]>([]);

  // useChannel-ыг ашиглан channel-ыг авна
  const channel = useChannel(chatId, (message) => {
    setMessages((prevMessages) => [message, ...prevMessages]);
  });
  const replyToMessage = (originalMessage: Ably.Message) => {
    console.log("WHERE IS ORIGINALmessage =>=>=>", originalMessage);
    const replyMessage = {
      userId: "admin_id", // Админ хэрэглэгчийн ID-г оруулна
      text: "Таны хариулт энд байна", // Хариултын текстийг авах
      isAdmin: true, // Мессежийг админынх гэж тэмдэглэж байна
      originalMessageId: originalMessage.id, // Хариулах мессежийн ID-г хадгалах
    };

    api.post("/message", replyMessage).then((response) => {
      channel.publish("message", response.data);
    }); 
  };

  //  Chat
  return (
    <>
      <div>
        Hi adminChat
        <div>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`chat ${msg.data.isAdmin ? "chat-end" : "chat-start"}`}
            >
              <div className="chat-bubble">
                <strong>{msg.data.userName}:</strong> {msg.data.text}
                {msg.data.isAdmin && <span>(Админ)</span>}
                <button onClick={() => replyToMessage(msg)}>Хариулах</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
