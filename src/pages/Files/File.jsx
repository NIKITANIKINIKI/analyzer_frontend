import React from "react";

import {
  Card,
  Box,
  CardContent,
  Button,
  Typography,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch} from 'react-redux'
import {fetchDeleteFile} from '../../redux/slice/files'

const File = ({ filename, file_id }) => {

  const dispatch=useDispatch()
  
  const deleteFile=()=>{
    dispatch(fetchDeleteFile(file_id))
  }

  return (
    <Card variant="outlined">
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
          {filename}
        </Typography>
        <Box sx={{ float: "right" }}>
          <Button sx={{marginRight:'5px'} } variant="outlined"  size="small">
            Открыть
          </Button>
          <Button onClick={deleteFile} variant="outlined" size="small" color="error" startIcon={<DeleteIcon />}>
            Удалить
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default File;