import * as mongoose from "mongoose";
import DBConnector from "./db-connector";

describe("DBConnector", () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

	it("should connect to the MongoDB database", async () => {
		const mockMongoUrl = "mongodb://localhost:27017/testdb";
		const connectSpy = jest.spyOn(mongoose, "connect");

		await DBConnector.connectMongo(mockMongoUrl);

		expect(connectSpy).toHaveBeenCalledWith(mockMongoUrl);
	});

	it("should handle connection errors", async () => {
		const mockMongoUrl = "mongodb://localhost:27017/testdb";
		const mockError = new Error("Connection failed");
		const connectSpy = jest
			.spyOn(mongoose, "connect")
			.mockRejectedValue(mockError);
		const exitSpy = jest.spyOn(process, "exit").mockImplementation();

		await DBConnector.connectMongo(mockMongoUrl);

		expect(connectSpy).toHaveBeenCalledWith(mockMongoUrl);
		expect(exitSpy).toHaveBeenCalledWith(1);
	});
});
