import HeaderSider from "../components/HeaderSider";
import InternInfo from "../components/InternInfo";
import TimeLine from "../components/TimeLine";
import { Chart } from "../components/Chart";
import { FloatButton, Modal, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import EditPlanModal from "../components/EditPlanModal";
import axios from "axios";
import dayjs from "dayjs";
import { useLocation, useNavigate } from "react-router-dom";

interface typeDetail {
  id: number;
  intern: {
    id: number;
    name: string;
    grade: number;
    school: string;
    department: string;
    field: string;
    completed: number;
  };
  plan: {
    id: number;
    title: string;
    description: string;
    days: number;
  };
  startDate: string;
  endDate: string;
  done: boolean;
  point: number;
}

const InternDetailPage: React.FC = () => {
  const location = useLocation();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [nextPlan, setNextPlan] = useState<typeDetail>() 

  const searchParams = new URLSearchParams(location.search);
  const internId = searchParams.get("id");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detail, setDetail] = useState<typeDetail[]>([]);
  const [keyDetail, setKeyDetail] = useState(Date.now());
  const [keyModal, setKeyModal] = useState(Date.now());

  const changes: boolean[] = [];

  const success = () => {
    messageApi.open({
      type: "warning",
      content: "Stajyer Silindi",
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const putDetail = async(item: typeDetail, updatedDetail: typeDetail) => {
    await axios.put(`details/${item.id}`, JSON.stringify(updatedDetail), {
      headers: { "Content-Type": "application/json" },
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const editPlans = async () => {
      await changes.map(async(item,key)=>{
        let endDate = ""
        if(item){
          if(detail[key].startDate==""){
            alert("henüz başlamadı")
            setIsModalOpen(false)
            setKeyDetail(Date.now())
          }else{
            endDate = dayjs().format("YYYY-MM-DD")
            await putDetail(detail[key],{...detail[key],done:item,endDate:endDate})
            fetchDetail()
            setTimeout(async () => {
              for(let i=0;i<detail.length;i++){
                if(i!==key){
                  if(detail[i].startDate!=="" && detail[i].endDate==""){
                    break
                  }
                  if(!detail[i].done && detail[i].startDate == ""){
                    await putDetail(detail[i],{...detail[i],startDate:endDate})
                    break
                  }
                }
              }
            }, 200);
          }
        }else{
          await putDetail(detail[key],{...detail[key],done:item,endDate:endDate})
        }
      })
  };

  const handleOk = async () => {
    await editPlans();
    await setTimeout(async()=>{
      await fetchDetail();
      await setKeyDetail(Date.now());
      await setKeyModal(Date.now())
      setIsModalOpen(false);
    },250)
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setTimeout(()=>{setKeyModal(Date.now())},200)
  };

  const fetchDetail = async () => {
    await axios
    .get("details/" + internId)
    .then((res) => {
      setDetail(res.data);
    })
    .catch((err) => {});
  };

  const deleteIntern = () => {
    axios.delete("details/" + internId).then((res) => {
      success();
    });
    setTimeout(()=>{navigate("/home");},1000)
  };

  useEffect(() => {
    fetchDetail();
  }, []);

  return (
    <div className="flex">
      {contextHolder}
      <HeaderSider />
      <div className="intern-table ml-60 mr-20 w-full">
        <p className="text-xl fixed z-50 bg-white w-full pt-6 pb-6 border-b">
          Stajyer Detayları:
        </p>
        <div className="mt-24">
          <div className="introduce flex flex-row justify-start mt-5 mb-20">
            <div className="flex flex-col gap-2">
              <InternInfo
                key={keyDetail}
                internId={String(internId)}
                detail={detail}
              />
            </div>
          </div>
          <div className="flex">
            <div className="mt-5 w-2/5">
              <p className="mb-5">Görevler:</p>
              <TimeLine key={keyDetail} detail={detail} />
            </div>
            <div className="mt-5 w-3/5 -ml-10 mb-10">
              <p className="mb-5">Puan:</p>
              <Chart key={keyDetail} detail={detail} />
            </div>
          </div>
        </div>
        <div className="max-h-9">
          <Modal
            key={keyModal}
            width={1000}
            title="Planı Düzenle"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <EditPlanModal
              changes={changes}
              detail={detail}
              internId={String(internId)}
            />
          </Modal>
        </div>
      </div>
      <FloatButton
        icon={<EditOutlined />}
        type="primary"
        className="shadow-md shadow-gray-700"
        style={{ top: 20, right: 140 }}
        onClick={showModal}
      />
      <Popconfirm
        title="Stajyer silinecek"
        description="Emin misiniz?"
        onConfirm={deleteIntern}
        onCancel={() => {}}
        okText="Evet"
        cancelText="İptal"
      >
        <FloatButton
          icon={<DeleteOutlined />}
          type="default"
          className="bg-red-500 shadow-red-700 shadow-md"
          style={{ top: 20, right: 85 }}
        />
      </Popconfirm>
    </div>
  );
};

export default InternDetailPage;
