"use client";
import React from 'react';
import { Layout, Menu, Button, Row, Col, Card, Typography, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Link from 'antd/es/typography/Link';
import ChoiceButtons from './components/ChoiceButtons';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

const AppLandingPage = () => {
  return (
    <Layout style={{minHeight: '100vh' }}>
      {/* Header */}
      <Header style={{ position: 'fixed', width: '100%', zIndex: 1 }}>
        <div className="logo" style={{ float: 'left', color: '#fff', fontSize: 24, paddingRight: '48px' }}>Tender</div>
       {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1"><Link href="#home">Home</Link></Menu.Item>
          <Menu.Item key="2"><Link href="#features">Features</Link></Menu.Item>
          <Menu.Item key="3"><Link href="#get-started">Get Started</Link></Menu.Item>
        </Menu> */}
      </Header>

      

      {/* Main Content */}
      <a id="home" />
      <Content style={{ padding: '0', marginTop: 64, flex: 1}}
      >
        {/* Hero Section */}
        <Row justify="center" align="middle" style={{
          minHeight: 'calc(100vh - 150px)',
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/hero.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backdropFilter: 'blur(5px)',
          color: '#fff',
          textAlign: 'center',
        }}>
        <Col span={32}>
        <div className="flex space-x-3 justify-center" 
        style={{
          borderRadius: '20px',
          padding: '0 20px'
        }}>
            <div className="text-center   max-w-3xl">
                <h1 className="text-white text-4xl sm:text-5xl font-bold mb-4" style={{
                      backgroundImage: 'linear-gradient(to right, rgb(255, 30, 140) 10%, rgb(255, 102, 57), rgb(255, 230, 29) 40%, rgb(255, 230, 29), rgb(255, 230, 29) 60%, rgb(87, 229, 98), rgb(31, 179, 253) 85%, rgb(31, 179, 253), rgb(31, 179, 253))', /* Your gradient colors */

          WebkitBackgroundClip: 'text',
                      color: 'transparent' /* Make the text itself transparent */
                }}>
                Find the Right Fit for You: <br/> Where Values and Careers Align
                </h1>
                <p className="text-gray-300 text-lg sm:text-xl mb-8">
                Join us to open a job where your values, lifestyle and mental health come first.
                </p>
            </div>
       </div>
       </Col>
        <Col span={24}>
              <ChoiceButtons />
        </Col>
        </Row>

        {/* Features Section 
        <a id="features" />
        <Row gutter={16} style={{ marginTop: 32 }}>
          <Col span={8}>
            <Card title="Personalized Matches" bordered={false}>
              Discover companies that align with your interests and values, making it easy to find a workplace where you’ll feel at home.
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Skill Roadmaps" bordered={false}>
              Follow customized learning paths to build the skills needed for your next career step, with milestones to guide your journey.
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Calendar Integration" bordered={false}>
              Schedule learning sessions directly into your calendar, ensuring you stay on track with your career growth.
            </Card>
          </Col>
        </Row>*/}





        {/* Profile Setup Section 
        <a id="get-started" />
        <Row justify="center" style={{ marginTop: 64 }}>
          <Col span={12} style={{ textAlign: 'center' }}>
            <Title level={2}>Create Your Profile</Title>
            <Text>
              Let&apos;s get to know you! Add your skills or upload your resume to help us find the best matches for you.
            </Text>
            <br />
            <Link href="/candidate/chat">
              <Button type="primary" style={{ marginTop: 16 }}>Add Skills</Button>
            </Link>
            <br />
            <Link href="/candidate/chat">
              <Button icon={<UploadOutlined />} style={{ marginTop: 8 }}>Upload Resume (PDF)</Button>
            </Link>
          </Col>
        </Row>*/}
      </Content>

      {/* Footer */}
      <Footer style={{ textAlign: 'center' }}>
        &copy; 2024 Created with ❤️ by Frontend Youth
      </Footer>
    </Layout>
  );
};

export default AppLandingPage;
