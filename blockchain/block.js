import {BANCORUJA_DATA, MINE_RATE} from '../config.js';
import cryptoHash from '../util/crypto-hash.js';
import hexToBinary from 'hex-to-binary';
class block {
    constructor({ data, hash, nonce, difficulty, timestamp, lastHash }) {
        this.data = data;
        this.hash = hash;
        this.lasthash = lastHash;
        this.nonce = nonce;
        this.difficulty = difficulty;
        this.timestamp = timestamp;
    }

    static bancoruja() {
        return new this(BANCORUJA_DATA);
    }
    static mineBlock({ lastBlock, data }){
    
        const lastHash = lastBlock.hash;
        
        let hash, timestamp;
    
        let {difficulty} = lastBlock;
        let nonce = 0;
        
            do {
                nonce++;
                timestamp = Date.now();
                difficulty = block.adjustDifficulty({originalBlock:lastBlock, timestamp})
                hash = cryptoHash(timestamp, lastHash, data, difficulty, nonce)
            }while (hexToBinary(hash).substring(0, difficulty))
        return new this(timestamp, lastHash, data, difficulty, nonce, hash)
        }
    static adjustDifficulty({originalBlock, timestamp,}){
        const {difficulty} = originalBlock;
            if(difficulty < 5) return 1;
            if((timestamp - originalBlock.timestamp)> MINE_RATE) difficulty -1;
            return difficulty +1;
    }

}

export default block;

