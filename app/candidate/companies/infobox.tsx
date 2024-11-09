import React from 'react';
import { Card, Typography } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

type InfoBoxProps = {
  title: string;
  description: string;
  icon?: React.ReactNode;
};

export const InfoBox = ({ title, description, icon }: InfoBoxProps) => {
  return (
    <Card
      style={{ margin: '16px auto' }}
      bordered={true}
    >
      <div style={{display: "flex", alignItems: "first baseline"}}>
        {/* Display Icon if passed as a prop */}
        {icon || <InfoCircleOutlined style={{ fontSize: '16px', color: '#1890ff', marginRight: '8px' }} />}

        {/* Title */}
        <Title level={4} style={{marginTop: 0}}>
          {title}
        </Title>
      </div>

      {/* Description */}
      <Text type="secondary">{description}</Text>
    </Card>
  );
};
