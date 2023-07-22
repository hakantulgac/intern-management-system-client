import { Modal, DatePicker, Form, Input, message } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { RangeValue } from "rc-picker/lib/interface";
import { useState } from "react";
import axios from "axios";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

interface typeProps {
  isModalOpen: boolean;
  showModal: () => void;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  counter: number;
  setTabKey: React.Dispatch<React.SetStateAction<number>>
}

interface typePlan {
  title: string;
  description: string;
  days:number
}

const CreatePlan: React.FC<typeProps> = (props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [newPlan, setNewPlan] = useState<typePlan>({
    title: "",
    description: "",
    days:0
  });

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Plan Eklendi",
    });
  };
  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "hata",
    });
  };

  const creatDetail = (
    item: any,
    newPlan: typePlan,
    startDate: string,
    endDate: string
  ) => {
    axios.post(
      "details/plan",
      JSON.stringify({
        intern: item.id,
        plan: newPlan.title,
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

  const handleOk = async () => {
    try {
      await axios.post("plans", JSON.stringify(newPlan), {
        headers: { "Content-Type": "application/json" },
      });
      
      const res = await axios.get("interns/plan");
      if (res) {
        let startDate = dayjs().format("YYYY-MM-DD");
        for (const item of res.data) {
          console.log(item);
          startDate = dayjs().format("YYYY-MM-DD");
          await creatDetail(item, newPlan, startDate, "");
        }
        success();
      }
    } catch (error) {
      console.log(error);
      warning();
    }
    props.setTabKey(Date.now())
    props.setIsModalOpen(false);
  };

  const handleCancel = () => {
    props.setIsModalOpen(false);
  };

  function handleRangePickerChange(
    values: RangeValue<Dayjs>,
    formatString: [string, string]
  ): void {
    const [startDate, endDate] = formatString;
    
    const start = dayjs(startDate)
    const end = dayjs(endDate)
    const days = end.diff(start,'day')
    
    setNewPlan((prevState) => ({
      ...prevState,
      days
    }));
  }

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setNewPlan((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      {contextHolder}
      <Modal
        title={`${props.counter + 1}. haftanın planı:`}
        open={props.isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          className="mt-10 mb-5"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 600 }}
        >
          <Form.Item label="Başlık">
            <Input name="title" onChange={handleInputChange} />
          </Form.Item>
          <Form.Item label="İçerik">
            <TextArea
              name="description"
              rows={4}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item className="flex flex-col">
            <p>Başlangıç - Bitiş:</p>
            <RangePicker
              onChange={handleRangePickerChange}
              className="mt-3 ml-14"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreatePlan;
