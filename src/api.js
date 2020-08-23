import { OUTH_TOKEN } from "./config";
const { Octokit } = require("@octokit/core");
const octokit = new Octokit({
  auth: OUTH_TOKEN,
});

const getForkedUsers = async (pageNumber) => {
  try {
    const forkedUsers = await octokit.request(
      "GET /repos/{owner}/{repo}/forks",
      {
        owner: "facebook",
        repo: "react",
        per_page: 30,
        page: pageNumber,
      }
    );
    return forkedUsers.data;
  } catch (err) {
    return err;
  }
};

const followUser = async (username) => {
  try {
    const response = await octokit.request("PUT /user/following/{username}", {
      username: username,
    });
    return response;
  } catch (err) {
    return err;
  }
};

export { getForkedUsers, followUser };
