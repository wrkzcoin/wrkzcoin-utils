/// <reference types="node" />
import { BigInteger } from '../Types';
export declare namespace TransactionInputs {
    /**
     * Transaction Input Types
     */
    enum InputType {
        KEY = 2,
        COINBASE = 255
    }
    /**
     * Abstract interface for structured transaction inputs
     */
    abstract class ITransactionInput {
        /**
         * The input type
         */
        abstract get type(): InputType;
        /**
         * Returns the input as a buffer
         * @returns the Buffer representation of the object
         */
        abstract toBuffer(): Buffer;
        /**
         * Returns the input as a hexadecimal string (blob)
         * @returns the hexadecimal (blob) representation of the object
         */
        abstract toString(): string;
    }
    /**
     * Represents a Coinbase input (block reward)
     */
    class CoinbaseInput implements ITransactionInput {
        private readonly m_type;
        private readonly m_blockIndex;
        /**
         * Creates a new Coinbase input for the specified block index (0-based)
         * @param blockIndex
         */
        constructor(blockIndex: number);
        /**
         * The input type
         */
        get type(): InputType;
        /**
         * The block index of the input (0-based)
         */
        get blockIndex(): number;
        /**
         * Represents the input as a Buffer
         * @returns the Buffer representation of the object
         */
        toBuffer(): Buffer;
        /**
         * Represents the input as a hexadecimal string (blob)
         * @returns the hexadecimal (blob) representation of the object
         */
        toString(): string;
    }
    /**
     * Represents an input from a set of keys (wallet)
     */
    class KeyInput implements ITransactionInput {
        private readonly m_type;
        private readonly m_amount;
        private readonly m_keyOffsets;
        private readonly m_keyImage;
        /**
         * Creates a new input from existing keys using the specified values
         * @param amount the amount of the input
         * @param keyOffsets the input offsets used in the transaction signature(s)
         * @param keyImage the key image of the input
         */
        constructor(amount: BigInteger.BigInteger | number, keyOffsets: BigInteger.BigInteger[] | number[], keyImage: string);
        /**
         * The input type
         */
        get type(): InputType;
        /**
         * The input amount
         */
        get amount(): BigInteger.BigInteger;
        /**
         * The input offsets used in the transaction signature(s)
         */
        get keyOffsets(): BigInteger.BigInteger[];
        /**
         * The key image of the input
         */
        get keyImage(): string;
        /**
         * Represents the input as a Buffer
         * @returns the Buffer representation of the object
         */
        toBuffer(): Buffer;
        /**
         * Represents the input as a hexadecimal string (blob)
         * @returns the hexadecimal (blob) representation of the object
         */
        toString(): string;
    }
}
