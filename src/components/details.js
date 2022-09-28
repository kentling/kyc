// import "./App.css";
import "../App.css";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useState, useEffect } from "react";
import Mint from "./modals/mint";
import Autocomplete from "@mui/material/Autocomplete";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function Details() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [input, setInput] = useState({});
  const [companyData, setcompanyData] = useState();
  const [companyName, setcompanyName] = useState();
  const [payloadData, setpayloadData] = useState();
  const [searchData, setSearchData] = useState();
  const [open, setOpen] = React.useState(true);

  useEffect(() => {
    const getData = async () => {
      const cData = await axios.get(
        `http://206.189.206.60:8000/customer/Companies`
      );
      console.log(cData, "cData");
      setcompanyData(cData?.data?.data);
      let arr = [];
      let len = cData.data.data.length;
      for (var i = 0; i < len; i++) {
        arr.push({
          query: cData.data.data[i].company.entityName,
        });
      }
      setcompanyName(arr);
      setOpen(false);
    };
    getData();
  }, []);

  const handleClose = () => {
    setModalOpen(false);
  };

  // const handleChange = (event) => {
  //   const name = event.target.name;
  //   const value = event.target.value;
  //   setInputs((values) => ({ ...values, [name]: value }));
  // };

  const handleSubmit = async (event) => {
    setOpen(true);
    event.preventDefault();
    const cData = await axios.post(
      `http://206.189.206.60:8000/customer/Companies/search`,
      {
        codeiso31662: payloadData?.countryCodeISO31662,
        query: payloadData?.entityName,
        datasource: payloadData?.dataSource,
      }
    );
    setSearchData(cData);
    console.log(cData);
    if (cData) {
      setOpen(false);
      setModalOpen(!modalOpen);
    }
  };

  return (
    <div style={{ margin: "50px" }}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Card sx={{ maxWidth: 500, borderRadius: "10px", background: "fffff" }}>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              Details
            </Typography>
            <CardActions>
              <Switch label="Antoine Llorca" />
            </CardActions>
            <FormControl sx={{ m: 1, width: 400 }}>
              <InputLabel id="demo-multiple-name-label" required>
                Jurisdiction
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Jurisdiction"
                onChange={(event) => {
                  setInput(event.target.value);
                }}
                value={input || ""}
              >
                <MenuItem value="CN">China</MenuItem>
                <MenuItem value="HK">Hong Kong</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, width: 400 }}>
              <Autocomplete
                disablePortal
                options={companyName ? companyName : [{}]}
                getOptionLabel={(option) => option.query}
                clearOnEscape
                onChange={(event, newValue) => {
                  if (newValue) {
                    const filterdData = companyData.filter(
                      (res) =>
                        res?.company?.entityName
                          .toLowerCase()
                          .indexOf(newValue.query.toLowerCase()) !== -1
                    );
                    setpayloadData(filterdData[0].company);
                  }
                }}
                renderInput={(params) => (
                  <TextField required {...params} label="Company Name" />
                )}
              />
            </FormControl>
            {/* <FormControl sx={{ m: 1, width: 400 }}>
              <InputLabel id="demo-multiple-name-label" required>
                Company Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="companyType"
                value={inputs.companyType || ""}
                label="Company Type"
                onChange={handleChange}
              >
                <MenuItem value="Apple">Apple</MenuItem>
                <MenuItem value="Facebook">Facebook</MenuItem>
                <MenuItem value="Microsoft">Microsoft</MenuItem>
              </Select>
            </FormControl> */}
          </CardContent>
          <CardActions>
            <Button
              type="sumit"
              variant="outlined"
              startIcon={<SearchIcon />}
              style={{
                borderRadius: 30,
                color: "rgba(0, 0, 0, 0.6)",
                textTransform: "none",
                borderColor: "rgba(0, 0, 0, 0.6)",
                marginLeft: "12px",
              }}
            >
              Search
            </Button>
          </CardActions>
        </form>
      </Card>
      <Mint
        handleClose={handleClose}
        openModalprop={modalOpen}
        userData={searchData}
      />
    </div>
  );
}

export default Details;
