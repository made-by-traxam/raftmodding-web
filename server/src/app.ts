// noinspection HttpUrlsUsage

//@ts-ignore
import swaggerJson from '../dist/server/swagger.json';
//@ts-ignore
import { RegisterRoutes } from '../dist/server/routes';
// -------------------------------------
import { json, OptionsJson, OptionsUrlencoded, urlencoded } from 'body-parser';
import cors from 'cors';
import express, {
  Request as ExRequest,
  RequestHandler,
  Response as ExResponse,
} from 'express';
import { cfg } from './cfg';
import { errorHandler } from './handlers/errorHandler';
import {
  serveClientHandler,
  staticClientFilesMiddleware,
} from './handlers/serveClientHandler';
import { notFoundHandler } from './handlers/notFoundHandler';
import morgan from 'morgan';

export const app = express();

export const startServer = async () => {
  console.log(`⏳ starting server...`);
  const jsonOptions: OptionsJson = { limit: cfg.requestSizeLimit };
  const urlencodedOptions: OptionsUrlencoded = { extended: false };

  app.use(cors());
  app.use(morgan('dev'));
  console.log('    ✔️ bound CORS');
  app.use(json(jsonOptions) as RequestHandler);
  console.log(`    ✔️ bound json body-parser: `, jsonOptions);
  app.use(urlencoded(urlencodedOptions) as RequestHandler);
  console.log(`    ✔️ bound url-encoded: `, urlencodedOptions);

  //serve client
  app.use(staticClientFilesMiddleware);
  app.get('*', serveClientHandler);
  console.log('    ✔️ client files ready to serve');

  RegisterRoutes(app);
  console.log('    ✔️ registered routes');

  // DO NOT use error handlers before registering routes!
  app.use(notFoundHandler);
  console.log('    ✔️ bound not-found-handler');
  app.use(errorHandler);
  console.log('    ✔️ bound error-handler');

  app.listen(cfg.server.port, cfg.server.host, () => {
    console.log(
      `    📡 listening at http://${cfg.server.host}:${cfg.server.port}`,
    );
    console.log('✅ server started!');
  });
};
