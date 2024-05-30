import app from "../app/index.js";

const port: string = process.env.PORT || "3000";

app.listen(port, ():void =>  {
    console.log(`Server is listening on port: ${port}`);
});
