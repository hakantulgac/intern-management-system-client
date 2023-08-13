/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input,Select,message } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";


interface typeUser{
  name:string
  password : string
}

const Register: React.FC<{setKey:React.Dispatch<React.SetStateAction<number>>}> = (props) => {
  const [user,setUser] = useState<typeUser>({name:"",password:""})
  const [isHidden,setIsHidden] = useState(true)
  const [role,setRole] = useState("")
  const [field,setField] = useState("")

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

  const onFinish = async (values: any) => {
    await axios.post('../users',JSON.stringify({...user,role:role,field:field}),
      {headers:{"Content-type":"Application/json"}}
    ).then(res=>{
      success()
    }).catch(err=>{
      warning()
      console.log(err)
    })
    setTimeout(()=>props.setKey(Date.now()),700)
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

  const handleChangeRole =(value:string)=>{
    setRole(value)
    if(value==="mentor"){
      setIsHidden(false)
    }else{
      setField("")
      setIsHidden(true)
    }
  }
  const handleChangeField=(value:string)=>{
    setField(value)
  }

  return (
      <div className="flex justify-center mt-48">
        {contextHolder}
        <Form
          form={form}
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="role"
          >
            <Select
              placeholder="Kullanıcı Tipi"
              options={[
                {value:"hr",label:"İK"},
                {value:"mentor",label:"Danışman"},
              ]}
              onChange={handleChangeRole}
            />
          </Form.Item>
          <Form.Item
            name="field"
            hidden={isHidden}
          >
            <Select
              placeholder="Alanı"
              options={[
                {value:"fs",label:"Full Stack"},
                {value:"data",label:"Data"},
                {value:"ed",label:"Embedded"}
              ]}
              onChange={handleChangeField}
            />
          </Form.Item>
          <Form.Item
            name="formName"
            rules={[
              { required: true, message: "Lütfen Kullanıcı Adınızı Giriniz!" },
            ]}
          >
            <Input
              className="w-64"
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
          <Form.Item className="text-center">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button w-40 mb-1"
            >
              Oluştur
            </Button>
          </Form.Item>
        </Form>
      </div>
  );
};

export default Register;
