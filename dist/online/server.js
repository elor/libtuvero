"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import axios from "axios";
var config_1 = require("../config");
var _ = require("lodash");
var Server = /** @class */ (function () {
    function Server(token, options) {
        if (token === void 0) { token = ""; }
        this.token = token;
        this.config = _.extend({}, config_1.default.online.api, options);
    }
    return Server;
}());
exports.default = Server;
//# sourceMappingURL=server.js.map