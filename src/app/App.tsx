import React, { useEffect } from 'react';
import { Header } from 'widgets/Header';
import { Footer } from 'widgets/Footer';
import { AppRouter } from './router/AppRouter';
import './styles/index.css';

import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { useLazyGetMeQuery, setUser, logout } from 'entities/user';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.user.accessToken);

  const [triggerGetMe] = useLazyGetMeQuery();

  useEffect(() => {
    if (token) {
      triggerGetMe()
        .unwrap()
        .then((user) => {
          dispatch(setUser(user));
        })
        .catch((err) => {
          console.error('Ошибка восстановления сессии', err);
          dispatch(logout());
        });
    }
  }, [token, dispatch, triggerGetMe]);

  return (
    <div className="app-layout" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <AppRouter />
      </main>
      <Footer />
    </div>
  );
};

export default App;