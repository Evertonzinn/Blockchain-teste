import Block from './block.js';


class Blockchain {
    constructor () {
        this.chain = [Block.bancoruja()];

    }

    addBlock({data}) {
        const newBlock = Block.mineBlock({
            lastBlock: this.chain[this.chain.length -1],
            data
        });
        this.chain.push(newBlock)
    }

    
}

export default Blockchain;