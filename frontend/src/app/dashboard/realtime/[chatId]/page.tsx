"use client";
import * as Ably from "ably";
import { useState, useEffect } from "react";
import {
  AblyProvider,
  ChannelProvider,
  useChannel,
  useConnectionStateListener,
} from "ably/react";
//
import { UserMeResponse } from "../../../(main)/components/Header";
import { api } from "@/lib/axios";
import Link from "next/link";
import Image from "next/image";
//
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
    if (userMe) {
      const messageData = {
        userId: userMe.id,
        userName: userMe.userName,
        text: text,
        avatarImg: userMe.avatarImg || "default_avatar.png", // Зураг хуваарилах
        phoneNumber: userMe.phoneNumber || "No number added", // Утасны дугаар
      };
      channel.publish("message", messageData);
      setText("");
      // Server руу хадгалах логик
      api
        .post("/message", messageData) // messageData-г дамжуулах
        .then((response) => {
          console.log("Message saved", response.data);
          setMessages((prev) => [...prev, response.data]); // Хадгалаад ирсэн мессежийг нэмэх
        })
        .catch((error) => {
          console.error("Error saving message", error);
        });

      setText(""); // Текстийг цэвэрлэх
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

      {messages.map((message) => {
        return (
          <div key={message.id} className="chat chat-start flex">
            <div className="chat-bubble my-5 bg-pink-200 rounded-xl p-2">
              <strong>{message.data.userName}:</strong> {message.data.text}
              {/* <p>{message.data.phoneNumber}</p>
              <p>{message.data.avatarImg}</p> */}
              {/* {userMe?.avatarImg && (
                <Image
                  // src={message.data.avatarImg} // Зурагны URL
                  src={testImageUrl}
                  alt="avatarImg"
                  width={40}
                  height={50}
                  className="rounded-full"
                />
              )} */}
              {/* <p>{message.data.userId}</p> */}
            </div>
          </div>
        );
      })}
    </div>
  );
}
