import { Modal, Form, Input, message} from "antd";
import { useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

interface typeProps {
  isModalOpen: boolean;
  showModal: () => void;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTableInternKey: React.Dispatch<React.SetStateAction<number>>
}

interface typeIntern {
  name: string;
  grade: number;
  school: string;
  department: string;
  field: string;
  completed: number;
  img: File
  cv:File
}

const CreateIntern: React.FC<typeProps> = (props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [newIntern, setNewIntern] = useState<typeIntern>({
    name: "",
    grade: 0,
    school: "",
    department: "",
    field: "",
    completed: 0,
    img:new File([], ""),
    cv:new File([], "")
  });

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Stajyer Eklendi",
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
    newIntern: typeIntern,
    startDate: string,
    endDate: string
  ) => {
    axios.post(
      "details/intern",
      JSON.stringify({
        intern: newIntern.name,
        plan: item.id,
        startDate: startDate,
        endDate: endDate,
        done: false,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  };

  const handleOk = async () => {
    try {
      await axios.post("interns", JSON.stringify(newIntern), {
        headers: { "Content-Type": "application/json" },
      });

      const res = await axios.get("plans/intern");
      if (res) {
        let count = 1;
        let startDate = dayjs().format("YYYY-MM-DD");
        let endDate = "";
        for (const item of res.data) {
          startDate = dayjs().format("YYYY-MM-DD");
          if (count === 1) {
            endDate = "-";
          } else {
            endDate = "";
          }
          await creatDetail(item, newIntern, startDate, endDate);
          count++;
        }

        success();
      }
    } catch (err) {
      console.log(err);
      warning();
    }

    props.setIsModalOpen(false);
    props.setTableInternKey(Date.now())
    setNewIntern({
      name: "",
      grade: 0,
      school: "",
      department: "",
      field: "",
      completed: 0,
      img:new File([], ""),
      cv:new File([], "")
    });
  };

  const handleCancel = () => {
    props.setIsModalOpen(false);
    setNewIntern({
      name: "",
      grade: 0,
      school: "",
      department: "",
      field: "",
      completed: 0,
      img:new File([], ""),
      cv:new File([], "")
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setNewIntern((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleInputUpload = (
    event : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {name,id} = event.target
    setNewIntern(prevState=>({
      ...prevState,
      [name]: id
    }))
  }
  return (
    <>
      {contextHolder}
      <Modal
        title="Yeni Stajer Oluştur"
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
          <Form.Item label="İsim">
            <Input
              type="text"
              name="name"
              value={newIntern.name}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Sınıf">
            <Input
              type="text"
              name="grade"
              value={newIntern.grade}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Okul">
            <Input
              type="text"
              name="school"
              value={newIntern.school}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Bölüm">
            <Input
              type="text"
              name="department"
              value={newIntern.department}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Alan">
            <Input
              type="text"
              name="field"
              value={newIntern.field}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Resim">
            <Input 
              type='file'
              name='img'
              id='imgId'
              onChange={handleInputUpload}
            />
          </Form.Item>
          <Form.Item label="CV">
            <Input 
              type='file'
              name='cv'
              id='cvId'
              onChange={handleInputUpload} 
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateIntern;
