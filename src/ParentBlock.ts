// Copyright (c) 2018-2020, The TurtleCoin Developers
// Copyright (c) 2026, The WrkzCoin Developers
//
// Please see the included LICENSE file for more information.

import { Transaction } from './Transaction';

/**
 * Represents a parent block object
 */
export class ParentBlock {
    /**
     * The major block version number
     */
    public majorVersion = 0;
    /**
     * The minor block version number
     */
    public minorVersion = 0;
    /**
     * The previous block hash
     */
    public previousBlockHash: string = ''.padStart(64, '0');
    /**
     * The number of transactions in the block
     */
    public transactionCount = 0;
    /**
     * The base transaction branches
     */
    public baseTransactionBranch: string[] = [];
    /**
     * The miner reward transaction
     */
    public minerTransaction: Transaction = new Transaction();
    /**
     * The blockchain branches
     */
    public blockchainBranch: string[] = [];
}

