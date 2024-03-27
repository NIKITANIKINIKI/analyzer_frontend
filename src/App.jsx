import Header from "./components/Header";
import Container from "@mui/material/Container";
import {Routes, Route} from 'react-router'

import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Loading from "./pages/Loading";

const App = () => {
  return (
    <>
      <Header />
      <Container maxWidth='lg'>
            <Routes>
                <Route element={<Registration/>} path='/register'></Route>
                <Route element={<Login/>} path='/login'></Route>
                <Route element={<Loading/>} path='/loading'></Route>
            </Routes>
      </Container>
    </>
  );
};

export default App;
