const SERVICE_PORT: number = parseInt(process.env.SERVICE_PORT) || 3000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/';
const FASHION_CLOUD_DB = process.env.FASHION_CLOUD_DB || 'fashioncloud-assignment';
const FASHION_CLOUD_DB_TEST =  'fashioncloud-assignment-test';

export default {
    SERVICE_PORT,
    MONGO_URL,
    FASHION_CLOUD_DB,
    FASHION_CLOUD_DB_TEST
}
