import "./App.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import { addUser, deleteUser, updateUsername } from "./features/Users";
import { useState } from "react";
import Badge from "@mui/material/Badge";
import PersonIcon from "@mui/icons-material/Person";
import Grid from "@mui/material/Grid";

function App() {
  const userList = useSelector((state) => state.users.value);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");

  return (
    <div className="App">
      <div className="addUser">
        <Grid container spacing={2} justifyContent='center'>
          <Grid item>
            <TextField
              onChange={(e) => setName(e.target.value)}
              size="small"
              label="Name"
              color="success"
            />
            <TextField
              onChange={(e) => setUsername(e.target.value)}
              size="small"
              label="Username"
            />
            <Button
              onClick={() => {
                dispatch(
                  addUser({
                    id: userList[userList.length - 1].id + 1,
                    name,
                    username,
                  })
                );
              }}
              variant="contained"
              size="large"
              style={{ height: "40px" }}
              color="success"
            >
              Add User
            </Button>
          </Grid>
          <Grid item>
            <Badge badgeContent={userList.length} color="error" size='50px'>
              <PersonIcon color="action" />
            </Badge>
          </Grid>
        </Grid>
      </div>
      <div className="displayUsers">
        {userList.map((user) => {
          return (
            <div key={user.id}>
              {/* <h5> {user.id} </h5> */}
              <div>
                <Typography variant="h5"> {user.name} </Typography>
                <Typography variant="h6"> {user.username}</Typography>
              </div>
              <br />
              <TextField
                onChange={(e) => setNewUsername(e.target.value)}
                size="small"
                label="New Username"
              />
              <Button
                onClick={() => {
                  dispatch(
                    updateUsername({
                      id: user.id,
                      username: newUsername,
                    })
                  );
                }}
                variant="contained"
                style={{ height: "40px" }}
                size="small"
                color="secondary"
              >
                Update User
              </Button>
              <Button
                onClick={() => {
                  dispatch(deleteUser({ id: user.id }));
                }}
                variant="contained"
                color="error"
                size="small"
                style={{ height: "40px" }}
              >
                Delete User
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
