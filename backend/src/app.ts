import cors from "cors";
import express from "express";
const app = express();
import router  from "./routes/entryRoutes";

// app.get("/", () => {
//   console.log("hello from server");
// });

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use('/api/entry',router);
export default app;
