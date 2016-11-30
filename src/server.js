import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import config from './config';
import favicon from 'serve-favicon';
import compression from 'compression';
import path from 'path';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import Html from './helpers/Html';
import PrettyError from 'pretty-error';
import http from 'http';
import bodyParser from 'body-parser';
import Spreadsheet from 'edit-google-spreadsheet';

import { match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';
import createHistory from 'react-router/lib/createMemoryHistory';
import { Provider } from 'react-redux';
import getRoutes from './routes';

const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));

app.use(Express.static(path.join(__dirname, '..', 'static')));

app.post('/premium-submit', (req, res) => {
  const company = req.body.company;
  const email = req.body.email;
  const feature = req.body.feature;

  Spreadsheet.load({
    debug: false,
    spreadsheetId: process.env.PREMIUM_SPREADSHEET_ID,
    worksheetId: process.env.PREMIUM_WORKSHEET_ID,
    oauth: {
      email: process.env.PREMIUM_EMAIL,
      keyFile: process.env.PREMIUM_KEY_FILE,
    }
  }, (err, spreadsheet) => {
    if (err) {
      res.status(500).send();
      return;
    }
    spreadsheet.receive((receiveErr, rows, info) => {
      if (receiveErr) {
        res.status(500).send();
        return;
      }

      spreadsheet.addVal(email, info.nextRow, 1);
      spreadsheet.addVal(company, info.nextRow, 2);
      spreadsheet.addVal(feature, info.nextRow, 3);

      spreadsheet.send(sendErr => {
        if (sendErr) {
          res.status(500).send();
          return;
        }

        res.status(204).send();
      });
    });
  });
});

app.use((req, res) => {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }
  const client = new ApiClient(req);
  const memoryHistory = createHistory(req.originalUrl);
  const store = createStore(memoryHistory, client);
  const history = syncHistoryWithStore(memoryHistory, store);

  function hydrateOnClient() {
    const html = ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store} />);
    res.send(`<!doctype html>\n${html}`);
  }

  if (__DISABLE_SSR__) {
    hydrateOnClient();
    return;
  }

  match({ history, routes: getRoutes(store), location: req.originalUrl }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      console.error('ROUTER ERROR:', pretty.render(error));
      res.status(500);
      hydrateOnClient();
    } else if (renderProps) {
      loadOnServer({ ...renderProps, store, helpers: { client } }).then(() => {
        const component = (
          <Provider store={store} key="provider">
            <div><ReduxAsyncConnect {...renderProps} /></div>
          </Provider>
        );

        res.status(200);

        global.navigator = { userAgent: req.headers['user-agent'] };

        const html = ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} store={store} />);
        res.send(`<!doctype html>\n${html}`);
      });
    } else {
      res.status(404).send('Not found');
    }
  });
});

if (config.port) {
  server.listen(config.port, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> ✅  %s is running, talking to API server on %s.', config.app.title, config.apiPort);
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
