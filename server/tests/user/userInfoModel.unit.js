import "../config";

import crypto from "crypto";

import {
    InternalServerError, NotFound, NotImplemented,
} from "../../errors";

import UserInfoModel from "../../components/user/UserInfoModel";

/* globals test,expect,describe,jest */

describe("As an user of \x1b[1mUser Info Model\x1b[0m when using ", () => {
    describe("\x1b[1m`getDataByUsername()`\x1b[0m should:", () => {
        test("return an error with status 500 in case of mapper error", async () => {
            const userInfoMapper = {
                getUserInfo: jest.fn().mockRejectedValue({
                    code: 500,
                    errmsg: "An error has occurred.",
                }),
            };
            const model = new UserInfoModel({
                userInfoMapper,
            });
            await expect(model.getUserInfo("userId")).rejects.toThrowError(new InternalServerError());
        });
        test("return an error with status 404 if user is not found", async () => {
            const userInfoMapper = {
                getUserInfo: jest.fn().mockRejectedValue(new NotFound()),
            };
            const model = new UserInfoModel({
                userInfoMapper,
            });
            await expect(model.getUserInfo("userId")).rejects.toThrowError(new NotFound());
        });
        test("return a custom error with status in case of mapper custom error", async () => {
            const userInfoMapper = {
                getUserInfo: jest.fn().mockRejectedValue(new NotImplemented()),
            };
            const model = new UserInfoModel({
                userInfoMapper,
            });
            await expect(model.getUserInfo("userId")).rejects.toThrowError(new NotImplemented());
        });
        test("return the data for an account", async () => {
            const userInfoMapper = {
                getUserInfo: jest.fn().mockResolvedValue({
                    firstName: "John",
                    lastName: "Doe",
                }),
            };
            const model = new UserInfoModel({
                userInfoMapper,
            });
            const userData = await model.getUserInfo("username");
            await expect(userData).toHaveProperty("firstName", "John");
            await expect(userData).toHaveProperty("lastName", "Doe");
        });
    });
});