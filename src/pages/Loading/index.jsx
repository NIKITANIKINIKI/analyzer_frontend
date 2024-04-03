import {
  Button,
  Paper,
  TextField,
  MenuItem,
  Box,
  Switch,
  FormControlLabel,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SendIcon from "@mui/icons-material/Send";

import styles from "./Loading.module.scss";
import BasicModal from "../BasicModal";
import LoadedFile from "../../components/LoadedFile";
import { read, utils } from "xlsx";

import VisuallyHiddenInput from "./VisuallyHiddenInput";

import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchFiles } from "../../redux/slice/files";
import { selectAlgorithms } from "../../redux/slice/algorithms";


const Loading = () => {
  const dispatch = useDispatch();

  const algorithms=useSelector(selectAlgorithms)

  const [checked, setChecked] = React.useState(true);
  const [files, setFiles] = React.useState("");
  const [tableHeaders, setTableHeaders] = React.useState("");
  const [tableData, setTableData] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

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

    const reader = new FileReader();
    reader.onload = (event) => {
      const fileContents = event.target.result;
      const workbook = read(fileContents, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = utils.sheet_to_json(sheet, { header: 1 });
      const sheetHeaders = parsedData[0];
      const sheetData = parsedData.slice(1);

      setTableHeaders(sheetHeaders);
      setTableData(sheetData);

    };
    reader.readAsBinaryString(files[0]);

    setLoading(true);
    const data = await dispatch(fetchFiles(formData));
    setFiles("");
    setLoading(false);

    if (data) {
      handleOpen();
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
              <VisuallyHiddenInput type="file" />
            </Button>
            <Box>
              <Typography>{files && files[0].name}</Typography>
            </Box>

            <LoadingButton
              type="submit"
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
      <BasicModal
        title="Ваш файл успешно загружен"
        content=""
        open={open}
        handleClose={handleClose}
      />
      {files && (<LoadedFile tableHeaders={tableHeaders} tableData={tableData} />)}
      
    </>
  );
};

export default Loading;
