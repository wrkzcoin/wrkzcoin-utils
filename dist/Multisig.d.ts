import { Address } from './Address';
import { ED25519 } from './Types/ED25519';
import { Interfaces, MultisigInterfaces } from './Types';
import { Transaction } from './Transaction';
/** @ignore */
import KeyPair = ED25519.KeyPair;
/**
 * Represents a multisig helper class that can be used for the creation of multisig wallets
 */
export declare class Multisig {
    /**
     * Returns an address object representing the multisig wallet address
     */
    address(): Promise<Address>;
    /**
     * Returns the threshold (M) of the multisig wallet
     */
    get threshold(): number;
    /**
     * Returns the participants (N) of the multisig wallet
     */
    get participants(): number;
    /**
     * Returns the number of participants currently loaded into the object
     */
    get current_participants(): number;
    /**
     * Returns the shared private view key of the multisig wallet
     */
    view(): Promise<string>;
    /**
     * Returns the shared public spend key of the multisig wallet
     */
    spend(): Promise<string>;
    /**
     * Returns if the object is ready for export and/or use
     */
    get isReady(): boolean;
    /**
     * Returns our multisig keys
     */
    get multisig_keys(): KeyPair[];
    /**
     * Returns the public multisig keys
     */
    public_multisig_keys(): Promise<string[]>;
    /**
     * Returns the private multisig keys
     */
    private_multisig_keys(): Promise<string[]>;
    /**
     * Calculates our multisig keys using the participant public spend keys
     * @returns our multisig keys key pairs
     */
    private calculated_multisig_keys;
    /**
     * Returns if the view information is ready
     */
    private get isViewReady();
    /**
     * Returns if the spend information is ready
     */
    private get isSpendReady();
    /**
     * Let's us know how many times participants must exchange information after the initial exchange
     * @param threshold the number of participants required to construct a new transaction
     * @param participants the wallet participants
     * @returns the number of additional exchange rounds required
     */
    static exchangeRoundsRequired(threshold: number, participants: number): number;
    /**
     * Initializes an initial multisig object using our address information
     * @param wallet our base wallet used to create the wallet
     * @param threshold the number of participants required to construct a new transaction
     * @param participants the wallet participants
     * @returns a new instance of the object
     */
    static fromAddress(wallet: Address, threshold: number, participants: number): Multisig;
    /**
     * Initializes a multisig object using our previously generated multisig private keys
     * @param multisig_private_keys the previously generated multisig private keys
     * @param sharedPrivateViewKey the previously calculated view private key
     * @param threshold the number of participants required to construct a new transaction
     * @param participants the wallet participants
     * @returns a new instance of the object
     */
    static fromMultisigKeys(multisig_private_keys: string[], sharedPrivateViewKey: string, threshold: number, participants: number): Promise<Multisig>;
    /**
     * Returns the total number of signing keys created using the M:N values supplied
     * @param threshold the number of participants required to construct a new transaction
     * @param participants the wallet participants
     * @returns the total number of signing keys created
     */
    static requiredSigningKeys(threshold: number, participants: number): number;
    /**
     * Returns if the given M:N scheme is valid for this library
     * @param threshold the number of participants required to construct a new transaction
     * @param participants the wallet participants
     * @returns if the given scheme is valid for this library
     */
    static isValidThreshold(threshold: number, participants: number): boolean;
    /**
     * Restores a key image from partial key images
     * @param publicEphemeral the key image public emphermal
     * @param derivation the key input derivation
     * @param outputIndex the key input output index
     * @param partialKeyImages the partial key images
     * @returns the restored key image
     */
    static restoreKeyImage(publicEphemeral: string, derivation: string, outputIndex: number, partialKeyImages: string[]): Promise<string>;
    private m_wallet_multisig_keys;
    private m_multisig_keys;
    private m_participant_keys;
    private m_view_keys;
    private m_threshold;
    private m_participants;
    private m_currentParticipants;
    /**
     * Adds a participant to the multisig object
     * Note: If this is an additional round of exchange, the publicSpendKeys should be the array of
     * public multisig keys of the participant and we will not supply the private view key again.
     * @param publicSpendKeys the participant spend key(s)
     * @param [privateViewKey] the private view key of the participant
     */
    addParticipant(publicSpendKeys: string[] | string, privateViewKey?: string): Promise<void>;
    /**
     * Generates the partial key images for the given public ephemeral
     * @param transactionHash the transaction hash containing the output used
     * @param publicEphemeral the public ephemeral of the output
     * @param outputIndex the index of the output in the transaction
     * @returns the partial key images
     */
    generatePartialKeyImages(transactionHash: string, publicEphemeral: string, outputIndex: number): Promise<MultisigInterfaces.PartialKeyImage[]>;
    /**
     * Generates the partial signing keys for the given prepared transaction
     * @param tx the prepared transaction
     * @returns the partial signing keys
     */
    generatePartialSigningKeys(tx: Interfaces.PreparedTransaction): Promise<MultisigInterfaces.PartialSigningKey[]>;
    /**
     * Restores the ring signatures of a prepared transaction using the supplied partial signing keys
     * @param tx the prepared transaction
     * @param partialSigningKeys the partial signing keys required for the signature scheme
     * @returns the completed transaction
     */
    completeTransaction(tx: Interfaces.PreparedTransaction, partialSigningKeys: MultisigInterfaces.PartialSigningKey[]): Promise<Transaction>;
}
