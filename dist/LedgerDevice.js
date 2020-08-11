"use strict";
// Copyright (c) 2018-2020, The TurtleCoin Developers
//
// Please see the included LICENSE file for more information.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LedgerDevice = exports.LedgerWalletTypes = void 0;
const bytestream_helper_1 = require("bytestream-helper");
const events_1 = require("events");
const Transaction_1 = require("./Transaction");
/** @ignore */
const config = require('../config.json');
var LedgerWalletTypes;
(function (LedgerWalletTypes) {
    /** @ignore */
    let APDU;
    (function (APDU) {
        APDU[APDU["P2"] = 0] = "P2";
        APDU[APDU["P1_NON_CONFIRM"] = 0] = "P1_NON_CONFIRM";
        APDU[APDU["P1_CONFIRM"] = 1] = "P1_CONFIRM";
        APDU[APDU["INS"] = 224] = "INS";
    })(APDU = LedgerWalletTypes.APDU || (LedgerWalletTypes.APDU = {}));
    let TransactionState;
    (function (TransactionState) {
        TransactionState[TransactionState["INACTIVE"] = 0] = "INACTIVE";
        TransactionState[TransactionState["READY"] = 1] = "READY";
        TransactionState[TransactionState["RECEIVING_INPUTS"] = 2] = "RECEIVING_INPUTS";
        TransactionState[TransactionState["INPUTS_RECEIVED"] = 3] = "INPUTS_RECEIVED";
        TransactionState[TransactionState["RECEIVING_OUTPUTS"] = 4] = "RECEIVING_OUTPUTS";
        TransactionState[TransactionState["OUTPUTS_RECEIVED"] = 5] = "OUTPUTS_RECEIVED";
        TransactionState[TransactionState["PREFIX_READY"] = 6] = "PREFIX_READY";
        TransactionState[TransactionState["COMPLETE"] = 7] = "COMPLETE";
    })(TransactionState = LedgerWalletTypes.TransactionState || (LedgerWalletTypes.TransactionState = {}));
    /**
     * Represents the APDU command types available in the TurtleCoin application
     * for ledger hardware wallets
     */
    let CMD;
    (function (CMD) {
        CMD[CMD["VERSION"] = 1] = "VERSION";
        CMD[CMD["DEBUG"] = 2] = "DEBUG";
        CMD[CMD["IDENT"] = 5] = "IDENT";
        CMD[CMD["PUBLIC_KEYS"] = 16] = "PUBLIC_KEYS";
        CMD[CMD["VIEW_SECRET_KEY"] = 17] = "VIEW_SECRET_KEY";
        CMD[CMD["SPEND_ESECRET_KEY"] = 18] = "SPEND_ESECRET_KEY";
        CMD[CMD["CHECK_KEY"] = 22] = "CHECK_KEY";
        CMD[CMD["CHECK_SCALAR"] = 23] = "CHECK_SCALAR";
        CMD[CMD["PRIVATE_TO_PUBLIC"] = 24] = "PRIVATE_TO_PUBLIC";
        CMD[CMD["RANDOM_KEY_PAIR"] = 25] = "RANDOM_KEY_PAIR";
        CMD[CMD["ADDRESS"] = 48] = "ADDRESS";
        CMD[CMD["GENERATE_KEY_IMAGE"] = 64] = "GENERATE_KEY_IMAGE";
        CMD[CMD["GENERATE_RING_SIGNATURES"] = 80] = "GENERATE_RING_SIGNATURES";
        CMD[CMD["COMPLETE_RING_SIGNATURE"] = 81] = "COMPLETE_RING_SIGNATURE";
        CMD[CMD["CHECK_RING_SIGNATURES"] = 82] = "CHECK_RING_SIGNATURES";
        CMD[CMD["GENERATE_SIGNATURE"] = 85] = "GENERATE_SIGNATURE";
        CMD[CMD["CHECK_SIGNATURE"] = 86] = "CHECK_SIGNATURE";
        CMD[CMD["GENERATE_KEY_DERIVATION"] = 96] = "GENERATE_KEY_DERIVATION";
        CMD[CMD["DERIVE_PUBLIC_KEY"] = 97] = "DERIVE_PUBLIC_KEY";
        CMD[CMD["DERIVE_SECRET_KEY"] = 98] = "DERIVE_SECRET_KEY";
        CMD[CMD["TX_STATE"] = 112] = "TX_STATE";
        CMD[CMD["TX_START"] = 113] = "TX_START";
        CMD[CMD["TX_START_INPUT_LOAD"] = 114] = "TX_START_INPUT_LOAD";
        CMD[CMD["TX_LOAD_INPUT"] = 115] = "TX_LOAD_INPUT";
        CMD[CMD["TX_START_OUTPUT_LOAD"] = 116] = "TX_START_OUTPUT_LOAD";
        CMD[CMD["TX_LOAD_OUTPUT"] = 117] = "TX_LOAD_OUTPUT";
        CMD[CMD["TX_FINALIZE_TX_PREFIX"] = 118] = "TX_FINALIZE_TX_PREFIX";
        CMD[CMD["TX_SIGN"] = 119] = "TX_SIGN";
        CMD[CMD["TX_DUMP"] = 120] = "TX_DUMP";
        CMD[CMD["TX_RESET"] = 121] = "TX_RESET";
        CMD[CMD["RESET_KEYS"] = 255] = "RESET_KEYS";
    })(CMD = LedgerWalletTypes.CMD || (LedgerWalletTypes.CMD = {}));
    /**
     * Represents the possible errors returned by the application
     * on the ledger device
     */
    let ErrorCode;
    (function (ErrorCode) {
        ErrorCode[ErrorCode["OK"] = 36864] = "OK";
        ErrorCode[ErrorCode["ERR_OP_NOT_PERMITTED"] = 16384] = "ERR_OP_NOT_PERMITTED";
        ErrorCode[ErrorCode["ERR_OP_USER_REQUIRED"] = 16385] = "ERR_OP_USER_REQUIRED";
        ErrorCode[ErrorCode["ERR_UNKNOWN_ERROR"] = 17476] = "ERR_UNKNOWN_ERROR";
        ErrorCode[ErrorCode["ERR_VARINT_DATA_RANGE"] = 24576] = "ERR_VARINT_DATA_RANGE";
        ErrorCode[ErrorCode["ERR_PRIVATE_SPEND"] = 37888] = "ERR_PRIVATE_SPEND";
        ErrorCode[ErrorCode["ERR_PRIVATE_VIEW"] = 37889] = "ERR_PRIVATE_VIEW";
        ErrorCode[ErrorCode["ERR_RESET_KEYS"] = 37890] = "ERR_RESET_KEYS";
        ErrorCode[ErrorCode["ERR_ADDRESS"] = 37968] = "ERR_ADDRESS";
        ErrorCode[ErrorCode["ERR_KEY_DERIVATION"] = 38144] = "ERR_KEY_DERIVATION";
        ErrorCode[ErrorCode["ERR_DERIVE_PUBKEY"] = 38145] = "ERR_DERIVE_PUBKEY";
        ErrorCode[ErrorCode["ERR_PUBKEY_MISMATCH"] = 38146] = "ERR_PUBKEY_MISMATCH";
        ErrorCode[ErrorCode["ERR_DERIVE_SECKEY"] = 38147] = "ERR_DERIVE_SECKEY";
        ErrorCode[ErrorCode["ERR_KECCAK"] = 38148] = "ERR_KECCAK";
        ErrorCode[ErrorCode["ERR_COMPLETE_RING_SIG"] = 38149] = "ERR_COMPLETE_RING_SIG";
        ErrorCode[ErrorCode["ERR_GENERATE_KEY_IMAGE"] = 38150] = "ERR_GENERATE_KEY_IMAGE";
        ErrorCode[ErrorCode["ERR_SECKEY_TO_PUBKEY"] = 38151] = "ERR_SECKEY_TO_PUBKEY";
    })(ErrorCode = LedgerWalletTypes.ErrorCode || (LedgerWalletTypes.ErrorCode = {}));
})(LedgerWalletTypes = exports.LedgerWalletTypes || (exports.LedgerWalletTypes = {}));
/**
 * An easy to use interface that uses a Ledger HW transport to communicate with
 * the TurtleCoin application running on a ledger device.
 * Please see. See https://github.com/LedgerHQ/ledgerjs for available transport providers
 */
