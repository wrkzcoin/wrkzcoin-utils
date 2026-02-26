/// <reference types="node" />
/** @ignore */
export declare enum SIZES {
    KEY = 32,
    CHECKSUM = 4
}
/**
 * Represents a WrkzCoin address prefix
 */
export declare class AddressPrefix {
    /**
     * The Base58 encoded address prefix
     */
    get base58(): string;
    /**
     * The decimal encoded address prefix
     */
    get decimal(): number;
    /**
     * The hexadecimal encoded address prefix
     */
    get hex(): string;
    /**
     * The varint encoded address prefix
     */
    get varint(): Buffer;
    /**
     * The size of the address prefix in bytes
     */
    get size(): number;
    /**
     * Creates a new address prefix object from a Base58 encoded address
     * @param address the public wallet address to decode to obtain the address prefix
     * @returns the address prefix
     */
    static from(address: string): AddressPrefix;
    protected m_base58?: string;
    protected m_decimal: number;
    /**
     * Creates a new address prefix object
     * @param [decimal] the decimal representation of the address prefix
     * @param [base58] the Base58 representation of the address prefix
     */
    constructor(decimal?: number, base58?: string);
}
