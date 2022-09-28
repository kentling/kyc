// import "./App.css";
import "../App.css";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Details from "./details";
import Individual from "./individual";

function Create() {
  const [entityCase, setEntityCase] = React.useState(true);
  // const [individualCase, setIndividualCase] = React.useState("false");
  const [ClickedEntity, setClickedEntity] = React.useState(true);
  const [ClickedIndividual, setClickedIndividual] = React.useState("");
  function showEntityCase() {
    setEntityCase(true);
    // setIndividualCase(false);
    setClickedEntity(true);
    setClickedIndividual(false);
  }
  function showIndividualCase(event) {
    setEntityCase(false);
    // setIndividualCase(true);
    setClickedEntity(false);
    setClickedIndividual(true);
  }
  return (
    <div>
      <div style={{ margin: "50px" }}>
        <Card sx={{ maxWidth: 500, borderRadius: "10px", background: "fffff" }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Create Case
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Choose your case type
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="outlined"
              style={{
                borderRadius: 30,
                color: "rgba(0, 0, 0, 0.6)",
                textTransform: "none",
                borderColor: ClickedEntity
                  ? "rgba(0, 0, 0, 0.6)"
                  : "rgba(0, 0, 0, 0.1)",
              }}
              onClick={showEntityCase}
            >
              Entity Case
            </Button>
            <Button
              variant="outlined"
              style={{
                borderRadius: 30,
                color: "rgba(0, 0, 0, 0.6)",
                textTransform: "none",
                borderColor: ClickedIndividual
                  ? "rgba(0, 0, 0, 0.6)"
                  : "rgba(0, 0, 0, 0.1)",
              }}
              onClick={showIndividualCase}
            >
              Individual Case
            </Button>
          </CardActions>
        </Card>
      </div>
      {entityCase ? <Details /> : <Individual />}
    </div>
  );
}

export default Create;
