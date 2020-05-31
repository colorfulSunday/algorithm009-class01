/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    if(strs.length==0) return [];
    let resMap = new Map();
    for (let i = 0; i < strs.length; i++) {
        let counts = new Array(26).fill(0);
        const str = strs[i];
        let strArr = str.split('');
        for (let j = 0; j < strArr.length; j++) {
            const char = strArr[j];
            counts[char.charCodeAt()-'a'.charCodeAt()]++;  
        }
        let key = counts.join('#');
        let val;
        if(!resMap.get(key)){
            val = [];
            resMap.set(key,val);
        }
        resMap.get(key).push(str);
    }
    let resArr=[];
    var mapIter = resMap.values();
    let val;
    while(val=mapIter.next().value){
        resArr.push(val);
    }
    return resArr;
};