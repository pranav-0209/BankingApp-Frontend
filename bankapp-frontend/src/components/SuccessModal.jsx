import React from "react";
import { Dialog, DialogContent, IconButton, Typography, Fade } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./SuccessModal.css";

const AnimatedCheckmark = () => (
  <svg
    className="animated-checkmark"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 52 52"
    width={90}
    height={90}
  >
    <circle
      className="checkmark-circle"
      cx="26"
      cy="26"
      r="25"
    />
    <path
      className="checkmark-check"
      fill="none"
      stroke="#4caf50"
      strokeWidth="4"
      strokeLinecap="round"
      d="M14.1 27.2l7.1 7.2 16.7-16.8"
    />
  </svg>
);

const SuccessModal = ({ message, open, onClose }) => (
  <Dialog
    open={open}
    onClose={onClose}
    TransitionComponent={Fade}
    PaperProps={{
      style: {
        borderRadius: 16,
        padding: "32px 24px",
        textAlign: "center",
        minWidth: 320,
      },
      elevation: 6,
    }}
  >
    <IconButton
      aria-label="close"
      onClick={onClose}
      sx={{ position: "absolute", right: 12, top: 12 }}
    >
      <CloseIcon fontSize="large" />
    </IconButton>
    <DialogContent>
      <AnimatedCheckmark />
      <Typography variant="h5" sx={{ mt: 2, fontWeight: 600 }}>
        Success!
      </Typography>
      <Typography variant="subtitle1" sx={{ mt: 1 }}>
        {message}
      </Typography>
    </DialogContent>
  </Dialog>
);

export default SuccessModal;