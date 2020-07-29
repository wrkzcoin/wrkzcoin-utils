/// <reference types="ledgerhq__hw-transport" />
/// <reference types="node" />
import Transport from '@ledgerhq/hw-transport';
import { EventEmitter } from 'events';
export declare namespace LedgerWalletTypes {
    /** @ignore */
    enum APDU {
        P2 = 0,
        P1_NON_CONFIRM = 0,
        P1_CONFIRM = 1,
        INS = 224
    }
    /**
     * Represents the APDU command types available in the TurtleCoin application
     * for ledger hardware wallets
     */
    enum CMD {
        VERSION = 1,
        DEBUG = 2,
        IDENT = 5,
        PUBLIC_KEYS = 16,
        VIEW_SECRET_KEY = 17,
        SPEND_ESECRET_KEY = 18,
        PRIVATE_TO_PUBLIC = 24,
        RANDOM_KEY_PAIR = 25,
        ADDRESS = 48,
        GENERATE_KEY_IMAGE = 64,
        GENERATE_RING_SIGNATURES = 80,
        COMPLETE_RING_SIGNATURE = 81,
        CHECK_RING_SIGNATURES = 82,
        GENERATE_SIGNATURE = 85,
        CHECK_SIGNATURE = 86,
        GENERATE_KEY_DERIVATION = 96,
        DERIVE_PUBLIC_KEY = 97,
        DERIVE_SECRET_KEY = 98,
        RESET_KEYS = 255
    }
    /**
     * Represents the possible errors returned by the application
     * on the ledger device
     */
    enum ErrorCode {
        OK = 36864,
        ERR_OP_NOT_PERMITTED = 16384,
        ERR_OP_USER_REQUIRED = 16385,
        ERR_UNKNOWN_ERROR = 17476,
        ERR_VARINT_DATA_RANGE = 24576,
        ERR_PRIVATE_SPEND = 37888,
        ERR_PRIVATE_VIEW = 37889,
        ERR_RESET_KEYS = 37890,
        ERR_ADDRESS = 37968,
        ERR_KEY_DERIVATION = 38144,
        ERR_DERIVE_PUBKEY = 38145,
        ERR_PUBKEY_MISMATCH = 38146,
        ERR_DERIVE_SECKEY = 38147,
        ERR_KECCAK = 38148,
        ERR_COMPLETE_RING_SIG = 38149,
        ERR_GENERATE_KEY_IMAGE = 38150,
        ERR_SECKEY_TO_PUBKEY = 38151
    }
}
/**
 * An easy to use interface that uses a Ledger HW transport to communicate with
 * the TurtleCoin application running on a ledger device.
 * Please see. See https://github.com/LedgerHQ/ledgerjs for available transport providers
 */
