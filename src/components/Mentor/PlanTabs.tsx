import { Button, Popconfirm, Tabs, message } from "antd";
import { useEffect, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { Spin, Descriptions } from "antd";

export interface typePlan {
  id: number;
  title: string;
  description: string;
  days: number;
}

interface typeProps {
  setCounter: React.Dispatch<React.SetStateAction<number>>;
  setTabKey: React.Dispatch<React.SetStateAction<number>>
}

const PlanTabs: React.FC<typeProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [plans, SetPlans] = useState<typePlan[]>([]);
  const [deletedId,setDeletedId] = useState<number>()
  const [messageApi, contextHolder] = message.useMessage();

  const successDelete = () => {
    messageApi.open({
      type: "info",
      content: "Plan Silindi",
    });
  };

  const warningDelete = () => {
    messageApi.open({
      type: "warning",
      content: "hata",
    });
  };

  const fetchData = async (field:string) => {
    await axios
      .get("plans")
      .then((res) => {
        const plans = res.data.filter((i:any)=>i.field===field)
        SetPlans(plans);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(()=>{
    props.setCounter(plans.length);
    axios.get("users/auth")
    .then(res=>{
      fetchData(res.data.field);
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  const deletePlan = ()=>{
    axios.delete("plans/"+String(deletedId))
    .then(()=>{
      successDelete()
      setTimeout(() => {
        props.setCounter(plans.length);
        props.setTabKey(Date.now())
      },500);
    }).catch(()=>{
      warningDelete()
    })
  }

  return (
    <div className="w-full ml-32 mt-24">
      {contextHolder}
      <Spin spinning={loading} className="">
        <Tabs
          className="mt-5 w-full"
          defaultActiveKey="1"
          tabPosition="top"
          style={{ height: 500, width: 500 }}
        >
          {plans.map((plan, i) => {
            const id = String(i + 1);
            return (
              <Tabs.TabPane tab={`Hafta-${id}`} key={id} disabled={i === 28}>
                <div className="lg:ml-10 w-full lg:flex ">
                  <Descriptions layout="vertical">
                    <Descriptions.Item data-testid="plan-title" label={`${id}. Hafta Konu`}>
                      {plan.title}
                    </Descriptions.Item>
                    <br className="w-7" />
                    <Descriptions.Item label={`İçerik`}>
                      {plan.description}
                    </Descriptions.Item>
                    <Descriptions.Item label={`Süre`}>
                      {plan.days + " gün"}
                    </Descriptions.Item>
                  </Descriptions>
                  <Popconfirm
                    title="Plan Silinecek"
                    description="Emin misiniz?"
                    onConfirm={deletePlan}
                    onCancel={() => {}}
                    okText="Evet"
                    cancelText="İptal"
                  >
                    <div className="shadow-md shadow-black rounded-full h-11 w-11">
                      <Button
                        className="text-lg rounded-full h-11 pb-3 pl-3 w-11"
                        type="primary"
                        danger
                        onClick={()=>{setDeletedId(plan.id)}}
                      >
                        <DeleteOutlined />
                      </Button>
                    </div>
                  </Popconfirm>
                  
                </div>
              </Tabs.TabPane>
            );
          })}
        </Tabs>
      </Spin>
    </div>
  );
};

export default PlanTabs;
