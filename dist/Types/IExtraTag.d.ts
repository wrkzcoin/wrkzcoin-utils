/// <reference types="node" />
import { ExtraNonceTag } from '../Types';
import { BigInteger } from 'big-integer';
export declare namespace ExtraTag {
    /** @ignore */
    import IExtraNonce = ExtraNonceTag.IExtraNonce;
    /**
     * Extra tag types
     */
    enum ExtraTagType {
        PADDING = 0,
        PUBKEY = 1,
        NONCE = 2,
        MERGED_MINING = 3,
        POW_NONCE = 4,
        RECIPIENT_PUBLIC_VIEW_KEY = 5,
        RECIPIENT_PUBLIC_SPEND_KEY = 6,
        TRANSACTION_PRIVATE_KEY = 7,
        POOL_NONCE = 8
    }
    /**
     * Abstract interface for structured data in the transaction extra field
     */
    abstract class IExtraTag {
        /**
         * Returns the size of the nonce field in bytes including it's tag
         */
        abstract get size(): number;
        /**
         * Returns the Extra Nonce Field tag
         */
        abstract get tag(): ExtraTagType;
        /**
         * Returns the Extra Nonce as a Buffer
         * @returns the Buffer representation of the object
         */
        abstract toBuffer(): Buffer;
        /**
         * Returns the Extra Nonce as a hexadecimal string (blob)
         * @returns the hexadecimal (blob) representation of the object
         */
        abstract toString(): string;
    }
    class ExtraPowNonce implements IExtraTag {
        get tag(): ExtraTagType;
        get size(): number;
        static from(data: Buffer | string): ExtraPowNonce;
        private readonly m_tag;
        private m_nonce;
        constructor(nonce: BigInteger);
        /**
         * Represents the field as a Buffer
         * @returns the Buffer representation of the object
         */
        toBuffer(): Buffer;
        /**
         * Represents the field as a hexadecimal string (blob)
         * @returns the hexadecimal (blob) representation of the object
         */
        toString(): string;
    }
    /**
     * Represents a structured padding field used in the transaction extra field
     */
    class ExtraPadding implements IExtraTag {
        /**
         * The tag type of the field
         */
        get tag(): ExtraTagType;
        /**
         * The size of the field in bytes including the tag
         */
        get size(): number;
        /**
         * Creates a new instance of the field using a Buffer or Blob copy of
         * field created through other means
         * @param data the data that makes up the nonce field
         * @returns the new object
         */
        static from(data: Buffer | string): ExtraPadding;
        m_size: number;
        private readonly m_tag;
        /**
         * Constructs a new field of the specified size
         * @param size the size of the padding field
         */
        constructor(size: number);
        /**
         * Represents the field as a Buffer
         * @returns the Buffer representation of the object
         */
        toBuffer(): Buffer;
        /**
         * Represents the field as a hexadecimal string (blob)
         * @returns the hexadecimal (blob) representation of the object
         */
        toString(): string;
    }
    /**
     * Represents the transaction public key contained in the transaction extra field
     */
    class ExtraPublicKey implements IExtraTag {
        /**
         * The tag type of the field
         */
        get tag(): ExtraTagType;
        /**
         * The public key contained in the field
         */
        get publicKey(): string;
        /**
         * The size of the field in bytes including the tag
         */
        get size(): number;
        /**
         * Creates a new instance of the field using a Buffer or Blob copy of
         * field created through other means
         * @param data the data that makes up the nonce field
         * @returns the new object
         */
        static from(data: Buffer | string): ExtraPublicKey;
        private readonly m_tag;
        private readonly m_publicKey;
        /**
         * Creates a new instance of the field using the supplied public key
         * @param publicKey the public key to be stored in the field
         */
        constructor(publicKey: string);
        /**
         * Represents the field as a Buffer
         * @returns the Buffer representation of the object
         */
        toBuffer(): Buffer;
        /**
         * Represents the field as a hexadecimal string (blob)
         * @returns the hexadecimal (blob) representation of the object
         */
        toString(): string;
    }
    /**
     * Represents merged mining information contained in the transaction extra field
     */
    class ExtraMergedMining implements IExtraTag {
        /**
         * The tag type of the field
         */
        get tag(): ExtraTagType;
        /**
         * The size of the field in bytes including the tag
         */
        get size(): number;
        /**
         * The depth of the block in the merkle root
         */
        get depth(): number;
        /**
         * The merkle root of the block merge mined
         */
        get merkleRoot(): string;
        /**
         * Creates a new instance of the field using a Buffer or Blob copy of
         * field created through other means
         * @param data the data that makes up the nonce field
         * @returns the new object
         */
        static from(data: Buffer | string): ExtraMergedMining;
        private readonly m_tag;
        private readonly m_depth;
        private readonly m_merkleRoot;
        /**
         * Creates a new instance of the field using the supplied values
         * @param depth The depth of the block in the merkle root
         * @param merkleRoot The merkle root of the block merge mined
         */
        constructor(depth: number, merkleRoot: string);
        /**
         * Represents the field as a Buffer
         * @returns the Buffer representation of the object
         */
        toBuffer(): Buffer;
        /**
         * Represents the field as a hexadecimal string (blob)
         * @returns the hexadecimal (blob) representation of the object
         */
        toString(): string;
    }
    /**
     * Represents nonce information contained in the transaction extra field
     */
    class ExtraNonce implements IExtraTag {
        /**
         * The tag type of the field
         */
        get tag(): ExtraTagType;
        /**
         * The size of the field in bytes including the tag
         */
        get size(): number;
        /**
         * The Extra Nonce fields contained in the field
         */
        get tags(): IExtraNonce[];
        /**
         * Creates a new instance of the field using a Buffer or Blob copy of
         * field created through other means
         * @param data the data that makes up the nonce field
         * @returns the new object
         */
        static from(data: Buffer | string): ExtraNonce;
        protected m_tags: ExtraNonceTag.IExtraNonce[];
        private readonly m_tag;
        /**
         * Creates a new instance of the field using the supplied Extra Nonce fields
         * @param tags The Extra Nonce fields to place into the field
         */
        constructor(tags: ExtraNonceTag.IExtraNonce[]);
        /**
         * Remove a specific Extra Nonce field from the field
         * @param removeTag the Extra Nonce tag type to remove
         */
        removeTag(removeTag: ExtraNonceTag.NonceTagType): void;
        /**
         * Add/Update a specific Extra Nonce field to the field
         * @param tag the Extra Nonce tag to add/update
         */
        addTag(tag: ExtraNonceTag.IExtraNonce): void;
        /**
         * Represents the field as a Buffer
         * @returns the Buffer representation of the object
         */
        toBuffer(): Buffer;
        /**
         * Represents the field as a hexadecimal string (blob)
         * @returns the hexadecimal (blob) representation of the object
         */
        toString(): string;
    }
    /**
     * Represents the transaction private key contained in the transaction extra field
     */
    class ExtraTransactionPrivateKey implements IExtraTag {
        /**
         * The tag type of the field
         */
        get tag(): ExtraTagType;
        /**
         * The public key contained in the field
         */
        get privateKey(): string;
        /**
         * The size of the field in bytes including the tag
         */
        get size(): number;
        /**
         * Creates a new instance of the field using a Buffer or Blob copy of
         * field created through other means
         * @param data the data that makes up the nonce field
         * @returns the new object
         */
        static from(data: Buffer | string): ExtraTransactionPrivateKey;
        private readonly m_tag;
        private readonly m_privateKey;
        /**
         * Creates a new instance of the field using the supplied public key
         * @param privateKey the public key to be stored in the field
         */
        constructor(privateKey: string);
        /**
         * Represents the field as a Buffer
         * @returns the Buffer representation of the object
         */
        toBuffer(): Buffer;
        /**
         * Represents the field as a hexadecimal string (blob)
         * @returns the hexadecimal (blob) representation of the object
         */
        toString(): string;
    }
    /**
     * Represents the recipient public view key contained in the transaction
     * extra field for coinbase transactions
     */
    class ExtraRecipientPublicViewKey implements IExtraTag {
        /**
         * The tag type of the field
         */
        get tag(): ExtraTagType;
        /**
         * The public key contained in the field
         */
        get publicKey(): string;
        /**
         * The size of the field in bytes including the tag
         */
        get size(): number;
        /**
         * Creates a new instance of the field using a Buffer or Blob copy of
         * field created through other means
         * @param data the data that makes up the nonce field
         * @returns the new object
         */
        static from(data: Buffer | string): ExtraRecipientPublicViewKey;
        private readonly m_tag;
        private readonly m_publicKey;
        /**
         * Creates a new instance of the field using the supplied public key
         * @param publicKey the public key to be stored in the field
         */
        constructor(publicKey: string);
        /**
         * Represents the field as a Buffer
         * @returns the Buffer representation of the object
         */
        toBuffer(): Buffer;
        /**
         * Represents the field as a hexadecimal string (blob)
         * @returns the hexadecimal (blob) representation of the object
         */
        toString(): string;
    }
    /**
     * Represents the recipient public spend key contained in the transaction
     * extra field for coinbase transactions
     */
    class ExtraRecipientPublicSpendKey implements IExtraTag {
        /**
         * The tag type of the field
         */
        get tag(): ExtraTagType;
        /**
         * The public key contained in the field
         */
        get publicKey(): string;
        /**
         * The size of the field in bytes including the tag
         */
        get size(): number;
        /**
         * Creates a new instance of the field using a Buffer or Blob copy of
         * field created through other means
         * @param data the data that makes up the nonce field
         * @returns the new object
         */
        static from(data: Buffer | string): ExtraRecipientPublicSpendKey;
        private readonly m_tag;
        private readonly m_publicKey;
        /**
         * Creates a new instance of the field using the supplied public key
         * @param publicKey the public key to be stored in the field
         */
        constructor(publicKey: string);
        /**
         * Represents the field as a Buffer
         * @returns the Buffer representation of the object
         */
        toBuffer(): Buffer;
        /**
         * Represents the field as a hexadecimal string (blob)
         * @returns the hexadecimal (blob) representation of the object
         */
        toString(): string;
    }
    /**
     * Represents the extra field for the pool nonce used by mining pools
     */
    class ExtraPoolNonce implements IExtraTag {
        /**
         * The tag type of the field
         */
        get tag(): ExtraTagType;
        /**
         * The size of the field in bytes including the tag
         */
        get size(): number;
        /**
         * The arbitrary data included in the field
         */
        get data(): Buffer;
        /**
         * Creates a new instance of the field using a Buffer or Blob copy of
         * field created through other means
         * @param data the data that makes up the nonce field
         * @returns the new object
         */
        static from(data: Buffer | string): ExtraPoolNonce;
        private readonly m_tag;
        private readonly m_data;
        /**
         * Creates a new instance of the field from just the extra data to be included
         * @param data the pool nonce data to be included
         */
        constructor(data: Buffer);
        /**
         * Represents the field as a Buffer
         * @returns the Buffer representation of the object
         */
        toBuffer(): Buffer;
        /**
         * Represents the field as a hexadecimal string (blob)
         * @returns the hexadecimal (blob) representation of the object
         */
        toString(): string;
    }
}
