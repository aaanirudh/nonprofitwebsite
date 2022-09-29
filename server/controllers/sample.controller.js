const test = async (req, res) => {
  try {
    return res.status("200").send("Hello world");
  } catch (err) {
    return res.status("401").json({
      error: "Could not log in",
    });
  }
};
export default {
  test,
};
