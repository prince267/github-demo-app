import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { OUTH_TOKEN } from "./config";
import "./App.css";
const { Octokit } = require("@octokit/core");

const octokit = new Octokit({
  auth: OUTH_TOKEN,
});
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

  previousPage() {
    this.setState({ pageNumber: this.state.pageNumber - 1 });
  }

  nextPage() {
    this.setState({ pageNumber: this.state.pageNumber + 1 });
  }
  async getForkedUsers() {
    const forkedUsers = await octokit.request(
      "GET /repos/{owner}/{repo}/forks",
      {
        owner: "facebook",
        repo: "react",
        per_page: 30,
        page: this.state.pageNumber,
      }
    );
    console.log("Forked users Length **** ", forkedUsers.data);
    this.setState({ forkedUsers: forkedUsers.data });
  }

  async followUser(username) {
    const response = await octokit.request("PUT /user/following/{username}", {
      username: username,
    });
    console.log("Response ***** ", response);
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
