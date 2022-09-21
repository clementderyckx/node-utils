require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4009;

// Router Imports
const rootRouter = require(`${__dirname}/router/rootRouter.js`);


// App Config
app.use( express.json() );
app.use( express.urlencoded() );
app.use( cors() );
app.use( '/static', express.static(`${__dirname}/docs`) );

// Router declarations
app.use( '/', rootRouter );


app.listen(port, () => console.log(`Listening on port : ${port}`));
