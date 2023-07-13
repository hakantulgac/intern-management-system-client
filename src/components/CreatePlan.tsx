import {
  Modal,
  DatePicker,
  Form,
  Input,
  message
} from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { RangeValue } from 'rc-picker/lib/interface';
import { useState } from 'react';
import axios from 'axios';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

interface typeProps {
    isModalOpen: boolean
    showModal: ()=>void
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    counter:number
}

interface typePlan {
  title:string
  description:string
  startDate:string
  endDate:string
}

const CreatePlan: React.FC<typeProps> = (props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [newPlan,setNewPlan] = useState<typePlan>({title:"",description:"",startDate:"",endDate:""})
  
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Plan Eklendi',
    });
  };
  const warning = () => {
    messageApi.open({
      type: 'warning',
      content: 'hata',
    });
  };

  const handleOk = () => {
    axios.post('plans', JSON.stringify(newPlan), {
      headers: { 'Content-Type': 'application/json' }
    }).then(res=>{
      success()
      console.log(res)
    }).catch(err=>{
      warning()
      console.log(err)
    })
    props.setIsModalOpen(false);
  };

  const handleCancel = () => {
    props.setIsModalOpen(false);
  };

  function handleRangePickerChange(values: RangeValue<Dayjs>, formatString: [string, string]): void {
    const [startDate, endDate] = formatString;
    setNewPlan(prevState =>({
      ...prevState,
      startDate,
      endDate
    }));
    
    /* FARKI BULMAK İÇİN
    const start = dayjs(formatString[0])
    const end = dayjs(formatString[1])
    const days = end.diff(start,'day')*/
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setNewPlan(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <>
    {contextHolder}
      <Modal title={`${props.counter+1}. haftanın planı:`} open={props.isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form
            className='mt-10 mb-5'
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ maxWidth: 600 }}
        >
        <Form.Item label="Başlık">
          <Input name='title' onChange={handleInputChange} />
        </Form.Item>
        <Form.Item label="İçerik">
          <TextArea name='description' rows={4} onChange={handleInputChange} />
        </Form.Item>
        <Form.Item className='flex flex-col'>
          <p>Başlangıç - Bitiş:</p>
          <RangePicker onChange={handleRangePickerChange} className='mt-3 ml-14' />
        </Form.Item>
      </Form>
      </Modal>
    </>
  );
};

export default CreatePlan;