import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Empty, Button, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { DictationCard,type Dictation } from 'entities/dictation';
import { ROUTES } from 'shared/config';
import { DeleteDictationButton } from 'features/delete-dictation';
// Можно вынести стили в модуль, но для скорости напишу инлайн или используй существующие
const { Title } = Typography;

interface DictationListWidgetProps {
  items: Dictation[];
  isLoading: boolean;
  mode: 'my' | 'public'; // Чтобы знать, какое пустое состояние показывать
}

export const DictationListWidget: React.FC<DictationListWidgetProps> = ({ 
  items, 
  isLoading, 
  mode 
}) => {
  const navigate = useNavigate();

  // 1. Если загрузка (можно красивый скелетон, но пока null или спиннер снаружи)
  if (isLoading) return null;

  // 2. Если ПУСТО
  if (items.length === 0) {
    // Сценарий А: Это мои диктанты -> Предлагаем создать
    if (mode === 'my') {
      return (
        <div style={{ 
          background: '#fff', 
          padding: 60, 
          borderRadius: 12, 
          textAlign: 'center', 
          border: '1px dashed #d9d9d9' 
        }}>
          <Title level={4} style={{ marginBottom: 24 }}>
            Здесь будут диктанты, созданные вами
          </Title>
          <Button 
            type="primary" 
            size="large" 
            icon={<PlusOutlined />}
            onClick={() => navigate(ROUTES.DICTATION_CREATE)}
          >
            Создать свой первый диктант
          </Button>
        </div>
      );
    }
    
    // Сценарий Б: Это публичные -> Просто "Ничего нет"
    return <Empty description="Ничего не найдено" />;
  }

  // 3. Если ЕСТЬ данные -> Рисуем сетку
        return (
            <Row gutter={[24, 24]}>
            {items.map((dictation) => (
                <Col 
                key={dictation.id} 
                xs={24} sm={12} md={8} lg={6} xl={6}
                >
                <DictationCard 
                    dictation={dictation} 
                    onClick={(id) => console.log('Go to game', id)}
                    
                    // === ИЗМЕНЕНИЕ ЗДЕСЬ ===
                    // Передаем кнопку в проп 'extra', а не 'actions'
                    extra={
                    mode === 'my' 
                        ? <DeleteDictationButton id={dictation.id} title={dictation.title} />
                        : undefined
                    }
                />
                </Col>
            ))}
            
            {/* ... кнопка создания ... */}
            </Row>
        );
};