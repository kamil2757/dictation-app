import React, {type ReactNode } from 'react';
import { Typography } from 'antd';
import styles from './DictationFormLayout.module.scss'; // Твои стили здесь

const { Title } = Typography;

interface DictationFormLayoutProps {
  title: string;
  children: ReactNode; // Сюда мы вставим саму Форму
}

export const DictationFormLayout: React.FC<DictationFormLayoutProps> = ({ title, children }) => {
  return (
    <div className={styles.container}>
      <Title level={2} className={styles.pageTitle}>
        {title}
      </Title>

      <div className={styles.card}>
        {children}
      </div>
    </div>
  );
};