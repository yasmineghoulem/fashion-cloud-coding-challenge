"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const product_1 = require("./routes/product");
const db_connector_1 = require("./db-connector");
const config_1 = require("./config");
const app = express();
const connectDatabases = () => __awaiter(void 0, void 0, void 0, function* () {
    yield db_connector_1.default.connectMongo(config_1.default.MONGO_URL + config_1.default.FASHION_CLOUD_DB);
});
const addBodyParser = () => __awaiter(void 0, void 0, void 0, function* () {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
});
// Product Routes
app.use('/products', product_1.default);
const listenPort = (PORT) => {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
};
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        yield connectDatabases();
        yield addBodyParser();
        yield listenPort(config_1.default.SERVICE_PORT);
    });
}
;
exports.default = {
    start
};
//# sourceMappingURL=index.js.map