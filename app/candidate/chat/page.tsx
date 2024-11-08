"use client";

import {Input} from "antd";

import {getMessages, answer} from "./actions";
import { ChangeEvent, useEffect, useState } from "react";

export default function ChatPage() {
  const [text, setText] = useState<string>("");
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    (async () => {
      setMessages(await getMessages());
    })();
  }, []);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFile(files[0]);
    }
  }

  return (
    <form onSubmit={async (e) => {
      e.preventDefault();
      if (text.trim() || file) {
        // read base64 from file
        let reader = new FileReader();
        reader.readAsDataURL(file!);
        reader.onload = async () => {
          let base64 = reader.result;
          setText("");
          await answer(text, base64 as string);
          setMessages(await getMessages());
        }
      }
    }}>
      {messages.map((message, i) => (
        <div key={i}>
          <b>{message.sender}</b>: {message.text}
        </div>
      ))}
      <Input value={text} onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.currentTarget.value)}></Input>
      <input
        type="file"
        accept=".pdf"
        onChange={onFileChange}
      />
      <button type="submit">Send</button>
    </form>
  )
}
