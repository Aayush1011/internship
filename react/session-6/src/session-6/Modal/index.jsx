import { useContext } from "react";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { TicketContext } from "../../App";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export function BasicModal({ openModal, handleClose }) {
  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Jones Ferdinand
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Some Jones Ferdinand Things
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export function TicketModal({ openModal, handleClose }) {
  const [allTickets, setAllTickets] = useContext(TicketContext);
  const [ticketModalState, setTicketModalState] = React.useState({
    priority: "",
    customerName: "",
    ticketDetails: "",
    date: dayjs(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketModalState((previousState) => ({
      ...previousState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToPush = {
      ...ticketModalState,
      id: Math.floor(Math.random() * 1000),
      date: ticketModalState.date.format("LL"),
      ticketDetailsUpdated: "Updated 1 day ago",
      customerNameDate: `on ${dayjs().format("DD.MM.YYYY")}`,
      time: dayjs().format("LT"),
    };
    const completion = await axios.post(
      "https://my-json-server.typicode.com/aayush1011/json-server-db/tickets",
      dataToPush,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (completion) {
      setAllTickets((previousTickets) => [dataToPush, ...previousTickets]);
      handleClose();
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <Modal
          open={openModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={style}
            noValidate
            autoComplete="off"
          >
            <Stack spacing={3}>
              <TextField
                required
                id="outlined-required"
                label="Issue"
                name="ticketDetails"
                value={ticketModalState.ticketDetails}
                onChange={handleChange}
              />
              <TextField
                required
                id="outlined-required"
                label="Name"
                name="customerName"
                value={ticketModalState.customerName}
                onChange={handleChange}
              />
              <InputLabel id="demo-simple-select-label">Priority</InputLabel>
              <Select
                required
                labelId="simple-select-label"
                name="priority"
                id="simple-select"
                value={ticketModalState.priority}
                label="Priority"
                onChange={handleChange}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="normal">Normal</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Stack>
          </Box>
        </Modal>
      </div>
    </LocalizationProvider>
  );
}
