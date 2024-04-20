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

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFiles } from "../../redux/slice/files";
import { selectAlgorithms } from "../../redux/slice/algorithms";

import noData from "../../assets/noData.png";

const Loading = () => {
  const dispatch = useDispatch();

  const algorithms = useSelector(selectAlgorithms);

  const [checked, setChecked] = React.useState(true);
  const [files, setFiles] = React.useState("");
  const [tableHeaders, setTableHeaders] = React.useState("");
  const [tableData, setTableData] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setModalText("Ваш файл успешно загружен");
    setOpen(true);
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleFileChange = (event) => {
    const file = event.target.files;

    if (
      file[0].type !==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      setModalText(
        "Неправильный формат файла, рекомендуется использовать xlsx"
      );
      setOpen(true);
      return;
    }

    setFiles(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      const fileContents = event.target.result;
      const workbook = read(fileContents, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = utils.sheet_to_json(sheet, { header: 1 });
      const sheetHeaders = parsedData[0].map((el, index) => {
        return el + "\n" + (parsedData[1][index] ? parsedData[1][index] : "");
      });
      const sheetData = parsedData.slice(2);

      setTableHeaders(sheetHeaders);
      setTableData(sheetData);

      console.log(sheetHeaders, sheetData);
    };
    reader.readAsBinaryString(file[0]);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("files", files[0]);

    setLoading(true);
    const data = dispatch(fetchFiles(formData));
    setFiles("");
    setLoading(false);

    if (data) {
      handleOpen();
      console.log(data);
    }

    setTableHeaders("");
    setTableData("");
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
        {!tableHeaders && (
        <div className={styles.nodata}>
          <img width={150} src={noData}></img>
        </div>
      )}
      </Paper>
      <BasicModal
        title={modalText}
        content=""
        open={open}
        handleClose={handleClose}
      />
      {tableHeaders && tableData && !loading && (
        <LoadedFile tableHeaders={tableHeaders} tableData={tableData} />
      )}
      
    </>
  );
};

export default Loading;
