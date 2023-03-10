import { Button, Form, Table } from "antd";
import Input from "antd/es/input";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";

const App: React.FC = () => {
  const [result, setResult] = useState<any>(0);

  function numberWithCommas(x: any) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
    return x;
  }

  const onFinish = (values: any) => {
    const reduce = 11000000;
    const dependent = values.QtyPeople ? Number(values.QtyPeople) * 4400000 : 0;
    const taxableIncome = Number(values.Salary)
      ? Number(values.Salary) - reduce - dependent
      : 0;

    let incomingTax = 0;

    switch (true) {
      case taxableIncome <= 5000000:
        incomingTax = taxableIncome * 0.05;
        break;
      case taxableIncome > 5000000 && taxableIncome <= 10000000:
        incomingTax = taxableIncome * 0.1 - 250000;
        break;
      case taxableIncome > 10000000 && taxableIncome <= 18000000:
        incomingTax = taxableIncome * 0.15 - 750000;
        break;
      case taxableIncome > 18000000 && taxableIncome <= 32000000:
        incomingTax = taxableIncome * 0.2 - 1650000;
        break;
      case taxableIncome > 32000000 && taxableIncome <= 52000000:
        incomingTax = taxableIncome * 0.25 - 3250000;
        break;
      case taxableIncome > 52000000 && taxableIncome <= 80000000:
        incomingTax = taxableIncome * 0.3 - 5850000;
        break;
      case taxableIncome > 80000000:
        incomingTax = taxableIncome * 0.35 - 9850000;
        break;
      default:
        break;
    }

    setResult(incomingTax < 0 ? 0 : incomingTax);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const columns: ColumnsType<any> = [
    {
      title: "Bậc",
      dataIndex: "Idx",
      key: "Idx",
    },
    {
      title: "Thu nhập tháng",
      dataIndex: "Salary",
      key: "Salary",
    },
    {
      title: "Số thuế phải nộp",
      dataIndex: "SalaryRequired",
      key: "SalaryRequired",
    },
  ];

  const data: any[] = [
    {
      Salary: "TN <= 5tr",
      SalaryRequired: "TN x 5%",
    },
    {
      Salary: "5tr < TN <= 10tr",
      SalaryRequired: "TN x 10% - 0.25tr",
    },
    {
      Salary: "10tr < TN <= 18tr",
      SalaryRequired: "TN x 15% - 0.75tr",
    },
    {
      Salary: "18tr < TN <= 32tr",
      SalaryRequired: "TN x 20% - 1.65tr",
    },
    {
      Salary: "32tr < TN <= 52tr",
      SalaryRequired: "TN x 25% - 3.25tr",
    },
    {
      Salary: "52tr < TN <= 80tr",
      SalaryRequired: "TN x 30% - 5.85tr",
    },
    {
      Salary: "TN > 80tr",
      SalaryRequired: "TN x 35% - 9.85tr",
    },
  ];

  return (
    <div style={{ padding: 10 }}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ width: 600 }}
        initialValues={{ Salary: 0, QtyPeople: 0 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Thu nhập tháng"
          name="Salary"
          rules={[
            { required: true, message: "Vui lòng nhập !" },
            {
              validator: async (_, value: any) => {
                if (value && !new RegExp(/^[0-9]+$/).test(value)) {
                  return Promise.reject(new Error(`Vui lòng chỉ nhập số!`));
                }
              },
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Số người phụ thuộc"
          name="QtyPeople"
          rules={[
            {
              validator: async (_, value: any) => {
                if (value && !new RegExp(/^[0-9]+$/).test(value)) {
                  return Promise.reject(new Error(`Vui lòng chỉ nhập số!`));
                }
              },
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <h1>Thuế thu nhập cá nhân : {numberWithCommas(Math.round(result))}đ</h1>
      <Table
        columns={columns}
        dataSource={data.map((item: any, index: number) => {
          return {
            ...item,
            Idx: index + 1,
          };
        })}
      />
    </div>
  );
};

export default App;
