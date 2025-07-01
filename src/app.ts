import express, { Application, Request, Response } from "express";
import cors from "cors";

const app: Application = express();

app.use(express.json());


app.use(
    cors({
        credentials: true,
    }),
)



app.get('/', (req: Request, res: Response) => {
    res.json({ message: "Smart brief server run successfully!!" });
});




export default app;
