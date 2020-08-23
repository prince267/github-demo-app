import { OUTH_TOKEN, GIT_REPO, REPO_OWNER } from "../Config";
import { PER_PAGE_DATA } from "../contants";
const { Octokit } = require("@octokit/core");

// Create authentication for Api's
const octokit = new Octokit({
  auth: OUTH_TOKEN,
});

// Get all the users who forked the repository
const getForkedUsers = async (pageNumber) => {
  try {
    const forkedUsers = await octokit.request(
      "GET /repos/{owner}/{repo}/forks",
      {
        owner: REPO_OWNER,
        repo: GIT_REPO,
        per_page: PER_PAGE_DATA,
        page: pageNumber,
      }
    );
    return forkedUsers.data;
  } catch (err) {
    return [];
  }
};

// Follow Users
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
