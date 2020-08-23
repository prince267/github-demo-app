import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./App.css";
import { getForkedUsers, followUser } from "./api";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      forkedUsers: [],
      pageNumber: 1,
    };
    this.getForkedUsers = this.getForkedUsers.bind(this);
    this.followUser = this.followUser.bind(this);
  }
  componentDidMount() {
    this.getForkedUsers();
  }

  async getForkedUsers() {
    const data = await getForkedUsers(this.state.pageNumber);
    this.setState({ forkedUsers: data });
  }

  async followUser (username){
    const response = await followUser(username)
    console.log("Response is ***** ",response)
  }

  previousPage() {
    this.setState({ pageNumber: this.state.pageNumber - 1 });
  }

  nextPage() {
    this.setState({ pageNumber: this.state.pageNumber + 1 });
  }

  render() {
    return (
      <div>
        Hello World
        <div className="wrapper">
          {this.state.forkedUsers.map((data, index) => (
            <div
              style={{ display: "flex", justifyContent: "center" }}
              key={index}
            >
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={data.owner.avatar_url} />
                <Card.Body>
                  <Card.Title>{data.owner.login}</Card.Title>
                  <Card.Text>{data.description}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => {
                      this.followUser(data.owner.login);
                    }}
                  >
                    Follow
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            this.nextPage();
            this.getForkedUsers();
          }}
        >
          Next {this.state.pageNumber}
        </button>
        <button
          onClick={() => {
            this.previousPage();
            this.getForkedUsers();
          }}
        >
          Prev {this.state.pageNumber}
        </button>
      </div>
    );
  }
}

export default App;
