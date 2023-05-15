import { appDataSource } from "../database/typeorm/data-source";
import { app } from "./app";

appDataSource
  .initialize()
  .then(() => {
    app.listen(3000, () => console.log("Server is running!"));
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
