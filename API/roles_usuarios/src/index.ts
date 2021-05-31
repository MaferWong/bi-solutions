import "reflect-metadata";
import * as express from "express";
import {Request, Response} from "express";
import {createConnection, Connection} from "typeorm";
import * as cors from 'cors';
import * as helmet from 'helmet';
import routes from './routes';

const PORT = process.env.PORT || 3000;

createConnection().then(async () => {

    // create express app
    const app = express();

    app.use(cors());
    app.use(helmet());

    app.use(express.json());

    app.use('/', routes);
    // start express server
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

}).catch(error => console.log(error));
