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
Object.defineProperty(exports, "__esModule", { value: true });
exports.on = exports.WrkzTypes = exports.LedgerErrorCode = exports.LedgerTransactionState = exports.LedgerError = exports.TransactionOutputs = exports.TransactionInputs = exports.Keys = exports.KeyPair = exports.KeyOutput = exports.KeyInput = exports.ICryptoNote = void 0;
const wrkzcoin_crypto_1 = require("wrkzcoin-crypto");
/** @ignore */
const Types = __importStar(require("./Types"));
var Address_1 = require("./Address");
Object.defineProperty(exports, "Address", { enumerable: true, get: function () { return Address_1.Address; } });
var AddressPrefix_1 = require("./AddressPrefix");
Object.defineProperty(exports, "AddressPrefix", { enumerable: true, get: function () { return AddressPrefix_1.AddressPrefix; } });
var Block_1 = require("./Block");
Object.defineProperty(exports, "Block", { enumerable: true, get: function () { return Block_1.Block; } });
var BlockTemplate_1 = require("./BlockTemplate");
Object.defineProperty(exports, "BlockTemplate", { enumerable: true, get: function () { return BlockTemplate_1.BlockTemplate; } });
var wrkzcoin_crypto_2 = require("wrkzcoin-crypto");
Object.defineProperty(exports, "Crypto", { enumerable: true, get: function () { return wrkzcoin_crypto_2.Crypto; } });
Object.defineProperty(exports, "CryptoType", { enumerable: true, get: function () { return wrkzcoin_crypto_2.CryptoType; } });
var CryptoNote_1 = require("./CryptoNote");
Object.defineProperty(exports, "CryptoNote", { enumerable: true, get: function () { return CryptoNote_1.CryptoNote; } });
var LedgerDevice_1 = require("./LedgerDevice");
Object.defineProperty(exports, "LedgerDevice", { enumerable: true, get: function () { return LedgerDevice_1.LedgerDevice; } });
Object.defineProperty(exports, "LedgerTransport", { enumerable: true, get: function () { return LedgerDevice_1.LedgerTransport; } });
var LedgerNote_1 = require("./LedgerNote");
Object.defineProperty(exports, "LedgerNote", { enumerable: true, get: function () { return LedgerNote_1.LedgerNote; } });
var LevinPacket_1 = require("./LevinPacket");
Object.defineProperty(exports, "LevinPacket", { enumerable: true, get: function () { return LevinPacket_1.LevinPacket; } });
Object.defineProperty(exports, "LevinProtocol", { enumerable: true, get: function () { return LevinPacket_1.LevinProtocol; } });
var LevinPayloads_1 = require("./Types/LevinPayloads");
Object.defineProperty(exports, "LevinPayloads", { enumerable: true, get: function () { return LevinPayloads_1.LevinPayloads; } });
var Multisig_1 = require("./Multisig");
Object.defineProperty(exports, "Multisig", { enumerable: true, get: function () { return Multisig_1.Multisig; } });
var MultisigMessage_1 = require("./MultisigMessage");
Object.defineProperty(exports, "MultisigMessage", { enumerable: true, get: function () { return MultisigMessage_1.MultisigMessage; } });
var ParentBlock_1 = require("./ParentBlock");
Object.defineProperty(exports, "ParentBlock", { enumerable: true, get: function () { return ParentBlock_1.ParentBlock; } });
var Transaction_1 = require("./Transaction");
Object.defineProperty(exports, "Transaction", { enumerable: true, get: function () { return Transaction_1.Transaction; } });
var LegacyWrkz_1 = require("./LegacyWrkz");
Object.defineProperty(exports, "LegacyWrkz", { enumerable: true, get: function () { return LegacyWrkz_1.LegacyWrkz; } });
var Wrkz_1 = require("./Wrkz");
Object.defineProperty(exports, "Wrkz", { enumerable: true, get: function () { return Wrkz_1.Wrkz; } });
var WalletAPI_1 = require("./WalletAPI");
Object.defineProperty(exports, "WalletAPI", { enumerable: true, get: function () { return WalletAPI_1.WalletAPI; } });
/** @ignore */
var TransactionOutputs = Types.TransactionOutputs;
exports.TransactionOutputs = TransactionOutputs;
/** @ignore */
var TransactionInputs = Types.TransactionInputs;
exports.TransactionInputs = TransactionInputs;
/** @ignore */
var KeyInput = TransactionInputs.KeyInput;
exports.KeyInput = KeyInput;
/** @ignore */
var KeyOutput = TransactionOutputs.KeyOutput;
exports.KeyOutput = KeyOutput;
/** @ignore */
var KeyPair = Types.ED25519.KeyPair;
exports.KeyPair = KeyPair;
/** @ignore */
var Keys = Types.ED25519.Keys;
exports.Keys = Keys;
/** @ignore */
var LedgerError = Types.LedgerTypes.LedgerError;
exports.LedgerError = LedgerError;
/** @ignore */
var LedgerTransactionState = Types.LedgerTypes.TransactionState;
exports.LedgerTransactionState = LedgerTransactionState;
/** @ignore */
var LedgerErrorCode = Types.LedgerTypes.ErrorCode;
exports.LedgerErrorCode = LedgerErrorCode;
var ICryptoNote = Types.CryptoNoteInterfaces.ICryptoNote;
exports.ICryptoNote = ICryptoNote;
var WrkzTypes = Types.WrkzTypes;
exports.WrkzTypes = WrkzTypes;
/**
 * Executes the callback method upon the given event
 * @param event
 * @param callback
 */
function on(event, callback) {
    if (event.toLowerCase() === 'ready') {
        const check = () => setTimeout(() => {
            if (wrkzcoin_crypto_1.Crypto.isReady) {
                return callback();
            }
            else {
                check();
            }
        }, 100);
        check();
    }
}
exports.on = on;
