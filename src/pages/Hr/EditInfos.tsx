import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { EditOutlined } from "@ant-design/icons";

const EditInfos: React.FC = () => {
  const [passArae, setPassArea] = useState(false);
  const [editArea, setEditArea] = useState(true);
  const [username, setUsername] = useState(true);
  const [password, setPassword] = useState(true);
  
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

  const onFinishPassword = (values: any) => {
    setPassArea(true);
    setEditArea(false);
  };

  return (
    <div className="flex">
      <div className="mr-20 w-full">
        <p className="text-white pl-16 text-xl fixed z-5 w-full pt-6 pb-6 border-b bg-[#001529]">
          Bilgileri Düzenle
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
              <Input name="password" type="password" className="mt-3 w-40" />
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
            <p className="mt-1">Kullanıcı Adı</p>
            <EditOutlined
              onClick={() => setUsername(!username)}
              className="text-lg ml-2"
            />
          </div>
          <div hidden={username}>
            <Form>
              <Form.Item>
                <Input className="mt-3 w-40" />
              </Form.Item>
            </Form>
          </div>
          <div className="flex justify-center mt-5">
            <p className="mt-1">Parola</p>
            <EditOutlined
              onClick={() => setPassword(!password)}
              className="text-lg ml-2"
            />
          </div>
          <div hidden={password}>
            <Form form={form} onFinish={()=>{}}>
              <Form.Item
                name="newPaswordItem" 
                rules={[
                  { required: true, message: "Lütfen Şifrenizi Giriniz!" },
                  { validator: passwordValidator },
                ]}
              >
                <Input name="newPasword" type="password" className="mt-3 w-40" />
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
            </Form>
          </div>
          <div hidden={username && password} className="mt-5">
            <Button type="primary">Onayla</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditInfos;
