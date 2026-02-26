export declare namespace LedgerTypes {
    /** @ignore */
    enum APDU {
        P2 = 0,
        P1_NON_CONFIRM = 0,
        P1_CONFIRM = 1,
        INS = 224
    }
    /**
     * Represents the current state of transaction construction on the device
     */
    enum TransactionState {
        INACTIVE = 0,
        READY = 1,
        RECEIVING_INPUTS = 2,
        INPUTS_RECEIVED = 3,
        RECEIVING_OUTPUTS = 4,
        OUTPUTS_RECEIVED = 5,
        PREFIX_READY = 6,
        COMPLETE = 7
    }
    /**
     * Represents the APDU command types available in the WrkzCoin application
     * for ledger hardware wallets
     */
    enum Command {
        VERSION = 1,
        DEBUG = 2,
        IDENT = 5,
        PUBLIC_KEYS = 16,
        VIEW_SECRET_KEY = 17,
        SPEND_SECRET_KEY = 18,
        WALLET_KEYS = 19,
        CHECK_KEY = 22,
        CHECK_SCALAR = 23,
        PRIVATE_TO_PUBLIC = 24,
        RANDOM_KEY_PAIR = 25,
        ADDRESS = 48,
        GENERATE_KEY_IMAGE = 64,
        GENERATE_KEY_IMAGE_PRIMITIVE = 65,
        GENERATE_RING_SIGNATURES = 80,
        COMPLETE_RING_SIGNATURE = 81,
        CHECK_RING_SIGNATURES = 82,
        GENERATE_SIGNATURE = 85,
        CHECK_SIGNATURE = 86,
        GENERATE_KEY_DERIVATION = 96,
        DERIVE_PUBLIC_KEY = 97,
        DERIVE_SECRET_KEY = 98,
        TX_STATE = 112,
        TX_START = 113,
        TX_START_INPUT_LOAD = 114,
        TX_LOAD_INPUT = 115,
        TX_START_OUTPUT_LOAD = 116,
        TX_LOAD_OUTPUT = 117,
        TX_FINALIZE_TX_PREFIX = 118,
        TX_SIGN = 119,
        TX_DUMP = 120,
        TX_RESET = 121,
        RESET_KEYS = 255
    }
    /**
     * Represents the possible errors returned by the application
     * on the ledger device
     */
    enum ErrorCode {
        OK = 36864,
        OP_OK = 0,
        OP_NOK = 1,
        ERR_OP_NOT_PERMITTED = 16384,
        ERR_OP_USER_REQUIRED = 16385,
        ERR_WRONG_INPUT_LENGTH = 16386,
        ERR_NVRAM_READ = 16387,
        ERR_UNKNOWN_ERROR = 17476,
        ERR_VARINT_DATA_RANGE = 24576,
        ERR_OUT_OF_RANGE = 24577,
        ERR_TRANSACTION_STATE = 25856,
        ERR_TX_RESET = 25857,
        ERR_TX_START = 25858,
        ERR_TX_LOAD_INPUT = 25859,
        ERR_TX_LOAD_OUTPUT = 25860,
        ERR_TX_SIGN = 25861,
        ERR_TX_INPUT_OUTPUT_OUT_OF_RANGE = 25862,
        ERR_TX_FINALIZE_PREFIX = 25863,
        ERR_TX_DUMP = 25864,
        ERR_TX_INIT = 25865,
        ERR_TX_AMOUNT = 25872,
        ERR_PRIVATE_SPEND = 37888,
        ERR_PRIVATE_VIEW = 37889,
        ERR_RESET_KEYS = 37890,
        ERR_ADDRESS = 37968,
        ERR_BASE58 = 37969,
        ERR_KEY_DERIVATION = 38144,
        ERR_DERIVE_PUBKEY = 38145,
        ERR_PUBKEY_MISMATCH = 38146,
        ERR_DERIVE_SECKEY = 38147,
        ERR_KECCAK = 38148,
        ERR_COMPLETE_RING_SIG = 38149,
        ERR_GENERATE_KEY_IMAGE = 38150,
        ERR_SECKEY_TO_PUBKEY = 38151,
        ERR_GENERATE_RING_SIGS = 38152,
        ERR_GENERATE_SIGNATURE = 38153,
        ERR_PRIVATE_TO_PUBLIC = 38160,
        ERR_INPUT_NOT_IN_SET = 38161,
        ERR_NOT_PUBLIC_KEY = 38162,
        ERR_CHECK_RING_SIGS = 38163,
        ERR_GE_FROMBYTES_VARTIME = 38164,
        ERR_DERIVATION_TO_SCALAR = 38165,
        ERR_GE_SCALARMULT = 38166,
        ERR_CHECK_KEY = 38167,
        ERR_CHECK_SCALAR = 38168,
        ERR_CHECK_SIGNATURE = 38169
    }
    /**
     * Represents an error specific to the ledger wallet interactions
     */
    class LedgerError extends Error {
        private readonly m_errCode;
        /**
         * Constructs a new LedgerError instance
         * @param errCode the error code
         * @param message the standard message supplied to an Error constructor
         */
        constructor(errCode: ErrorCode, message: string);
        /**
         * Supplies a more descriptive form of the error encountered
         */
        get description(): string;
    }
}
