"use client";

import {useEffect, useLayoutEffect, useRef, useState} from "react";
import { Button, Input, Layout, List, Space, Spin, Typography, Upload } from "antd";
import { SendOutlined, UploadOutlined } from "@ant-design/icons";

import { getMessages, answer } from "./actions";
import { UploadChangeParam } from "antd/es/upload";

import styles from "./chat.module.css";

const systemName = "Tender";

export default function ChatPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState<string>("");
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [isAnswering, setIsAnswering] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setMessages(await getMessages());
      setIsLoading(false);
    })();
  }, []);

  const onFileChange = (e: UploadChangeParam) => {
    if (e.file) {
      setFile(e.file as any);
    }
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (text.trim() || file) {
      if (file) {
        // read base64 from file
        let reader = new FileReader();
        reader.readAsDataURL(file!);
        reader.onload = async () => {
          let base64 = reader.result;
          setText("");
          setFile(null);
          await answer(text, base64 as string);
          setMessages(await getMessages());
        };
        setMessages((m) => [...m, { text: "File uploaded", sender: "You" }]);
      } else {
        setText("");
        setMessages((m) => [...m, { text, sender: "You" }]);
        setIsAnswering(true);
        await answer(text, "");
        setIsAnswering(false);
        setMessages(await getMessages());
      }
    }
  };

  useLayoutEffect(() => {
    containerRef.current?.scrollTo(0, containerRef.current?.scrollHeight);
  }, [messages]);

  const isFileUploaded =
    isLoading || !messages.length ? true : messages.some((m) => m.text === "Uploaded file");

  return (
    <Layout style={{ height: "100%" }}>
      <Layout.Content
        style={{ padding: "20px", overflowY: "auto", flex: 1, height: "100%" }}
        ref={containerRef}
      >
        {messages.length > 0 ? (
          <List
            className={styles.list}
            loading={isLoading}
            split={false}
            dataSource={messages}
            renderItem={(item) => (
              <List.Item
                className={item.sender === systemName ? styles.system : styles.you}
                style={{
                  display: "flex",
                  justifyContent: item.sender !== systemName ? "flex-end" : "flex-start",
                  marginBottom: "10px",
                }}
              >
                <List.Item.Meta
                  title={
                    <Typography.Text
                      strong
                      style={{
                        display: "flex",
                        justifyContent: item.sender !== systemName ? "flex-end" : "flex-start",
                      }}
                    >
                      {item.sender === systemName ? systemName : "You"}
                    </Typography.Text>
                  }
                  description={
                    <div
                      className={styles.description}
                      style={{
                        backgroundColor: item.sender !== systemName ? "#b4e6fd" : "#fafafa",
                        padding: "10px 15px",
                        borderRadius: "15px",
                        maxWidth: "50%",
                        textAlign: item.sender !== systemName ? "right" : "left",
                      }}
                    >
                      <div dangerouslySetInnerHTML={{ __html: item.text }} />
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Spin />
          </div>
        )}
        {isAnswering && <div>Answering...</div>}
      </Layout.Content>
      <Layout.Footer style={{ padding: "10px", background: "#f0f2f5" }}>
        <form onSubmit={onSubmit}>
          <div className={styles.footer}>
            <Input
              placeholder="Type a message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              onPressEnter={(e) => onSubmit(e)}
              style={{ flex: 1 }}
              disabled={isLoading || isAnswering}
            />
            {!isFileUploaded && (
              <Upload onChange={onFileChange} beforeUpload={() => false} showUploadList={false}>
                <Button disabled={isLoading || isAnswering} icon={<UploadOutlined />}>
                  {file ? file.name : "Upload CV"}
                </Button>
              </Upload>
            )}
            <Button
              icon={<SendOutlined />}
              onClick={(e) => onSubmit(e)}
              disabled={isLoading || isAnswering}
              color="primary"
              type="primary"
            >
              Send
            </Button>
          </div>
        </form>
      </Layout.Footer>
    </Layout>
  );
}
