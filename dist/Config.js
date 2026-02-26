"use strict";
// Copyright (c) 2018-2020, The TurtleCoin Developers
// Copyright (c) 2026, The WrkzCoin Developers
//
// Please see the included LICENSE file for more information.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
/** @ignore TODO: Update fork height TransactionPoWHeightDynV1 */
exports.Config = {
    activateParentBlockVersion: 2,
    coinUnitPlaces: 2,
    addressPrefix: 3914525,
    keccakIterations: 1,
    defaultNetworkFee: 5,
    fusionMinInputCount: 12,
    fusionMinInOutCountRatio: 4,
    mmMiningBlockVersion: 2,
    maximumOutputAmount: 500000000000,
    maximumOutputsPerTransaction: 90,
    maximumExtraSize: 1024,
    activateFeePerByteTransactions: true,
    feePerByte: 1.953125,
    FeeNoTxPoW: 10000,
    feePerByteChunkSize: 256,
    TransactionPowDifficulty: 20000,
    FusionTransactionPowDifficulty: 60000,
    TransactionPowHeight: 1123000,
    TransactionPoWHeightDynV1: 1400000,
    TransactionPoWDifficultyDynV1: 40000,
    MultiplierTransactionPoWDifficultyPerIOV1: 1000,
    MultiplierTransactionPoWDifficultyFactoredOutV1: 4,
    FusionTransactionPoWDifficultyV2: 320000,
    maximumLedgerTransactionSize: 38400,
    maximumLedgerAPDUPayloadSize: 480,
    minimumLedgerVersion: '1.2.0',
    ledgerDebug: false
};
