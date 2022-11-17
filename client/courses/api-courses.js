const create = async (params, credentials, post) => {
  try {
    let response = await fetch("/api/course/new/" + params.userId, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
      body: JSON.stringify(post),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const listCourseFeed = async (credentials, signal) => {
  try {
    let response = await fetch("/api/course/courses", {
      method: "GET",
      signal: signal,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const remove = async (params, credentials) => {
  try {
    let response = await fetch("/api/course/" + params.postId, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

/**
 * Makes PUT request to add comment to posting (comment in post.controller)
 * @param  {Object} params - postID : id of post
 * @param  {Object} credentials - jwt session information for user
 * @param  {Object} comment - comment object to be added
 *
 * @returns {Object} - Object containing status response and updated comment section, error otherwise
 *
 */
const comment = async (params, credentials, comment) => {
  try {
    let response = await fetch("/api/course/comment/" + params.postId, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
      body: JSON.stringify({ comment: comment }),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

/**
 * Makes PUT request to delete comment at posting (uncomment in post.controller)
 * @param  {Object} params - postId: id of post that is to be deleted
 * @param  {Object} credentials - jwt session information for user
 * @param  {Object} comment - comment object to be deleted
 *
 * @returns {Object} - Object containing status response and updated comment section, error otherwise
 *
 */
const uncomment = async (params, credentials, comment) => {
  try {
    let response = await fetch("/api/course/uncomment/" + params.postId, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
      body: JSON.stringify({ comment: comment }),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const like = async (params, credentials) => {
  try {
    let response = await fetch("/api/course/like/" + params.postId, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const unlike = async (params, credentials) => {
  try {
    let response = await fetch("/api/course/unlike/" + params.postId, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + credentials.t,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export { listCourseFeed, create, remove, like, unlike, comment, uncomment };
