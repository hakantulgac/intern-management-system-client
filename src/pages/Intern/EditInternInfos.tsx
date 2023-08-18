import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import axios from "axios";
import EditIntern from "../../components/Intern/EditIntern";

interface typeIntern {
  id: number;
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

const EditInternInfos: React.FC = () => {
  const [passArae, setPassArea] = useState(false);
  const [editArea, setEditArea] = useState(true);
  const [password, setPassword] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [check,setCheck] = useState<{name:string,password:string,role:string}>({name:"",password:"",role:""})
  const [intern,setIntern] = useState<typeIntern>()
  const [userId,setUserId] = useState()

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const internId = searchParams.get("id");

  useEffect(()=>{
    axios.get("../interns/"+internId)
    .then(res=>{
      setIntern(res.data)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(()=>{
    if(intern?.id){
      axios.get("../users/mail/"+intern.mail)
      .then(res=>{
        setUserId(res.data[0].id)
      })
    }
  },[intern])

  useEffect(()=>{
    if(userId){
      axios.get("../users/"+userId)
      .then(res=>{
        setCheck({...check,name:res.data.name,role:res.data.role})
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[userId])

  const passwordValidator = (_: any, value: string) => {
    if (value !== "" && value.length < 5) {
      return Promise.reject("Şifre en az 5 karakter olabilir");
    } else {
      return Promise.resolve();
    }
  };

  const handlePasswordConfirm = (rule:any, value:string,callBack:()=>void) =>{
    const {getFieldValue} = form;

    if(value && value===getFieldValue("newPaswordItem")){
      callBack()
    }else{
      return Promise.reject("Parolalar eşleşmiyor")
    }

  }

  const [form] = Form.useForm()

  const onFinishPassword = () => {
    console.log(check)
    axios.post("../users/login",JSON.stringify(check),
      {headers:{"Content-type":"Application/json"}}
    ).then(()=>{
      setPassArea(true);
      setEditArea(false);
    }).catch(err=>{
      alert("parola yanlış")
    })
  };

  const onFinishEdit = () => {
    console.log(JSON.stringify(check))
    axios.put("../users/"+userId,JSON.stringify(check), {
      headers: { "Content-Type": "application/json" },
    })
    .then(()=>alert("başarılı"))
    .catch(err=>console.log(err))
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="flex">
      <EditIntern
        setIntern={setIntern}
        intern={intern}
        isModalOpen={isModalOpen}
        showModal={showModal}
        setIsModalOpen={setIsModalOpen}
      />
      <div className="mr-20 w-full">
        <p className="text-white pl-16 text-xl fixed z-5 w-full pt-6 pb-6 border-b bg-[#001529]">
          Bilgileri Düzenle intern
        </p>
        <div hidden={passArae} className="mt-52 mx-16 text-center">
          <div>Parolanızı Giriniz</div>
          <Form onFinish={onFinishPassword}>
            <Form.Item
              name="passwordItem"
              rules={[
                { required: true, message: "Lütfen Şifrenizi Giriniz!" },
                { validator: passwordValidator },
              ]}
            >
              <Input 
                onChange={(val)=>{setCheck({...check,password:val.target.value})}} 
                name="password" 
                type="password" 
                className="mt-3 w-40" 
              />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary">
                Onayla
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div hidden={editArea} className="mt-52 mx-16 text-center">
          <div className="flex justify-center">
            <p className="mt-1">Stajyer bilgileri</p>
            <EditOutlined
              onClick={showModal}
              className="text-lg ml-2"
            />
          </div>
          <div className="flex justify-center mt-5">
            <p className="mt-1">Parola</p>
            <EditOutlined
              onClick={() => setPassword(!password)}
              className="text-lg ml-2"
            />
          </div>
          <div hidden={password}>
            <Form 
              form={form}
              onFinish={onFinishEdit}
            >
              <Form.Item
                name="newPaswordItem" 
                rules={[
                  { required: true, message: "Lütfen Şifrenizi Giriniz!" },
                  { validator: passwordValidator },
                ]}
              >
                <Input
                  onChange={(val)=>setCheck({...check,password:val.target.value})}
                  placeholder="Yeni parola" 
                  name="newPasword" 
                  type="password" 
                  className="mt-3 w-40" />
              </Form.Item>
              <Form.Item
               className="-mt-6"
               name="formPasswordConfirm"
               rules={[
                 {required: true, message: "Lütfen Şifrenizi Giriniz!" },
                 {validator: handlePasswordConfirm}
               ]}
              >
                <Input
                  type="password"
                  placeholder="Parola Tekrar"
                  className="mt-3 w-40"
                />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" type="primary">
                  Onayla
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditInternInfos;
