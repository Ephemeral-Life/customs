import React, { useEffect, useState } from 'react';
import './css/main.css';
import { Button, Col, Form, Layout, Popconfirm, Row, Select, Statistic, Table, message, theme, Input } from 'antd';
import { Header } from 'antd/es/layout/layout';
import CountUp from 'react-countup';
import { valueType } from 'antd/es/statistic/utils';
import { useApolloClient } from '@apollo/client';
import { deleteSensitiveRuleById, getAllSensitiveRules, getAllSensitiveRulesBySensitive_rules_detail, createSensitiveRule, changeSensitiveRule } from 'mutations';
type sensitive_rules_record = {
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
  const [messageApi, contextHolder] = message.useMessage();
  const [isVisible, setIsVisible] = useState(false);
  const [sensitive_rules_name, setSensitive_rules_name] = useState("");
  const [sensitive_rules_detail, setSensitive_rules_detail] = useState("");
  const [sensitive_rules_content, setSensitive_rules_content] = useState("");
  const [changeRuleFlag, setChangeRuleFlag] = useState(false);
  const [changeRuleID, setChangeRuleID] = useState(0);
  const handleShowContent = () => {
    setIsVisible(true);
  };
  const handleHideContent = () => {
    setIsVisible(false);
    setSensitive_rules_content('')
    setSensitive_rules_detail('')
    setSensitive_rules_name('')
  };
  const handleShowCreateRuleContent = () => {
    setChangeRuleFlag(false)
    setSensitive_rules_content("")
    setSensitive_rules_detail("")
    setSensitive_rules_name("")
    handleShowContent()
  }
  const handleEdit = (record: sensitive_rules_record) => {
    setChangeRuleFlag(true)
    handleShowContent()
    setSensitive_rules_content(record.sensitive_rules_content)
    setSensitive_rules_detail(record.sensitive_rules_detail)
    setSensitive_rules_name(record.sensitive_rules_name)
    setChangeRuleID(record.id)
  }

  const handleDelete = async (record: sensitive_rules_record) => {
    try {
      await client.mutate({
        mutation: deleteSensitiveRuleById,
        variables: { id: record.id },
      });
      console.log('成功删除');
    } catch (error) {
      console.error('失败了：', error);
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
      title: '敏感规则内容',
      dataIndex: 'sensitive_rules_content',
      key: 'sensitive_rules_content',
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
            onConfirm={() => confirm(record)}
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
    if (values.filter === "全部")
      fetchData()
    else {
      try {
        const { data } = await client.query({
          query: getAllSensitiveRulesBySensitive_rules_detail,
          variables: { sensitive_rules_detail: values.filter }
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
  useEffect(() => {
    form.setFieldsValue({
      sensitive_rules_name,
      sensitive_rules_detail,
      sensitive_rules_content
    });
  }, [sensitive_rules_name, sensitive_rules_detail, sensitive_rules_content]);
  
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const formatter = (value: valueType) => <CountUp end={Number(value)} separator="," />;

  type LayoutType = Parameters<typeof Form>[0]['layout'];
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');
  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };
  const formItemLayout =
    formLayout === 'horizontal' ? { labelCol: { span: 8 }, wrapperCol: { span: 14 } } : null;
  const buttonItemLayout =
    formLayout === 'horizontal' ? { wrapperCol: { span: 0, offset: 0 } } : null;

  const createRule = async (values: any) => {
    const info = (info: string) => {
      messageApi.info(info);
    };
    try {
      const { data } = await client.mutate({
        mutation: createSensitiveRule,
        variables: values,
      });
      const newRule = data.createSensitiveRule;
      if(newRule === undefined || Object.keys(newRule).length === 0) {
        info('失败了');
      }
      else {
        window.location.reload();
        info('成功添加1条新纪录');
      }
    } catch (error) {
      info('失败了');
      console.error('失败了：', error);
    }
  }

  const changeRule = async (values: any) => {
    const info = (info: string) => {
      messageApi.info(info);
    };
    const test = {
      ...values,
      id: changeRuleID
    }
    console.log(test)
    try {
      console.log(changeRuleID)
      const { data } = await client.mutate({
        mutation: changeSensitiveRule,
        variables: {
          ...values,
          id: changeRuleID
        },
      });
      const changeRule = data.changeSensitiveRule;
      if(changeRule === undefined || Object.keys(changeRule).length === 0) {
        info('失败了');
      }
      else {
        window.location.reload();
        info('成功修改1条纪录');
      }
    } catch (error) {
      info('失败了');
      console.error('失败了：', error);
    }
  }

  const handleSubmit = async (values: any) => {
    if(changeRuleFlag)
      changeRule(values)
    else
      createRule(values)
  }
  return (
    <div className='sensitive_rules_content'>
      {contextHolder}
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button type="primary" className='add_rules' onClick={handleShowCreateRuleContent}>添加敏感规则</Button>
        </Header>
        <hr />
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
            maxHeight: '75vh',
            background: colorBgContainer,
          }}
        >
          <Table dataSource={dataSource} columns={columns} />
        </Content>
        {isVisible && (
          <Content
            className='InputFormLayout'
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 85,
              background: colorBgContainer,
            }}>
            <Form
              {...formItemLayout}
              layout={"inline"}
              form={form}
              initialValues={{ 
                layout: formLayout,
                sensitive_rules_name: sensitive_rules_name,
                sensitive_rules_detail: sensitive_rules_detail,
                sensitive_rules_content: sensitive_rules_content,
              }}
              onValuesChange={onFormLayoutChange}
              style={{ maxWidth: 1100 }}
              onFinish={handleSubmit}
              
            >
              <Form.Item label="敏感规则名称" name="sensitive_rules_name">
                <Input placeholder="规则名称"/>
              </Form.Item>
              <Form.Item label="所属行业详情" name="sensitive_rules_detail">
                <Input placeholder="所属行业"/>
              </Form.Item>
              <Form.Item label="敏感规则内容" name="sensitive_rules_content">
                <Input placeholder="规则内容"/>
              </Form.Item>
              <Form.Item {...buttonItemLayout}>
                <Button type="primary" htmlType="submit">提交</Button>
              </Form.Item>
              <Form.Item {...buttonItemLayout}>
                <Button type="dashed" onClick={handleHideContent}>隐藏</Button>
              </Form.Item>
            </Form>
          </Content>
        )}
      </Layout>
    </div>
  );
};

export default Sensitive_rules_content;