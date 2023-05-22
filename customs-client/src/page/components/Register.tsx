import React from 'react';
import { Button, Form, Input, message} from 'antd';

import './css/login.css';
import { useApolloClient } from '@apollo/client';
import { createUserByUsernameAndPassword } from 'mutations';

interface RegisterProps {
  passData: (data: number) => void;
}

const Register: React.FC<RegisterProps> = (props) => {
  const client = useApolloClient();
  const [messageApi, contextHolder] = message.useMessage();
  const info = (info: string) => {
    messageApi.info(info);
  };
  const onFinish = async (values: any) => {
    try {
      const { data } = await client.mutate({
        mutation: createUserByUsernameAndPassword,
        variables: values,
      });
      console.log(values);
      const user = data.createUserByUsernameAndPassword;
      console.log(user);
      if(user === undefined || Object.keys(user).length === 0) {
        info('注册失败');
      }
      else {
        props.passData(2)
      }
    } catch (error) {
      info('注册失败');
      console.error(error);
    }
  };
  return (
    <div className="register">
      {contextHolder}
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        className='login-form'
        onFinish={onFinish}
      >
        <Form.Item
          label="用户名："
          name="username"
          rules={[{ required: true, message: '输入用户名!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码："
          name="password"
          rules={[{ required: true, message: '输入密码!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item label="确认密码" name="repassword" rules={[{required: true, message: ''},
          ({getFieldValue})=>({
            validator(_, value){
              if(!value || getFieldValue('password') === value){
                return Promise.resolve()
              }
              return Promise.reject("两次密码输入不一致")
            }
          })
        ]}
        >
	      <Input.Password/>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
          <Button type="primary" htmlType="submit">注册</Button>
          <Button htmlType="button" className="button_login" onClick={()=>props.passData(0)}>转登录页</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;