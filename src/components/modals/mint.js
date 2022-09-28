import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { create } from "ipfs-http-client";
import { Buffer } from "buffer";
// import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  p: 2,
};

export default function Mint(props) {
  console.log(props, "prop");
  // const [hash, setHash] = useState("");

  return (
    <div>
      <Modal
        open={props.openModalprop}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 1100 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>city</TableCell>
                  <TableCell align="right">Company Status</TableCell>
                  <TableCell align="right">Data Source</TableCell>
                  <TableCell align="right">External Code</TableCell>
                  <TableCell align="right">Raw Address</TableCell>
                  <TableCell align="right">Raw name</TableCell>
                  <TableCell align="right">Street</TableCell>
                  <TableCell align="right">zip</TableCell>
                  <TableCell align="right">Mint</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props?.userData?.data?.data?.companySearch?.results.map(
                  (row) => (
                    <TableRow
                      key={row.externalCode}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.city ? row.city : "-"}
                      </TableCell>
                      <TableCell align="right">
                        {row.companyStatus ? row.companyStatus : "-"}
                      </TableCell>
                      <TableCell align="right">
                        {row.dataSource ? row.dataSource : "-"}
                      </TableCell>
                      <TableCell align="right">
                        {row.externalCode ? row.externalCode : "-"}
                      </TableCell>
                      <TableCell align="right">
                        {row.rawAddress ? row.rawAddress : "-"}
                      </TableCell>
                      <TableCell style={{ maxWidth: 150 }} align="right">
                        {row.rawname ? row.rawname : "-"}
                      </TableCell>
                      <TableCell align="right">
                        {row.street ? row.street : "-"}
                      </TableCell>
                      <TableCell align="right">
                        {row.zip ? row.zip : "-"}
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          onClick={(event) => handleClick(event, row)}
                          size="small"
                          variant="contained"
                        >
                          Mint
                        </Button>
                      </TableCell>
                      {/* <TableCell align="right">
                        <Button
                          onClick={(event) => getData(event, hash)}
                          size="small"
                          variant="contained"
                        >
                          get
                        </Button>
                      </TableCell> */}
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
    </div>
  );

  async function ipfsClient() {
    const auth =
      "Basic " +
      Buffer.from(
        "2Enxphk1YByncjR1iwb0W1uMW3C" + ":" + "ec4103b345afe31e230bedde4b66aa90"
      ).toString("base64");
    const ipfs = create({
      host: "ipfs.infura.io",
      port: 5001,
      protocol: "https",
      headers: {
        authorization: auth,
      },
    });
    return ipfs;
  }

  async function handleClick(event, data) {
    console.log(event, data);
    let ipfs = await ipfsClient();
    let result = await ipfs.add(JSON.stringify(data));
    // setHash(result.path);
    console.log(result.path);
  }

  // async function getData(event, hash) {
  //   console.log(event, hash);
  //   let ipfs = await ipfsClient();
  //   let asyncitr = ipfs.cat(hash);
  //   for await (const itr of asyncitr) {
  //     let data = Buffer.from(itr).toString();
  //     console.log(data, "get Data");
  //   }
  // }
}
