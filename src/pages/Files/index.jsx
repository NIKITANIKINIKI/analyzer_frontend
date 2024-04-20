import React from "react";
import { fetchFilesData } from "../../redux/slice/files";
import { useDispatch, useSelector } from "react-redux";
import autoAnimate from '@formkit/auto-animate'

import { Box, CircularProgress, Grid, Paper } from "@mui/material";
import File from "./File";
import Search from "../../components/Search";
import { styled } from "@mui/material/styles";
import BasicDateCalendar from "./BasicDateCalendar";

const Files = () => {
  const dispatch = useDispatch();

  const files = useSelector((state) => state.files.files);
  const status = useSelector((state) => state.files.status);
  const parent=React.useRef(null)

  console.log(files);

  React.useEffect(() => {
    dispatch(fetchFilesData());
  }, []);

  React.useEffect(() => {
    if (parent.current) {
      autoAnimate(parent.current); 
    }
  }, [parent]);

  console.log(status);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    margin: theme.spacing(1),
  }));

  return (
    <Box style={{ flexGrow: 1, marginTop: "30px" }}>
      <Grid container spacing={2}>
        <Grid xs={8}>
          <Item ref={parent}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                minWidth: 275,
                gap: 2,
                marginTop: 1,
              }}
            >
              {status == "loading" ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : (
                status == "loaded" &&
                files.map((el) => (
                    <File
                      key={el.file_id}
                      filename={el.filename}
                      file_id={el.file_id}
                    />
                ))
              )}
            </Box>
          </Item>
        </Grid>
        <Grid xs={4}>
          <Item>
            <Search />
          </Item>
          <Item>
            <BasicDateCalendar />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Files;
