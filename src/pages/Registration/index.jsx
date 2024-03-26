import { TextField, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";

import styles from "./Registration.module.scss";
import { fetchRegister, selectIsAuth } from "../../redux/slice/auth";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { Navigate } from "react-router-dom";

function Registration() {
  const dispatch = useDispatch();

  // const isAuth = useSelector(selectIsAuth);

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
      return alert("There was an error during registration");
    }

    if ("access_token" in data.payload) {
      window.localStorage.setItem("access_token", data.payload.token);
    } else {
      alert("There was an error during registration");
    }

    console.log('')
  };

//   if (isAuth) {
//     return <Navigate to="/"></Navigate>;
//   }

  return (
    <Paper className={styles.content}>
      <Typography className={styles.label} variant="h5">
        Hello! Have a good day!
      </Typography>
      <div>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.forms}>
        <TextField
          {...register("fullname", { required: "Incorrect fullname" })}
          label="Your fullname"
          error={Boolean(errors.fullname?.message)}
          helperText={errors.fullname?.message}
          fullWidth
        />
        <TextField
          {...register("email", { required: "Incorrect email" })}
          type="email"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          label="Your email"
          fullWidth
        />

        <TextField
          {...register("password", { required: "Incorrect password" })}
          label="Your password"
          type="password"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          fullWidth
        />
        <TextField
          {...register("password_repeat", {
            required: "Incorrect password",
            validate: (val) =>
              val === watch("password") || "Passord don't match",
          })}
          label="Repeat the password"
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
          Sign up
        </Button>
      </form>
    </Paper>
  );
}

export default Registration;