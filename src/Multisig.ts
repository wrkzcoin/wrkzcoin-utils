// Copyright (c) 2020, The TurtleCoin Developers
// Copyright (c) 2026, The WrkzCoin Developers
//
// Please see the included LICENSE file for more information.

import { Address } from './Address';
import { ED25519 } from './Types/ED25519';
import { Interfaces, MultisigInterfaces, TransactionInputs, WrkzCoinCrypto } from './Types';
import { Transaction } from './Transaction';
/** @ignore */
import KeyPair = ED25519.KeyPair;

/**
 * Represents a multisig helper class that can be used for the creation of multisig wallets
 */
export class Multisig {
    /**
     * Returns an address object representing the multisig wallet address
     */
    public async address (): Promise<Address> {
        if (!this.isReady) {
            throw new Error('Not all participants have been loaded');
        }

        return Address.fromViewOnlyKeys(await this.spend(), await this.view());
    }

    /**
     * Returns the threshold (M) of the multisig wallet
     */
    public get threshold (): number {
        return this.m_threshold;
    }

    /**
     * Returns the participants (N) of the multisig wallet
     */
    public get participants (): number {
        return this.m_participants;
    }

    /**
     * Returns the number of participants currently loaded into the object
     */
    public get current_participants (): number {
        return this.m_currentParticipants;
    }

    /**
     * Returns the shared private view key of the multisig wallet
     */
    public async view (): Promise<string> {
        if (!this.isViewReady) {
            throw new Error('Not all participants have been loaded');
        }

        return WrkzCoinCrypto.calculateSharedPrivateKey(this.m_view_keys);
    }

    /**
     * Returns the shared public spend key of the multisig wallet
     */
    public async spend (): Promise<string> {
        if (!this.isSpendReady) {
            throw new Error('Not all participants have been loaded');
        }

        const keys: string[] = this.m_participant_keys;

        for (const key of this.m_multisig_keys) {
            if (key.publicKey.length !== 0 && keys.indexOf(key.publicKey) === -1) {
                keys.push(key.publicKey);
            }
        }

        return WrkzCoinCrypto.calculateSharedPublicKey(keys);
    }

    /**
     * Returns if the object is ready for export and/or use
     */
    public get isReady (): boolean {
        return (this.isViewReady && this.isSpendReady);
    }

    /**
     * Returns our multisig keys
     */
    public get multisig_keys (): KeyPair[] {
        return this.m_multisig_keys;
    }

    /**
     * Returns the public multisig keys
     */
    public async public_multisig_keys (): Promise<string[]> {
        const result: string[] = [];

        const keys = await this.calculated_multisig_keys();

        for (const key of keys) {
            result.push(key.publicKey);
        }

        return result;
    }

    /**
     * Returns the private multisig keys
     */
    public async private_multisig_keys (): Promise<string []> {
        const result: string[] = [];

        const keys = await this.calculated_multisig_keys();

        for (const key of keys) {
            result.push(key.privateKey);
        }

        return result;
    }

    /**
     * Calculates our multisig keys using the participant public spend keys
     * @returns our multisig keys key pairs
     */
    private async calculated_multisig_keys (): Promise<KeyPair[]> {
        if (this.m_threshold !== this.m_participants) {
            const multisig_keys: KeyPair[] = [];

            for (const multisig_key of this.m_wallet_multisig_keys) {
                const keys =
                    await WrkzCoinCrypto.calculateMultisigPrivateKeys(
                        multisig_key.privateKey, this.m_participant_keys);

                for (const key of keys) {
                    multisig_keys.push(await KeyPair.from(undefined, key));
                }
            }

            return multisig_keys;
        }

        throw new Error('Not a M:N instance');
    }

    /**
     * Returns if the view information is ready
     */
    private get isViewReady (): boolean {
        return (this.m_currentParticipants === this.m_participants);
    }

