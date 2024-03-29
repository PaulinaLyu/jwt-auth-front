import { Button, Form, Input } from "antd";
import { useAuthStore } from "../../store/authStore";
import { useState } from "react";

type FieldType = {
  email?: string;
  password?: string;
};

const LoginForm = () => {
  const [isReg, setIsReg] = useState(true);

  const login = useAuthStore((state) => state.login);
  const registration = useAuthStore((state) => state.registration);

  const handleLinkBtn = () => {
    setIsReg((prev) => !prev);
  };

  const onFinish = (values: FieldType) => {
    debugger;
    if (values.email && values.password) {
      isReg ? registration(values.email, values.password) : login(values.email, values.password);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[{ required: true, message: "Пожалйста, введите email" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Пожалуйста, введите пароль" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 4 }}>
        <Button type="link" onClick={handleLinkBtn}>
          {isReg ? "Уже зарегистрированы?" : "Еще нет аккаунта?"}
        </Button>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          {isReg ? "Регистрация" : "Логин"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
