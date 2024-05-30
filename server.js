import app from "./app/index.js";

const port = process.env.PORT || "3000";

app.listen(port, (err) => {
  if (err) {
    console.log("Error in server setup");
  } else {
    console.log(`Server is listening on port: ${port}`);
  }
});
