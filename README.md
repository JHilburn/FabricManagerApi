## JHilburn Fabric Manager

### Task
Create a fabric management application using C# and optionally javascript that integrates with our fabric api. Features include but are not limited to:

* Display a list of available fabrics
* Add/Update fabrics
* Manage fabric inventory levels

Bonus points for any extra features you can come up with to make your application more functional.

### Setup
Make sure you have the latest version of [node js](https://nodejs.org/en/) installed.

Open a terminal window and navigate into the api directory where the project was checked out, then run `npm install`. This will insure all required node packages are installed for the project.

Once node packages are installed you can fire up the api server by running `npm start`. By default the base api endpoint is at http://localhost:3000/api

### Authentication
The api uses an api token that will be provided for access control. When making requests to the api, be sure to include the given token as a header value with the key `x-api-auth`.

### Endpoints
* [GET] /fabrics - Get a list of all fabrics
* [POST] /fabrics - Create a new fabric
* [GET] /fabrics/:id - Get a fabric by id
* [PUT] /fabrics/:id - Update fabric record
* [PATCH] /fabrics/:id - Update specifc fields of a fabric record
* [DELETE] /fabrics/:id - Delete a fabric

For GET requests to the fabric api you can sort records by appending `_sort=[field]` to the url as a query string parameter.

You can also filter by appending the field name and value you want to filter on `/fabrics?price=100`

OR 

You can append the `_like` operator `/fabrics?description_like=navy`

Add operators `_gte` or `_lte` to the request url for range filering.
`/fabrics?price_gte=50&price_lte=100`;

You can see a full list of features available by checking out the [json-server](https://github.com/typicode/json-server) documentation.

### Models
Fabric
* id [int] - Unique identifier for fabric
* sku [string] - Fabric SKU
* description [string] - Fabric description
* price [decimal] - Price of the fabric
* active [boolean] - Active flag for fabric
* category [string] - Product category
* imgUrl [string] - Fabric imgUrl (auto generated on creation)
* inventory [int] - Amount of fabric currently available
