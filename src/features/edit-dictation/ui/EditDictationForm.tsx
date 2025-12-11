import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form,  Row, Col, message, Spin } from 'antd';
import { Button } from 'shared/ui';
import { ROUTES } from 'shared/config';
import { useGetDictationByIdQuery, useUpdateDictationMutation } from 'entities/dictation';

import { MainInputs, SettingsSidebar,DictationFormLayout } from 'entities/dictation';

interface EditDictationFormProps {
  dictationId: string | number;
}

export const EditDictationForm: React.FC<EditDictationFormProps> = ({ dictationId }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  // 1. Загрузка данных
  const { data: dictation, isLoading: isFetching } = useGetDictationByIdQuery(dictationId);
  
  // 2. Мутация обновления
  const [updateDictation, { isLoading: isSaving }] = useUpdateDictationMutation();

  // 3. Заполняем форму, когда пришли данные
  useEffect(() => {
    if (dictation) {
      // Превращаем массив объектов [{text: 'word'}] в строку "word, word"
      const wordsString = dictation.words?.map((w) => w.text).join(', ') || '';

      form.setFieldsValue({
        title: dictation.title,
        description: dictation.description,
        language: dictation.language,
        isPublic: dictation.isPublic,
        wordsString: wordsString, // Подставляем строку
      });
    }
  }, [dictation, form]);

  // 4. Сохранение
  const onFinish = async (values: any) => {
    try {
      // Превращаем строку обратно в массив объектов
      const wordsArray = values.wordsString
        ?.split(',')
        .map((w: string) => w.trim())
        .filter((w: string) => w.length > 0)
        .map((text: string) => ({ text })); // { text: "word" }

      if (!wordsArray || wordsArray.length === 0) {
        message.error('Список слов пуст!');
        return;
      }

      await updateDictation({
        id: Number(dictationId),
        title: values.title,
        description: values.description,
        language: values.language,
        isPublic: values.isPublic,
        words: wordsArray,
      }).unwrap();

      message.success('Диктант обновлен!');
      navigate(ROUTES.DICTATION_LIST);

    } catch (err) {
      console.error(err);
      message.error('Ошибка сохранения');
    }
  };

  if (isFetching) {
    return <div style={{ textAlign: 'center', padding: 50 }}><Spin size="large" /></div>;
  }

  return (
    <DictationFormLayout title="Редактирование диктанта">

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
          size="large"
        >
          <Row gutter={[40, 40]}>
            {/* Левая колонка */}
            <Col xs={24} md={16}>
              {/* Переиспользуем MainInputs! */}
              <MainInputs form={form} isLoading={isSaving} />
            </Col>

            {/* Правая колонка */}
            <Col xs={24} md={8}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <SettingsSidebar form={form}  />
                
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  size="large" 
                  loading={isSaving} 
                  block
                >
                  Сохранить
                </Button>
                
                <Button onClick={() => navigate(-1)} block>
                  Отмена
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
    </DictationFormLayout>
  );
};