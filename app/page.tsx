"use client";
import React from 'react';
import { Layout, Menu, Button, Row, Col, Card, Typography, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Link from 'antd/es/typography/Link';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

const AppLandingPage = () => {
  return (
    <Layout>
      {/* Header */}
      <Header style={{ position: 'fixed', width: '100%', zIndex: 1 }}>
        <div className="logo" style={{ float: 'left', color: '#fff', fontSize: 24, paddingRight: '48px' }}>Tender</div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1"><Link href="#home">Home</Link></Menu.Item>
          <Menu.Item key="2"><Link href="#features">Features</Link></Menu.Item>
          <Menu.Item key="3"><Link href="#get-started">Get Started</Link></Menu.Item>
        </Menu>
      </Header>

      {/* Main Content */}
      <a id="home" />
      <Content style={{ padding: '50px 50px', marginTop: 64 }}>
        {/* Hero Section */}
        <Row justify="center" align="middle" style={{
          minHeight: '60vh',
          backgroundImage: 'url("/hero.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backdropFilter: 'blur(5px)',
          color: '#fff',
          textAlign: 'center',
          padding: '60px 20px'
        }}>
          <Col span={12}>
            <Title level={1} style={{color: 'white'}}>Find Your Perfect Fit</Title>
            <Text style={{color: 'white'}}>
              Connect with companies that share your interests and values. Let us help you discover career opportunities that align with both your professional and personal passions.
            </Text>
            <br />
            <Link href="/candidate/chat">
              <Button type="primary" size="large" style={{ marginTop: 16 }}>
                Get Started
              </Button>
            </Link>
          </Col>
        </Row>

        {/* Features Section */}
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
        </Row>

        {/* Profile Setup Section */}
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
        </Row>
      </Content>

      {/* Footer */}
      <Footer style={{ textAlign: 'center' }}>
        &copy; 2024 Created with ❤️ by Frontend Youth
      </Footer>
    </Layout>
  );
};

export default AppLandingPage;
