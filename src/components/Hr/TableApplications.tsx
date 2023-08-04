import Table, { ColumnsType } from "antd/es/table";
import { CheckOutlined,CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";

interface DataType {
  key:number
  id: number;
  name: string;
  mail:string;
  school: string;
  grade: number;
  department: string;
  completed : number; 
  field: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: '',
    dataIndex: 'key',
    key: 'key',
    align : "left",
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'İsim',
    dataIndex: 'name',
    key: 'name',
    align : "left",
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Mail Adresi',
    dataIndex: 'mail',
    key: 'mail',
    align : "left",
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Sınıf',
    dataIndex: 'grade',
    align : "left",
    key: 'grade',
  },
  {
    title: 'Okul',
    dataIndex: 'school',
    align : "left",
    key: 'school',
  },
  {
    title: 'Bölüm',
    dataIndex: 'department',
    align : "left",
    key: 'department',
  },
  {
    title: 'Alan',
    key: 'field',
    align : "left",
    dataIndex: 'field',
  },
  {
    title: 'Tamamlandı %',
    dataIndex: 'completed',
    align : "left",
    key: 'completed',
  },
  {
    title: 'Cv',
    key: 'action',
    align : "left",
    render: (_, record) => (
      <div >
        <Button>Görüntüle</Button>
      </div>
    ),
  },
  {
    title: 'Kabul',
    key: 'action',
    align : "left",
    render: (_, record) => (
      <div className="text-green-700 cursor-pointer">
        <CheckOutlined />
      </div>
    ),
  },
  {
    title: 'Ret',
    key: 'action',
    align : "left",
    render: (_, record) => (
      <div className="text-red-700 cursor-pointer">
        <CloseOutlined />
      </div>
    ),
  },
]

const TableApplications = () => {
  let apps:DataType[] = [
    {
      id:1,
      key:1,
      name:"Stajyer İsmi1",
      mail:"örnek@gmail.com",
      grade:3,
      department:"Yazılım",
      school:"Fırat",
      field:"full stack",
      completed:50
    },
    {
      id:2,
      key:2,
      name:"Stajyer İsmi2",
      mail:"örnek@gmail.com",
      grade:3,
      department:"Yazılım",
      school:"Fırat",
      field:"full stack",
      completed:50
    }
  ]
  return (
    <div>
      <Table pagination={false} className="ml-16 mt-28 mb-10" columns={columns} dataSource={apps} />
    </div>
  )
}

export default TableApplications