const jsonServer = require('json-server');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const path = require('path');
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const port = process.env.PORT || 3000;

const isAuthorized = req => {
  if(req.headers["x-api-auth"]){
    return req.headers["x-api-auth"] === "F1467AA76C4776F69D165BD598812";
  }

  return false;
};

const validFabric = fabric => {
  if(typeof fabric === "undefined")
    return false;

  if(!fabric.sku || fabric.sku === "")
    return false;

  if(!fabric.description || fabric.description === "")
    return false;

  if(!fabric.category || fabric.category === "")
    return false;

  if(typeof fabric.inventory === "undefined" || fabric.inventory < 0)
    return false;

  if(typeof fabric.active === "undefined")
    return false;

  return true;
};

const generateImgUrl = sku => `https://jhilburn.com/imageserver.ashx?w=100&h=100&s=${sku.toUpperCase()}&n=swatch.jpg`;

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (isAuthorized(req)) {
    let status = 200;

    if(req.method === "POST" && req.path === "/api/fabrics"){
      if(validFabric(req.body)){
        req.body.imgUrl = generateImgUrl(req.body.sku);
        status = 200;
      } else{
        status = 400;
      }
    }

    if(status === 200)
      next();
    else
      res.status(400).send('invalid fabric');
  } else {
    res.sendStatus(401);
  }
});

server.use('/api', router);
server.listen(port, () => {
  console.log(`API Server is running on port ${port}`);
});