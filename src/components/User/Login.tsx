/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import axios from "axios";

interface typeUser{
  name:string
  password : string
}

const Login: React.FC<{
  value:string | number,
  setDocOpen:React.Dispatch<React.SetStateAction<boolean>>
  setUname:React.Dispatch<React.SetStateAction<string>>
}> = (props) => {
  const [user,setUser] = useState<typeUser>({name:"",password:""})
  const [messageApi, contextHolder] = message.useMessage();
  const [key,setKey] = useState(Date.now())

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
    let role
    if(props.value==="Stajyer Girişi") role = "intern"
    else if(props.value==="Danışman Girişi") role = "mentor"
    else role = "hr"
    console.log(JSON.stringify({...user,role:role}))
    axios.post("users/login",JSON.stringify({...user,role:role}),
      {headers:{"Content-type":"Application/json"},
        withCredentials: true
      }
    ).then(
        async(res)=>{
          if(props.value==="Stajyer Girişi"){
            axios.get("interns/mail/"+user.name)
            .then((res)=>{
              success()
              if(!res.data[0].isactive){
                props.setUname(user.name)
                setTimeout(()=>props.setDocOpen(true),1000)
              }else{
                setTimeout(()=>{window.location.href = "/intern/works"},700)
              }
            })
          }
          else if(props.value==="Danışman Girişi"){
            await success()
            setTimeout(()=>{window.location.href = "/interns"},700) 
          }else{
            await success()
            setTimeout(()=>{window.location.href = "/hr/interns"},700)
          }
          setKey(Date.now())
      }
    ).catch(
      err=>{
        warning()
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
          key = {key}
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
