import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./index.css";
import { getForkedUsers, followUser } from "../Api";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      forkedUsers: [],
      pageNumber: 1,
      isLoading: true,
    };
    this.getForkedUsers = this.getForkedUsers.bind(this);
    this.followUser = this.followUser.bind(this);
  }
  componentDidMount() {
    this.getForkedUsers();
  }

  async getForkedUsers(pageNumber) {
    this.setState({ isLoading: true });
    const data = await getForkedUsers(pageNumber);
    this.setState({ forkedUsers: data, isLoading: false });
  }

  async followUser(username) {
    const response = await followUser(username);
    if(response.status=== 204){
      alert(`You Followed ${username}`)
    }
    else(
      alert("Something went wrong !!!!")
    )
  }

  previousPage() {
    this.setState({ pageNumber: this.state.pageNumber - 1 });
  }

  nextPage() {
    this.setState({ pageNumber: this.state.pageNumber + 1 });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className="loaderWrapper">
          <div className="loader"></div>;
        </div>
      );
    } else {
      return (
        <div>
          <p>Page Number : {this.state.pageNumber}</p>
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
          <div className="button-container">
            <Button
              disabled={this.state.pageNumber < 2}
              style={{ margin: 20 }}
              onClick={() => {
                this.getForkedUsers(this.state.pageNumber - 1);
                this.previousPage();
              }}
            >
              Prev {"<---"}
            </Button>
            <Button
              disabled={this.state.forkedUsers.length === 0}
              style={{ margin: 20 }}
              onClick={() => {
                this.getForkedUsers(this.state.pageNumber + 1);
                this.nextPage();
              }}
            >
              Next {"--->"}
            </Button>
          </div>
        </div>
      );
    }
  }
}

export default App;
