import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Typography, Row, Col, message } from 'antd';
import { ROUTES } from 'shared/config';
import { useCreateDictationMutation } from 'entities/dictation';
import styles from './CreateDictationForm.module.scss';

import { MainInputs,SettingsSidebar } from '../index';

const { Title } = Typography;

export const CreateDictationForm: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [createDictation, { isLoading }] = useCreateDictationMutation();

const onFinish = async (values: any) => {
    try {
      const rawWords = values.wordsString
        ?.split(',')
        .map((w: string) => w.trim())
        .filter((w: string) => w.length > 0);

      if (!rawWords || rawWords.length === 0) {
        message.error('Список слов пуст!');
        return;
      }

      const wordsObjects = rawWords.map((wordText: string) => ({
        text: wordText,
      }));

      const payload = {
        title: values.title,
        description: values.description,
        language: values.language,
        isPublic: values.isPublic,
        words: wordsObjects, 
      };
      
      console.log('Отправляем:', payload);

      await createDictation(payload).unwrap();

      message.success('Диктант успешно создан!');
      navigate(ROUTES.DICTATION_LIST);

    } catch (err) {
      console.error(err);
      message.error('Ошибка создания');
    }
  };

  return (
    <div className={styles.container}>
      <Title level={2} className={styles.pageTitle}>
        Создание диктанта
      </Title>

      <div className={styles.card}>
        <Form
          form={form} 
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ isPublic: true, language: 'ru' }}
          requiredMark={false}
          size="large"
        >
          <Row gutter={[40, 40]}>
            <Col xs={24} md={14}>
              <MainInputs form={form} isLoading={isLoading} />
            </Col>


            <Col xs={24} md={10}>
              <SettingsSidebar form={form} />
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};