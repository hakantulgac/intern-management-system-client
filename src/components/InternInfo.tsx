import React, { useEffect, useState } from "react";
import { Button, Descriptions } from "antd";
import axios from "axios";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const userImg: any = require("../images/user.png");

interface infoProps {
  internId: string;
}

interface typeIntern {
  id: number;
  name: string;
  grade: number;
  school: string;
  department: string;
  field: string;
  completed: number;
  img: Buffer;
  cv: Buffer;
}

const App: React.FC<infoProps> = (props) => {
  const [intern, setIntern] = useState<typeIntern>();

  const fetchIntern = async () => {
    await axios
      .get("interns/" + props.internId)
      .then((res) => {
        console.log(res.data.img);
        setIntern(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchIntern();
  }, []);

  const showCv = () => {
    console.log(intern?.cv)
    const buffer = intern?.cv; 
    const uint8Array = new Uint8Array(buffer!);
    const blob = new Blob([uint8Array], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    window.open(url, '_blank');
  };

  return (
    <div className="flex justify-between gap-20">
      <img
        src={`data:image/jpeg;base64,${btoa(
          String.fromCharCode.apply(intern?.id)
        )}`}
        className="w-full h-48"
        alt=""
      />
      <Descriptions title="Genel Bilgiler:" layout="vertical">
        <Descriptions.Item label="İsim">{intern?.name}</Descriptions.Item>
        <Descriptions.Item label="Sınıf">{intern?.grade}</Descriptions.Item>
        <Descriptions.Item label="Okul">{intern?.school}</Descriptions.Item>
        <Descriptions.Item label="Bölüm">
          {intern?.department}
        </Descriptions.Item>
        <Descriptions.Item label="Alan">{intern?.field}</Descriptions.Item>
        <Descriptions.Item className="flex items-center" label="Tamamlandı %">
          <CircularProgressbar
            value={25}
            maxValue={100}
            text={`${25}%`}
            className="text-black h-24"
          />
        </Descriptions.Item>
      </Descriptions>
      <Button onClick={showCv}>cv göster</Button>
    </div>
  );
};

export default App;
