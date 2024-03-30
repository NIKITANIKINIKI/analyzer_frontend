import styles from "./Header.module.scss";
import bmstu from "../../assets/bmstu.png";
import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth, logout } from "../../redux/slice/auth";


const Header = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch=useDispatch()

  const onClickLogout=() =>{
    dispatch(logout())
    window.localStorage.removeItem('access_token')
  }

  return (
    <>
      <div className={styles.root}>
        <Link to="/">
          <img className={styles.logo} src={bmstu}></img>
        </Link>

        <Stack direction="row" spacing={2}>
          <Link to="/files">
            <Button>Файлы</Button>
          </Link>

          <Link to="/loading">
            <Button>Загрузка документов</Button>
          </Link>
          <Link to="/about">
            <Button>Подробнее</Button>
          </Link>
        </Stack>
        <div className={styles.auth}>
          {!isAuth ? (
            <>
              <Link to="/login">
                <Button>Вход</Button>
              </Link>
              <Link to="/register">
                <Button>Регистрация</Button>
              </Link>
            </>
          ): (
            <Button onClick={onClickLogout}>Выйти</Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
