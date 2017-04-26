import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.dev';

// Initialize express server
let app = express();

// Server routes are defined here
import users from './routes/users';

// use bodyParser middleware to parse request body in JSON format
app.use(bodyParser.json());

// all requests to /api/users will be sent to our users route
app.use('/api/users', users);


// Webpack setup
const compiler = webpack(webpackConfig)

app.use(webpackMiddleware(compiler));
app.use(webpackHotMiddleware(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
}));

// Redirect all requests to our index.html for our React front end to take over
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

// Listen on port 3000
app.listen(3000, () => console.log('Running on localhost:3000'));
