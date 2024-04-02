import {
  Button,
  Paper,
  TextField,
  MenuItem,
  Box,
  Switch,
  FormControlLabel,
  Typography
} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SendIcon from '@mui/icons-material/Send';
import { styled } from "@mui/material/styles";
import styles from "./Loading.module.scss";
import BasicModal from "../BasicModal";

import React from "react";
import { useDispatch,  } from "react-redux";
import { fetchFiles } from "../../redux/slice/files";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const algorithms = [
  {
    value: "1",
    label: "111111",
  },
  {
    value: "2",
    label: "111111",
  },
  {
    value: "3",
    label: "111111",
  },
];

const Loading = () => {
  const dispatch = useDispatch();
  const [checked, setChecked] = React.useState(true);
  const [files, setFiles] = React.useState('');
  const [open, setOpen]=React.useState(false)
  const [loading, setLoading]=React.useState(false)


  const handleClose=()=>{
    setOpen(false)
  }

  const handleOpen=()=>{
    setOpen(true)
  }

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("files", files[0]);

    setLoading(true)
    const data = await dispatch(fetchFiles(formData));
    setFiles('')
    setLoading(false)

    if (data) {
      handleOpen()
      console.log(data);
    }

  
  };

  return (
    <>
      <Paper className={styles.root}>
        <form onSubmit={(event) => onSubmit(event)}>
          <FormControlLabel
            control={
              <Switch
                checked={checked}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label="Я знаю нужный алгоритм"
          />
          {checked && (
            <TextField
              id="outlined-select-currency"
              select
              fullWidth
              label="Выберите алгоритм"
              defaultValue=""
              helperText="Пожалуйста выберите предложенные варианты"
            >
              {algorithms.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          )}
          <Box className={styles.buttons}>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              onChange={handleFileChange}
            >
              Загрузка
              <VisuallyHiddenInput type="file"/>
              
            </Button>
            <Box>
            <Typography>
                {files && files[0].name}
          </Typography>
            </Box>
            
            <LoadingButton
            type='submit'
          size="small"
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
          disabled={!Boolean(files[0])}
        >
          <span>Отправить</span>
        </LoadingButton>
          </Box>
        </form>
      </Paper>
      <BasicModal title='Ваш файл успешно загружен' content='' open={open} handleClose={handleClose}/>
    </>
  );
};

export default Loading;
