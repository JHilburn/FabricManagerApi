import { create, defaults, router, bodyParser } from "json-server";
import helmet from "helmet";
import path from "path";
import { auth, generateApiKey } from "./helpers";

const server = create();
const middlewares = defaults();
const apiRouter = router(path.join(__dirname, "db.json"));
const port = process.env.PORT || 3000;
const apiKey = generateApiKey();

server.use(middlewares);
server.use(helmet());
server.use(bodyParser);
server.use(auth(apiKey));

server.use("/api", apiRouter);
server.listen(port, () => {
  console.log(
    `API Server is running on port ${port}. Your api key is ${apiKey}`
  );
});

export default server;
