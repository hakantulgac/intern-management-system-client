/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input,message } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";


interface typeUser{
  name:string
  password : string
}

const Register: React.FC = () => {
  const [user,setUser] = useState<typeUser>({name:"",password:""})
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Kayıt Başarılı',
    });
  };
  const warning = () => {
    messageApi.open({
      type: 'warning',
      content: 'hata',
    });
  };

  const onFinish = (values: any) => {
    axios.post('users',JSON.stringify(user),
      {headers:{"Content-type":"Application/json"}}
    ).then(res=>{
      success()
      window.location.href = '/login'
    }).catch(err=>{
      warning()
      console.log(err)
    })
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    const {name,value} = event.target;
    setUser(prevState=>({
      ...prevState,
      [name]:value
    }))
  }

  const passwordValidator = (_:any, value: string)=>{
    if(value !== "" && value.length < 5){
      return Promise.reject("Şifre en az 5 karakter olabilir")
    }else{
      return Promise.resolve()
    }
  }

  const handlePasswordConfirm = (rule:any, value:string,callBack:()=>void) =>{
    const {getFieldValue} = form;

    if(value && value!==getFieldValue("formPassword")){
      return Promise.reject("parolalar eşleşmiyor")
    }else{
      callBack()
    }

  }
  const [form] = Form.useForm()
  return (
      <div className="flex justify-center mt-72">
        {contextHolder}
        <Form
        form={form}
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
            rules={[
              { required: true, message: "Lütfen Şifrenizi Giriniz!" },
              { validator: passwordValidator}
            ]}
          >
            <Input
              onChange={handleInputChange}
              name="password"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Parola"
            />
          </Form.Item>
          <Form.Item
            name="formPasswordConfirm"
            rules={[
              {required: true, message: "Lütfen Şifrenizi Giriniz!" },
              {validator: handlePasswordConfirm}
            ]}
          >
            <Input
              name ="passwordConfirm"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Parola Tekrar"
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
              Kaydol
            </Button>
            Zaten bir hesabınız var mı?{" "}
            <Link className="text-blue-600" to="/login">Giriş Yap!</Link>
          </Form.Item>
        </Form>
      </div>
  );
};

export default Register;
