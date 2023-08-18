import { Avatar, Input, List, Modal } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import axios from "axios";

interface typeIntern {
  id:number
  name: string;
  mail: string;
  grade: number;
  school: string;
  department: string;
  field: string;
  completed: number;
  image: string;
  resume: string;
  startdate: string;
  enddate: string;
}

interface typeProps {
  isModalOpen: boolean;
  showModal: () => void;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  intern: typeIntern | undefined;
  setIntern:React.Dispatch<React.SetStateAction<typeIntern | undefined>>
}

const EditIntern: React.FC<typeProps> = (props) => {
  const [visible,setVisible] = useState<
    {name:boolean,mail:boolean,grade:boolean,field:boolean}
  >({name:true,mail:true,grade:true,field:true})
  const [edited,SetEdited] = useState<{name:string,mail:string,grade:number,field:string}>(
    {name:"",mail:"",grade:0,field:""}
  )

  const handleOk = async () => {
    await axios.put(`../interns/${props.intern?.id}`, JSON.stringify(
      {...props.intern,name:edited.name,mail:edited.mail,grade:edited.grade,field:edited.field}
    ), {
      headers: { "Content-Type": "application/json" },
    }).then()
    props.setIsModalOpen(false);
  };

  const handleCancel = () => {
    props.setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        className="-mt-5"
        title="Bilgileri Güncelle:"
        open={props.isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Gönder"
        cancelText="İptal"
      >
        <div className="pt-5">
          <List
            itemLayout="horizontal"
          >
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    className="w-3 h-3 mr-5"
                  />
                }
                title="İsim"
                description={props.intern?.name}
              />
              <div className="mr-32" hidden={visible.name}>
                <Input
                  name="name"
                  onChange={(value)=>SetEdited({...edited,name:value.target.value})} 
                  placeholder="Yeni İsim"
                />
              </div>
              <div>
                <EditOutlined
                  onClick={()=>{setVisible({...visible,name:!visible.name})}}
                  className="text-lg"
                />
              </div>
            </List.Item>
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    className="w-3 h-3 mr-5"
                  />
                }
                title="Email"
                description={props.intern?.mail}
              />
              <div className="mr-32" hidden={visible.mail}>
                <Input
                  name="mail"
                  onChange={(value)=>SetEdited({...edited,mail:value.target.value})}  
                  placeholder="Yeni Email"/>
              </div>
              <div>
                <EditOutlined
                  onClick={()=>{setVisible({...visible,mail:!visible.mail})}}
                  className="text-lg"
                />
              </div>
            </List.Item>
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    className="w-3 h-3 mr-5"
                  />
                }
                title="Sınıf"
                description={props.intern?.grade}
              />
              <div className="mr-32" hidden={visible.grade}>
                <Input
                  name="grade"
                  onChange={(value)=>SetEdited({...edited,grade:Number(value.target.value)})}  
                  placeholder="Sınıf"/>
              </div>
              <div>
                <EditOutlined
                  onClick={()=>{setVisible({...visible,grade:!visible.grade})}}
                  className="text-lg"
                />
              </div>
            </List.Item>
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    className="w-3 h-3 mr-5"
                  />
                }
                title="Alan"
                description={props.intern?.field}
              />
              <div className="mr-32" hidden={visible.field}>
                <Input 
                  name="field"
                  onChange={(value)=>SetEdited({...edited,field:value.target.value})}
                  placeholder="Yeni Alan"/>
              </div>
              <div>
                <EditOutlined
                  onClick={()=>{setVisible({...visible,field:!visible.field})}}
                  className="text-lg"
                />
              </div>
            </List.Item>
          </List>
        </div>
      </Modal>
    </>
  );
};

export default EditIntern;
