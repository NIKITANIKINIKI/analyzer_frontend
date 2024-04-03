import { styled } from "@mui/material/styles";
import React from "react";


const StyledInput  = styled("input")({
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

const VisuallyHiddenInput=({...props})=>{
    return <StyledInput {...props} />;
}

export default VisuallyHiddenInput