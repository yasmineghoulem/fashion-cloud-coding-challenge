"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SERVICE_PORT = parseInt(process.env.SERVICE_PORT) || 3000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/';
const FASHION_CLOUD_DB = process.env.FASHION_CLOUD_DB || 'fashioncloud-assignment';
exports.default = {
    SERVICE_PORT,
    MONGO_URL,
    FASHION_CLOUD_DB
};
//# sourceMappingURL=index.js.map