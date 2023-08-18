import React, { useState, useEffect } from "react";
import { Button, Segmented } from "antd";
import Login from "../../components/User/Login";
import CreateIntern from "../../components/Mentor/CreateIntern";
import DocumentUpload from "../../components/Intern/DocumentUpload";
import axios from "axios";

const HomePage: React.FC = () => {
  const [value, setValue] = useState<string | number>("Başvuru");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [key,setKey] = useState(Date.now())
  const [docOpen,setDocOpen] = useState(false)
  const [uname,setUname] = useState("")
  const [user,setUser] = useState<{name:string,type:string}>()
  
  useEffect(()=>{
    /*axios.get("../users/auth").then((res)=>setUser(res.data))
    
    if(user?.type==="hr")
      window.location.href = "/hr/"
    else if(user?.type==="intern")
      window.location.href = "/intern"
    else
    window.location.href = "/mentor"*/
  },[user])

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="text-center">
      <DocumentUpload 
        uname={uname}
        docOpen={docOpen}
        setDocOpen={setDocOpen}
      />
      <CreateIntern
        isModalOpen={isModalOpen}
        showModal={showModal}
        setIsModalOpen={setIsModalOpen}
      />
      <p className="h-24 bg-[#001529] text-white pt-8 pl-24 text-lg font-mono text-left">
        STAJYER TAKİP SİSTEMİ
      </p>
      <div className="mt-32">
        <Segmented
          size="large"
          className="bg-[#001529] text-gray-300 w-auto"
          options={[
            "Başvuru",
            "Stajyer Girişi",
            "Danışman Girişi",
            "İK Girişi",
          ]}
          value={value}
          onChange={(value)=>{
            setValue(value)
            setKey(Date.now())
          }}
        />
        <div hidden={value === "Başvuru"}>
          <Login setUname={setUname} setDocOpen={setDocOpen} key={key} value={value} />
        </div>
        <div className="mt-20" hidden={value !== "Başvuru"}>
          <p>Yeni stajyer başvurusu oluştur.</p>
          <Button
            type="primary"
            className="mt-3 rounded-full h-10"
            onClick={showModal}
          >
            +
          </Button>
          <p className="text-xs mt-32">
            Not: Başvurunuz onaylanırsa parolanız mail adresinize
            gönderilecektir.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
