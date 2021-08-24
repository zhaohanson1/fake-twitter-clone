"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./App.css");
var Header_1 = __importDefault(require("./Header"));
// eslint-disable-next-line require-jsdoc
function App() {
    return (react_1.default.createElement("div", { className: "App" },
        react_1.default.createElement(Header_1.default, { name: "Developer" })));
}
exports.default = App;
