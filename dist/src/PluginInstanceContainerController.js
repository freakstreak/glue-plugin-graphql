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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.PluginInstanceContainerController = void 0;
var DockerodeHelper = require("@gluestack/helpers").DockerodeHelper;
var hasuraCommand_1 = require("./helpers/hasuraCommand");
var create_dockerfile_1 = require("./create-dockerfile");
var GlobalEnv = require("@gluestack/helpers").GlobalEnv;
var defaultEnv = {
    HASURA_GRAPHQL_ENABLE_CONSOLE: "true",
    HASURA_GRAPHQL_DEV_MODE: "true",
    HASURA_GRAPHQL_ENABLED_LOG_TYPES: "startup, http-log, webhook-log, websocket-log, query-log",
    HASURA_GRAPHQL_ADMIN_SECRET: "secret",
    HASURA_GRAPHQL_JWT_SECRET: JSON.stringify({
        type: "HS256",
        key: "f7eb8518-a85e-45f1-983d-43ae8b5f92d7"
    }),
    HASURA_GRAPHQL_UNAUTHORIZED_ROLE: "anonymous"
};
var PluginInstanceContainerController = (function () {
    function PluginInstanceContainerController(app, callerInstance) {
        this.status = "down";
        this.app = app;
        this.callerInstance = callerInstance;
        this.setStatus(this.callerInstance.gluePluginStore.get("status"));
        this.setPortNumber(this.callerInstance.gluePluginStore.get("port_number"));
        this.setContainerId(this.callerInstance.gluePluginStore.get("container_id"));
    }
    PluginInstanceContainerController.prototype.getCallerInstance = function () {
        return this.callerInstance;
    };
    PluginInstanceContainerController.prototype.getFromGlobalEnv = function (key, defaultValue) {
        return __awaiter(this, void 0, void 0, function () {
            var value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, GlobalEnv.get(this.callerInstance.getName(), key)];
                    case 1:
                        value = _a.sent();
                        if (!!value) return [3, 3];
                        return [4, GlobalEnv.set(this.callerInstance.getName(), key, defaultValue)];
                    case 2:
                        _a.sent();
                        return [2, defaultValue];
                    case 3: return [2, value];
                }
            });
        });
    };
    PluginInstanceContainerController.prototype.getEnv = function () {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var env, _e, _f, _g, _i, key, _h, _j, dbEnv, _k, _l, _m, _o, key, _p, _q;
            var _r;
            return __generator(this, function (_s) {
                switch (_s.label) {
                    case 0:
                        env = {};
                        _e = defaultEnv;
                        _f = [];
                        for (_g in _e)
                            _f.push(_g);
                        _i = 0;
                        _s.label = 1;
                    case 1:
                        if (!(_i < _f.length)) return [3, 4];
                        _g = _f[_i];
                        if (!(_g in _e)) return [3, 3];
                        key = _g;
                        _h = env;
                        _j = key;
                        return [4, this.getFromGlobalEnv(key, defaultEnv[key])];
                    case 2:
                        _h[_j] = _s.sent();
                        _s.label = 3;
                    case 3:
                        _i++;
                        return [3, 1];
                    case 4:
                        _r = {};
                        return [4, ((_b = (_a = this.callerInstance) === null || _a === void 0 ? void 0 : _a.getPostgresInstance()) === null || _b === void 0 ? void 0 : _b.getConnectionString())];
                    case 5:
                        _r.HASURA_GRAPHQL_METADATA_DATABASE_URL = (_s.sent()) || null;
                        return [4, ((_d = (_c = this.callerInstance) === null || _c === void 0 ? void 0 : _c.getPostgresInstance()) === null || _d === void 0 ? void 0 : _d.getConnectionString())];
                    case 6:
                        dbEnv = (_r.PG_DATABASE_URL = (_s.sent()) || null,
                            _r);
                        _k = dbEnv;
                        _l = [];
                        for (_m in _k)
                            _l.push(_m);
                        _o = 0;
                        _s.label = 7;
                    case 7:
                        if (!(_o < _l.length)) return [3, 10];
                        _m = _l[_o];
                        if (!(_m in _k)) return [3, 9];
                        key = _m;
                        _p = env;
                        _q = key;
                        return [4, this.getFromGlobalEnv(key, dbEnv[key])];
                    case 8:
                        _p[_q] = _s.sent();
                        _s.label = 9;
                    case 9:
                        _o++;
                        return [3, 7];
                    case 10:
                        if (!env.PG_DATABASE_URL) {
                            throw new Error("Postgres instance not set");
                        }
                        return [2, env];
                }
            });
        });
    };
    PluginInstanceContainerController.prototype.getIpAddress = function () {
        return "localhost";
    };
    PluginInstanceContainerController.prototype.getDockerJson = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            var _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _b = {
                            Image: "hasura/graphql-engine",
                            WorkingDir: "/hasura"
                        };
                        _c = {};
                        _d = {};
                        _a = "8080/tcp";
                        _e = {};
                        return [4, this.getPortNumber()];
                    case 1: return [2, (_b.HostConfig = (_c.PortBindings = (_d[_a] = [
                            (_e.HostPort = (_f.sent()).toString(),
                                _e)
                        ],
                            _d),
                            _c),
                            _b.ExposedPorts = {
                                "8080/tcp": {}
                            },
                            _b.RestartPolicy = {
                                Name: "always"
                            },
                            _b)];
                }
            });
        });
    };
    PluginInstanceContainerController.prototype.getStatus = function () {
        return this.status;
    };
    PluginInstanceContainerController.prototype.getPortNumber = function (returnDefault) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve, reject) {
                        if (_this.portNumber) {
                            return resolve(_this.portNumber);
                        }
                        var ports = _this.callerInstance.callerPlugin.gluePluginStore.get("ports") || [];
                        DockerodeHelper.getPort(10880, ports)
                            .then(function (port) {
                            _this.setPortNumber(port);
                            ports.push(port);
                            _this.callerInstance.callerPlugin.gluePluginStore.set("ports", ports);
                            return resolve(_this.portNumber);
                        })["catch"](function (e) {
                            reject(e);
                        });
                    })];
            });
        });
    };
    PluginInstanceContainerController.prototype.getContainerId = function () {
        return this.containerId;
    };
    PluginInstanceContainerController.prototype.setStatus = function (status) {
        this.callerInstance.gluePluginStore.set("status", status || "down");
        return (this.status = status || "down");
    };
    PluginInstanceContainerController.prototype.setPortNumber = function (portNumber) {
        this.callerInstance.gluePluginStore.set("port_number", portNumber || null);
        return (this.portNumber = portNumber || null);
    };
    PluginInstanceContainerController.prototype.setContainerId = function (containerId) {
        this.callerInstance.gluePluginStore.set("container_id", containerId || null);
        return (this.containerId = containerId || null);
    };
    PluginInstanceContainerController.prototype.getConfig = function () { };
    PluginInstanceContainerController.prototype.up = function () {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        if (!this.callerInstance.getPostgresInstance()) {
                            throw new Error("No postgres instance attached with ".concat(this.callerInstance.getName()));
                        }
                        return [4, this.callerInstance
                                .getPostgresInstance()
                                .getConnectionString()];
                    case 1:
                        if (!(_f.sent()) ||
                            !((_a = this.callerInstance.getPostgresInstance()) === null || _a === void 0 ? void 0 : _a.getContainerController())) {
                            throw new Error("Not a valid postgres db configured with ".concat(this.callerInstance.getName()));
                        }
                        if (!(((_c = (_b = this.callerInstance
                            .getPostgresInstance()) === null || _b === void 0 ? void 0 : _b.getContainerController()) === null || _c === void 0 ? void 0 : _c.getStatus()) !== "up")) return [3, 3];
                        return [4, ((_e = (_d = this.callerInstance
                                .getPostgresInstance()) === null || _d === void 0 ? void 0 : _d.getContainerController()) === null || _e === void 0 ? void 0 : _e.up())];
                    case 2:
                        _f.sent();
                        _f.label = 3;
                    case 3:
                        if (!this.callerInstance.gluePluginStore.get("postgres_booted")) {
                            console.log("\x1b[36m");
                            console.log("Initializing graphql endpoint, waiting for postgres database...");
                            console.log("\x1b[0m");
                        }
                        return [4, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                        var _a, _b, _c;
                                        var _this = this;
                                        return __generator(this, function (_d) {
                                            switch (_d.label) {
                                                case 0:
                                                    _b = (_a = DockerodeHelper).up;
                                                    return [4, this.getDockerJson()];
                                                case 1:
                                                    _c = [_d.sent()];
                                                    return [4, this.getEnv()];
                                                case 2:
                                                    _c = _c.concat([_d.sent()]);
                                                    return [4, this.getPortNumber()];
                                                case 3:
                                                    _b.apply(_a, _c.concat([_d.sent(), this.callerInstance.getName()]))
                                                        .then(function (_a) {
                                                        var status = _a.status, containerId = _a.containerId;
                                                        _this.setStatus(status);
                                                        _this.setContainerId(containerId);
                                                        (0, hasuraCommand_1.hasuraCommand)(_this.callerInstance, "version")
                                                            .then(function () {
                                                            console.log("\x1b[35m");
                                                            console.log("You can now use these endpoint for graphql: ".concat(_this.callerInstance.getGraphqlURL()));
                                                            console.log("\x1b[0m");
                                                            _this.callerInstance.gluePluginStore.set("postgres_booted", true);
                                                            return resolve(true);
                                                        })["catch"](function (e) {
                                                            return resolve(true);
                                                        });
                                                    })["catch"](function (e) {
                                                        return reject(e);
                                                    });
                                                    return [2];
                                            }
                                        });
                                    }); }, this.callerInstance.gluePluginStore.get("postgres_booted")
                                        ? 1000
                                        : 30 * 1000);
                                    return [2];
                                });
                            }); })];
                    case 4:
                        _f.sent();
                        return [2];
                }
            });
        });
    };
    PluginInstanceContainerController.prototype.down = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                DockerodeHelper.down(this.getContainerId(), this.callerInstance.getName())
                                    .then(function () {
                                    _this.setStatus("down");
                                    _this.setContainerId(null);
                                    return resolve(true);
                                })["catch"](function (e) {
                                    return reject(e);
                                });
                                return [2];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    PluginInstanceContainerController.prototype.build = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, (0, create_dockerfile_1.generateDockerfile)(this.callerInstance.getInstallationPath())];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    return PluginInstanceContainerController;
}());
exports.PluginInstanceContainerController = PluginInstanceContainerController;
//# sourceMappingURL=PluginInstanceContainerController.js.map