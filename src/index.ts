import express , {Express  , Request , Response} from "express"
import {router as userRoute} from "./routes/userRoute"
import {router as todoRoutes} from "./routes/todoRoutes";
const app : Express = express();
app.use(express.json());

app.use("/api/v1" , userRoute);
app.use("/api/v1"  , todoRoutes);
app.listen(8080 , () => {
    console.log("connect to localhost : 8080");
})

