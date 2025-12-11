import React, { useState, useMemo } from 'react';
import { Typography, Spin, Segmented } from 'antd';
import { useGetDictationsQuery } from 'entities/dictation';
import { useAppSelector } from 'app/store/hooks';
import styles from './DictationListPage.module.scss';

import { DictationSidebarFilters } from 'features/dictation-filters';
import { DictationListWidget } from 'widgets/DictationList';

const { Title } = Typography;

export const DictationListPage: React.FC = () => {
  const myUserId = useAppSelector((state) => state.user.user?.id);
  const { data: allDictations, isLoading } = useGetDictationsQuery();

  const [activeTab, setActiveTab] = useState<'my' | 'public'>('my');
  const [language, setLanguage] = useState<string | null>(null);

  const filteredList = useMemo(() => {
    if (!allDictations) return [];

    return allDictations.filter((d) => {
      const isMy = d.authorId === myUserId;
      if (activeTab === 'my' && !isMy) return false;
      if (activeTab === 'public' && (!d.isPublic || isMy)) return false;
      if (language && d.language !== language) return false;
      return true;
    });
  }, [allDictations, activeTab, language, myUserId]);

  return (
    <div className={styles.pageWrapper}>
      
      <aside className={styles.sidebar}>
        <DictationSidebarFilters 
          language={language}
          onChangeLanguage={setLanguage}
        />
      </aside>

      <main className={styles.content}>
        
        <div className={styles.header}>
          <Title level={2}>Библиотека</Title>
          <Segmented
            options={[
              { label: 'Ваши диктанты', value: 'my' },
              { label: 'Пользователей', value: 'public' },
            ]}
            value={activeTab}
            onChange={(val) => setActiveTab(val as 'my' | 'public')}
            size="large"
          />
        </div>

        {isLoading ? (
          <div style={{ textAlign: 'center', marginTop: 50 }}><Spin size="large" /></div>
        ) : (
          <DictationListWidget 
            items={filteredList} 
            mode={activeTab} 
            isLoading={isLoading}
          />
        )}
      </main>

    </div>
  );
};