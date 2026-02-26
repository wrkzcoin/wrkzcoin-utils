"use strict";
// Copyright (c) 2018-2020, The TurtleCoin Developers
// Copyright (c) 2026, The WrkzCoin Developers
//
// Please see the included LICENSE file for more information.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParentBlock = void 0;
const Transaction_1 = require("./Transaction");
/**
 * Represents a parent block object
 */
class ParentBlock {
    constructor() {
        /**
         * The major block version number
         */
        this.majorVersion = 0;
        /**
         * The minor block version number
         */
        this.minorVersion = 0;
        /**
         * The previous block hash
         */
        this.previousBlockHash = ''.padStart(64, '0');
        /**
         * The number of transactions in the block
         */
        this.transactionCount = 0;
        /**
         * The base transaction branches
         */
        this.baseTransactionBranch = [];
        /**
         * The miner reward transaction
         */
        this.minerTransaction = new Transaction_1.Transaction();
        /**
         * The blockchain branches
         */
        this.blockchainBranch = [];
    }
}
exports.ParentBlock = ParentBlock;
