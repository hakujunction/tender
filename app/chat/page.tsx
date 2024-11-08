"use client";

import {Input} from "antd";

import {getMessages, answer} from "./actions";
import { ChangeEvent, useEffect, useState } from "react";

export default function ChatPage() {
  const [text, setText] = useState<string>("");
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);

  useEffect(() => {
    (async () => {
      setMessages(await getMessages());
    })();
  }, []);

  return (
    <form onSubmit={async (e) => {
      e.preventDefault();
      if (text.trim()) {
        setText("");
        await answer(text);
        setMessages(await getMessages());
      }
    }}>
      {messages.map((message, i) => (
        <div key={i}>
          <b>{message.sender}</b>: {message.text}
        </div>
      ))}
      <Input value={text} onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.currentTarget.value)}></Input>
    </form>
  )
}
