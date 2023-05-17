import React, { useEffect, useState } from 'react';
import './css/main.css';
import { Button, Col, Form, Layout, Row, Select, Statistic, Table, theme } from 'antd';
import { Header } from 'antd/es/layout/layout';
import CountUp from 'react-countup';
import { valueType } from 'antd/es/statistic/utils';
import axios from 'axios';

type sensitive_rules_record={
    id: number;
    sensitive_rules_name: string;
    sensitive_rules_detail: string;
    sensitive_rules_content: string;
    sensitive_rules_create_time: string;
}
const { Content } = Layout;

const columns = [
  {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
  },
  {
    title: '敏感规则名称',
    dataIndex: 'sensitive_rules_name',
    key: 'sensitive_rules_name',
  },
  {
      title: '所属行业详情',
      dataIndex: 'sensitive_rules_detail',
      key: 'sensitive_rules_detail',
  },
  {
      title:'敏感规则内容',
      dataIndex:'sensitive_rules_content',
      key:'sensitive_rules_content',
  },
  {
    title: '创建时间',
    dataIndex: 'sensitive_rules_create_time',
    key: 'sensitive_rules_create_time',
  },
  {
    title: '操作',
    render: (record: sensitive_rules_record) => (
      <span>
        <Button type="link" onClick={() => handleEdit(record)}>修改</Button>
        <Button type="link" onClick={() => handleDelete(record)}>删除</Button>
      </span>
    ),
    key: 'actions',
  },
];

const handleEdit = (record: sensitive_rules_record)=>{
    console.log(record)
}
const handleDelete = (record: sensitive_rules_record)=>{
    console.log(record)
}
const Sensitive_rules_content: React.FC = () => {
  const [industryOptions, setIndustryOptions] = useState<string[]>([]);
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/SensitiveRules/allSensitiveRules')
    .then(response => {
      const transformedData = response.data.map((item: sensitive_rules_record) => ({
        ...item,
        key: item.id.toString(),
        sensitive_rules_create_time: item.sensitive_rules_create_time.substring(0, 10),
      }));
      const industryDetails = response.data.map((item: any) => item.sensitive_rules_detail);
      setIndustryOptions(industryDetails);
      setDataSource(transformedData);
    })
    .catch(error => {
      console.error(error);
    });
  },[])
  
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const formatter = (value: valueType) => <CountUp end={Number(value)} separator="," />;
  return (
    <div className='sensitive_rules_content'>
        <Layout>
            <Header style={{ padding: 0, background: colorBgContainer }}>
                <Button type="primary" className='add_rules'>添加敏感规则</Button>
            </Header>
            <hr/>
            <Header style={{ padding: 0, background: colorBgContainer }}>
                <div className='header_left_div'>
                    <Row gutter={16}>
                        <Col>
                            <span className='label_count_num'>数据总数:</span>
                        </Col>
                        <Col span={30} className='count_num'>
                            <Statistic title="" value={Object.keys(dataSource).length} formatter={formatter} />
                        </Col>
                    </Row>
                </div>
                <div className='header_right_div'>
                    <Form
                    layout="inline"
                    style={{ maxWidth: 1000 }}
                    className='info_select_container'
                    >
                        <Form.Item label="" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} className='info_select_select'>
                            <Select placeholder="请选择行业详情信息">
                              {industryOptions.map((option: string) => (
                                <Select.Option key={option} value={option}>{option}</Select.Option>
                              ))}
                            </Select>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }} className='info_select_submit'>
                            <Button type="primary" htmlType="submit">
                                筛选
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Header>
            <Content
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
                background: colorBgContainer,
            }}
            >
                <Table dataSource={dataSource} columns={columns} />
            </Content>
        </Layout>
    </div>
  );
};

export default Sensitive_rules_content;