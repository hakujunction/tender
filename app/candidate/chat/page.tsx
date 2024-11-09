"use client";

import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {Button, Input, Layout, List, Space, Typography, Upload} from "antd";
import {SendOutlined, UploadOutlined} from '@ant-design/icons';

import {getMessages, answer} from "./actions";
import {UploadChangeParam} from "antd/es/upload";

const systemName = "Tender";

export default function ChatPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState<string>("");
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    (async () => {
      setMessages(await getMessages());
    })();
  }, []);

  const onFileChange = (e: UploadChangeParam) => {
    if (e.file) {
      setFile(e.file as any);
    }
  }

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
        }
        setMessages(m => [...m, { text: "File uploaded", sender: "You" }]);
      } else {
        setText("");
        setMessages(m => [...m, { text, sender: "You" }]);
        await answer(text, "");
        setMessages(await getMessages());
      }
    }
  }

  useLayoutEffect(() => {
    containerRef.current?.scrollTo(0, containerRef.current?.scrollHeight);
  }, [messages]);

  return (
    <Layout style={{height: '100%'}}>
      <Layout.Content style={{ padding: '20px', overflowY: 'auto', flex: 1 }} ref={containerRef}>
        <List
          split={false}
          dataSource={messages}
          renderItem={(item) => (
            <List.Item
              style={{
                display: 'flex',
                justifyContent: item.sender !== systemName ? 'flex-end' : 'flex-start',
                marginBottom: '10px',
              }}
            >
              <List.Item.Meta
                title={<Typography.Text strong>{item.sender}</Typography.Text>}
                description={
                  <div
                    style={{
                      backgroundColor: item.sender !== systemName ? '#e6f7ff' : '#fafafa',
                      padding: '10px 15px',
                      borderRadius: '15px',
                      maxWidth: '50%'
                    }}
                  >
                    <div dangerouslySetInnerHTML={{__html: item.text}} />
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Layout.Content>
      <Layout.Footer style={{ padding: '10px', background: '#f0f2f5' }}>
        <form onSubmit={onSubmit}>
          <Space.Compact style={{ display: 'flex' }}>
            <Input
              placeholder="Type a message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              onPressEnter={(e) => onSubmit(e)}
              style={{ flex: 1 }}
            />
            <Upload onChange={onFileChange} beforeUpload={() => false} showUploadList={false}>
              <Button icon={<UploadOutlined />}>{file ? file.name : "Upload"}</Button>
            </Upload>
            <Button icon={<SendOutlined />} onClick={(e) => onSubmit(e)}>
              Send
            </Button>
          </Space.Compact>
        </form>
      </Layout.Footer>
    </Layout>
  );
}
