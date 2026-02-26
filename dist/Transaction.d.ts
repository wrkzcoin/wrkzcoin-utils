/// <reference types="node" />
import { Address } from './Address';
import { BigInteger, ED25519, ExtraTag, TransactionInputs, TransactionOutputs } from './Types';
/** @ignore */
interface Cache {
    prefix: string;
    blob: string;
    prefixHash: string;
    hash: string;
}
/**
 * Represents a WrkzCoin Transaction
 */
export declare class Transaction {
    /**
     * Returns the total amount of the inputs
     */
    private get inputAmount();
    /**
     * Returns the total amount of the outputs
     */
    private get outputAmount();
    /**
     * Returns whether this is a coinbase transaction or not
     */
    get isCoinbase(): boolean;
    /**
     * Calculates the transaction fingerprint if the transaction
     * is a coinbase transaction and it contains the information
     * necessary to do so
     */
    fingerprint(): Promise<string | undefined>;
    /**
     * Returns the recipient address if this is a coinbase
     * transaction and the information is available
     */
    recipient(): Promise<Address | undefined>;
    /**
     * Returns the total amount transferred in the transaction
     */
    get amount(): number;
    /**
     * Returns the transaction extra as a buffer
     */
    get extra(): Buffer;
    /**
     * Returns the structured arbitrary data found in the transaction extra
     */
    get extraData(): Buffer;
    /**
     * Returns the fee of the transaction
     */
    get fee(): number;
    /**
     * Returns the transaction hash
     */
    hash(): Promise<string>;
    /**
     * Returns the merged mining tag found within the transaction
     */
    get mergedMining(): ExtraTag.ExtraMergedMining | undefined;
    /**
     * Returns the payment ID found within the transaction
     */
    get paymentId(): string | undefined;
    /**
     * Increments the pool nonce by 1
     */
    incrementPoolNonce(): void;
    /**
     * Returns pool nonce field within the transaction as Buffer
     */
    get poolNonce(): BigInteger.BigInteger;
    /**
     * Sets the pool nonce field within the transaction from a Buffer
     * @param nonce the nonce data to use
     */
    set poolNonce(nonce: BigInteger.BigInteger);
    /**
     * Returns the pool nonce field as hexadecimal text
     */
    get poolNonceHex(): string | undefined;
    /**
     * Returns the transaction prefix in hexadecimal (blob) form
     */
    get prefix(): string;
    /**
     * Returns the transaction prefix hash
     */
    prefixHash(): Promise<string>;
    /**
     * Returns the transaction public key (if available)
     */
    get publicKey(): string | undefined;
    /**
     * Returns the transaction private key (if available)
     */
    get privateKey(): string | undefined;
    /**
     * Returns the transacton recipient public view key (if available)
     */
    get recipientPublicViewKey(): string | undefined;
    /**
     * Returns the transacton recipient public spend key (if available)
     */
    get recipientPublicSpendKey(): string | undefined;
    /**
     * Returns the transaction size in bytes
     */
    get size(): number;
    /**
     * The unlock time (or block height) for when the funds in the transaction are made available.
     * Returns a BigInteger only if the value exceeds MAX_SAFE_INTEGER
     */
    get unlockTime(): BigInteger.BigInteger | number;
    set unlockTime(value: BigInteger.BigInteger | number);
    /**
     * Whether the transaction data is read only
     * This is only set if the transaction is created from a blob as it is unlikely that
     * we will be changing data after a transaction is created and signed as it would
     * invalidate the transaction signatures
     */
    get readonly(): boolean;
    set readonly(value: boolean);
    /**
     * Constructs a new transaction from an existing transaction blob
     * @param data the transaction data blob
     * @returns the new transaction object
     */
    static from(data: Buffer | string): Promise<Transaction>;
    version: number;
    inputs: TransactionInputs.ITransactionInput[];
    outputs: TransactionOutputs.ITransactionOutput[];
    signatures: string[][];
    ignoredField: number;
    transactionKeys: ED25519.KeyPair;
    protected m_unlockTime: BigInteger.BigInteger;
    protected m_rawExtra: Buffer;
    protected m_readonly: boolean;
    m_extra: ExtraTag.IExtraTag[];
    protected m_cached: Cache;
    /** @ignore */
    parseExtra(extra: Buffer): Promise<void>;
    /**
     * Adds the arbitrary data supplied to the transaction extra field
     * @param data arbitrary data to be included
     */
    addData(data: Buffer): void;
    /**
     * Adds a merged minging tag with the supplied values to the transaction
     * @param depth the depth of the blockchain branch in the merkle root
     * @param merkleRoot the merkle root value
     */
    addMergedMining(depth: number, merkleRoot: string): void;
    /**
     * Adds the supplied payment ID to the transaction extra field
     * @param paymentId the payment Id to include
     */
    addPaymentId(paymentId: string): void;
    /**
     * Adds the public key for the transaction to the transaction extra field
     * @param publicKey the public key of the transaction
     */
    addPublicKey(publicKey: string): Promise<void>;
    /**
     * Adds the private key for the transaction to the transaction extra field
     * @param privateKey the private key of the transaction
     */
    addPrivateKey(privateKey: string): Promise<void>;
    /**
     * generateTxProofOfWork
     * @param diff difficulty for generateTxProofOfWork
     */
    generateTxProofOfWork(diff: number): Promise<void>;
    /**
     * Returns a buffer representation of the transaction object
     * @param [headerOnly] whether we should return just the prefix or not
     * @returns the buffer representation
     */
    toBuffer(headerOnly?: boolean): Buffer;
    /**
     * Returns the hexadecimal (blob) representation of the transaction object
     * @param [headerOnly] whether we should return just the prefix or not
     * @returns the hexadecimal (blob)  representation
     */
    toString(headerOnly?: boolean): string;
}
export {};
