import crypto from 'crypto';
import {generateRandomIP, xor, hexToBin, binGT} from './utils';

class Peer{
    table: Peer[];
    ip: string;
    port: number;
    nodeId: string;
    tableIds: string[];
    messages: string[];

    constructor(idLength:number = 32){
        this.table = [];
        this.ip = generateRandomIP();
        this.port = Math.floor(Math.random()*1000);
        this.nodeId = this.generateID(idLength);
        this.tableIds = this.getTableIds();
        this.messages = [];
    }

    joinNetwork(initNode: Peer = this){
        this.createTable(initNode);
    }

    createTable(initNode: Peer = this){
        for(let i = 0; i < this.tableIds.length; i++){
            const closestNode = initNode.findClosestNode(this.tableIds[i]);
            this.table[i] = closestNode;
        }

        initNode.addPeer(this);
    }

    addPeer(node: Peer, exclude:Peer[] = []){
        exclude.push(this);

        for(let i = 0; i < this.tableIds.length; i++){
            if(!exclude.includes(this.table[i])){
                exclude.push(this.table[i]);
                this.table[i].addPeer(node, exclude);
            }

            const closestNode = node.findClosestNode(this.tableIds[i]);
            this.table[i] = closestNode;
        }
    }

    findClosestNode(id:string): Peer{
        let closestNode: Peer = this;

        for(let i = 0; i < this.table.length; i ++){
            if(binGT(xor(id, closestNode.nodeId), xor(id, this.table[i].nodeId))){
                closestNode = this.table[i];
            }
        }

        if(closestNode == this){
            return closestNode;
        }

        return closestNode.findClosestNode(id);
    }

    sendMessage(id:string, message:string){
        const clossestNode = this.findClosestNode(id);

        if(clossestNode.nodeId == id){
            clossestNode.messages.push(message);
            return true;
        }

        return false;
    }

    getTableIds(){
        let ids = [];

        for(let i = 0; i < this.nodeId.length; i++){
            let distance = '0'.repeat(i) + '1' + '0'.repeat(this.nodeId.length-i-1);
            ids.push(xor(distance, this.nodeId));
        }

        return ids;
    }

    generateID(idLength:number){
        if(idLength > 160 || idLength <= 0){
            idLength = 160;
        }

        let id = hexToBin(crypto.createHash('sha1')
            .update(JSON.stringify({
                ip: this.ip,
                port: this.port
            }))
            .digest('hex'));
            
        return id.substr(0, idLength);
    }
}

export {Peer};