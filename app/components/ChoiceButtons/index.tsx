import React, { useState } from 'react';
import { Row, Col, Typography, List, Button } from 'antd';

const { Title, Paragraph } = Typography;

import styles from "./calendar.module.css";

// Стили в формате inline для React
const listStyle = {
  borderRadius: '8px', // Скругленные углы
  margin: '0 auto', // Выравнивание по центру
};

const itemStyle = {
  fontSize: '18px', // Размер шрифта
  paddingBottom: '10px', // Отступ снизу для каждого пункта
  lineHeight: '1.6', // Межстрочный интервал
  textAlign: 'left' as const,
  color: 'white', // Белый текст
};
const markerStyle = {
};

const GradientList = ({data}: {data:  string[]}) => {
  return (
    <div style={listStyle}>
      <ul className={styles.gl} style={markerStyle}>
        {data.map((item, index) => (
          <li key={index}

            style={itemStyle}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

const ChoiceButtons = () => {


  return (
    <Row style={{ minHeight: '57vh', marginBottom: '-25px' }}>
      {/* Левая колонка */}
      <Col
        span={12}
        className="column"
        style={{
          backgroundColor: 'rgba(0,0,0, 0.5)',
          display: 'flex',
          alignItems: 'top',
          justifyContent: 'center',
          padding: '20px 40px',
          transition: 'all 1s',
          cursor: 'pointer'
        }}
      >
        <div style={{ textAlign: 'center', width: '100%', display: 'flex', 'alignItems': 'top',     justifyContent: 'center' }}>
          <div
        style={{
          width: '350',
          color: 'white',
          paddingTop: '50px'
        }}
        >
          <Title className="text-white" style={{ textAlign: 'center', color: '#fff'}} level={2}>For Candidate</Title>
          <Paragraph className="text-gray-300" style={{ fontSize: '18px', marginTop: '-6px'}}>Explore career and wellness options</Paragraph>

            <>
              <GradientList
                data={[
                  'Choose your hard skills',
                  'Understand your wellbeing priorities',
                  'Get job list',
                ]}
              />
            </>
              <Button type="primary" href='/candidate/chat' size='large' style={{width: '100%'}}>Create Your Profile</Button>
        </div>
        </div>
      </Col>
      <Col
        span={12}
        className="column"
        style={{
          backgroundColor: 'rgba(0,0,0, 0.5)',
          display: 'flex',
          alignItems: 'top',
          justifyContent: 'center',
          padding: '20px 40px',
          transition: 'opacity 0.5s ease',
          cursor: 'pointer'
        }}
      >
     <div style={{ textAlign: 'center', width: '100%', display: 'flex', 'alignItems': 'top',     justifyContent: 'center' }}>
        <div
      style={{
        width: '350px',
          paddingTop: '50px'
      }}
      >

        <Title  style={{ textAlign: 'center', color: '#fff'}} level={2}>For Companies</Title>
        <Paragraph className="text-gray-300"  style={{fontSize: '18px', marginTop: '-6px'}}>Empower your company wellbeing culture</Paragraph>
            <>
              <GradientList
                data={[
                  'Grow your wellbeing culture',
                  'Analyze your company',
                  'Get candidate list',
                ]}
              />

            </>


          <Button size='large' href='/candidate/chat'  type="primary" style={{width: '100%'}}>Try Demo</Button>
        </div>
        </div>
      </Col>
    </Row>
  );
};

export default ChoiceButtons;
