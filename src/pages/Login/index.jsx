import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from "./Login.module.scss";
import bmstu from "../../assets/bmstu.png";
import { useForm } from "react-hook-form";
import {fetchLogin, selectIsAuth} from '../../redux/slice/auth'
import {useDispatch, useSelector} from 'react-redux'
import {Navigate} from 'react-router-dom'

function Login() {

  const isAuth=useSelector(selectIsAuth)

  const dispatch=useDispatch()
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (val) => {
    const data = await dispatch(fetchLogin(val))

    if(!data.payload){
      return alert('Failed to login')
    }

    if('access_token' in data.payload){
      window.localStorage.setItem('access_token', data.payload.access_token)
    }
    else{
      alert('An error occured in obtaining a token')
    }

    console.log('')

  };


  if(isAuth){
    return <Navigate to='/'/>
  }

  return (
    <Paper className={styles.content}>
      <img src={bmstu} className={styles.logo} alt='logo'/>
      <Typography className={styles.title} variant="h4">
        Вход в систему
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.forms}>
        <TextField
          error={Boolean(errors.email?.message)}
          label="Введите свою почту"
          helperText={errors.email?.message}
          {...register("email", { required: "Incorrect email" })}
          type='email'
          fullWidth
        />
        <TextField
          errors={Boolean(errors.password?.message)}
          label="Введите свой пароль"
          fullWidth
          helperText={errors.password?.message}
          {...register("password", { required: "Incorrect password" })}
        />
        <div className={styles.login}>
          <Typography variant="caption">
            Не удается войти? Вы забыли пароль?
          </Typography>
          <Button disabled={!isValid} type="submit" size="lg" variant="contained">
            Войти
          </Button>
        </div>
      </form>
    </Paper>
  );
}

export default Login;