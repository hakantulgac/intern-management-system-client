/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import axios from "axios";

interface typeUser{
  name:string
  password : string
}

const Login: React.FC<{value:string | number}> = (props) => {
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
    axios.post("users/login",JSON.stringify(user),
      {headers:{"Content-type":"Application/json"}}
    ).then(
        async(res)=>{
          if(props.value==="Stajyer Girişi"){
            axios.get("interns/mail/"+user.name)
            .then(async (res)=>{
              await success()
              setTimeout(()=>{window.location.href = "/intern?id="+res.data[0].id},700) 
            })
          }
          else if(props.value==="Danışman Girişi"){
            await success()
            setTimeout(()=>{window.location.href = "/interns"},700) 
          }else{
            await success()
            setTimeout(()=>{window.location.href = "/hr/interns"},700)
          }
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
      <div className="flex justify-center mt-10" data-testid="username">
        {contextHolder}
        <Form
          data-testid="login-form"
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
              data-testid="username"
              onChange={handleInputChange}
              name="name"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder={props.value==="Stajyer Girişi" ? "Mail Adresi" : "Kullanıcı Adı"}
              className="w-64"
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

          <Form.Item className="text-center">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button w-40"
            >
              Giriş
            </Button>
          </Form.Item>
        </Form>
      </div>
  );
};

export default Login;
