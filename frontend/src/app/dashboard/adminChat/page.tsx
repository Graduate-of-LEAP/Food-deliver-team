import { useEffect, useState } from "react";
import { api } from "@/lib/axios";

// Chat
const [messages, setMessages] = useState([]);
const fetchMessages = async () => {
  // API-ээс мессежүүдийг авах
  try {
    const response = await api.get("/message");
    setMessages(response.data);
    console.log("Where is message DATA", response.data);
  } catch (error) {
    console.log("MESSAGE avahad aldaaa garlaa shuuuuuuuuuu", error);

    console.log("Error fetching messages", error);
  }
};

useEffect(() => {
  fetchMessages();
}, []);

//  Chat
