import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./routes";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
import './app/interfaces/global';
const app: Application = express();

// Middlewares

app.use(
    cors({
        credentials: true,
    }),
)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/", router);


app.get('/', (req: Request, res: Response) => {
    res.json({ message: "Smart brief server run successfully!!" });
});




//Global middleware
app.use(globalErrorHandler);



export default app;
