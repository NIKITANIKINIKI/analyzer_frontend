import {
  Button,
  Paper,
  TextField,
  MenuItem,
  Box,
  Switch,
  FormControlLabel,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import React from "react";

import { styled } from "@mui/material/styles";
import styles from "./Loading.module.scss";

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
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Paper className={styles.root}>
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
        >
          Загрузка
          <VisuallyHiddenInput type="file" />
        </Button>
        <Button variant="contained" disabled={true}>
          Отправить
        </Button>
      </Box>
    </Paper>
  );
};

export default Loading;
