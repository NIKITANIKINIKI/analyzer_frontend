import Header from "./components/Header";
import Container from "@mui/material/Container";
import { Routes, Route } from "react-router";
import React from "react";
import { fetchMe } from "./redux/slice/auth";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";

import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Loading from "./pages/Loading";
import Files from "./pages/Files";
import AnalyzeFail from "./pages/AnalyzeFail";

const App = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    console.log(dispatch(fetchMe()));
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route element={<Registration />} path="/register"></Route>
          <Route element={<Login />} path="/login"></Route>
          <Route element={<Loading />} path="/loading"></Route>
          <Route element={<Files />} path="/files"></Route>
          <Route element={<AnalyzeFail />} path="/files/:id"></Route>
        </Routes>
      </Container>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </>
  );
};

export default App;
