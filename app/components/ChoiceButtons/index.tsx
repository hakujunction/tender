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
    <Row style={{ minHeight: '57vh' }}>
      {/* Левая колонка */}
      <Col
        
        xs={24} sm={12} md={12} lg={12}
        className="column"
        style={{
          backgroundColor: 'rgba(0,0,0, 0.5)',
          display: 'flex',
          alignItems: 'top',
          justifyContent: 'center',
          padding: '0px 40px 35px',
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
          <Title className="text-white" style={{ textAlign: 'center', color: '#fff'}} level={2}>For Candidates: Unlock Your Career and Wellbeing Potential</Title>
          <Paragraph className="text-gray-300" style={{ fontSize: '18px', marginTop: '-6px'}}>Take control of your future with personalized insights:</Paragraph>

            <>
              <GradientList
                data={[
                  'Prioritize Your Wellbeing: Understand what truly matters for your health and happiness.',
                  'Identify Your Key Skills: Highlight your hard skills to match with the best opportunities.',
                  'Discover Tailored Job Opportunities: Get a curated list of jobs that align with your skills and wellness goals.'
                ]}
              />
            </>
              <Button type="primary" href='/candidate/chat' size='large' style={{width: '100%'}}>Create Your Profile Today and Start Your Journey!

</Button>
        </div>
        </div>
      </Col>
      <Col
        xs={24} sm={12} md={12} lg={12}
        className="column"
        style={{
          backgroundColor: 'rgba(0,0,0, 0.5)',
          display: 'flex',
          alignItems: 'top',
          justifyContent: 'center',
          padding: '0px 40px 35px',
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
