/// <reference types="node" />
export declare namespace ExtraNonceTag {
    /**
     * Nonce subtag types
     */
    enum NonceTagType {
        PAYMENT_ID = 0,
        EXTRA_DATA = 127
    }
    /**
     * Abstract interface for structured Extra Nonce Field Values
     */
    abstract class IExtraNonce {
        /**
         * Returns the size of the nonce field in bytes including it's tag
         */
        abstract get size(): number;
        /**
         * Returns the Extra Nonce Field tag
         */
        abstract get tag(): NonceTagType;
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
    /**
     * Represents arbitrary extra data included in the nonce by the user
     */
    class ExtraNonceData implements IExtraNonce {
        /**
         * The tag type of the field
         */
        get tag(): NonceTagType;
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
        static from(data: Buffer | string): ExtraNonceData;
        private readonly m_tag;
        private readonly m_data;
        /**
         * Creates a new instance of the field from just the extra data to be included
         * @param data the arbitrary data to be included in the field
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
    /**
     * Represents a payment ID included in the Extra Nonce field
     */
    class ExtraNoncePaymentId implements IExtraNonce {
        /**
         * The tag type of the field
         */
        get tag(): NonceTagType;
        /**
         * The size of the field in bytes including the tag
         */
        get size(): number;
        /**
         * The payment ID contained in the field
         */
        get paymentId(): string;
        /**
         * Creates a new instance of the field using a Buffer or Blob copy of
         * field created through other means
         * @param data the data that makes up the nonce field
         * @returns the new object
         */
        static from(data: Buffer | string): ExtraNoncePaymentId;
        private readonly m_tag;
        private readonly m_paymentId;
        /**
         * Constructs a new instance of the field using the supplied payment ID
         * @param paymentId
         */
        constructor(paymentId: string);
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
