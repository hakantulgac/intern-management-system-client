/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

interface typeUser{
  name:string
  password : string
}

const Login: React.FC = () => {
  const [user,setUser] = useState<typeUser>({name:"",password:""})
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Doğrulandı',
    });
  };
  const warning = () => {
    messageApi.open({
      type: 'warning',
      content: 'Kullanıcı adı veya parola hatalı',
    });
  };

  const onFinish = (values: any) => {
    console.log(JSON.stringify(user))
    axios.post("users/login",JSON.stringify(user),
      {headers:{"Content-type":"Application/json"}}
    ).then(
        res=>{
          success()
          console.log(res.data)
      }
    ).catch(
      err=>{
        warning()
        console.log(err)
      }
    )
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    const {name,value} = event.target;
    setUser(prevState=>({
      ...prevState,
      [name]:value
    }))
  }

  return (
      <div className="flex justify-center mt-72">
        {contextHolder}
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="formName"
            rules={[
              { required: true, message: "Lütfen Kullanıcı Adınızı Giriniz!" },
            ]}
          >
            <Input
              onChange={handleInputChange}
              name="name"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Kullanıcı Adı"
            />
          </Form.Item>
          <Form.Item
            name="formPassword"
            rules={[{ required: true, message: "Lütfen Şifrenizi Giriniz!" }]}
          >
            <Input
              onChange={handleInputChange}
              name="password"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Parola"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Beni Hatırla</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item className="flex justify-between">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button w-full mb-1"
            >
              <Link to="/home"></Link>
              Giriş
            </Button>
            Henüz bir hesabınız yok mu?{" "}
            <Link to="/register">Kaydol!</Link> 
          </Form.Item>
        </Form>
      </div>
  );
};

export default Login;
