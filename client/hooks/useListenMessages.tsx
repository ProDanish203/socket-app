import { useSocket } from "@/store/SocketContext";
import useConversation from "@/store/useConversation";
import { useEffect } from "react";

export const useListenMessages = () => {
  const { socket } = useSocket();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage: any) => {
      setMessages([...messages, newMessage]);
      // console.log(newMessage);
    });

    return () => socket?.off("newMessage");
  }, [socket, messages, setMessages]);
};
