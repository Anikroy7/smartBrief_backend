import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./routes";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/", router);


app.use(
    cors({
        credentials: true,
    }),
)



app.get('/', (req: Request, res: Response) => {
    res.json({ message: "Smart brief server run successfully!!" });
});




//Global middleware
app.use(globalErrorHandler);



export default app;
