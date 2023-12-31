import * as cors from "cors";
import * as express from "express";
import * as bodyParser from "body-parser";

import productRoutes from "./routes/product";
import DBConnector from "./db-connector";
import Config from "./config";

const app = express();

const connectDatabases = async () => {
	await DBConnector.connectMongo(Config.MONGO_URL + Config.FASHION_CLOUD_DB);
};

const addBodyParser = async () => {
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
};

const listenPort = (PORT) => {
	app.listen(PORT, () =>
		console.log(`Server running on http://localhost:${PORT}`)
	);
};

async function start() {
	await connectDatabases();
	await addBodyParser();

	// Enable CORS for all routes
	app.use(cors());

	// Product Routes
	app.use("/products", productRoutes);

	await listenPort(Config.SERVICE_PORT);
}

export default {
	start,
};