export declare class LedgerDevice extends EventEmitter {
    private readonly m_transport;
    /**
     * Creates a new instance of the Ledger interface
     * The transport MUST be connected already before passing to this constructor
     * @param transport See https://github.com/LedgerHQ/ledgerjs for available transport providers
     */
    constructor(transport: Transport);
    /**
     * Returns the underlying transport
     */
    get transport(): Transport;
    /**
     * Event that is emitted right before the raw bytes are sent via the APDU transport
     * @param event the event name
     * @param listener the listener function
     */
    on(event: 'send', listener: (data: string) => void): this;
    /**
     * Emits the raw bytes received from the APDU transport in response to a request
     * @param event the event name
     * @param listener the listener function
     */
    on(event: 'receive', listener: (data: string) => void): this;
    /**
     * Retrieves the current version of the application running
     * on the ledger device
     */
    getVersion(): Promise<{
        major: number;
        minor: number;
        patch: number;
    }>;
    /**
     * Returns if the application running on the ledger is a debug build
     */
    isDebug(): Promise<boolean>;
    /**
     * Retrieves the current identification bytes of the application
     * running on the ledger device
     */
    getIdent(): Promise<string>;
    /**
     * Retrieves the public keys from the connected ledger device
     * @param confirm whether the device will prompt the user to confirm their actions (to disable, must be running a DEBUG build)
     */
    getPublicKeys(confirm?: boolean): Promise<{
        spend: string;
        view: string;
    }>;
    /**
     * Retrieves the private view key from the connected ledger device
     * @param confirm whether the device will prompt the user to confirm their actions (to disable, must be running a DEBUG build)
     */
    getPrivateViewKey(confirm?: boolean): Promise<string>;
    /**
     * Retrieves the private spend key from the connected ledger device
     * !! WARNING !! Retrieving the private spend key from the device
     * may result in a complete loss of funds as the private spend key
     * should normally remain on the device and never leave
     *
     * @param confirm whether the device will prompt the user to confirm their actions (to disable, must be running a DEBUG build)
     */
    getPrivateSpendKey(confirm?: boolean): Promise<string>;
    /**
     * Calculates the public key for the given private key
     * @param private_key the private key
     */
    privateToPublic(private_key: string): Promise<string>;
    /**
     * Generates a random key pair on the connected device
     */
    getRandomKeyPair(): Promise<{
        public: string;
        private: string;
    }>;
    /**
     * Gets the public wallet address from the connected device
     * @param confirm whether the device will prompt the user to confirm their actions (to disable, must be running a DEBUG build)
     */
    getAddress(confirm?: boolean): Promise<string>;
    /**
     * Generates a key image on the device using the supplied parameters
     * @param tx_public_key the transaction public key
     * @param output_index the index of the given output in the transaction
     * @param output_key the key of the given output in the transaction
     * @param confirm whether the device will prompt the user to confirm their actions (to disable, must be running a DEBUG build)
     */
    generateKeyImage(tx_public_key: string, output_index: number, output_key: string, confirm?: boolean): Promise<string>;
    /**
     * Completes the given ring signature for using the supplied parameters
     * @param tx_public_key the transaction public key of the input used
     * @param output_index the index of the given output in the transaction of the input used
     * @param output_key the key of the given output in the transaction of the input used
     * @param k the random scalar returned by preparing the signatures before completion
     * @param signature the incomplete ring signature for the given input
     * @param confirm whether the device will prompt the user to confirm their actions (to disable, must be running a DEBUG build)
     */
    completeRingSignature(tx_public_key: string, output_index: number, output_key: string, k: string, signature: string, confirm?: boolean): Promise<string>;
    /**
     * Generates the ring signatures for the given inputs on the ledger device
     * without revealing the private spend key
     * @param tx_public_key the transaction public key of input being spent
     * @param output_index the index of the input being spent in the transaction
     * @param output_key the output key of the input being spent
     * @param tx_prefix_hash our transaction prefix hash
     * @param input_keys the ring participant keys (mixins + us)
     * @param real_output_index the index of the real output in the input_keys
     * @param confirm whether the device will prompt the user to confirm their actions (to disable, must be running a DEBUG build)
     */
    generateRingSignatures(tx_public_key: string, output_index: number, output_key: string, tx_prefix_hash: string, input_keys: string[], real_output_index: number, confirm?: boolean): Promise<string[]>;
    /**
     * Generates a signature of the message digest using the private spend key stored
     * on the ledger device without revealing the private spend key
     * @param message_digest the message digest (hash)
     * @param confirm whether the device will prompt the user to confirm their actions (to disable, must be running a DEBUG build)
     */
    generateSignature(message_digest: string, confirm?: boolean): Promise<string>;
    /**
     * Generates the transaction key derivation using the private view key stored
     * on the ledger device
     * @param tx_public_key the transactions public key
     * @param confirm whether the device will prompt the user to confirm their actions (to disable, must be running a DEBUG build)
     */
    generateKeyDerivation(tx_public_key: string, confirm?: boolean): Promise<string>;
    /**
     * Generates the public ephemeral of the given output in a transaction
     * @param derivation the key derivation
     * @param output_index the index of the output in the transaction
     * @param confirm whether the device will prompt the user to confirm their actions (to disable, must be running a DEBUG build)
     */
    derivePublicKey(derivation: string, output_index: number, confirm?: boolean): Promise<string>;
    /**
     * Generates the private ephemeral of the given output in a transaction
     * @param derivation the key derivation
     * @param output_index the index of the output in the transaction
     * @param confirm whether the device will prompt the user to confirm their actions (to disable, must be running a DEBUG build)
     */
    deriveSecretKey(derivation: string, output_index: number, confirm?: boolean): Promise<string>;
    /**
     * Checks a given signature using the supplied public key for validity
     * @param message_digest the message digest (hash)
     * @param public_key the public key of the private key used to sign the transaction
     * @param signature the signature to validate
     */
    checkSignature(message_digest: string, public_key: string, signature: string): Promise<boolean>;
    /**
     * Checks the ring signatures given for their validity to verify that the proper
     * private key was used for signing purposes
     * @param tx_prefix_hash the transaction prefix hash
     * @param key_image the key image spent in the input
     * @param public_keys the ring participant keys
     * @param signatures the signatures to verify
     */
    checkRingSignatures(tx_prefix_hash: string, key_image: string, public_keys: string[], signatures: string[]): Promise<boolean>;
    /**
     * Resets the keys on the ledger device the same way that they
     * are first initialized on the device
     * @param confirm
     */
    resetKeys(confirm?: boolean): Promise<void>;
    /**
     * Exchanges an APDU with the connected device
     * @param command the command to send
     * @param confirm whether the device will prompt the user to confirm their actions (to disable, must be running a DEBUG build)
     * @param data any data that must be included in the payload for the given command
     */
    private exchange;
}