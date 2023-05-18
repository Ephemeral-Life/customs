import React, { useEffect, useState } from 'react';
import './css/main.css';
import { Button, Col, Form, Layout, Popconfirm, Row, Select, Statistic, Table, message, theme } from 'antd';
import { Header } from 'antd/es/layout/layout';
import CountUp from 'react-countup';
import { valueType } from 'antd/es/statistic/utils';
import { useApolloClient } from '@apollo/client';
import { deleteSensitiveRuleById, getAllSensitiveRules, getAllSensitiveRulesBySensitive_rules_detail } from 'mutations';

type sensitive_rules_record={
    id: number;
    sensitive_rules_name: string;
    sensitive_rules_detail: string;
    sensitive_rules_content: string;
    sensitive_rules_create_time: string;
}
const { Content } = Layout;

const Sensitive_rules_content: React.FC = () => {
  const [industryOptions, setIndustryOptions] = useState<string[]>([]);
  const [dataSource, setDataSource] = useState([]);
  const client = useApolloClient();

  const handleEdit = (record: sensitive_rules_record)=>{
    console.log(record)
  }

  const handleDelete = async (record: sensitive_rules_record) => {
    try {
      await client.mutate({
        mutation: deleteSensitiveRuleById,
        variables: {id: record.id},
      });
      console.log('Record deleted successfully');
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  const confirm = (record: sensitive_rules_record, e?: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    handleDelete(record);
    window.location.reload();
    message.success('删掉了');
  };
  
  const cancel = (e?: React.MouseEvent<HTMLElement>) => {
    console.log(e);
  };
  const columns = [
    {
        title: '序号',
        dataIndex: 'id',
        key: 'id',
        width: 130,
    },
    {
      title: '敏感规则名称',
      dataIndex: 'sensitive_rules_name',
      key: 'sensitive_rules_name',
      width: 255,
    },
    {
        title: '所属行业详情',
        dataIndex: 'sensitive_rules_detail',
        key: 'sensitive_rules_detail',
        width: 255,
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
      width: 255,
    },
    {
      title: '操作',
      render: (record: sensitive_rules_record) => (
        <span>
          <Button type="link" onClick={() => handleEdit(record)}>修改</Button>
          <Popconfirm
            title="删除记录"
            description="确定要删吗"
            onConfirm={()=>confirm(record)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link">删除</Button>
          </Popconfirm>
        </span>
      ),
      key: 'actions',
      width: 255,
    },
  ];

  const fetchData = async () => {
    try {
      const { data } = await client.query({
        query: getAllSensitiveRules,
      });
      const sensitiveRules = data.getAllSensitiveRules;
      const transformedData = sensitiveRules.map((item: sensitive_rules_record) => ({
        ...item,
        key: item.id.toString(),
      }));
      const industryDetails = ['全部', ...sensitiveRules.map((item: any) => item.sensitive_rules_detail)];
      setIndustryOptions(industryDetails);
      setDataSource(transformedData);
    } catch (error) {
      console.error(error);
    }
  };
  const handleFilter = async (values: any) => {
    if(values.filter === "全部")
      fetchData()
    else{
      try {
        const { data } = await client.query({
          query: getAllSensitiveRulesBySensitive_rules_detail,
          variables: {sensitive_rules_detail: values.filter}
        });
        const sensitiveRules = data.getAllSensitiveRulesBySensitive_rules_detail;
        const transformedData = sensitiveRules.map((item: sensitive_rules_record) => ({
          ...item,
          key: item.id.toString(),
        }));
        setDataSource(transformedData);
      } catch (error) {
        console.error(error);
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
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
                    onFinish={handleFilter}
                    >
                        <Form.Item label="" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} className='info_select_select' name="filter">
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