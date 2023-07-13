import {
    Modal,
    Form,
    Input,
    message
} from 'antd';
import { useState } from 'react';
import axios from 'axios'
    
  interface typeProps {
      isModalOpen: boolean
      showModal: ()=>void
      setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  }
  
  interface typeIntern {
    name:string
    grade:number
    school:string
    department:string
    field:string
    completed:number
  }

  const CreateIntern: React.FC<typeProps> = (props) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [newIntern,setNewIntern] = useState<typeIntern>({name:"",grade:0,school:"",department:"",field:"",completed:0})

    const success = () => {
      messageApi.open({
        type: 'success',
        content: 'Stajyer Eklendi',
      });
    };
    const warning = () => {
      messageApi.open({
        type: 'warning',
        content: 'hata',
      });
    };

    const handleOk = () => {
      axios.post('interns', JSON.stringify(newIntern), {
        headers: { 'Content-Type': 'application/json' }
      }).then(res=>{
        console.log(res)
        success()
      }).catch(err=>{
        console.log(err)
        warning()
      })
      props.setIsModalOpen(false)
      setNewIntern({name:"",grade:0,school:"",department:"",field:"",completed:0})
    };
  
    const handleCancel = () => {
      props.setIsModalOpen(false)
      setNewIntern({name:"",grade:0,school:"",department:"",field:"",completed:0})
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      setNewIntern(prevState => ({
        ...prevState,
        [name]: value
      }));
    };

    return (
      <>
        {contextHolder}
        <Modal title="Yeni Stajer Oluştur" open={props.isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <Form
              className='mt-10 mb-5'
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 14 }}
              layout="horizontal"
              style={{ maxWidth: 600 }}
          >
          <Form.Item label="İsim">
            <Input type='text' name='name' value={newIntern.name} onChange={handleInputChange}/>
          </Form.Item>
          <Form.Item label="Sınıf">
            <Input type='text' name='grade' value={newIntern.grade} onChange={handleInputChange}/>
          </Form.Item>
          <Form.Item label="Okul">
            <Input type='text' name='school' value={newIntern.school} onChange={handleInputChange}/>
          </Form.Item>
          <Form.Item label="Bölüm">
            <Input type='text' name='department' value={newIntern.department} onChange={handleInputChange}/>
          </Form.Item>
          <Form.Item label="Alan">
            <Input type='text' name='field' value={newIntern.field} onChange={handleInputChange}/>
          </Form.Item>
        </Form>
        </Modal>
      </>
    );
  };
  
  export default CreateIntern;