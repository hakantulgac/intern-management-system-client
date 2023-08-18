import { Form, Modal, Upload, message } from "antd";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import axios from "axios";

interface typeDocs{
    internid: number
    accForm:string
    criRecord:string
    educDoc:string
    idRegister:string
}

interface typeIntern {
  name: string;
  mail:string
  grade: number;
  school: string;
  department: string;
  field: string;
  completed: number;
  image: string
  resume: string
  startdate:string
  enddate:string
}

const DocumentUpload: React.FC<{
  docOpen: boolean;
  setDocOpen: React.Dispatch<React.SetStateAction<boolean>>;
  uname:string
}> = (props) => {
  const [docs,setDocs] = useState<typeDocs>({internid:0,accForm:"",criRecord:"",educDoc:"",idRegister:""})
  const [key,setKey] = useState(Date.now())
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Dosyalar eklendi. Şimdi sisteme giriş yapabilirsiniz.",
    });
  };

  const warning = () => {
    messageApi.open({
      type: "error",
      content: "Sunucu hatası",
    });
  };

  const beforeUpload = (file: File) => {
    return false;
  };


  const handleFileChange = async(name: string, file: any) => {
    if(file){
      const reader = new FileReader()
      await reader.readAsDataURL(file)
      reader.onload =() =>{
        const base64 = reader.result?.toString()
        setDocs((prevState) => ({
          ...prevState,
          [name]: base64,
           
        }));
      }
    }
  };
  
  const handleCancel = () =>{
    props.setDocOpen(false)
    setDocs({internid:0,accForm:"",criRecord:"",educDoc:"",idRegister:""})
    setKey(Date.now())
  }

  const creatDetail = (
    item: any,
    newIntern: typeIntern,
    startDate: string,
    endDate: string
  ) => {
    axios.post(
      "details/intern",
      JSON.stringify({
        intern: newIntern.name,
        plan: item.id,
        startDate: startDate,
        endDate: endDate,
        done: false,
        point:0
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  };


  const handleOk = ()=>{
    axios.get("interns/mail/"+props.uname)
    .then(res=>{
      const internId = res.data[0].id
      axios.get("interns/"+internId)
      .then((_intern)=>{
        axios.get("plans/intern")
        .then((res)=>{
          if (res) {
            let count = 1;
            let startDate = dayjs().format("YYYY-MM-DD");
            const filteredPlans = res.data.filter((i:any)=>i.field===_intern.data.field)
            for (const item of filteredPlans) {
              if (count>1) {
                startDate = "";;
              } 
              creatDetail(item, _intern.data, startDate, "");
              count++;
            }
          }
        })
      })
      axios.put("interns/active/"+internId)
      axios.post("docs",
        JSON.stringify({...docs,internid:internId}),
        { headers: { "Content-Type": "application/json" },}
      ).then(()=>success())
    }).catch(()=>{
      warning()
    })
    props.setDocOpen(false)
    setDocs({internid:0,accForm:"",criRecord:"",educDoc:"",idRegister:""})
    setKey(Date.now())
  }

  return (
    <div>
      {contextHolder}
      <Modal
        className="-mt-16"
        open={props.docOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="mb-10 text-base">
          Aşağıdaki belgeleri yüklemeniz gerekmektedir.
        </div>
        <Form key={key}>
          <Form.Item label="Kabul Formu" valuePropName="accForm">
            <Upload
              className="ml-12"
              onChange={(info) => handleFileChange("accForm", info.file)}
              beforeUpload={beforeUpload}
              action="/upload.do"
              listType="picture-card"
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item label="Adli Sicil Kaydı" valuePropName="criRecord">
            <Upload
              className="ml-9"
              onChange={(info) => handleFileChange("criRecord", info.file)}
              beforeUpload={beforeUpload}
              action="/upload.do"
              listType="picture-card"
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item label="Öğrenim Belgesi" valuePropName="educDoc">
            <Upload
              className="ml-6"
              onChange={(info) => handleFileChange("educDoc", info.file)}
              beforeUpload={beforeUpload}
              action="/upload.do"
              listType="picture-card"
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item label="Nüfus Kayıt Örneği" valuePropName="idRegister">
            <Upload
              className="ml-[10px]"
              onChange={(info) => handleFileChange("idRegister", info.file)}
              beforeUpload={beforeUpload}
              action="/upload.do"
              listType="picture-card"
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DocumentUpload;