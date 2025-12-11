import React from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom'; 
import { Button } from 'shared/ui';
import { ROUTES } from 'shared/config';
import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { logout } from 'entities/user';
import classNames from 'classnames'; 
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuth, user } = useAppSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate(ROUTES.LOGIN);
  };

  const getLinkClass = ({ isActive }: { isActive: boolean }) => 
    classNames(styles.link, { [styles.active]: isActive });

  return (
    <header className={styles.header}>
      <Link to={ROUTES.HOME} className={styles.logo}>
        DictationApp
      </Link>

      {isAuth && (
        <nav className={styles.nav}>
          
          <NavLink to={ROUTES.DICTATION_LIST} className={getLinkClass} end>
            Библиотека
          </NavLink>

          <NavLink to={ROUTES.DICTATION_CREATE} className={getLinkClass}>
            Создать диктант
          </NavLink>

          <NavLink to={ROUTES.PROFILE || '/profile'} className={getLinkClass}>
            Мой профиль
          </NavLink>
        </nav>
      )}

      <div className={styles.actions}>
        {isAuth ? (
          <>
            <span>{user?.name || 'User'}</span>
            <Button size="large" onClick={handleLogout}>
              Выйти
            </Button>
          </>
        ) : (
          <>
            <Link to={ROUTES.LOGIN}>
              <Button size="large">Войти</Button>
            </Link>
            <Link to={ROUTES.REGISTER}>
              <Button type="primary" size="large">Регистрация</Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};