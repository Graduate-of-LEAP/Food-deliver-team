"use client";
import * as Ably from "ably";
import { useState, useEffect } from "react";
import {
  AblyProvider,
  ChannelProvider,
  useChannel,
  useConnectionStateListener,
} from "ably/react";
import { api } from "@/lib/axios";
import Image from "next/image";
type UserMeResponse = {
  id: string;
  owog: string;
  userName: string;
  email: string;
  phoneNumber: string;
  address: string;
  avatarImg: string;
};
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
  const [userMe, setUserMe] = useState<UserMeResponse>();
  const testImageUrl = "/img1.png"; // Зурагны URL test shu

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

  console.log("userMe:", userMe);

  useConnectionStateListener("connected", () => {
    console.log("Ably-д холбогдлоо!");
  });

  useConnectionStateListener("disconnected", () => {
    console.log("Ably-тай холбоо тасарлаа!");
  });

  const { channel } = useChannel(chatId, "message", (message) => {
    console.log("Ирсэн мессеж:", message);
    if (message) {
      setMessages((previousMessages) => [message, ...previousMessages]);
    } else {
      console.error("Мессежийн өгөгдөл алга");
    }
  });

  const sendMessage = () => {
    if (userMe) {
      const messageData = {
        userId: userMe.id,
        userName: userMe.userName,
        text: text,
        avatarImg: userMe.avatarImg || "default_avatar.png",
        phoneNumber: userMe.phoneNumber || "No number added",
      };

      api
        .post("/message", messageData)
        .then((response) => {
          console.log("Message saved", response.data);
          setMessages((prev) => [...prev, response.data]);
        })
        .catch((error) => {
          console.error("Error saving message", error);
        });

      channel.publish("message", messageData);
      setText("");
      console.log("Илгээж буй мессеж:", messageData);
    }
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

      <div>
        {messages.map((message) => (
          <div key={message.id} className="chat chat-start flex">
            <div className="chat-bubble my-5 bg-pink-200 rounded-xl p-2">
              <strong>{message.data?.userName}:</strong> {message.data?.text}
              <p>{message.data?.phoneNumber}</p>
              <p>{message.data?.avatarImg}</p>
              {userMe?.avatarImg && (
                <Image
                  src={testImageUrl}
                  alt="avatarImg"
                  width={40}
                  height={50}
                  className="rounded-full"
                />
              )}
              <p>{message.data?.userId}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
