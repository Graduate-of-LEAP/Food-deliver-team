"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { AiFillPicture } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { IoIosSend } from "react-icons/io";
import { useState, useEffect } from "react";
import {
  AblyProvider,
  ChannelProvider,
  useChannel,
  useConnectionStateListener,
} from "ably/react";
import { api } from "@/lib/axios";
import * as Ably from "ably";
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

export const ChatDialog = ({ params }: { params: { chatId: string } }) => {
  return (
    <AblyProvider client={client}>
      <ChannelProvider channelName={params.chatId}>
        <Conversation chatId={params.chatId} />
      </ChannelProvider>
    </AblyProvider>
  );
};

function Conversation({ chatId }: { chatId: string }) {
  const [messages, setMessages] = useState<Ably.Message[]>([]);
  const [text, setText] = useState<string>("");
  //   const [username, setUsername] = useState<string>("User1");
  const [userMe, setUserMe] = useState<UserMeResponse>();
  const testImageUrl = "/img1.png";

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
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-16 h-16 rounded-tl-full rounded-tr-full rounded-bl-full bg-[#86c41d] text-white"
          >
            Chat
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]  p-0 bg-white">
          <DialogHeader>
            <DialogTitle className="rounded-t-md mb-4 p-4 bg-gray-300 text-black flex gap-6 items-center">
              <div className="flex items-center gap-2 ">
                <div className=" relative w-10 h-10 rounded-full border">
                  <Image
                    src={testImageUrl || "fallback_image_url"}
                    alt="avatar"
                    fill
                    className="object-cover rounded-full"
                  />
                </div>

                <p className="text-black">{userMe?.userName}</p>
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="p-6 h-[300px]">
            {messages.map((message) => {
              return (
                <div key={message.id} className="chat chat-start flex">
                  <div className="chat-bubble flex gap-2">
                    <div className="flex bg-yellow-200 gap-2 rounded-full p-2 mt-5 items-center w-8 h-8 ">
                      {userMe?.avatarImg && (
                        <div className="relative">
                          <Image
                            src={testImageUrl}
                            alt="avatarImg"
                            fill
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                      )}
                    </div>
                    <div className="bg-gray-300 gap-2 rounded-tl-full rounded-tr-full rounded-br-full p-2 mt-5">
                      {/* <strong>{message.data?.userName}:</strong>{" "} */}
                      {message.data?.text}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <DialogFooter className="border-b py-2 px-4 h-20 bottom-0 bg-gray-300 text-black flex gap-4 items-center rounded-b-md">
            <AiFillPicture
              size={28}
              className="cursor-pointer text-[#86c41d]"
            />
            <Input
              placeholder="Message"
              value={text}
              className="rounded-full"
              onChange={(e) => setText(e.target.value)}
            />
            {text ? (
              <IoIosSend
                size={28}
                className="cursor-pointer text-[#86c41d]"
                onClick={sendMessage}
              />
            ) : (
              <AiFillLike size={28} className="cursor-pointer text-[#86c41d]" />
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
