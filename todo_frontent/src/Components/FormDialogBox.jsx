import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function FormDialogBox({
  open,
  onClose,
  onConfirm,
  initialValue,
}) {
  const [newName, setNewName] = useState(initialValue || "");

  const handleConfirm = () => {
    onConfirm(newName);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Stage</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter the new stage name:</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="newStageName"
          label="New Stage Name"
          type="text"
          fullWidth
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleConfirm}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
