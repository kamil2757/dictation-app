import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Alert, Card, Typography } from 'antd';
import { Button, Input } from 'shared/ui';
import { ROUTES } from 'shared/config';
import { useRegisterMutation, setCredentials } from 'entities/user';
import { useAppDispatch } from 'app/store/hooks';

const { Title, Text, Link } = Typography;

export const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const [register, { isLoading }] = useRegisterMutation();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const onFinish = async (values: any) => {
    try {
      setErrorMsg(null);
      const data = await register(values).unwrap();
      dispatch(setCredentials(data));
      navigate(ROUTES.HOME);
    } catch (err: any) {
      const message = err.data?.message || 'Ошибка регистрации';
      setErrorMsg(message);
    }
  };

  return (
    <Card style={{ maxWidth: 400, margin: '0 auto', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <Title level={3}>Регистрация</Title>
        <Text type="secondary">Создайте профиль для обучения</Text>
      </div>

      {errorMsg && (
        <Alert message={errorMsg} type="error" showIcon style={{ marginBottom: 20 }} />
      )}

      <Form layout="vertical" onFinish={onFinish} requiredMark={false} size="large">
        
        <Form.Item
          label="Имя"
          name="name"
          rules={[{ required: true, message: 'Как вас называть?' }]}
        >
          <Input placeholder="Иван" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Введите Email' }, { type: 'email' }]}
        >
          <Input placeholder="name@example.com" />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: 'Придумайте пароль' }, { min: 6, message: 'Минимум 6 символов' }]}
        >
          <Input.Password placeholder="••••••" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading} block>
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>

      <div style={{ textAlign: 'center' }}>
        <Text>Уже есть аккаунт? </Text>
        <Link onClick={() => navigate(ROUTES.LOGIN)}>Войти</Link>
      </div>
    </Card>
  );
};