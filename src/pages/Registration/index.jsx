import { TextField, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";

import styles from "./Registration.module.scss";
import bmstu from "../../assets/bmstu.png";
import { fetchRegister, selectIsAuth } from "../../redux/slice/auth";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { Navigate } from "react-router-dom";

function Registration() {
  const dispatch = useDispatch();

  const isAuth = useSelector(selectIsAuth);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      fullname: "",
      password_repeat:''
    },
  });

  const onSubmit = async (val) => {
    const data = await dispatch(fetchRegister(val));

    if (!data.payload) {
      return alert("Произошла ошибка во время регистрации");
    }

    if ("access_token" in data.payload) {
      window.localStorage.setItem("access_token", data.payload.access_token);
    } else {
      alert("Произошла ошибка во время регистрации");
    }

  };

  if (isAuth) {
    return <Navigate to="/"></Navigate>;
  }

  return (
    <Paper className={styles.content}>
      <img src={bmstu} className={styles.logo} alt='logo'/>
      <Typography variant="h5">
        Регистрация в системе
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.forms}>
        <TextField
          {...register("fullname", { required: "Некоректное имя" })}
          label="Ваше имя"
          error={Boolean(errors.fullname?.message)}
          helperText={errors.fullname?.message}
          fullWidth
        />
        <TextField
          {...register("email", { required: "Некорректная почта" })}
          type="email"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          label="Ваша почта"
          fullWidth
        />

        <TextField
          {...register("password", { required: "Некорректный пароль" })}
          label="Ваш пароль"
          type="password"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          fullWidth
        />
        <TextField
          {...register("password_repeat", {
            required: "Некорректный пароль",
            validate: (val) =>
              val === watch("password") || "Passord don't match",
          })}
          label="Повторите пароль"
          type="password"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          fullWidth
        />
        <Button
          disabled={!isValid}
          type="submit"
          variant="contained"
          color="success"
        >
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
}

export default Registration;