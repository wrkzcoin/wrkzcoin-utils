"use strict";
// Copyright (c) 2018-2020, Brandon Lehmann, The TurtleCoin Developers
// Copyright (c) 2026, The WrkzCoin Developers
//
// Please see the included LICENSE file for more information.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.HTTPClient = void 0;
const http = __importStar(require("http"));
const https = __importStar(require("https"));
const util_1 = require("util");
const abort_controller_1 = require("abort-controller/dist/abort-controller");
/** @ignore */
const packageInfo = require('../../package.json');
/** @ignore */
class HTTPClient {
    constructor(host = '127.0.0.1', port = 11898, timeout = 30000, ssl = false, userAgent = util_1.format('%s/%s', packageInfo.name, packageInfo.version), keepAlive = true, apiKey, errorHandler) {
        this.m_host = host;
        this.m_port = port;
        this.m_timeout = timeout;
        this.m_proto = (ssl) ? 'https' : 'http';
        this.m_userAgent = userAgent;
        this.m_keepAlive = keepAlive;
        if (apiKey)
            this.m_key = apiKey;
        if (errorHandler)
            this.m_errorHandler = errorHandler;
        if (this.ssl) {
            this.m_agent = new https.Agent({
                rejectUnauthorized: false,
                keepAlive: this.keepAlive
            });
        }
        else {
            this.m_agent = new http.Agent({
                keepAlive: this.keepAlive
            });
        }
    }
    get host() {
        return this.m_host;
    }
    get keepAlive() {
        return this.m_keepAlive;
    }
    get key() {
        return this.m_key;
    }
    get port() {
        return this.m_port;
    }
    get protocol() {
        return this.m_proto;
    }
    get ssl() {
        return (this.protocol === 'https');
    }
    get userAgent() {
        return this.m_userAgent;
    }
    get agent() {
        return this.m_agent;
    }
    get timeout() {
        return this.m_timeout;
    }
    get headers() {
        const headers = {
            Accept: 'application/json',
            'Content-type': 'application/json',
            'User-Agent': this.userAgent
        };
        if (this.key) {
            headers['X-API-KEY'] = this.key;
        }
        return headers;
    }
    delete(endpoint) {
        return __awaiter(this, void 0, void 0, function* () {
            const controller = new abort_controller_1.AbortController();
            const timeout = setTimeout(() => controller.abort(), this.m_timeout);
            const response = yield fetch(this.url(endpoint), {
                headers: this.headers,
                agent: this.agent,
                method: 'delete',
                signal: controller.signal
            });
            clearTimeout(timeout);
            if (!response.ok) {
                if (this.m_errorHandler) {
                    const body = yield response.json();
                    throw this.m_errorHandler(response.status, body.error);
                }
                else {
                    throw new Error(response.statusText);
                }
            }
        });
    }
    get(endpoint) {
        return __awaiter(this, void 0, void 0, function* () {
            const controller = new abort_controller_1.AbortController();
            const timeout = setTimeout(() => controller.abort(), this.m_timeout);
            const response = yield fetch(this.url(endpoint), {
                headers: this.headers,
                agent: this.agent,
                method: 'get',
                signal: controller.signal
            });
            clearTimeout(timeout);
            const body = yield response.json();
            if (response.ok) {
                return body;
            }
            else {
                if (this.m_errorHandler) {
                    throw this.m_errorHandler(response.status, body.error);
                }
                else {
                    throw new Error(response.statusText);
                }
            }
        });
    }
    post(endpoint, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const controller = new abort_controller_1.AbortController();
            const timeout = setTimeout(() => controller.abort(), this.m_timeout);
            const response = yield fetch(this.url(endpoint), {
                headers: this.headers,
                agent: this.agent,
                method: 'post',
                body: JSON.stringify(body || {}),
                signal: controller.signal
            });
            clearTimeout(timeout);
            let responseBody;
            try {
                responseBody = yield response.json();
            }
            catch (e) { }
            if (response.ok) {
                return responseBody;
            }
            else {
                if (this.m_errorHandler) {
                    throw this.m_errorHandler(response.status, responseBody.error);
                }
                else {
                    throw new Error(response.statusText);
                }
            }
        });
    }
    put(endpoint, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const controller = new abort_controller_1.AbortController();
            const timeout = setTimeout(() => controller.abort(), this.m_timeout);
            const response = yield fetch(this.url(endpoint), {
                headers: this.headers,
                agent: this.agent,
                method: 'put',
                body: JSON.stringify(body || {}),
                signal: controller.signal
            });
            clearTimeout(timeout);
            let responseBody;
            try {
                responseBody = yield response.json();
            }
            catch (e) { }
            if (response.ok) {
                return responseBody;
            }
            else {
                if (this.m_errorHandler) {
                    throw this.m_errorHandler(response.status, responseBody.error);
                }
                else {
                    throw new Error(response.statusText);
                }
            }
        });
    }
    rpcPost(method, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = {
                jsonrpc: '2.0',
                method: method,
                params: params
            };
            const response = yield this.post('json_rpc', body);
            if (response.error) {
                throw new Error(response.error.message);
            }
            return response.result;
        });
    }
    url(endpoint) {
        return util_1.format('%s://%s:%s/%s', this.protocol, this.host, this.port, endpoint);
    }
}
exports.HTTPClient = HTTPClient;
