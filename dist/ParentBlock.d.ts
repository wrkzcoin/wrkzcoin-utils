import { Transaction } from './Transaction';
/**
 * Represents a parent block object
 */
export declare class ParentBlock {
    /**
     * The major block version number
     */
    majorVersion: number;
    /**
     * The minor block version number
     */
    minorVersion: number;
    /**
     * The previous block hash
     */
    previousBlockHash: string;
    /**
     * The number of transactions in the block
     */
    transactionCount: number;
    /**
     * The base transaction branches
     */
    baseTransactionBranch: string[];
    /**
     * The miner reward transaction
     */
    minerTransaction: Transaction;
    /**
     * The blockchain branches
     */
    blockchainBranch: string[];
}
