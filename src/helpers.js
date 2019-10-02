import fs from "fs";
import uuid from "uuid";

export const auth = apiKey => (req, res, next) => {
  if (req.headers["x-api-auth"] && req.headers["x-api-auth"] === apiKey) {
    let status = 200;

    if (req.method === "POST" && req.path === "/api/fabrics") {
      if (validFabric(req.body)) {
        req.body.imgUrl = generateImgUrl(req.body.sku);
        status = 200;
      } else {
        status = 422;
      }
    }

    if (status === 200) next();
    else res.status(422).json({ errors: ["invalid fabric"] });
  } else {
    res.status(401).json({ errors: ["invalid api key"] });
  }
};

const validFabric = fabric => {
  if (typeof fabric === "undefined") return false;

  if (!fabric.sku || fabric.sku === "") return false;

  if (!fabric.description || fabric.description === "") return false;

  if (!fabric.category || fabric.category === "") return false;

  if (typeof fabric.inventory === "undefined" || fabric.inventory < 0)
    return false;

  if (typeof fabric.active === "undefined") return false;

  return true;
};

const generateImgUrl = sku =>
  `https://jhilburn.com/imageserver.ashx?w=100&h=100&s=${sku.toUpperCase()}&n=swatch.jpg`;

export const generateApiKey = () => {
  const keyFile = "./.apikey";
  let key;

  try {
    fs.accessSync(keyFile, fs.constants.R_OK);
    key = fs.readFileSync(keyFile, "utf-8");
  } catch (err) {
    console.log(
      "api key file not found or cannot be accessed. Attempting to create."
    );
    key = uuid.v4();
    fs.appendFile(keyFile, key, "utf-8", fsErr => {
      if (fsErr) console.log(`Key file cannot be created ${fsErr}`);
    });
  }

  return key;
};
