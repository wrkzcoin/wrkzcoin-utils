import { AddressPrefix } from './AddressPrefix';
import { ED25519 } from './Types';
/** @ignore */
export declare enum SIZES {
    KEY = 32,
    CHECKSUM = 4
}
/**
 * Represents a WrkzCoin address
 */
export declare class Address {
    /**
     * The Base58 encoded address
     */
    address(): Promise<string>;
    /**
     * The address index number [0=primary]
     */
    get subwalletIndex(): number;
    /**
     * The seed phrase for the address if available
     */
    get seed(): string | undefined;
    /**
     * The mnemonic phrase for the address if available
     */
    get mnemonic(): string | undefined;
    /**
     * The payment Id of the address if one exists
     */
    get paymentId(): string;
    set paymentId(paymentId: string);
    /**
     * The address prefix
     */
    get prefix(): AddressPrefix;
    set prefix(addressPrefix: AddressPrefix);
    /**
     * The address spend keys
     */
    get spend(): ED25519.KeyPair;
    set spend(keys: ED25519.KeyPair);
    /**
     * The address view keys
     */
    get view(): ED25519.KeyPair;
    set view(keys: ED25519.KeyPair);
    /**
     * Creates a new address object from a Base58 address
     * @param address the public address to decode
     * @param [prefix] the address prefix
     * @returns a new address object
     */
    static fromAddress(address: string, prefix?: AddressPrefix | number): Promise<Address>;
    /**
     * Creates a new address object using the supplied public keys
     * @param publicSpendKey the public spend key
     * @param publicViewKey the public view key
     * @param [paymentId] the payment ID
     * @param [prefix] the address prefix
     * @returns a new address object
     */
    static fromPublicKeys(publicSpendKey: string, publicViewKey: string, paymentId?: string, prefix?: AddressPrefix | number): Promise<Address>;
    /**
     * Creates a new address object (view only) using the supplied keys
     * @param publicSpendKey the public spend key
     * @param privateViewKey the private view key
     * @param [paymentId] the payment ID
     * @param [prefix] the address prefix
     * @returns a new address object
     */
    static fromViewOnlyKeys(publicSpendKey: string, privateViewKey: string, paymentId?: string, prefix?: AddressPrefix | number): Promise<Address>;
    /**
     * Creates a new address object using the supplied private keys
     * @param privateSpendKey the private spend key
     * @param privateViewKey the private view key
     * @param [prefix] the address prefix
     * @returns a new address object
     */
    static fromKeys(privateSpendKey: string, privateViewKey: string, prefix?: AddressPrefix | number): Promise<Address>;
    /**
     * Creates a new address object from a mnemonic phrase
     * @param mnemonic the wallet mnemonic phrase
     * @param [language] the language of the mnemonic phrase
     * @param [prefix] the address prefix
     * @returns a new address object
     */
    static fromMnemonic(mnemonic: string, language?: string, prefix?: AddressPrefix | number): Promise<Address>;
    /**
     * Creates a new address object from a seed
     * @param seed the wallet seed
     * @param [language] the language of the mnemonic phrase
     * @param [prefix] the address prefix
     * @returns a new address object
     */
    static fromSeed(seed: string, language?: string, prefix?: AddressPrefix | number): Promise<Address>;
    /**
     * Creates a new address object from entropy (new address)
     * @param [entropy] data to use for entropy to feed to the underlying random generation function
     * @param [language] the language of the mnemonic phrase
     * @param [prefix] the address prefix
     * @returns a new address object
     */
    static fromEntropy(entropy?: string, language?: string, prefix?: AddressPrefix | number): Promise<Address>;
    /**
     * Generates a new seed from entropy
     * @param [entropy] data to use for entropy to feed to the underlying random generation function
     * @param [iterations] the number of iterations to run the hashing function when generating the seed
     * @returns a new randomly created seed
     */
    static generateSeed(entropy?: string, iterations?: number): Promise<string>;
    /**
     * Generates a new subwallet address object using the supplied parameters
     * @param privateSpendKey the private spend key
     * @param subwalletIndex the subwallet index number
     * @param [language] the language of the mnemonic phrase
     * @param [prefix] the address prefix
     * @returns a new address object
     */
    static generateSubwallet(privateSpendKey: string, subwalletIndex: number, language?: string, prefix?: AddressPrefix | number): Promise<Address>;
    /**
     * Encodes a raw address (hex) into Base58 notation
     * @param rawAddress the raw address in hexadecimal form
     * @retursn the Base58 representation of the address
     */
    static encodeRaw(rawAddress: string): string;
    protected m_paymentId?: string;
    protected m_seed?: string;
    protected m_keys: ED25519.Keys;
    protected m_language: string;
    protected m_subwalletIndex: number;
    private m_prefix;
    private m_cached;
    /**
     * Returns the Base58 encoded address
     * @returns Base58 encoded address
     */
    toString(): Promise<string>;
}
