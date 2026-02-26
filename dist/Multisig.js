"use strict";
// Copyright (c) 2020, The TurtleCoin Developers
// Copyright (c) 2026, The WrkzCoin Developers
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
exports.Multisig = void 0;
const Address_1 = require("./Address");
const ED25519_1 = require("./Types/ED25519");
const Types_1 = require("./Types");
/** @ignore */
var KeyPair = ED25519_1.ED25519.KeyPair;
/**
 * Represents a multisig helper class that can be used for the creation of multisig wallets
 */
class Multisig {
    constructor() {
        this.m_wallet_multisig_keys = [];
        this.m_multisig_keys = [];
        this.m_participant_keys = [];
        this.m_view_keys = [];
        this.m_threshold = 0;
        this.m_participants = 0;
        this.m_currentParticipants = 1;
    }
    /**
     * Returns an address object representing the multisig wallet address
     */
    address() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isReady) {
                throw new Error('Not all participants have been loaded');
            }
            return Address_1.Address.fromViewOnlyKeys(yield this.spend(), yield this.view());
        });
    }
    /**
     * Returns the threshold (M) of the multisig wallet
     */
    get threshold() {
        return this.m_threshold;
    }
    /**
     * Returns the participants (N) of the multisig wallet
     */
    get participants() {
        return this.m_participants;
    }
    /**
     * Returns the number of participants currently loaded into the object
     */
    get current_participants() {
        return this.m_currentParticipants;
    }
    /**
     * Returns the shared private view key of the multisig wallet
     */
    view() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isViewReady) {
                throw new Error('Not all participants have been loaded');
            }
            return Types_1.WrkzCoinCrypto.calculateSharedPrivateKey(this.m_view_keys);
        });
    }
    /**
     * Returns the shared public spend key of the multisig wallet
     */
    spend() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isSpendReady) {
                throw new Error('Not all participants have been loaded');
            }
            const keys = this.m_participant_keys;
            for (const key of this.m_multisig_keys) {
                if (key.publicKey.length !== 0 && keys.indexOf(key.publicKey) === -1) {
                    keys.push(key.publicKey);
                }
            }
            return Types_1.WrkzCoinCrypto.calculateSharedPublicKey(keys);
        });
    }
    /**
     * Returns if the object is ready for export and/or use
     */
    get isReady() {
        return (this.isViewReady && this.isSpendReady);
    }
    /**
     * Returns our multisig keys
     */
    get multisig_keys() {
        return this.m_multisig_keys;
    }
    /**
     * Returns the public multisig keys
     */
    public_multisig_keys() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = [];
            const keys = yield this.calculated_multisig_keys();
            for (const key of keys) {
                result.push(key.publicKey);
            }
            return result;
        });
    }
    /**
     * Returns the private multisig keys
     */
    private_multisig_keys() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = [];
            const keys = yield this.calculated_multisig_keys();
            for (const key of keys) {
                result.push(key.privateKey);
            }
            return result;
        });
    }
    /**
     * Calculates our multisig keys using the participant public spend keys
     * @returns our multisig keys key pairs
     */
    calculated_multisig_keys() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.m_threshold !== this.m_participants) {
                const multisig_keys = [];
                for (const multisig_key of this.m_wallet_multisig_keys) {
                    const keys = yield Types_1.WrkzCoinCrypto.calculateMultisigPrivateKeys(multisig_key.privateKey, this.m_participant_keys);
                    for (const key of keys) {
                        multisig_keys.push(yield KeyPair.from(undefined, key));
                    }
                }
                return multisig_keys;
            }
            throw new Error('Not a M:N instance');
        });
    }
    /**
     * Returns if the view information is ready
     */
    get isViewReady() {
        return (this.m_currentParticipants === this.m_participants);
    }
    /**
     * Returns if the spend information is ready
     */
    get isSpendReady() {
        const loaded = (this.threshold === this.participants)
            ? this.m_participant_keys.length + 1
            : this.m_participant_keys.length;
        return (loaded === Multisig.requiredSigningKeys(this.threshold, this.participants));
    }
    /**
     * Let's us know how many times participants must exchange information after the initial exchange
     * @param threshold the number of participants required to construct a new transaction
     * @param participants the wallet participants
     * @returns the number of additional exchange rounds required
     */
    static exchangeRoundsRequired(threshold, participants) {
        return participants - threshold;
    }
    /**
     * Initializes an initial multisig object using our address information
     * @param wallet our base wallet used to create the wallet
     * @param threshold the number of participants required to construct a new transaction
     * @param participants the wallet participants
     * @returns a new instance of the object
     */
    static fromAddress(wallet, threshold, participants) {
        if (!isValidThreshold(threshold, participants)) {
            throw new Error('Threshold does not require a majority of participants');
        }
        const result = new Multisig();
        if (!wallet.spend.isPaired) {
            throw new Error('Must have both private and public spend keys');
        }
        if (!wallet.view.isPaired) {
            throw new Error('Must have both private and public view keys');
        }
        result.m_wallet_multisig_keys.push(wallet.spend);
        result.m_multisig_keys.push(wallet.spend);
        result.m_view_keys.push(wallet.view.privateKey);
        result.m_threshold = threshold;
        result.m_participants = participants;
        return result;
    }
    /**
     * Initializes a multisig object using our previously generated multisig private keys
     * @param multisig_private_keys the previously generated multisig private keys
     * @param sharedPrivateViewKey the previously calculated view private key
     * @param threshold the number of participants required to construct a new transaction
     * @param participants the wallet participants
     * @returns a new instance of the object
     */
    static fromMultisigKeys(multisig_private_keys, sharedPrivateViewKey, threshold, participants) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!isValidThreshold(threshold, participants)) {
                throw new Error('Threshold does not require a majority of participants');
            }
            const result = new Multisig();
            for (const key of multisig_private_keys) {
                if (!(yield Types_1.WrkzCoinCrypto.checkScalar(key))) {
                    throw new Error('Found an invalid private key in the list of multisig private keys');
                }
                result.m_multisig_keys.push(yield KeyPair.from(undefined, key));
                result.m_wallet_multisig_keys.push(yield KeyPair.from(undefined, key));
            }
            if (!(yield Types_1.WrkzCoinCrypto.checkScalar(sharedPrivateViewKey))) {
                throw new Error('Private view key is not a valid private key');
            }
            result.m_view_keys.push(sharedPrivateViewKey);
            result.m_threshold = threshold;
            result.m_participants = participants;
            return result;
        });
    }
    /**
     * Returns the total number of signing keys created using the M:N values supplied
     * @param threshold the number of participants required to construct a new transaction
     * @param participants the wallet participants
     * @returns the total number of signing keys created
     */
    static requiredSigningKeys(threshold, participants) {
        return required_keys(threshold, participants);
    }
    /**
     * Returns if the given M:N scheme is valid for this library
     * @param threshold the number of participants required to construct a new transaction
     * @param participants the wallet participants
     * @returns if the given scheme is valid for this library
     */
    static isValidThreshold(threshold, participants) {
        return isValidThreshold(threshold, participants);
    }
    /**
     * Restores a key image from partial key images
     * @param publicEphemeral the key image public emphermal
     * @param derivation the key input derivation
     * @param outputIndex the key input output index
     * @param partialKeyImages the partial key images
     * @returns the restored key image
     */
    static restoreKeyImage(publicEphemeral, derivation, outputIndex, partialKeyImages) {
        return __awaiter(this, void 0, void 0, function* () {
            return Types_1.WrkzCoinCrypto.restoreKeyImage(publicEphemeral, derivation, outputIndex, partialKeyImages);
        });
    }
    /**
     * Adds a participant to the multisig object
     * Note: If this is an additional round of exchange, the publicSpendKeys should be the array of
     * public multisig keys of the participant and we will not supply the private view key again.
     * @param publicSpendKeys the participant spend key(s)
     * @param [privateViewKey] the private view key of the participant
     */
    addParticipant(publicSpendKeys, privateViewKey) {
        return __awaiter(this, void 0, void 0, function* () {
            if (privateViewKey && !(yield Types_1.WrkzCoinCrypto.checkScalar(privateViewKey))) {
                throw new Error('Private view key is not a valid private key');
            }
            if (Array.isArray(publicSpendKeys) && publicSpendKeys.length > 1 && privateViewKey) {
                throw new Error('Must not supply the private view key with the participant in subsequent rounds');
            }
            if (!Array.isArray(publicSpendKeys)) {
                publicSpendKeys = [publicSpendKeys];
            }
            for (const key of publicSpendKeys) {
                if (!(yield Types_1.WrkzCoinCrypto.checkKey(key))) {
                    throw new Error('Found an invalid public spend key in the list');
                }
            }
            if (privateViewKey && this.m_view_keys.indexOf(privateViewKey) === -1) {
                this.m_view_keys.push(privateViewKey);
            }
            for (const key of publicSpendKeys) {
                if (this.m_participant_keys.indexOf(key) === -1) {
                    this.m_participant_keys.push(key);
                }
            }
            this.m_currentParticipants++;
        });
    }
    /**
     * Generates the partial key images for the given public ephemeral
     * @param transactionHash the transaction hash containing the output used
     * @param publicEphemeral the public ephemeral of the output
     * @param outputIndex the index of the output in the transaction
     * @returns the partial key images
     */
    generatePartialKeyImages(transactionHash, publicEphemeral, outputIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            const promises = [];
            for (const multisigKey of this.m_multisig_keys) {
                promises.push(Types_1.WrkzCoinCrypto.generateKeyImage(publicEphemeral, multisigKey.privateKey));
            }
            const results = yield Promise.all(promises);
            const partialKeyImages = [];
            for (const result of results) {
                partialKeyImages.push({
                    transactionHash,
                    outputIndex,
                    partialKeyImage: result
                });
            }
            return partialKeyImages;
        });
    }
    /**
     * Generates the partial signing keys for the given prepared transaction
     * @param tx the prepared transaction
     * @returns the partial signing keys
     */
    generatePartialSigningKeys(tx) {
        return __awaiter(this, void 0, void 0, function* () {
            const promises = [];
            for (let i = 0; i < tx.transaction.signatures.length; i++) {
                const realOutputIndex = getRealOutputIndex(tx, i);
                for (const multisigKey of this.m_multisig_keys) {
                    promises.push(generatePartialSigningKey(tx.transaction.signatures[i][realOutputIndex], i, multisigKey.privateKey));
                }
            }
            const results = yield Promise.all(promises);
            const partialSigningKeys = [];
            for (const result of results) {
                partialSigningKeys.push({
                    transactionPrefixHash: yield tx.transaction.prefixHash(),
                    index: result.index,
                    partialSigningKey: result.key
                });
            }
            return partialSigningKeys;
        });
    }
    /**
     * Restores the ring signatures of a prepared transaction using the supplied partial signing keys
     * @param tx the prepared transaction
     * @param partialSigningKeys the partial signing keys required for the signature scheme
     * @returns the completed transaction
     */
    completeTransaction(tx, partialSigningKeys) {
        return __awaiter(this, void 0, void 0, function* () {
            const promises = [];
            for (let i = 0; i < tx.transaction.signatures.length; i++) {
                const preparedRingSignature = getPreparedRingSignature(tx.signatureMeta, i);
                const ringPartialKeys = getPartialSigningKeys(partialSigningKeys, i);
                promises.push(restoreRingSignatures(preparedRingSignature.input.derivation, preparedRingSignature.input.outputIndex, ringPartialKeys, preparedRingSignature.realOutputIndex, preparedRingSignature.key, tx.transaction.signatures[i], i));
            }
            const results = yield Promise.all(promises);
            for (const result of results) {
                tx.transaction.signatures[result.index] = result.sigs;
            }
            const prefixHash = yield tx.transaction.prefixHash();
            const checkPromises = [];
            for (let i = 0; i < tx.transaction.inputs.length; i++) {
                checkPromises.push(checkRingSignatures(prefixHash, tx.transaction.inputs[i].keyImage, getInputKeys(tx.signatureMeta, i), tx.transaction.signatures[i]));
            }
            const validSigs = yield Promise.all(checkPromises);
            for (const valid of validSigs) {
                if (!valid) {
                    throw new Error('Could not complete ring signatures');
                }
            }
            return tx.transaction;
        });
    }
}
exports.Multisig = Multisig;
/** @ignore */
function isValidThreshold(threshold, participants) {
    return (!((threshold / participants) <= 0.5) && required_keys(threshold, participants) <= Math.pow(2, 13));
}
/** @ignore */
function required_keys(threshold, participants) {
    let result = participants;
    const rounds = Multisig.exchangeRoundsRequired(threshold, participants);
    for (let i = 0; i < rounds; i++) {
        result = result - 1;
        result = ((Math.pow(result, 2)) + result) / 2;
    }
    return result;
}
/** @ignore */
function generatePartialSigningKey(preparedSignature, index, privateSpendKey) {
    return __awaiter(this, void 0, void 0, function* () {
        const key = yield Types_1.WrkzCoinCrypto.generatePartialSigningKey(preparedSignature, privateSpendKey);
        return {
            key,
            index
        };
    });
}
/** @ignore */
function getRealOutputIndex(tx, index) {
    for (const sigs of tx.signatureMeta) {
        if (sigs.index === index) {
            return sigs.realOutputIndex;
        }
    }
    throw new Error('Could not find the real output index in the prepared ring signatures');
}
/** @ignore */
function getPartialSigningKeys(partialSigningKeys, index) {
    const results = [];
    for (const partialSigningKey of partialSigningKeys) {
        if (partialSigningKey.index === index) {
            results.push(partialSigningKey);
        }
    }
    return results;
}
/** @ignore */
function getPreparedRingSignature(preparedRingSignatures, index) {
    for (const preparedRingSignature of preparedRingSignatures) {
        if (preparedRingSignature.index === index) {
            return preparedRingSignature;
        }
    }
    throw new Error('Prepared ring signature not found at specified index');
}
/** @ignore */
function restoreRingSignatures(derivation, outputIndex, partialSigningKeys, realOutputIndex, key, signatures, index) {
    return __awaiter(this, void 0, void 0, function* () {
        const keys = [];
        for (const partialSigningKey of partialSigningKeys) {
            if (partialSigningKey.index !== index) {
                throw new Error('invalid partial signing key supplied');
            }
            keys.push(partialSigningKey.partialSigningKey);
        }
        const sigs = yield Types_1.WrkzCoinCrypto.restoreRingSignatures(derivation, outputIndex, keys, realOutputIndex, key, signatures);
        return {
            sigs,
            index
        };
    });
}
/** @ignore */
function getInputKeys(preparedSignatures, index) {
    for (const meta of preparedSignatures) {
        if (meta.index === index) {
            if (meta.inputKeys) {
                return meta.inputKeys;
            }
        }
    }
    throw new Error('Could not locate input keys in the prepared signatures');
}
/** @ignore */
function checkRingSignatures(hash, keyImage, publicKeys, signatures) {
    return __awaiter(this, void 0, void 0, function* () {
        return Types_1.WrkzCoinCrypto.checkRingSignatures(hash, keyImage, publicKeys, signatures);
    });
}