    /**
     * Returns if the spend information is ready
     */
    private get isSpendReady (): boolean {
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
    public static exchangeRoundsRequired (threshold: number, participants: number): number {
        return participants - threshold;
    }

    /**
     * Initializes an initial multisig object using our address information
     * @param wallet our base wallet used to create the wallet
     * @param threshold the number of participants required to construct a new transaction
     * @param participants the wallet participants
     * @returns a new instance of the object
     */
    public static fromAddress (wallet: Address, threshold: number, participants: number): Multisig {
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
    public static async fromMultisigKeys (
        multisig_private_keys: string[],
        sharedPrivateViewKey: string,
        threshold: number,
        participants: number
    ): Promise<Multisig> {
        if (!isValidThreshold(threshold, participants)) {
            throw new Error('Threshold does not require a majority of participants');
        }

        const result = new Multisig();

        for (const key of multisig_private_keys) {
            if (!await WrkzCoinCrypto.checkScalar(key)) {
                throw new Error('Found an invalid private key in the list of multisig private keys');
            }

            result.m_multisig_keys.push(await KeyPair.from(undefined, key));

            result.m_wallet_multisig_keys.push(await KeyPair.from(undefined, key));
        }

        if (!await WrkzCoinCrypto.checkScalar(sharedPrivateViewKey)) {
            throw new Error('Private view key is not a valid private key');
        }

        result.m_view_keys.push(sharedPrivateViewKey);

        result.m_threshold = threshold;

        result.m_participants = participants;

        return result;
    }

    /**
     * Returns the total number of signing keys created using the M:N values supplied
     * @param threshold the number of participants required to construct a new transaction
     * @param participants the wallet participants
     * @returns the total number of signing keys created
     */
    public static requiredSigningKeys (threshold: number, participants: number): number {
        return required_keys(threshold, participants);
    }

    /**
     * Returns if the given M:N scheme is valid for this library
     * @param threshold the number of participants required to construct a new transaction
     * @param participants the wallet participants
     * @returns if the given scheme is valid for this library
     */
    public static isValidThreshold (threshold: number, participants: number): boolean {
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
    public static async restoreKeyImage (
        publicEphemeral: string,
        derivation: string,
        outputIndex: number,
        partialKeyImages: string[]
    ): Promise<string> {
        return WrkzCoinCrypto.restoreKeyImage(publicEphemeral, derivation, outputIndex, partialKeyImages);
    }

    private m_wallet_multisig_keys: KeyPair[] = [];
    private m_multisig_keys: KeyPair[] = [];
    private m_participant_keys: string[] = [];
    private m_view_keys: string[] = [];
    private m_threshold = 0;
    private m_participants = 0;
    private m_currentParticipants = 1;

    /**
     * Adds a participant to the multisig object
     * Note: If this is an additional round of exchange, the publicSpendKeys should be the array of
     * public multisig keys of the participant and we will not supply the private view key again.
     * @param publicSpendKeys the participant spend key(s)
     * @param [privateViewKey] the private view key of the participant
     */
    public async addParticipant (
        publicSpendKeys: string[] | string,
        privateViewKey?: string
    ): Promise<void> {
        if (privateViewKey && !await WrkzCoinCrypto.checkScalar(privateViewKey)) {
            throw new Error('Private view key is not a valid private key');
        }

        if (Array.isArray(publicSpendKeys) && publicSpendKeys.length > 1 && privateViewKey) {
            throw new Error('Must not supply the private view key with the participant in subsequent rounds');
        }

        if (!Array.isArray(publicSpendKeys)) {
            publicSpendKeys = [publicSpendKeys];
        }

        for (const key of publicSpendKeys) {
            if (!await WrkzCoinCrypto.checkKey(key)) {
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
    }

    /**
     * Generates the partial key images for the given public ephemeral
     * @param transactionHash the transaction hash containing the output used
     * @param publicEphemeral the public ephemeral of the output
     * @param outputIndex the index of the output in the transaction
     * @returns the partial key images
     */
    public async generatePartialKeyImages (
        transactionHash: string,
        publicEphemeral: string,
        outputIndex: number
    ): Promise<MultisigInterfaces.PartialKeyImage[]> {
        const promises = [];

        for (const multisigKey of this.m_multisig_keys) {
            promises.push(WrkzCoinCrypto.generateKeyImage(publicEphemeral, multisigKey.privateKey));
        }

        const results = await Promise.all(promises);

        const partialKeyImages: MultisigInterfaces.PartialKeyImage[] = [];

        for (const result of results) {
            partialKeyImages.push({
                transactionHash,
                outputIndex,
                partialKeyImage: result
            });
        }

        return partialKeyImages;
    }

    /**
     * Generates the partial signing keys for the given prepared transaction
     * @param tx the prepared transaction
     * @returns the partial signing keys
     */
    public async generatePartialSigningKeys (
        tx: Interfaces.PreparedTransaction
    ): Promise<MultisigInterfaces.PartialSigningKey[]> {
        const promises = [];

        for (let i = 0; i < tx.transaction.signatures.length; i++) {
            const realOutputIndex = getRealOutputIndex(tx, i);

            for (const multisigKey of this.m_multisig_keys) {
                promises.push(
                    generatePartialSigningKey(
                        tx.transaction.signatures[i][realOutputIndex], i, multisigKey.privateKey));
            }
        }

        const results = await Promise.all(promises);

        const partialSigningKeys: MultisigInterfaces.PartialSigningKey[] = [];

        for (const result of results) {
            partialSigningKeys.push({
                transactionPrefixHash: await tx.transaction.prefixHash(),
                index: result.index,
                partialSigningKey: result.key
            });
        }

        return partialSigningKeys;
    }

    /**
     * Restores the ring signatures of a prepared transaction using the supplied partial signing keys
     * @param tx the prepared transaction
     * @param partialSigningKeys the partial signing keys required for the signature scheme
     * @returns the completed transaction
     */
    public async completeTransaction (
        tx: Interfaces.PreparedTransaction,
        partialSigningKeys: MultisigInterfaces.PartialSigningKey[]
    ): Promise<Transaction> {
        const promises = [];

        for (let i = 0; i < tx.transaction.signatures.length; i++) {
            const preparedRingSignature = getPreparedRingSignature(tx.signatureMeta, i);
            const ringPartialKeys = getPartialSigningKeys(partialSigningKeys, i);

            promises.push(restoreRingSignatures(
                preparedRingSignature.input.derivation,
                preparedRingSignature.input.outputIndex,
                ringPartialKeys,
                preparedRingSignature.realOutputIndex,
                preparedRingSignature.key,
                tx.transaction.signatures[i],
                i
            ));
        }

        const results = await Promise.all(promises);

        for (const result of results) {
            tx.transaction.signatures[result.index] = result.sigs;
        }

        const prefixHash = await tx.transaction.prefixHash();

        const checkPromises = [];

        for (let i = 0; i < tx.transaction.inputs.length; i++) {
            checkPromises.push(checkRingSignatures(
                prefixHash,
                (tx.transaction.inputs[i] as TransactionInputs.KeyInput).keyImage,
                getInputKeys(tx.signatureMeta, i),
                tx.transaction.signatures[i]
            ));
        }

        const validSigs = await Promise.all(checkPromises);

        for (const valid of validSigs) {
            if (!valid) {
                throw new Error('Could not complete ring signatures');
            }
        }

        return tx.transaction;
    }
}

/** @ignore */
function isValidThreshold (threshold: number, participants: number): boolean {
    return (!((threshold / participants) <= 0.5) && required_keys(threshold, participants) <= 2 ** 13);
}

/** @ignore */
function required_keys (
    threshold: number,
    participants: number
): number {
    let result = participants;

    const rounds = Multisig.exchangeRoundsRequired(threshold, participants);

    for (let i = 0; i < rounds; i++) {
        result = result - 1;

        result = ((result ** 2) + result) / 2;
    }

    return result;
}

/** @ignore */
async function generatePartialSigningKey (
    preparedSignature: string,
    index: number,
    privateSpendKey: string
): Promise<{ key: string, index: number }> {
    const key = await WrkzCoinCrypto.generatePartialSigningKey(preparedSignature, privateSpendKey);

    return {
        key,
        index
    };
}

/** @ignore */
function getRealOutputIndex (
    tx: Interfaces.PreparedTransaction,
    index: number
): number {
    for (const sigs of tx.signatureMeta) {
        if (sigs.index === index) {
            return sigs.realOutputIndex;
        }
    }

    throw new Error('Could not find the real output index in the prepared ring signatures');
}

/** @ignore */
function getPartialSigningKeys (
    partialSigningKeys: MultisigInterfaces.PartialSigningKey[],
    index: number
): MultisigInterfaces.PartialSigningKey[] {
    const results: MultisigInterfaces.PartialSigningKey[] = [];

    for (const partialSigningKey of partialSigningKeys) {
        if (partialSigningKey.index === index) {
            results.push(partialSigningKey);
        }
    }

    return results;
}

/** @ignore */
function getPreparedRingSignature (
    preparedRingSignatures: Interfaces.PreparedRingSignature[],
    index: number
): Interfaces.PreparedRingSignature {
    for (const preparedRingSignature of preparedRingSignatures) {
        if (preparedRingSignature.index === index) {
            return preparedRingSignature;
        }
    }

    throw new Error('Prepared ring signature not found at specified index');
}

/** @ignore */
async function restoreRingSignatures (
    derivation: string,
    outputIndex: number,
    partialSigningKeys: MultisigInterfaces.PartialSigningKey[],
    realOutputIndex: number,
    key: string,
    signatures: string[],
    index: number
): Promise<{ sigs: string[], index: number }> {
    const keys: string[] = [];

    for (const partialSigningKey of partialSigningKeys) {
        if (partialSigningKey.index !== index) {
            throw new Error('invalid partial signing key supplied');
        }
        keys.push(partialSigningKey.partialSigningKey);
    }

    const sigs = await WrkzCoinCrypto.restoreRingSignatures(
        derivation,
        outputIndex,
        keys,
        realOutputIndex,
        key,
        signatures
    );

    return {
        sigs,
        index
    };
}

/** @ignore */
function getInputKeys (preparedSignatures: Interfaces.PreparedRingSignature[], index: number): string[] {
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
async function checkRingSignatures (
    hash: string,
    keyImage: string,
    publicKeys: string[],
    signatures: string[]
): Promise<boolean> {
    return WrkzCoinCrypto.checkRingSignatures(hash, keyImage, publicKeys, signatures);
}

