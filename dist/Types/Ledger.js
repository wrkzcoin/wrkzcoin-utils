"use strict";
// Copyright (c) 2020, The TurtleCoin Developers
// Copyright (c) 2026, The WrkzCoin Developers
//
// Please see the included LICENSE file for more information.
Object.defineProperty(exports, "__esModule", { value: true });
exports.LedgerTypes = void 0;
var LedgerTypes;
(function (LedgerTypes) {
    /** @ignore */
    let APDU;
    (function (APDU) {
        APDU[APDU["P2"] = 0] = "P2";
        APDU[APDU["P1_NON_CONFIRM"] = 0] = "P1_NON_CONFIRM";
        APDU[APDU["P1_CONFIRM"] = 1] = "P1_CONFIRM";
        APDU[APDU["INS"] = 224] = "INS";
    })(APDU = LedgerTypes.APDU || (LedgerTypes.APDU = {}));
    /**
     * Represents the current state of transaction construction on the device
     */
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
    })(TransactionState = LedgerTypes.TransactionState || (LedgerTypes.TransactionState = {}));
    /**
     * Represents the APDU command types available in the WrkzCoin application
     * for ledger hardware wallets
     */
    let Command;
    (function (Command) {
        Command[Command["VERSION"] = 1] = "VERSION";
        Command[Command["DEBUG"] = 2] = "DEBUG";
        Command[Command["IDENT"] = 5] = "IDENT";
        Command[Command["PUBLIC_KEYS"] = 16] = "PUBLIC_KEYS";
        Command[Command["VIEW_SECRET_KEY"] = 17] = "VIEW_SECRET_KEY";
        Command[Command["SPEND_SECRET_KEY"] = 18] = "SPEND_SECRET_KEY";
        Command[Command["WALLET_KEYS"] = 19] = "WALLET_KEYS";
        Command[Command["CHECK_KEY"] = 22] = "CHECK_KEY";
        Command[Command["CHECK_SCALAR"] = 23] = "CHECK_SCALAR";
        Command[Command["PRIVATE_TO_PUBLIC"] = 24] = "PRIVATE_TO_PUBLIC";
        Command[Command["RANDOM_KEY_PAIR"] = 25] = "RANDOM_KEY_PAIR";
        Command[Command["ADDRESS"] = 48] = "ADDRESS";
        Command[Command["GENERATE_KEY_IMAGE"] = 64] = "GENERATE_KEY_IMAGE";
        Command[Command["GENERATE_KEY_IMAGE_PRIMITIVE"] = 65] = "GENERATE_KEY_IMAGE_PRIMITIVE";
        Command[Command["GENERATE_RING_SIGNATURES"] = 80] = "GENERATE_RING_SIGNATURES";
        Command[Command["COMPLETE_RING_SIGNATURE"] = 81] = "COMPLETE_RING_SIGNATURE";
        Command[Command["CHECK_RING_SIGNATURES"] = 82] = "CHECK_RING_SIGNATURES";
        Command[Command["GENERATE_SIGNATURE"] = 85] = "GENERATE_SIGNATURE";
        Command[Command["CHECK_SIGNATURE"] = 86] = "CHECK_SIGNATURE";
        Command[Command["GENERATE_KEY_DERIVATION"] = 96] = "GENERATE_KEY_DERIVATION";
        Command[Command["DERIVE_PUBLIC_KEY"] = 97] = "DERIVE_PUBLIC_KEY";
        Command[Command["DERIVE_SECRET_KEY"] = 98] = "DERIVE_SECRET_KEY";
        Command[Command["TX_STATE"] = 112] = "TX_STATE";
        Command[Command["TX_START"] = 113] = "TX_START";
        Command[Command["TX_START_INPUT_LOAD"] = 114] = "TX_START_INPUT_LOAD";
        Command[Command["TX_LOAD_INPUT"] = 115] = "TX_LOAD_INPUT";
        Command[Command["TX_START_OUTPUT_LOAD"] = 116] = "TX_START_OUTPUT_LOAD";
        Command[Command["TX_LOAD_OUTPUT"] = 117] = "TX_LOAD_OUTPUT";
        Command[Command["TX_FINALIZE_TX_PREFIX"] = 118] = "TX_FINALIZE_TX_PREFIX";
        Command[Command["TX_SIGN"] = 119] = "TX_SIGN";
        Command[Command["TX_DUMP"] = 120] = "TX_DUMP";
        Command[Command["TX_RESET"] = 121] = "TX_RESET";
        Command[Command["RESET_KEYS"] = 255] = "RESET_KEYS";
    })(Command = LedgerTypes.Command || (LedgerTypes.Command = {}));
    /**
     * Represents the possible errors returned by the application
     * on the ledger device
     */
    let ErrorCode;
    (function (ErrorCode) {
        ErrorCode[ErrorCode["OK"] = 36864] = "OK";
        ErrorCode[ErrorCode["OP_OK"] = 0] = "OP_OK";
        ErrorCode[ErrorCode["OP_NOK"] = 1] = "OP_NOK";
        ErrorCode[ErrorCode["ERR_OP_NOT_PERMITTED"] = 16384] = "ERR_OP_NOT_PERMITTED";
        ErrorCode[ErrorCode["ERR_OP_USER_REQUIRED"] = 16385] = "ERR_OP_USER_REQUIRED";
        ErrorCode[ErrorCode["ERR_WRONG_INPUT_LENGTH"] = 16386] = "ERR_WRONG_INPUT_LENGTH";
        ErrorCode[ErrorCode["ERR_NVRAM_READ"] = 16387] = "ERR_NVRAM_READ";
        ErrorCode[ErrorCode["ERR_UNKNOWN_ERROR"] = 17476] = "ERR_UNKNOWN_ERROR";
        ErrorCode[ErrorCode["ERR_VARINT_DATA_RANGE"] = 24576] = "ERR_VARINT_DATA_RANGE";
        ErrorCode[ErrorCode["ERR_OUT_OF_RANGE"] = 24577] = "ERR_OUT_OF_RANGE";
        ErrorCode[ErrorCode["ERR_TRANSACTION_STATE"] = 25856] = "ERR_TRANSACTION_STATE";
        ErrorCode[ErrorCode["ERR_TX_RESET"] = 25857] = "ERR_TX_RESET";
        ErrorCode[ErrorCode["ERR_TX_START"] = 25858] = "ERR_TX_START";
        ErrorCode[ErrorCode["ERR_TX_LOAD_INPUT"] = 25859] = "ERR_TX_LOAD_INPUT";
        ErrorCode[ErrorCode["ERR_TX_LOAD_OUTPUT"] = 25860] = "ERR_TX_LOAD_OUTPUT";
        ErrorCode[ErrorCode["ERR_TX_SIGN"] = 25861] = "ERR_TX_SIGN";
        ErrorCode[ErrorCode["ERR_TX_INPUT_OUTPUT_OUT_OF_RANGE"] = 25862] = "ERR_TX_INPUT_OUTPUT_OUT_OF_RANGE";
        ErrorCode[ErrorCode["ERR_TX_FINALIZE_PREFIX"] = 25863] = "ERR_TX_FINALIZE_PREFIX";
        ErrorCode[ErrorCode["ERR_TX_DUMP"] = 25864] = "ERR_TX_DUMP";
        ErrorCode[ErrorCode["ERR_TX_INIT"] = 25865] = "ERR_TX_INIT";
        ErrorCode[ErrorCode["ERR_TX_AMOUNT"] = 25872] = "ERR_TX_AMOUNT";
        ErrorCode[ErrorCode["ERR_PRIVATE_SPEND"] = 37888] = "ERR_PRIVATE_SPEND";
        ErrorCode[ErrorCode["ERR_PRIVATE_VIEW"] = 37889] = "ERR_PRIVATE_VIEW";
        ErrorCode[ErrorCode["ERR_RESET_KEYS"] = 37890] = "ERR_RESET_KEYS";
        ErrorCode[ErrorCode["ERR_ADDRESS"] = 37968] = "ERR_ADDRESS";
        ErrorCode[ErrorCode["ERR_BASE58"] = 37969] = "ERR_BASE58";
        ErrorCode[ErrorCode["ERR_KEY_DERIVATION"] = 38144] = "ERR_KEY_DERIVATION";
        ErrorCode[ErrorCode["ERR_DERIVE_PUBKEY"] = 38145] = "ERR_DERIVE_PUBKEY";
        ErrorCode[ErrorCode["ERR_PUBKEY_MISMATCH"] = 38146] = "ERR_PUBKEY_MISMATCH";
        ErrorCode[ErrorCode["ERR_DERIVE_SECKEY"] = 38147] = "ERR_DERIVE_SECKEY";
        ErrorCode[ErrorCode["ERR_KECCAK"] = 38148] = "ERR_KECCAK";
        ErrorCode[ErrorCode["ERR_COMPLETE_RING_SIG"] = 38149] = "ERR_COMPLETE_RING_SIG";
        ErrorCode[ErrorCode["ERR_GENERATE_KEY_IMAGE"] = 38150] = "ERR_GENERATE_KEY_IMAGE";
        ErrorCode[ErrorCode["ERR_SECKEY_TO_PUBKEY"] = 38151] = "ERR_SECKEY_TO_PUBKEY";
        ErrorCode[ErrorCode["ERR_GENERATE_RING_SIGS"] = 38152] = "ERR_GENERATE_RING_SIGS";
        ErrorCode[ErrorCode["ERR_GENERATE_SIGNATURE"] = 38153] = "ERR_GENERATE_SIGNATURE";
        ErrorCode[ErrorCode["ERR_PRIVATE_TO_PUBLIC"] = 38160] = "ERR_PRIVATE_TO_PUBLIC";
        ErrorCode[ErrorCode["ERR_INPUT_NOT_IN_SET"] = 38161] = "ERR_INPUT_NOT_IN_SET";
        ErrorCode[ErrorCode["ERR_NOT_PUBLIC_KEY"] = 38162] = "ERR_NOT_PUBLIC_KEY";
        ErrorCode[ErrorCode["ERR_CHECK_RING_SIGS"] = 38163] = "ERR_CHECK_RING_SIGS";
        ErrorCode[ErrorCode["ERR_GE_FROMBYTES_VARTIME"] = 38164] = "ERR_GE_FROMBYTES_VARTIME";
        ErrorCode[ErrorCode["ERR_DERIVATION_TO_SCALAR"] = 38165] = "ERR_DERIVATION_TO_SCALAR";
        ErrorCode[ErrorCode["ERR_GE_SCALARMULT"] = 38166] = "ERR_GE_SCALARMULT";
        ErrorCode[ErrorCode["ERR_CHECK_KEY"] = 38167] = "ERR_CHECK_KEY";
        ErrorCode[ErrorCode["ERR_CHECK_SCALAR"] = 38168] = "ERR_CHECK_SCALAR";
        ErrorCode[ErrorCode["ERR_CHECK_SIGNATURE"] = 38169] = "ERR_CHECK_SIGNATURE";
    })(ErrorCode = LedgerTypes.ErrorCode || (LedgerTypes.ErrorCode = {}));
    /**
     * Represents an error specific to the ledger wallet interactions
     */
    class LedgerError extends Error {
        /**
         * Constructs a new LedgerError instance
         * @param errCode the error code
         * @param message the standard message supplied to an Error constructor
         */
        constructor(errCode, message) {
            super(message);
            this.m_errCode = errCode;
        }
        /**
         * Supplies a more descriptive form of the error encountered
         */
        get description() {
            switch (this.m_errCode) {
                case ErrorCode.OP_OK:
                    return 'Operation completed successfully.';
                case ErrorCode.OP_NOK:
                    return 'Operation failed to complete.';
                case ErrorCode.ERR_OP_NOT_PERMITTED:
                    return 'The user refused the completion of this operation on the device.';
                case ErrorCode.ERR_OP_USER_REQUIRED:
                    return 'User confirmation must be requested for this operation.';
                case ErrorCode.ERR_WRONG_INPUT_LENGTH:
                    return 'The input data supplied is of an incorrect length required.';
                case ErrorCode.ERR_NVRAM_READ:
                    return 'There was an error reading information from device NVRAM.';
                case ErrorCode.ERR_UNKNOWN_ERROR:
                    return 'An unknown error occurred.';
                case ErrorCode.ERR_VARINT_DATA_RANGE:
                    return 'The data provided could not be encoded or decoded given the maximum buffer length.';
                case ErrorCode.ERR_OUT_OF_RANGE:
                    return 'The value supplied exceeds the permitted range of such values.';
                case ErrorCode.ERR_TRANSACTION_STATE:
                    return 'The device is currently in a transaction construction state and this operation is ' +
                        'prohibited at this time.';
                case ErrorCode.ERR_TX_RESET:
                    return 'Could not reset the transaction state. Please close and re-open the application' +
                        ' on the device.';
                case ErrorCode.ERR_TX_START:
                    return 'Could not initiate a transaction construction process on the device.';
                case ErrorCode.ERR_TX_LOAD_INPUT:
                    return 'Could not load the transaction input to the device.';
                case ErrorCode.ERR_TX_LOAD_OUTPUT:
                    return 'Could not load the transaction output to the device.';
                case ErrorCode.ERR_TX_SIGN:
                    return 'Could not sign the transaction on the device.';
                case ErrorCode.ERR_TX_INPUT_OUTPUT_OUT_OF_RANGE:
                    return 'The output index of the input supplied exceeds the allowable device range.';
                case ErrorCode.ERR_TX_FINALIZE_PREFIX:
                    return 'Could not finalize the transaction prefix on the device.';
                case ErrorCode.ERR_TX_DUMP:
                    return 'Could not export the completed transaction from the device.';
                case ErrorCode.ERR_TX_INIT:
                    return 'Could not reset transaction state tracking information on the device.';
                case ErrorCode.ERR_TX_AMOUNT:
                    return 'Could not process the amount value supplied.';
                case ErrorCode.ERR_PRIVATE_SPEND:
                    return 'Could not access the private spend key on the device.';
                case ErrorCode.ERR_PRIVATE_VIEW:
                    return 'Could not access the private view key on the device.';
                case ErrorCode.ERR_RESET_KEYS:
                    return 'Could not reset the wallet keys on the device.';
                case ErrorCode.ERR_ADDRESS:
                    return 'Could not access the public wallet address of the device.';
                case ErrorCode.ERR_BASE58:
                    return 'Error encountered encoding the public keys to a Base58 wallet address.';
                case ErrorCode.ERR_KEY_DERIVATION:
                    return 'Could not generate key derivation.';
                case ErrorCode.ERR_DERIVE_PUBKEY:
                    return 'Could not derive public key.';
                case ErrorCode.ERR_PUBKEY_MISMATCH:
                    return 'The public key supplied does not match the calculated public key.';
                case ErrorCode.ERR_DERIVE_SECKEY:
                    return 'Could not derive the private key.';
                case ErrorCode.ERR_KECCAK:
                    return 'Error encountered performing Keccak hashing method on device.';
                case ErrorCode.ERR_COMPLETE_RING_SIG:
                    return 'Error encountered completing the ring signatures for the supplied values.';
                case ErrorCode.ERR_GENERATE_KEY_IMAGE:
                    return 'Error encountered generating a key image using the supplied values.';
                case ErrorCode.ERR_SECKEY_TO_PUBKEY:
                    return 'Error encountered calculating the public key for the supplied private key.';
                case ErrorCode.ERR_GENERATE_RING_SIGS:
                    return 'Error encountered generating the ring signatures for the supplied values.';
                case ErrorCode.ERR_GENERATE_SIGNATURE:
                    return 'Error encountered generating the signature for the supplied values.';
                case ErrorCode.ERR_PRIVATE_TO_PUBLIC:
                    return 'Error encountered calculating the public key for the supplied private key.';
                case ErrorCode.ERR_INPUT_NOT_IN_SET:
                    return 'The calculated input (real output key) is not in the set of mixins supplied.';
                case ErrorCode.ERR_NOT_PUBLIC_KEY:
                    return 'The value supplied is not a valid public key.';
                case ErrorCode.ERR_CHECK_RING_SIGS:
                    return 'Error encountered when checking the ring signatures supplied.';
                case ErrorCode.ERR_GE_FROMBYTES_VARTIME:
                    return 'Could not perform the ge_frombytes_vartime() operation.';
                case ErrorCode.ERR_DERIVATION_TO_SCALAR:
                    return 'Error encountered when calculating the scalar of the derivation.';
                case ErrorCode.ERR_GE_SCALARMULT:
                    return 'Could not perform the ge_scalarmult() operation.';
                case ErrorCode.ERR_CHECK_KEY:
                    return 'Error encountered when checking public key.';
                case ErrorCode.ERR_CHECK_SCALAR:
                    return 'Error encountered when checking private key.';
                case ErrorCode.ERR_CHECK_SIGNATURE:
                    return 'Error encountered when checking the signature using the supplied values.';
                default:
                    return 'Unknown Error';
            }
        }
    }
    LedgerTypes.LedgerError = LedgerError;
})(LedgerTypes = exports.LedgerTypes || (exports.LedgerTypes = {}));
