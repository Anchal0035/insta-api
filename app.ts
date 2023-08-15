import express = require("express");
import connect from "./src/database/db-connect";
import {authRouter} from "./src/routes/auth-route";
import { postRouter } from "./src/routes/post-route";
import { followRouter } from "./src/routes/follow-route";
import { actionRouter } from "./src/routes/action-route";


const app = express();
app.use(express.json());
connect;

app.use("/auth",authRouter);
app.use("/upload",postRouter);
app.use("/data",followRouter);
app.use("/actionData", actionRouter);


let a="hello gcvhgvjhvjh";
console.log(a);

app.listen(4000, ()=>{
    console.log(`server started at port ${4000}`);
})