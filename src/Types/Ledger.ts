// Copyright (c) 2020, The TurtleCoin Developers
// Copyright (c) 2026, The WrkzCoin Developers
//
// Please see the included LICENSE file for more information.

export namespace LedgerTypes {
    /** @ignore */
    export enum APDU {
        P2 = 0x00,
        P1_NON_CONFIRM = 0x00,
        P1_CONFIRM = 0x01,
        INS = 0xe0
    }

    /**
     * Represents the current state of transaction construction on the device
     */
    export enum TransactionState {
        INACTIVE = 0x00,
        READY= 0x01,
        RECEIVING_INPUTS = 0x02,
        INPUTS_RECEIVED = 0x03,
        RECEIVING_OUTPUTS = 0x04,
        OUTPUTS_RECEIVED = 0x05,
        PREFIX_READY = 0x06,
        COMPLETE = 0x07,
    }

    /**
     * Represents the APDU command types available in the WrkzCoin application
     * for ledger hardware wallets
     */
    export enum Command {
        VERSION = 0x01,
        DEBUG = 0x02,
        IDENT = 0x05,
        PUBLIC_KEYS = 0x10,
        VIEW_SECRET_KEY = 0x11,
        SPEND_SECRET_KEY = 0x12,
        WALLET_KEYS = 0x13,
        CHECK_KEY = 0x16,
        CHECK_SCALAR = 0x17,
        PRIVATE_TO_PUBLIC= 0x18,
        RANDOM_KEY_PAIR = 0x19,
        ADDRESS = 0x30,
        GENERATE_KEY_IMAGE = 0x40,
        GENERATE_KEY_IMAGE_PRIMITIVE = 0x41,
        GENERATE_RING_SIGNATURES = 0x50,
        COMPLETE_RING_SIGNATURE = 0x51,
        CHECK_RING_SIGNATURES = 0x52,
        GENERATE_SIGNATURE = 0x55,
        CHECK_SIGNATURE = 0x56,
        GENERATE_KEY_DERIVATION = 0x60,
        DERIVE_PUBLIC_KEY = 0x61,
        DERIVE_SECRET_KEY = 0x62,
        TX_STATE = 0x70,
        TX_START = 0x71,
        TX_START_INPUT_LOAD = 0x72,
        TX_LOAD_INPUT = 0x73,
        TX_START_OUTPUT_LOAD = 0x74,
        TX_LOAD_OUTPUT = 0x75,
        TX_FINALIZE_TX_PREFIX = 0x76,
        TX_SIGN = 0x77,
        TX_DUMP = 0x78,
        TX_RESET = 0x79,
        RESET_KEYS = 0xff
    }

    /**
     * Represents the possible errors returned by the application
     * on the ledger device
     */
    export enum ErrorCode {
        OK = 0x9000, // 9000 signifies that APDU operation succeeded
        OP_OK = 0x0000,
        OP_NOK = 0x0001,
        ERR_OP_NOT_PERMITTED = 0x4000,
        ERR_OP_USER_REQUIRED = 0x4001,
        ERR_WRONG_INPUT_LENGTH = 0x4002,
        ERR_NVRAM_READ = 0x4003,
        ERR_UNKNOWN_ERROR = 0x4444,
        ERR_VARINT_DATA_RANGE = 0x6000,
        ERR_OUT_OF_RANGE = 0x6001,
        ERR_TRANSACTION_STATE = 0x6500,
        ERR_TX_RESET = 0x6501,
        ERR_TX_START = 0x6502,
        ERR_TX_LOAD_INPUT = 0x6503,
        ERR_TX_LOAD_OUTPUT = 0x6504,
        ERR_TX_SIGN = 0x6505,
        ERR_TX_INPUT_OUTPUT_OUT_OF_RANGE = 0x6506,
        ERR_TX_FINALIZE_PREFIX = 0x6507,
        ERR_TX_DUMP = 0x6508,
        ERR_TX_INIT = 0x6509,
        ERR_TX_AMOUNT = 0x6510,
        ERR_PRIVATE_SPEND = 0x9400,
        ERR_PRIVATE_VIEW = 0x9401,
        ERR_RESET_KEYS = 0x9402,
        ERR_ADDRESS = 0x9450,
        ERR_BASE58 = 0x9451,
        ERR_KEY_DERIVATION = 0x9500,
        ERR_DERIVE_PUBKEY = 0x9501,
        ERR_PUBKEY_MISMATCH = 0x9502,
        ERR_DERIVE_SECKEY = 0x9503,
        ERR_KECCAK = 0x9504,
        ERR_COMPLETE_RING_SIG = 0x9505,
        ERR_GENERATE_KEY_IMAGE = 0x9506,
        ERR_SECKEY_TO_PUBKEY = 0x9507,
        ERR_GENERATE_RING_SIGS = 0x9508,
        ERR_GENERATE_SIGNATURE = 0x9509,
        ERR_PRIVATE_TO_PUBLIC = 0x9510,
        ERR_INPUT_NOT_IN_SET = 0x9511,
        ERR_NOT_PUBLIC_KEY = 0x9512,
        ERR_CHECK_RING_SIGS = 0x9513,
        ERR_GE_FROMBYTES_VARTIME = 0x9514,
        ERR_DERIVATION_TO_SCALAR = 0x9515,
        ERR_GE_SCALARMULT = 0x9516,
        ERR_CHECK_KEY = 0x9517,
        ERR_CHECK_SCALAR = 0x9518,
        ERR_CHECK_SIGNATURE = 0x9519
    }

    /**
     * Represents an error specific to the ledger wallet interactions
     */
    export class LedgerError extends Error {
        private readonly m_errCode: ErrorCode;

        /**
         * Constructs a new LedgerError instance
         * @param errCode the error code
         * @param message the standard message supplied to an Error constructor
         */
        constructor (errCode: ErrorCode, message: string) {
            super(message);

            this.m_errCode = errCode;
        }

        /**
         * Supplies a more descriptive form of the error encountered
         */
        public get description (): string {
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
}

