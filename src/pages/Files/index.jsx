import React from "react";
import { fetchFilesData } from "../../redux/slice/files";
import { useDispatch, useSelector } from "react-redux";

import { Box, CircularProgress } from "@mui/material";
import File from "./File";

const Files = () => {
  const dispatch = useDispatch();

  const files = useSelector((state) => state.files.files);
  const status=useSelector((state) => state.files.status)

  console.log(files);

  React.useEffect(() => {
    dispatch(fetchFilesData());
  }, []);

  console.log(status)

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minWidth: 275,
        gap: 2,
        marginTop: 1,
      }}
    > 
      
      { status=='loading' ? (<Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress/>
    </Box>) : (status=='loaded' && files.map((el) =>(
      <File key={el.file_id} filename={el.filename} file_id={el.file_id} />
    )))}
      {}  
    </Box>
  );
};

export default Files;