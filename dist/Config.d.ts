/** @ignore */
export interface ICoinConfig {
    activateParentBlockVersion?: number;
    coinUnitPlaces?: number;
    addressPrefix?: number;
    keccakIterations?: number;
    defaultNetworkFee?: number;
    fusionMinInputCount?: number;
    fusionMinInOutCountRatio?: number;
    mmMiningBlockVersion?: number;
    maximumOutputAmount?: number;
    maximumOutputsPerTransaction?: number;
    maximumExtraSize?: number;
    activateFeePerByteTransactions?: boolean;
    feePerByte?: number;
    FeeNoTxPoW?: number;
    feePerByteChunkSize?: number;
    TransactionPowDifficulty?: number;
    FusionTransactionPowDifficulty?: number;
    TransactionPowHeight?: number;
    maximumLedgerTransactionSize?: number;
    maximumLedgerAPDUPayloadSize?: number;
    minimumLedgerVersion?: string;
    ledgerDebug?: boolean;
    [key: string]: any;
}
/** @ignore */
export interface ICoinRunningConfig extends ICoinConfig {
    activateParentBlockVersion: number;
    coinUnitPlaces: number;
    addressPrefix: number;
    keccakIterations: number;
    defaultNetworkFee: number;
    fusionMinInputCount: number;
    fusionMinInOutCountRatio: number;
    mmMiningBlockVersion: number;
    maximumOutputAmount: number;
    maximumOutputsPerTransaction: number;
    maximumExtraSize: number;
    activateFeePerByteTransactions: boolean;
    feePerByte: number;
    FeeNoTxPoW: number;
    feePerByteChunkSize: number;
    TransactionPowDifficulty: number;
    FusionTransactionPowDifficulty: number;
    TransactionPowHeight: number;
    TransactionPoWHeightDynV1: number;
    TransactionPoWDifficultyDynV1: number;
    MultiplierTransactionPoWDifficultyPerIOV1: number;
    MultiplierTransactionPoWDifficultyFactoredOutV1: number;
    FusionTransactionPoWDifficultyV2: number;
    maximumLedgerTransactionSize: number;
    maximumLedgerAPDUPayloadSize: number;
    minimumLedgerVersion: string;
    ledgerDebug: boolean;
}
/** @ignore TODO: Update fork height TransactionPoWHeightDynV1 */
export declare const Config: ICoinRunningConfig;
