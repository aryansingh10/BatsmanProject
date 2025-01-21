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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequilize_1 = __importDefault(require("../sequilize"));
class User extends sequelize_1.Model {
}
User.init({
    username: sequelize_1.DataTypes.STRING,
    birthday: sequelize_1.DataTypes.DATE
}, { sequelize: sequilize_1.default, modelName: 'user' });
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield sequilize_1.default.sync();
    const jane = yield User.create({
        username: 'aryan',
        birthday: new Date(1980, 6, 20)
    });
    console.log(jane.toJSON());
}))();
exports.default = User;
