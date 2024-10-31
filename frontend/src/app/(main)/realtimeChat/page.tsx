"use client";
import * as Ably from "ably";
import { useState, useEffect } from "react";
import {
  AblyProvider,
  ChannelProvider,
  useChannel,
  useConnectionStateListener,
} from "ably/react";

// Connect to Ably using the AblyProvider component and your API key
const client = new Ably.Realtime({ key: process.env.ABLY_KEY });
import { UserMeResponse } from "../components/Header";
import { api } from "@/lib/axios";
import { FaRegUser } from "react-icons/fa6";
import Image from "next/image";
//
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
  const [userMe, setUserMe] = useState<UserMeResponse>();
  const testImageUrl = "/img1.png"; // Зурагны URL
  //
  const getMe = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await api.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserMe(response.data);
    } catch (error) {
      console.log("Error fetching user data", error);
    }
  };
  useEffect(() => {
    getMe();
  }, []);
  //userMe-ийн утгыг логдож шалгаж
  console.log(userMe);
  useEffect(() => {
    console.log(userMe);
  }, [userMe]);

  //
  //
  useConnectionStateListener("connected", () => {
    console.log("Connected to Ably!");
  });

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
            <div className="chat-bubble flex gap-2">
              <div className="flex bg-yellow-200 gap-2 rounded-lg p-2 mt-5 items-center">
                <FaRegUser />

                {/*  */}
                {userMe?.avatarImg && (
                  <Image
                    // src={userMe.avatarImg} // Зурагны URL
                    src={testImageUrl}
                    alt="avatarImg"
                    width={40}
                    height={50}
                    className="rounded-full"
                  />
                )}
                {userMe?.userName}
              </div>

              <div className="bg-gray-300 gap-2 rounded-lg p-2 mt-5">
                {message.data.text}
              </div>
            </div>
          </div>
        );
      })}
      <div className="flex gap-2 items-center px-4 font-semibold bg-green-100 mt-10">
        <FaRegUser />
        {userMe?.userName} - {userMe?.avatarImg}
        <p>
          {userMe?.email} - {userMe?.id}
        </p>
        <p>
          {userMe?.avatarImg} - {userMe?.phoneNumber}
        </p>
      </div>
    </div>
  );
}
