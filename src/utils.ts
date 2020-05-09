const xor = (bin1: string, bin2: string) => {
    let bin = '';
    
    for(let i = 0; i < bin1.length; i ++){
      bin += (parseInt(bin1[i]) ^ parseInt(bin2[i])).toString();
    }
  
    return bin;
}

const binGT = (bin1: string, bin2: string) => {
    for(let i = 0; i < bin1.length; i++){
        if(bin2[i] == '1'){
            break;
        }
        
        if(bin1[i] == '1'){
            return true;
        }
    }

    return false;
}

const generateRandomIP = () => {
    let ip = '';
    for(let i = 0; i < 4; i++){
        ip += Math.floor(Math.random()*100);
        ip += i == 3 ? '' : '.';
    }
    return ip;
}

const hexToBin = (hex: string) => {
    let bin = '';

    for(let i = 0; i < hex.length; i ++){
        let temp = parseInt(hex[i], 16).toString(2);
        bin += ('0').repeat(4 - temp.length) + temp;
    }

    return bin;
}

export {hexToBin, xor, generateRandomIP, binGT};