export declare namespace ED25519 {
    /**
     * Represents a ED25519 Key Pair (private & public) and provides a few methods
     * for generating new key pairs including deterministic methods.
     */
    class KeyPair {
        protected m_privateKey?: string;
        protected m_publicKey?: string;
        /**
         * Constructs a new KeyPair object
         * @param publicKey
         * @param privateKey
         * @param entropy
         * @param iterations
         * @param createEmpty
         */
        static from(publicKey?: string, privateKey?: string, entropy?: string, iterations?: number, createEmpty?: boolean): Promise<KeyPair>;
        /**
         * Returns the private key
         */
        get privateKey(): string;
        /**
         * Sets the private key or reduces the value to a private key
         * @param key
         */
        setPrivateKey(key: string): Promise<void>;
        /**
         * Returns the public key
         */
        get publicKey(): string;
        /**
         * Sets the public key
         * @param key
         */
        setPublicKey(key: string): Promise<void>;
        /**
         * Returns if the public key belongs to the private key
         */
        isPaired(): Promise<boolean>;
    }
    /**
     * Represents a set of ED25519 key pairs (view and spend) used by WrkzCoin wallets
     */
    class Keys {
        protected m_spendKeys: KeyPair;
        protected m_viewKeys: KeyPair;
        /**
         * Creates a new instance of a set of Keys
         * @param spendKeys the spend key pair
         * @param viewKeys the view key pair
         */
        static from(spendKeys?: KeyPair, viewKeys?: KeyPair): Promise<Keys>;
        /**
         * Returns the spend keys
         */
        get spend(): KeyPair;
        /**
         * Sets the spend keys
         * @param keys
         */
        set spend(keys: KeyPair);
        /**
         * Returns the view keys
         */
        get view(): KeyPair;
        /**
         * Sets the view keys
         * @param keys
         */
        set view(keys: KeyPair);
    }
}