class LedgerDevice extends events_1.EventEmitter {
    /**
     * Creates a new instance of the Ledger interface
     * The transport MUST be connected already before passing to this constructor
     * @param transport See https://github.com/LedgerHQ/ledgerjs for available transport providers
     */
    constructor(transport) {
        super();
        this.m_transport = transport;
    }
    /**
     * Returns the underlying transport
     */
    get transport() {
        return this.m_transport;
    }
    /** @ignore */
    on(event, listener) {
        return super.on(event, listener);
    }
    /**
     * Retrieves the current version of the application running
     * on the ledger device
     */
    getVersion() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.exchange(LedgerWalletTypes.CMD.VERSION);
            return {
                major: result.uint8_t().toJSNumber(),
                minor: result.uint8_t().toJSNumber(),
                patch: result.uint8_t().toJSNumber()
            };
        });
    }
    /**
     * Returns if the application running on the ledger is a debug build
     */
    isDebug() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.exchange(LedgerWalletTypes.CMD.DEBUG);
            return (result.uint8_t().toJSNumber() === 1);
        });
    }
    /**
     * Retrieves the current identification bytes of the application
     * running on the ledger device
     */
    getIdent() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.exchange(LedgerWalletTypes.CMD.IDENT);
            return result.unreadBuffer.toString('hex');
        });
    }
    /**
     * Checks to confirm that the key is a valid public key
     * @param key the key to check
     */
    checkKey(key) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!isHex64(key)) {
                throw new Error('Malformed key supplied');
            }
            const writer = new bytestream_helper_1.Writer();
            writer.hash(key);
            const result = yield this.exchange(LedgerWalletTypes.CMD.CHECK_KEY, undefined, writer.buffer);
            return (result.uint8_t().toJSNumber() === 1);
        });
    }
    /**
     * Checks to confirm that the scalar is indeed a scalar value
     * @param scalar the scalar to check
     */
    checkScalar(scalar) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!isHex64(scalar)) {
                throw new Error('Malformed key supplied');
            }
            const writer = new bytestream_helper_1.Writer();
            writer.hash(scalar);
            const result = yield this.exchange(LedgerWalletTypes.CMD.CHECK_SCALAR, undefined, writer.buffer);
            return (result.uint8_t().toJSNumber() === 1);
        });
    }
    /**
     * Retrieves the public keys from the connected ledger device
     * @param confirm whether the device will prompt the user to confirm their actions
     *        (to disable, must be running a DEBUG build)
     */
    getPublicKeys(confirm = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.exchange(LedgerWalletTypes.CMD.PUBLIC_KEYS, confirm);
            return {
                spend: result.hash(),
                view: result.hash()
            };
        });
    }
    /**
     * Retrieves the private view key from the connected ledger device
     * @param confirm whether the device will prompt the user to confirm their actions
     *        (to disable, must be running a DEBUG build)
     */
    getPrivateViewKey(confirm = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.exchange(LedgerWalletTypes.CMD.VIEW_SECRET_KEY, confirm);
            return result.hash();
        });
    }
    /**
     * Retrieves the private spend key from the connected ledger device
     * !! WARNING !! Retrieving the private spend key from the device
     * may result in a complete loss of funds as the private spend key
     * should normally remain on the device and never leave
     *
     * @param confirm whether the device will prompt the user to confirm their actions
     *        (to disable, must be running a DEBUG build)
     */
    getPrivateSpendKey(confirm = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.exchange(LedgerWalletTypes.CMD.SPEND_ESECRET_KEY, confirm);
            return result.hash();
        });
    }
    /**
     * Calculates the public key for the given private key
     * @param private_key the private key
     */
    privateToPublic(private_key) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!isHex64(private_key)) {
                throw new Error('Malformed private_key supplied');
            }
            const writer = new bytestream_helper_1.Writer();
            writer.hash(private_key);
            const result = yield this.exchange(LedgerWalletTypes.CMD.PRIVATE_TO_PUBLIC, undefined, writer.buffer);
            return result.hash();
        });
    }
    /**
     * Generates a random key pair on the connected device
     */
    getRandomKeyPair() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.exchange(LedgerWalletTypes.CMD.RANDOM_KEY_PAIR);
            return {
                public: result.hash(),
                private: result.hash()
            };
        });
    }
    /**
     * Gets the public wallet address from the connected device
     * @param confirm whether the device will prompt the user to confirm their actions
     *        (to disable, must be running a DEBUG build)
     */
    getAddress(confirm = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.exchange(LedgerWalletTypes.CMD.ADDRESS, confirm);
            return result.unreadBuffer.toString();
        });
    }
    /**
     * Generates a key image on the device using the supplied parameters
     * @param tx_public_key the transaction public key
     * @param output_index the index of the given output in the transaction
     * @param output_key the key of the given output in the transaction
     * @param confirm whether the device will prompt the user to confirm their actions
     *        (to disable, must be running a DEBUG build)
     */
    generateKeyImage(tx_public_key, output_index, output_key, confirm = true) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!isHex64(tx_public_key)) {
                throw new Error('Malformed tx_public_key supplied');
            }
            if (output_index < 0) {
                throw new Error('output_index must be >= 0');
            }
            if (!isHex64(output_key)) {
                throw new Error('Malformed output_key supplied');
            }
            const writer = new bytestream_helper_1.Writer();
            writer.hash(tx_public_key);
            writer.uint32_t(output_index, true);
            writer.hash(output_key);
            const result = yield this.exchange(LedgerWalletTypes.CMD.GENERATE_KEY_IMAGE, confirm, writer.buffer);
            return result.hash();
        });
    }
    /**
     * Completes the given ring signature for using the supplied parameters
     * @param tx_public_key the transaction public key of the input used
     * @param output_index the index of the given output in the transaction of the input used
     * @param output_key the key of the given output in the transaction of the input used
     * @param k the random scalar returned by preparing the signatures before completion
     * @param signature the incomplete ring signature for the given input
     * @param confirm whether the device will prompt the user to confirm their actions
     *        (to disable, must be running a DEBUG build)
     */
    completeRingSignature(tx_public_key, output_index, output_key, k, signature, confirm = true) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!isHex64(tx_public_key)) {
                throw new Error('Malformed tx_public_key supplied');
            }
            if (output_index < 0) {
                throw new Error('output_index must be >= 0');
            }
            if (!isHex64(output_key)) {
                throw new Error('Malformed output_key supplied');
            }
            if (!isHex64(k)) {
                throw new Error('Malformed k supplied');
            }
            if (!isHex128(signature)) {
                throw new Error('Malformed signature supplied');
            }
            const writer = new bytestream_helper_1.Writer();
            writer.hash(tx_public_key);
            writer.uint32_t(output_index, true);
            writer.hash(output_key);
            writer.hash(k);
            writer.hex(signature);
            const result = yield this.exchange(LedgerWalletTypes.CMD.COMPLETE_RING_SIGNATURE, confirm, writer.buffer);
            return result.hex(64);
        });
    }
    /**
     * Generates the ring signatures for the given inputs on the ledger device
     * without revealing the private spend key
     * @param tx_public_key the transaction public key of input being spent
     * @param output_index the index of the input being spent in the transaction
     * @param output_key the output key of the input being spent
     * @param tx_prefix_hash our transaction prefix hash
     * @param input_keys the ring participant keys (mixins + us)
     * @param real_output_index the index of the real output in the input_keys
     * @param confirm whether the device will prompt the user to confirm their actions
     *        (to disable, must be running a DEBUG build)
     */
    generateRingSignatures(tx_public_key, output_index, output_key, tx_prefix_hash, input_keys, real_output_index, confirm = true) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!isHex64(tx_public_key)) {
                throw new Error('Malformed tx_public_key supplied');
            }
            if (output_index < 0) {
                throw new Error('output_index must be >= 0');
            }
            if (!isHex64(output_key)) {
                throw new Error('Malformed output_key supplied');
            }
            if (!isHex64(tx_prefix_hash)) {
                throw new Error('Malformed tx_prefix_hash supplied');
            }
            if (real_output_index < 0) {
                throw new Error('real_output_index must be >= 0');
            }
            if (input_keys.length === 0) {
                throw new Error('Must supply at least one input_key');
            }
            for (const key of input_keys) {
                if (!isHex64(key)) {
                    throw new Error('Malformed input_key supplied');
                }
            }
            const signatures = [];
            const writer = new bytestream_helper_1.Writer();
            writer.hash(tx_public_key);
            writer.uint32_t(output_index, true);
            writer.hash(output_key);
            writer.hash(tx_prefix_hash);
            for (const input of input_keys) {
                writer.hash(input);
            }
            writer.uint32_t(real_output_index, true);
            const result = yield this.exchange(LedgerWalletTypes.CMD.GENERATE_RING_SIGNATURES, confirm, writer.buffer);
            if (result.length % 64 !== 0) {
                throw new Error('Data returned does not appear to be a set of signatures');
            }
            while (result.unreadBytes > 0) {
                signatures.push(result.hex(64));
            }
            if (signatures.length !== input_keys.length) {
                throw new Error('Returned signature count does not match the number of input keys supplied');
            }
            return signatures;
        });
    }
    /**
     * Generates a signature of the message digest using the private spend key stored
     * on the ledger device without revealing the private spend key
     * @param message_digest the message digest (hash)
     * @param confirm whether the device will prompt the user to confirm their actions
     *        (to disable, must be running a DEBUG build)
     */
    generateSignature(message_digest, confirm = true) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!isHex64(message_digest)) {
                throw new Error('Malformed message_digest supplied');
            }
            const writer = new bytestream_helper_1.Writer();
            writer.hash(message_digest);
            const result = yield this.exchange(LedgerWalletTypes.CMD.GENERATE_SIGNATURE, confirm, writer.buffer);
            if (result.length !== 64) {
                throw new Error('Data returned does not appear to be a signature');
            }
            return result.hex(64);
        });
    }
    /**
     * Generates the transaction key derivation using the private view key stored
     * on the ledger device
     * @param tx_public_key the transactions public key
     * @param confirm whether the device will prompt the user to confirm their actions
     *        (to disable, must be running a DEBUG build)
     */
    generateKeyDerivation(tx_public_key, confirm = true) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!isHex64(tx_public_key)) {
                throw new Error('Malformed tx_public_key supplied');
            }
            const writer = new bytestream_helper_1.Writer();
            writer.hash(tx_public_key);
            const result = yield this.exchange(LedgerWalletTypes.CMD.GENERATE_KEY_DERIVATION, confirm, writer.buffer);
            return result.hash();
        });
    }
    /**
     * Generates the public ephemeral of the given output in a transaction
     * @param derivation the key derivation
     * @param output_index the index of the output in the transaction
     * @param confirm whether the device will prompt the user to confirm their actions
     *        (to disable, must be running a DEBUG build)
     */
    derivePublicKey(derivation, output_index, confirm = true) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!isHex64(derivation)) {
                throw new Error('Malformed derivation supplied');
            }
            if (output_index < 0) {
                throw new Error('output_index must be >= 0');
            }
            const writer = new bytestream_helper_1.Writer();
            writer.hash(derivation);
            writer.uint32_t(output_index, true);
            const result = yield this.exchange(LedgerWalletTypes.CMD.DERIVE_PUBLIC_KEY, confirm, writer.buffer);
            return result.hash();
        });
    }
    /**
     * Generates the private ephemeral of the given output in a transaction
     * @param derivation the key derivation
     * @param output_index the index of the output in the transaction
     * @param confirm whether the device will prompt the user to confirm their actions
     *        (to disable, must be running a DEBUG build)
     */
    deriveSecretKey(derivation, output_index, confirm = true) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!isHex64(derivation)) {
                throw new Error('Malformed derivation supplied');
            }
            if (output_index < 0) {
                throw new Error('output_index must be >= 0');
            }
            const writer = new bytestream_helper_1.Writer();
            writer.hash(derivation);
            writer.uint32_t(output_index, true);
            const result = yield this.exchange(LedgerWalletTypes.CMD.DERIVE_SECRET_KEY, confirm, writer.buffer);
            return result.hash();
        });
    }
    /**
     * Checks a given signature using the supplied public key for validity
     * @param message_digest the message digest (hash)
     * @param public_key the public key of the private key used to sign the transaction
     * @param signature the signature to validate
     */
    checkSignature(message_digest, public_key, signature) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!isHex64(message_digest)) {
                throw new Error('Malformed message_disgest supplied');
            }
            if (!isHex64(public_key)) {
                throw new Error('Malformed public_key supplied');
            }
            if (!isHex128(signature)) {
                throw new Error('Malformed signature supplied');
            }
            const writer = new bytestream_helper_1.Writer();
            writer.hash(message_digest);
            writer.hash(public_key);
            writer.hex(signature);
            const result = yield this.exchange(LedgerWalletTypes.CMD.CHECK_SIGNATURE, undefined, writer.buffer);
            return (result.uint8_t().toJSNumber() === 1);
        });
    }
    /**
     * Checks the ring signatures given for their validity to verify that the proper
     * private key was used for signing purposes
     * @param tx_prefix_hash the transaction prefix hash
     * @param key_image the key image spent in the input
     * @param public_keys the ring participant keys
     * @param signatures the signatures to verify
     */
    checkRingSignatures(tx_prefix_hash, key_image, public_keys, signatures) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!isHex64(tx_prefix_hash)) {
                throw new Error('Malformed tx_prefix_hash supplied');
            }
            if (!isHex64(key_image)) {
                throw new Error('Malformed key_image supplied');
            }
            if (public_keys.length === 0) {
                throw new Error('Must supply at least one public_key');
            }
            if (signatures.length === 0) {
                throw new Error('Must supply at least one signature');
            }
            if (public_keys.length !== signatures.length) {
                throw new Error('The number of public_keys and signatures does not match');
            }
            for (const key of public_keys) {
                if (!isHex64(key)) {
                    throw new Error('Malformed public_key supplied');
                }
            }
            for (const sig of signatures) {
                if (!isHex128(sig)) {
                    throw new Error('Malformed signature supplied');
                }
            }
            const writer = new bytestream_helper_1.Writer();
            writer.hash(tx_prefix_hash);
            writer.hash(key_image);
            for (const key of public_keys) {
                writer.hash(key);
            }
            for (const sig of signatures) {
                writer.hex(sig);
            }
            const result = yield this.exchange(LedgerWalletTypes.CMD.CHECK_RING_SIGNATURES, undefined, writer.buffer);
            return (result.uint8_t().toJSNumber() === 1);
        });
    }
    /**
     * Resets the keys on the ledger device the same way that they
     * are first initialized on the device
     * @param confirm
     */
    resetKeys(confirm = true) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.exchange(LedgerWalletTypes.CMD.RESET_KEYS, confirm);
        });
    }
    /**
     * Retrieves the current state of the transaction construction process on the ledger device
     */
    transactionState() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.exchange(LedgerWalletTypes.CMD.TX_STATE, undefined);
            return result.uint8_t().toJSNumber();
        });
    }
    /**
     * Resets the transaction state of the transaction construction process on the ledger device
     */
    resetTransaction(confirm = true) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.exchange(LedgerWalletTypes.CMD.TX_RESET, confirm);
        });
    }
    /**
     * Starts a new transaction construction on the ledger device
     * @param unlock_time the unlock time (or block) of the transaction
     * @param input_count the number of inputs that will be included in the transaction
     * @param output_count the number of outputs that will be included in the transaction
     * @param tx_public_key the transaction public key
     * @param payment_id the transaction payment id if one needs to be included
     */
    startTransaction(unlock_time = 0, input_count = 0, output_count = 0, tx_public_key, payment_id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (input_count > 90 || input_count < 0) {
                throw new RangeError('input_count not in range');
            }
            if (output_count > 90 || output_count < 0) {
                throw new RangeError('output_count not in range');
            }
            if (!isHex64(tx_public_key)) {
                throw new Error('Malformed tx_public_key supplied');
            }
            if (payment_id) {
                if (!isHex64(payment_id)) {
                    throw new Error('Malformed payment_id supplied');
                }
            }
            const writer = new bytestream_helper_1.Writer();
            writer.uint64_t(unlock_time, true);
            writer.uint8_t(input_count);
            writer.uint8_t(output_count);
            writer.hash(tx_public_key);
            if (payment_id) {
                writer.uint8_t(1);
                writer.hash(payment_id);
            }
            else {
                writer.uint8_t(0);
            }
            yield this.exchange(LedgerWalletTypes.CMD.TX_START, undefined, writer.buffer);
        });
    }
    /**
     * Signals to the ledger that we are ready to start loading transaction inputs
     */
    startTransactionInputLoad() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.exchange(LedgerWalletTypes.CMD.TX_START_INPUT_LOAD, undefined);
        });
    }
    /**
     * Load a transaction input to the transaction construction process
     * @param input_tx_public_key the transaction public key of the input
     * @param input_output_index the output index of the transaction of the input
     * @param amount the amount of the input
     * @param public_keys the ring participant keys
     * @param offsets the RELATIVE offsets of the ring participant keys
     * @param real_output_index the index in the public_keys of the real output being spent
     */
    loadTransactionInput(input_tx_public_key, input_output_index, amount, public_keys, offsets, real_output_index) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!isHex64(input_tx_public_key)) {
                throw new Error('Malformed input_tx_public_key');
            }
            if (input_output_index > 255 || input_output_index < 0) {
                throw new RangeError('input_output_index out of range');
            }
            if (amount > config.maximumOutputAmount || amount < 0) {
                throw new RangeError('amount out of range');
            }
            if (public_keys.length !== 4) {
                throw new Error('Must supply four (4) public_key values');
            }
            for (const key of public_keys) {
                if (!isHex64(key)) {
                    throw new Error('Malformed public_key supplied');
                }
            }
            if (offsets.length !== 4) {
                throw new Error('Must supply four (4) offset values');
            }
            for (const offset of offsets) {
                if (offset < 0 || offset > 4294967295) {
                    throw new RangeError('offset value out of range');
                }
            }
            if (real_output_index > 3 || real_output_index < 0) {
                throw new RangeError('real_output_index out of range');
            }
            const writer = new bytestream_helper_1.Writer();
            writer.hash(input_tx_public_key);
            writer.uint8_t(input_output_index);
            writer.uint64_t(amount, true);
            for (const key of public_keys) {
                writer.hash(key);
            }
            for (const offset of offsets) {
                writer.uint32_t(offset, true);
            }
            writer.uint8_t(real_output_index);
            yield this.exchange(LedgerWalletTypes.CMD.TX_LOAD_INPUT, undefined, writer.buffer);
        });
    }
    /**
     * Signals to the ledger that we are ready to start loading transaction outputs
     */
    startTransactionOutputLoad() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.exchange(LedgerWalletTypes.CMD.TX_START_OUTPUT_LOAD, undefined);
        });
    }
    /**
     * Load a transaction output to the transaction construction process
     * @param amount the amount of the output
     * @param output_key the output key
     */
    loadTransactionOutput(amount, output_key) {
        return __awaiter(this, void 0, void 0, function* () {
            if (amount < 0 || amount > config.maximumOutputAmount) {
                throw new Error('amount out of range');
            }
            if (!isHex64(output_key)) {
                throw new Error('Malformed output_key supplied');
            }
            const writer = new bytestream_helper_1.Writer();
            writer.uint64_t(amount, true);
            writer.hash(output_key);
            yield this.exchange(LedgerWalletTypes.CMD.TX_LOAD_OUTPUT, undefined, writer.buffer);
        });
    }
    /**
     * Finalizes a transaction prefix
     */
    finalizeTransactionPrefix() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.exchange(LedgerWalletTypes.CMD.TX_FINALIZE_TX_PREFIX, undefined);
        });
    }
    /**
     * Instructs the ledger device to sign the transaction we have constructed
     */
    signTransaction(confirm = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.exchange(LedgerWalletTypes.CMD.TX_SIGN, confirm);
            return {
                hash: result.hash(),
                size: result.uint16_t(true).toJSNumber()
            };
        });
    }
    /**
     * Exports the completed full transaction that we constructed from the ledger device
     */
    retrieveTransaction() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = new bytestream_helper_1.Writer();
            while (response.length < config.maximumLedgerTransactionSize) {
                const writer = new bytestream_helper_1.Writer();
                writer.uint16_t(response.length, true);
                const result = yield this.exchange(LedgerWalletTypes.CMD.TX_DUMP, undefined, writer.buffer);
                // if we didn't receive any more data, then break out of the loop
                if (result.unreadBytes === 0) {
                    break;
                }
                response.write(result.unreadBuffer);
            }
            return Transaction_1.Transaction.from(response.buffer);
        });
    }
    /**
     * Exchanges an APDU with the connected device
     * @param command the command to send
     * @param confirm whether the device will prompt the user to confirm their actions
     *        (to disable, must be running a DEBUG build)
     * @param data any data that must be included in the payload for the given command
     */
    exchange(command, confirm = true, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const writer = new bytestream_helper_1.Writer();
            writer.uint8_t(LedgerWalletTypes.APDU.INS);
            writer.uint8_t(command);
            if (confirm) {
                writer.uint8_t(LedgerWalletTypes.APDU.P1_CONFIRM);
            }
            else {
                writer.uint8_t(LedgerWalletTypes.APDU.P1_NON_CONFIRM);
            }
            writer.uint8_t(LedgerWalletTypes.APDU.P2);
            if (data) {
                if (data.length > (512 - 6)) {
                    throw new Error('Data payload exceeds maximum size');
                }
                writer.uint16_t(data.length, true);
                writer.write(data);
            }
            else {
                writer.uint16_t(0);
            }
            this.emit('send', writer.blob);
            const result = yield this.m_transport.exchange(writer.buffer);
            this.emit('receive', (new bytestream_helper_1.Reader(result)).unreadBuffer.toString('hex'));
            const code = result.slice(result.length - 2);
            const response = new bytestream_helper_1.Reader(result.slice(0, result.length - code.length));
            const reader = new bytestream_helper_1.Reader(code);
            let errCode = reader.uint16_t(true).toJSNumber();
            if (errCode !== LedgerWalletTypes.ErrorCode.OK) {
                if (response.length >= 2) {
                    errCode = response.uint16_t(true).toJSNumber();
                }
                throw new Error('Could not complete request: ' + errCode);
            }
            return response;
        });
    }
}
exports.LedgerDevice = LedgerDevice;
/**
 * @ignore
 */
function isHex(value) {
    if (value.length % 2 !== 0) {
        return false;
    }
    const regex = new RegExp('^[0-9a-fA-F]{' + value.length + '}$');
    return regex.test(value);
}
/**
 * @ignore
 */
function isHex64(value) {
    return (isHex(value) && value.length === 64);
}
/**
 * @ignore
 */
function isHex128(value) {
    return (isHex(value) && value.length === 128);
}
