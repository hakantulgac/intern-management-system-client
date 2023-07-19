import { Tabs } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { Spin } from "antd";

interface typePlan {
  id: number;
  title: string;
  description: string;
  days:number
}

interface typeProps {
  setCounter: React.Dispatch<React.SetStateAction<number>>;
}

const PlanTabs: React.FC<typeProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [plans, SetPlans] = useState<typePlan[]>([]);

  const fetchData = async () => {
    await axios
      .get("plans")
      .then((res) => {
        SetPlans(res.data);
      })
      .catch((err) => {
        console.log(err);
      }).finally(()=>{
        setLoading(false)
      })
  };

  useEffect(() => {
    fetchData();
    props.setCounter(plans.length);
  }, [plans,props]);

  return (
    <div className="">
      <Spin spinning={loading} className="">
        <Tabs
          className="mt-5"
          defaultActiveKey="1"
          tabPosition="left"
          style={{ height: 500 }}
          items={plans.map((plan, i) => {
            const id = String(i + 1);
            return {
              label: `Hafta-${id}`,
              key: id,
              disabled: i === 28,
              children: `${id}. haftanın konusu: ${plan.title}
              ${plan.description}`,
            };
          })}
        />
      </Spin>
    </div>
  );
};

export default PlanTabs;
