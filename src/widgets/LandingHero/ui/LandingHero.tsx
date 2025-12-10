import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'shared/ui';
import { ROUTES } from 'shared/config';
import { useAppSelector } from 'app/store/hooks';
import styles from './LandingHero.module.scss';

export const LandingHero: React.FC = () => {
  const navigate = useNavigate();
  const isAuth = useAppSelector((state) => state.user.isAuth);

  const handleStart = () => {
    if (isAuth) {
      navigate(ROUTES.DICTATION_LIST);
    } else {
      navigate(ROUTES.LOGIN);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Мини-диктанты Слов
        </h1>
        <p className={styles.description}>
          Тренируй правописание через диктанты, созданные специально под тебя. 
          Загружай свои слова, слушай их в случайном порядке и проверяй, 
          насколько правильно пишешь.
        </p>
        
        <Button 
          type="primary" 
          size='large'
          className={styles.button} 
          onClick={handleStart}
        >
          начать
        </Button>
      </div>

      <div className={styles.imageWrapper}>
      </div>
    </section>
  );
};