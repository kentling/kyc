// import "./App.css";
import "../App.css";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import {  useState } from "react";

function Individual() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
  };
  return (
    <div style={{ margin: "50px" }}>
      <Card sx={{ maxWidth: 500, borderRadius: "10px", background: "fffff" }}>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              Details
            </Typography>

            <FormControl sx={{ m: 1, width: 400 }}>
              <TextField
                label="First (given) name(s)"
                type="text"
                required
                name="firstName"
                value={inputs.firstName || ""}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: 400 }}>
              <TextField
                label="Family name"
                type="text"
                required
                name="familyName"
                value={inputs.familyName || ""}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: 400 }}>
              <InputLabel id="demo-multiple-name-label" required>
                Nationality
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="nationality"
                value={inputs.nationality || ""}
                label="Nationality"
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, width: 400 }}>
              <TextField
                type="date"
                label="Date of Birth"
                name="dob"
                value={inputs.dob || ""}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <p>Will narrow AML screening results</p>
            </FormControl>

            <FormControl sx={{ m: 1, width: 400 }}>
              <TextField
                label="Address line 1"
                type="text"
                name="add1"
                value={inputs.add1 || ""}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: 400 }}>
              <TextField
                label="Address line 2"
                type="text"
                name="add2"
                value={inputs.add2 || ""}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: 400 }}>
              <TextField
                label="City"
                type="text"
                name="city"
                value={inputs.city || ""}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: 400 }}>
              <TextField
                label="State/Province"
                type="text"
                name="state"
                value={inputs.state || ""}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: 400 }}>
              <TextField
                label="Postcode"
                type="text"
                name="PostCode"
                value={inputs.PostCode || ""}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: 400 }}>
              <InputLabel id="demo-multiple-name-label" required>
                Country
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="country"
                value={inputs.country || ""}
                label="Country"
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, width: 400 }}>
              <FormControlLabel
                control={<Switch color="primary" />}
                label="AML name transposition"
                labelPlacement="end"
                name="AML"
                value="true"
                onChange={handleChange}
              />
            </FormControl>
          </CardContent>
          <CardActions>
            <input
              variant="outlined"
              type="submit"
              style={{
                borderRadius: 30,
                color: "rgba(0, 0, 0, 0.6)",
                textTransform: "none",
                borderColor: "rgba(0, 0, 0, 0.6)",
                marginLeft: "12px",
                height: "35px",
                width: "80px",
              }}
            />
          </CardActions>
        </form>
      </Card>
    </div>
  );
}

export default Individual;
