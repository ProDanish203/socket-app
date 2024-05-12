"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { CornerDownLeft, Mic, Paperclip } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMessage } from "@/API/chats.api";
import { toast } from "sonner";
import useConversation from "@/store/useConversation";

const SendMessage = () => {
  const queryClient = useQueryClient();
  const [message, setMessage] = useState("");
  const { selectedConversation, setMessages } = useConversation();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedConversation)
      return toast.error("Please select a conversation to send message");
    if (!message) return toast.error("Field cannot be empty");
    const { success, response } = await mutateAsync({
      id: selectedConversation._id,
      message,
    });
    if (!success) return toast.error(response);
    else {
      setMessage("");
    }
  };

  return (
    <form
      className="sticky bottom-0 min-h-28 overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
      x-chunk="dashboard-03-chunk-1"
      onSubmit={handleAdd}
    >
      <Label htmlFor="message" className="sr-only">
        Message
      </Label>
      <Input
        value={message}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setMessage(e.target.value)
        }
        id="message"
        placeholder="Type your message here..."
        className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
        autoComplete="off"
      />
      <div className="flex items-center p-3 pt-0">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" type="button">
              <Paperclip className="size-4" />
              <span className="sr-only">Attach file</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">Attach File</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" type="button">
              <Mic className="size-4" />
              <span className="sr-only">Use Microphone</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">Use Microphone</TooltipContent>
        </Tooltip>
        <Button
          disabled={isPending}
          type="submit"
          size="sm"
          className="ml-auto gap-1.5"
        >
          Send Message
          <CornerDownLeft className="size-3.5" />
        </Button>
      </div>
    </form>
  );
};

export default SendMessage;
