import { Address } from './Address';
import { ED25519, Interfaces as TransactionInterfaces, MultisigInterfaces } from './Types';
/**
 * Represents a Multisignature inter-wallet Message that is used to exchange data between multisignature participants
 */
export declare class MultisigMessage {
    /**
     * The private view key communicated in the message
     */
    get view(): string;
    /**
     * The source individual wallet address that the message is being sent FROM
     */
    get source(): Address;
    set source(source: Address);
    /**
     * The destination individual wallet address the message is being sent TO
     */
    get destination(): Address;
    set destination(destination: Address);
    /**
     * A one-time nonce value that should increment/change for every message exchanged between the wallets
     */
    get nonce(): number;
    /**
     * The multisig public spend keys transferred in the message
     */
    get spendKeys(): ED25519.KeyPair[];
    /**
     * The partial key images transferred in the message
     */
    get partialKeyImages(): MultisigInterfaces.PartialKeyImage[];
    set partialKeyImages(partialKeyImages: MultisigInterfaces.PartialKeyImage[]);
    /**
     * The partial signing keys transferred in the message
     */
    get partialSigningKeys(): MultisigInterfaces.PartialSigningKey[];
    set partialSigningKeys(partialSigningKeys: MultisigInterfaces.PartialSigningKey[]);
    /**
     * The prepared transactions transferred in the message
     */
    get preparedTransactions(): TransactionInterfaces.PreparedTransaction[];
    set preparedTransactions(preparedTransactions: TransactionInterfaces.PreparedTransaction[]);
    /**
     * Decodes a Base58 string into a multisig message object.
     *
     * This method validates that all signatures included in the data are valid, the data is properly
     * decrypted, and the signatures of the public keys included in the payload(s) are valid
     *
     * @async
     * @param destination The wallet address that this message was sent
     * @param base58 The Base58 encoded data
     */
    static decode(destination: Address, base58: string): Promise<MultisigMessage>;
    protected m_source: Address;
    protected m_spendKeys: ED25519.KeyPair[];
    protected m_privateViewKey: ED25519.KeyPair;
    protected m_nonce: number;
    protected m_partialKeyImages: MultisigInterfaces.PartialKeyImage[];
    protected m_partialSigningKeys: MultisigInterfaces.PartialSigningKey[];
    protected m_preparedTransactions: TransactionInterfaces.PreparedTransaction[];
    private m_destination;
    /**
     * Constructs a new instance of a MultisigMessage object
     * @param [source] The source individual wallet address that the message is being sent FROM
     * @param [destination] The destination individual wallet address the message is being sent TO
     * @param [nonce] A one-time nonce value that should increment/change for every message
     * exchanged between the wallets
     */
    constructor(source?: Address, destination?: Address, nonce?: number);
    /**
     * Adds a new set of spend keys to the message
     *
     * Note: The key pair must be complete (both private and public) to complete the necessary
     * signing processes to provide proof that we have the private key for the given public key.
     *
     * @param keypair The spend key pair to include.
     */
    addSpendKeys(keypair: ED25519.KeyPair): boolean;
    /**
     * Encodes the multisig message object as a Base58 encoded string that can be easily
     *
     * This method performs all necessary signing of the supplied public keys, encrypts the payload,
     * and signs the message to prevent tampering and protect the confidential information inside.
     *
     * transferred between multisig wallet participants
     * @async
     * @returns The Base58 encoded string for transmission
     */
    encode(): Promise<string>;
}
