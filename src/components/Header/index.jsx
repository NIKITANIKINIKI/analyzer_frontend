import styles from "./Header.module.scss";
import bmstu from "../../assets/bmstu.png";
import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className={styles.root}>
        <Link to="/">
          <img className={styles.logo} src={bmstu}></img>
        </Link>

        <Stack direction="row" spacing={2}>
          <Link to='/files'>
            <Button>Файлы</Button>
          </Link>

          <Link to='/loading'>
            <Button>Загрузка документов</Button>
          </Link>
          <Link to='/about'>
            <Button>Подробнее</Button>
          </Link>
        </Stack>
        <div className={styles.auth}>
          <Link to="/login">
            <Button>Вход</Button>
          </Link>
          <Link to="/register">
            <Button>Регистрация</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
