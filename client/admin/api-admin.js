/**
 * Makes POST request to API to create new user.
 * @param  {Object} props - Object containing user information to be sent to API.
 *
 * @returns {Object} - Status of whether request was successful
 *
 */
const getApplications = async (credentials, signal) => {
  try {
    let response = await fetch("/api/application/", {
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

const getUsers = async (credentials, signal) => {
  try {
    let response = await fetch("/api/application/users", {
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

const deleteUser = async (params, credentials) => {
  try {
    let response = await fetch("/api/application/deleteUser/" + params.id, {
      method: "POST",
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

const approve = async (params, credentials) => {
  try {
    let response = await fetch("/api/application/approve/" + params.id, {
      method: "POST",
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

const deny = async (params, credentials) => {
  try {
    let response = await fetch("/api/application/deny/" + params.id, {
      method: "POST",
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

export { getApplications, getUsers, deleteUser, approve, deny };
