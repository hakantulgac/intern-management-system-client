import React from 'react';
import { Descriptions } from 'antd';

interface infoProps {
  name: string;
  grade: number;
  school: string;
  department: string;
  field: string;
}

const App: React.FC<infoProps> = (props) => {
  return (
    <>
    <Descriptions title="Genel Bilgiler:" layout="vertical">
      <Descriptions.Item label="İsim">{props.name}</Descriptions.Item>
      <Descriptions.Item label="Sınıf">{props.grade}</Descriptions.Item>
      <Descriptions.Item label="Okul">{props.school}</Descriptions.Item>
      <Descriptions.Item label="Bölüm">{props.department}</Descriptions.Item>
      <Descriptions.Item label="Alan">{props.field}</Descriptions.Item>
    </Descriptions>
    </>
  )
};

export default App;

                  