/// <reference types="node" />
import { BigInteger } from '../Types';
export declare namespace TransactionOutputs {
    /**
     * Transaction Output Type
     */
    enum OutputType {
        KEY = 2
    }
    /**
     * Abstract interface for structured transaction outputs
     */
    abstract class ITransactionOutput {
        /**
         * The output type
         */
        abstract get type(): OutputType;
        /**
         * Returns the output as a buffer
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
     * Represents an output to a set of keys (wallet)
     */
    class KeyOutput implements ITransactionOutput {
        private readonly m_type;
        private readonly m_amount;
        private readonly m_key;
        /**
         * Creates a new key output using the specified values
         * @param amount the output amount
         * @param key the one-time output key of the output
         */
        constructor(amount: BigInteger.BigInteger | number, key: string);
        /**
         * The output type
         */
        get type(): OutputType;
        /**
         * The output amount
         */
        get amount(): BigInteger.BigInteger;
        /**
         * The one-time output key of the output
         */
        get key(): string;
        /**
         * Represents the output as a Buffer
         * @returns the Buffer representation of the object
         */
        toBuffer(): Buffer;
        /**
         * Represents the output as a hexadecimal string (blob)
         * @returns the hexadecimal (blob) representation of the object
         */
        toString(): string;
    }
}
