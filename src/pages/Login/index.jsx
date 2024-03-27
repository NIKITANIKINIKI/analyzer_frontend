import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from "./Login.module.scss";
import { useForm } from "react-hook-form";
// import {fetchUser, selectIsAuth} from '../../redux/slice/login'
//import {useDispatch, useSelector} from 'react-redux'
import {Navigate} from 'react-router-dom'

function Login() {

//   const isAuth=useSelector(selectIsAuth)

  //const dispatch=useDispatch()
  
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
    // const data = await dispatch(fetchUser(val))

    // if(!data.payload){
    //   return alert('Failed to login')
    // }

    // if('token' in data.payload){
    //   window.localStorage.setItem('token', data.payload.token)
    // }
    // else{
    //   alert('An error occured in obtaining a token')
    // }

    console.log('')

  };


//   if(isAuth){
//     return <Navigate to='/'/>
//   }

  return (
    <Paper className={styles.content}>
      <Typography className={styles.title} variant="h4">
        Hello!
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.forms}>
        <TextField
          error={Boolean(errors.email?.message)}
          label="Your email"
          helperText={errors.email?.message}
          {...register("email", { required: "Incorrect email" })}
          type='email'
          fullWidth
        />
        <TextField
          errors={Boolean(errors.password?.message)}
          label="Your password"
          fullWidth
          helperText={errors.password?.message}
          {...register("password", { required: "Incorrect password" })}
        />
        <div className={styles.login}>
          <Typography variant="caption">
            Have your forgotten your password?
          </Typography>
          <Button disabled={!isValid} type="submit" size="lg" variant="contained">
            Login
          </Button>
        </div>
      </form>
    </Paper>
  );
}

export default Login;