import { Modal, Typography, Box, Button } from "@mui/material";
import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #ECE9E9",
  borderRadius: "10px",
  p: 4,
};

const BasicModal = ({ open, handleClose, title, content }) => {
  console.log(open);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {content}
          </Typography>
            <Box sx={{textAlign: "right"}}>
              <Button onClick={handleClose} variant="contained" size="medium">
                Продолжить
              </Button>
            </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default BasicModal;
