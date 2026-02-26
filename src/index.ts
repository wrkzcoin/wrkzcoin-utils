// Copyright (c) 2018-2020, The TurtleCoin Developers
// Copyright (c) 2026, The WrkzCoin Developers
//
// Please see the included LICENSE file for more information.

import { Crypto } from 'wrkzcoin-crypto';

/** @ignore */
import * as Types from './Types';
export { Address } from './Address';
export { AddressPrefix } from './AddressPrefix';
export { Block } from './Block';
export { BlockTemplate } from './BlockTemplate';
export { Crypto, ICryptoConfig, CryptoType } from 'wrkzcoin-crypto';
export { CryptoNote } from './CryptoNote';
export { Interfaces } from './Types/ITransaction';
export { LedgerDevice, LedgerTransport } from './LedgerDevice';
export { LedgerNote } from './LedgerNote';
export { LevinPacket, LevinProtocol } from './LevinPacket';
export { LevinPayloads } from './Types/LevinPayloads';
export { Multisig } from './Multisig';
export { MultisigMessage } from './MultisigMessage';
export { ParentBlock } from './ParentBlock';
export { Transaction } from './Transaction';
export { ICoinConfig } from './Config';
export { LegacyWrkz } from './LegacyWrkz';
export { Wrkz } from './Wrkz';
export { WalletAPI } from './WalletAPI';

/** @ignore */
import TransactionOutputs = Types.TransactionOutputs;
/** @ignore */
import TransactionInputs = Types.TransactionInputs;
/** @ignore */
import KeyInput = TransactionInputs.KeyInput;
/** @ignore */
import KeyOutput = TransactionOutputs.KeyOutput;
/** @ignore */
import KeyPair = Types.ED25519.KeyPair;
/** @ignore */
import Keys = Types.ED25519.Keys;
/** @ignore */
import LedgerError = Types.LedgerTypes.LedgerError;
/** @ignore */
import LedgerTransactionState = Types.LedgerTypes.TransactionState;
/** @ignore */
import LedgerErrorCode = Types.LedgerTypes.ErrorCode;

import ICryptoNote = Types.CryptoNoteInterfaces.ICryptoNote;

import WrkzTypes = Types.WrkzTypes;

import WalletAPITypes = Types.WalletAPITypes;

/** @ignore */
export {
    ICryptoNote,
    KeyInput,
    KeyOutput,
    KeyPair,
    Keys,
    TransactionInputs,
    TransactionOutputs,
    LedgerError,
    LedgerTransactionState,
    LedgerErrorCode,
    WrkzTypes,
    WalletAPITypes
};

/**
 * Executes the callback method upon the given event
 * @param event
 * @param callback
 */
export function on (event: string, callback: () => void) {
    if (event.toLowerCase() === 'ready') {
        const check = () => setTimeout(() => {
            if (Crypto.isReady) {
                return callback();
            } else {
                check();
            }
        }, 100);
        check();
    }
}

