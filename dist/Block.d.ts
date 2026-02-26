/// <reference types="node" />
import { ICoinConfig, ICoinRunningConfig } from './Config';
import { Transaction } from './Transaction';
import { ParentBlock } from './ParentBlock';
/** @ignore */
interface Cache {
    blob: string;
    hash: string;
    longBlob: string;
    longHash: string;
}
/**
 * Represents a WrkzCoin Block
 */
export declare class Block {
    /**
     * The size of the block in bytes
     */
    get size(): number;
    /**
     * The height of the block
     */
    get height(): number;
    /**
     * The nonce of the block
     */
    get nonce(): number;
    set nonce(value: number);
    /**
     * The transactions hashes (non-coinbase) included in the block
     */
    get transactions(): string[];
    /**
     * The base transaction branch of the block
     */
    baseTransactionBranch(): Promise<string[]>;
    /**
     * The transaction tree hash of the block
     */
    transactionTreeHash(): Promise<{
        hash: string;
        count: number;
    }>;
    /**
     * The merkle root of the block
     */
    merkleRoot(): Promise<string>;
    /**
     * The major block version
     */
    get majorVersion(): number;
    set majorVersion(majorVersion: number);
    /**
     * The minor block version
     */
    get minorVersion(): number;
    set minorVersion(minorVersion: number);
    /**
     * The block hash (id)
     */
    hash(): Promise<string>;
    /**
     * The block PoW hash
     */
    longHash(): Promise<string>;
    /**
     * The timestamp of the block
     */
    get timestamp(): Date;
    set timestamp(timestamp: Date);
    /**
     * The previous block hash of the block
     */
    get previousBlockHash(): string;
    set previousBlockHash(previousBlockHash: string);
    /**
     * The miner (coinbase) transaction of the block
     */
    get minerTransaction(): Transaction;
    set minerTransaction(minerTransaction: Transaction);
    /**
     * The parent block of the block
     */
    get parentBlock(): ParentBlock;
    set parentBlock(parentBlock: ParentBlock);
    /**
     * Defines what major block version activates the use of parent blocks
     */
    get activateParentBlockVersion(): number;
    set activateParentBlockVersion(activateParentBlockVersion: number);
    /**
     * Creates a new instance of a block from the data supplied
     * @param data the raw block data to decode
     * @param [config] the configuration that may define the major block version to activate parent block usage
     * @returns the new block object
     */
    static from(data: Buffer | string, config?: ICoinConfig): Promise<Block>;
    protected m_majorVersion: number;
    protected m_minorVersion: number;
    protected m_timestamp: Date;
    protected m_previousBlockHash: string;
    protected m_parentBlock: ParentBlock;
    protected m_nonce: number;
    protected m_minerTransaction: Transaction;
    protected m_transactions: string[];
    protected m_config: ICoinRunningConfig;
    protected m_cache: Cache;
    /**
     * Returns a Buffer representation of the block
     * @returns the resulting Buffer
     */
    toBuffer(): Buffer;
    /**
     * Returns a hexadecimal (blob) representation of the block
     * @returns the hexadecimal representation of the block
     */
    toString(): string;
    /**
     * Returns a Buffer representation of the data for hashing (mining) the block
     * @param [headerOnly] whether to return just the header or the full block
     * @returns the hashing buffer
     */
    toHashingBuffer(headerOnly?: boolean): Promise<Buffer>;
    /**
     * Returns a hexadecimal (blob) representation of the data for hashing (mining) the block
     * @param [headerOnly] whether to return just the header or the full block
     * @returns the hexadecimal (blob) representation of the hashing buffer
     */
    toHashingString(headerOnly?: boolean): Promise<string>;
}
export {};
