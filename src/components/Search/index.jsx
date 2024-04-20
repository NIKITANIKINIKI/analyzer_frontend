import React from "react";
import {
  Box,
  Checkbox,
  FormGroup,
  FormControlLabel,
  IconButton,
  TextField,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import SearchIcon from "@mui/icons-material/Search";


const Search = () => {
  return (
    <Box sx={{display:'flex', justifyContent:'center', alignContent:'center', marginTop:'12px'}}>
        <FormGroup>
          <FormControl sx={{ width: "40ch" }}>
            <TextField
              variant="outlined"
              placeholder="Поиск по файлам"
              InputProps={{
                endAdornment: (
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
          </FormControl>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Недавние"
          />
        </FormGroup>
    </Box>
  );
};

export default Search;
