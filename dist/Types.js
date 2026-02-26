"use strict";
// Copyright (c) 2018-2020, The TurtleCoin Developers
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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BigInteger = exports.PortableStorageConstants = exports.WrkzCoinCrypto = void 0;
const wrkzcoin_crypto_1 = require("wrkzcoin-crypto");
const big_integer_1 = __importDefault(require("big-integer"));
exports.BigInteger = big_integer_1.default;
/** @ignore */
const WrkzCoinCrypto = new wrkzcoin_crypto_1.Crypto();
exports.WrkzCoinCrypto = WrkzCoinCrypto;
/** @ignore */
var PortableStorageConstants;
(function (PortableStorageConstants) {
    PortableStorageConstants[PortableStorageConstants["SIGNATURE_A"] = 16847105] = "SIGNATURE_A";
    PortableStorageConstants[PortableStorageConstants["SIGNATURE_B"] = 16908545] = "SIGNATURE_B";
    PortableStorageConstants[PortableStorageConstants["VERSION"] = 1] = "VERSION";
})(PortableStorageConstants = exports.PortableStorageConstants || (exports.PortableStorageConstants = {}));
__exportStar(require("./Types/IExtraNonce"), exports);
__exportStar(require("./Types/IExtraTag"), exports);
__exportStar(require("./Types/ITransactionInput"), exports);
__exportStar(require("./Types/ITransactionOutput"), exports);
__exportStar(require("./Types/ED25519"), exports);
__exportStar(require("./Types/ITransaction"), exports);
__exportStar(require("./Types/MultisigInterfaces"), exports);
__exportStar(require("./Types/ICryptoNote"), exports);
__exportStar(require("./Types/Ledger"), exports);
__exportStar(require("./Types/WalletAPI"), exports);
__exportStar(require("./Types/LegacyWrkz"), exports);
__exportStar(require("./Types/Wrkz"), exports);
var PortableStorage_1 = require("./Types/PortableStorage");
Object.defineProperty(exports, "PortableStorage", { enumerable: true, get: function () { return PortableStorage_1.PortableStorage; } });
Object.defineProperty(exports, "StorageType", { enumerable: true, get: function () { return PortableStorage_1.StorageType; } });
