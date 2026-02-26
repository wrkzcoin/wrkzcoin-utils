import { HTTPClient } from './Helpers/HTTPClient';
import { WrkzTypes } from './Types/Wrkz';
/**
 * A class interface that allows for easy interaction with Legacy Wrkz
 * THIS OBJECT IS DEPRECATED AND SUBJECT TO REMOVAL WITH LITTLE NOTICE
 */
export declare class LegacyWrkz extends HTTPClient implements WrkzTypes.IWrkz {
    /**
     * Retrieves the node fee information
     */
    fee(): Promise<WrkzTypes.IFee>;
    /**
     * Retrieves the node height information
     */
    height(): Promise<WrkzTypes.IHeight>;
    /**
     * Retrieves the node information
     */
    info(): Promise<WrkzTypes.IInfo>;
    /**
     * Retrieves the node peer information
     */
    peers(): Promise<WrkzTypes.IPeers>;
    /**
     * Retrieves the number of blocks the node has in its chain
     */
    blockCount(): Promise<number>;
    /**
     * Retrieves the block information for the specified block
     * Requires the daemon to have the explorer enabled
     * @param block the block height or hash
     */
    block(block: string | number): Promise<WrkzTypes.IBlock>;
    /**
     * Retrieves the block information for the last block available
     */
    lastBlock(): Promise<WrkzTypes.IBlock>;
    /**
     * Retrieves the block information for the last 30 blocks up to the current height
     * Requires the daemon to have the explorer enabled
     * @param height the height to stop at
     */
    blockHeaders(height: number): Promise<WrkzTypes.IBlock[]>;
    /**
     * Retrieves the RawBlock information from the node for the specified block
     * Requires the daemon to have the explorer enabled
     * @param block the block height or hash
     */
    rawBlock(block: string | number): Promise<WrkzTypes.IRawBlock>;
    /**
     * Retrieves a mining block template using the specified address and reserve size
     * @param address the wallet address that will receive the coinbase outputs
     * @param reserveSize the amount of data to reserve in the miner transaction
     */
    blockTemplate(address: string, reserveSize?: number): Promise<WrkzTypes.IBlockTemplate>;
    /**
     * Submits a block to the node for processing
     * @param block the hex representation of the block
     */
    submitBlock(block: string): Promise<string>;
    /**
     * Submits a transaction to the node for processing
     * @param transaction the hex representation of the transaction
     */
    submitTransaction(transaction: string): Promise<string>;
    /**
     * Retrieves the transaction information for the specified transaction
     * Requires the daemon to have the explorer enabled
     * @param hash the transaction hash
     */
    transaction(hash: string): Promise<WrkzTypes.ITransaction>;
    /**
     * Retrieves the RawTransaction from the node for the specified transaction
     * Requires the daemon to have the explorer enabled
     * @param hash the transaction hash
     */
    rawTransaction(hash: string): Promise<string>;
    /**
     * Retrieves the transaction summary information for the transactions currently
     * Requires the daemon to have the explorer enabled
     * in the memory pool
     */
    transactionPool(): Promise<WrkzTypes.TransactionSummary[]>;
    /**
     * Retrieves the RawTransactions currently in the memory pool
     * Requires the daemon to have the explorer enabled
     */
    rawTransactionPool(): Promise<string[]>;
    /**
     * Gets the transaction memory pool changes given the last known block hash and
     * the transactions we last knew to be in the memory pool
     * @param lastKnownBlock the last known block hash
     * @param transactions an array of transaction hashes we last saw in the memory pool
     */
    transactionPoolChanges(lastKnownBlock: string, transactions?: string[]): Promise<WrkzTypes.ITransactionPoolDelta>;
    /**
     * Retrieves information on where the specified transactions are located
     * @param transactions an array of transaction hashes
     */
    transactionsStatus(transactions: string[]): Promise<WrkzTypes.ITransactionsStatus>;
    /**
     * Retrieves random global indexes typically used for mixing operations for the specified
     * amounts and for the number requested (if available)
     * @param amounts an array of amounts for which we need random global indexes
     * @param count the number of global indexes to return for each amount
     */
    randomIndexes(amounts: number[], count: number): Promise<WrkzTypes.IRandomOutput[]>;
    /**
     * Retrieves the global indexes for all transactions contained within the blocks heights specified (non-inclusive)
     * @param startHeight the starting block height
     * @param endHeight the ending block height
     */
    indexes(startHeight: number, endHeight: number): Promise<WrkzTypes.ITransactionIndexes[]>;
    /**
     * Retrieves the information necessary for syncing a wallet (or other utility) against the node
     * @param checkpoints a list of block hashes that we know about in descending height order
     * @param height the height to start syncing from
     * @param timestamp the timestamp to start syncing from
     * @param skipCoinbaseTransactions whether we should skip blocks that only include coinbase transactions
     * @param count the number of blocks to return
     */
    sync(checkpoints?: string[], height?: number, timestamp?: number, skipCoinbaseTransactions?: boolean, count?: number): Promise<WrkzTypes.ISync>;
    /**
     * Retrieves the RawBlocks & RawTransactions for syncing a wallet (or other utility) against the node
     * @param checkpoints a list of block hashes that we know about in descending height order
     * @param height the height to start syncing from
     * @param timestamp the timestamp to start syncing from
     * @param skipCoinbaseTransactions whether we should skip blocks that only include coinbase transactions
     * @param count the number of blocks to return
     */
    rawSync(checkpoints?: string[], height?: number, timestamp?: number, skipCoinbaseTransactions?: boolean, count?: number): Promise<WrkzTypes.IRawSync>;
    /**
     * OLD LEGACY METHODS BELOW THIS MARK, SHOULD ALL BE PRIVATE
     * THEY ONLY STILL EXIST HERE AS THEY USE THE OLD TYPES AND
     * THUS MAKE IT EASIER TO TRANSFORM THE DATA TO THE NEW TYPES
     */
    /**
     * Retrieves the last block header information
     */
    private _lastBlockHeader;
    /**
     * Retrieves the block header information by hash
     * @param hash the hash of the block to retrieve the header for
     */
    private _blockHeaderByHash;
    /**
     * Retrieves the block header by the height
     * @param height the height of the block to retrieve the header for
     */
    private _blockHeaderByHeight;
    /**
     * Retrieves abbreviated block information for the last 31 blocks before the specified height (inclusive)
     * @param height the height of the block to retrieve
     */
    private _blockShortHeaders;
    /**
     * Retrieves the global indexes for any transactions in the range [startHeight .. endHeight]. Generally, you
     * only want the global index for a specific transaction, however, this reveals that you probably are the
     * recipient of this transaction. By supplying a range of blocks, you can obfusticate which transaction
     * you are enquiring about.
     * @param startHeight the height to begin returning indices from
     * @param endHeight the height to end returning indices from
     */
    private _globalIndexesForRange;
    /**
     * Retrieves updates regarding the transaction mempool
     * @param tailBlockHash the last block hash that we know about
     * @param knownTransactionHashes an array of the transaction hashes we last knew were in the mempool
     */
    private _poolChanges;
    /**
     * Retrieves random outputs from the chain for mixing purposes during the creation of a new transaction
     * @param amounts an array of the amounts for which we need random outputs
     * @param mixin the number of random outputs we need for each amount specified
     */
    private _randomOutputs;
    /**
     * Retrieves the raw hex representation of each block and the transactions in the blocks versus returning
     * JSON or other encoded versions of the same.
     *
     * Retrieves up to 100 blocks. If block hash checkpoints are given, it will return beginning from the height of
     * the first hash it finds, plus one. However, if startHeight or startTimestamp is given, and this value is
     * higher than the block hash checkpoints, it will start returning from that height instead. The block hash
     * checkpoints should be given with the highest block height hashes first.
     * Typical usage: specify a start height/timestamp initially, and from then on, also provide the returned
     * block hashes.
     * @param startHeight the height to start returning blocks from
     * @param startTimestamp the timestamp to start returning blocks from
     * @param blockHashCheckpoints the block hash checkpoints
     * @param skipCoinbaseTransactions whether to skip returning blocks with only coinbase transactions
     * @param blockCount the number of blocks to retrieve
     */
    private _rawBlocks;
    /**
     * Submits a raw transaction to the daemon for processing relaying to the network
     * @param transaction the hex representation of the transaction
     */
    private _sendRawTransaction;
    /**
     * Retrieves a single transaction's information
     * @param hash the hash of the transaction to retrieve
     */
    private _transaction;
    /**
     * Retrieves summary information of the transactions currently in the mempool
     */
    private _transactionPool;
    /**
     * Retrieves the status of the transaction hashes provided
     * @param transactionHashes an array of transaction hashes to check
     */
    private _transactionStatus;
    /**
     * The only the data necessary for wallet syncing purposes
     *
     * Retrieves up to 100 blocks. If block hash checkpoints are given, it will return beginning from the height of
     * the first hash it finds, plus one. However, if startHeight or startTimestamp is given, and this value is
     * higher than the block hash checkpoints, it will start returning from that height instead. The block hash
     * checkpoints should be given with the highest block height hashes first.
     * Typical usage: specify a start height/timestamp initially, and from then on, also provide the returned
     * block hashes.
     * @param startHeight the height to start returning blocks from
     * @param startTimestamp the timestamp to start returning blocks from
     * @param blockHashCheckpoints the block hash checkpoints
     * @param skipCoinbaseTransactions whether to skip returning blocks with only coinbase transactions
     * @param blockCount the number of blocks to request
     */
    private _walletSyncData;
}
