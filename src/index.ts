import {Peer} from './peer';

let peers: Peer[] = [];
const nodeCount = 20;

for(let i = 0;  i < nodeCount; i++){
    if(i == 0){
        peers.push(new Peer());
        peers[i].joinNetwork();
    }else{
        peers.push(new Peer());
        peers[i].joinNetwork(peers[i-1]);
    }

    console.log(`adding ${i}`);
}


for(let i = 0; i < peers.length; i++){
    if(peers[Math.floor(Math.random()*nodeCount)].sendMessage(peers[i].nodeId, i.toString())){
        console.log(peers[i].messages[0]);
    }else{
        console.error('could not find peer');
    }
}