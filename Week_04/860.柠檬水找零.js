/*
 * @lc app=leetcode.cn id=860 lang=javascript
 *
 * [860] 柠檬水找零
 */

// @lc code=start
/**
 * @param {number[]} bills
 * @return {boolean}
 */
//分析：一个10需要一个5找零，一个20需要一个10（当10不够时或者2个5）和一个5找零
//由此可以看出：
//1) 5的数量必须>=10和20的数量之和
//2) 10的数量必须>=20的数量或者5-
//这样才能找零
var lemonadeChange = function (bills) {
    bills.sort(function (a, b) { return a - b });
    if (bills.length == 0) {
        return true;
    }
    if (bills[0] == 10 || bills[0] == 20) {
        return false;
    }
    let types = [0, 0, 0];
    let len = bills.length;
    for (let i = 0; i < len; i++) {
        if (types[0] == 0 && bills[i] == 10) {//第一次出现10
            types[0] = i;
        }
        if (types[1] == 0 && bills[i] == 20) {//第一次出现20
            types[1] = i - types[0];
            break;
        }
    }
    if (bills[len - 1] == 10) {//如果最后一位是10
        types[1] = len - types[0];
    }
    types[2] = len - types[0] - types[1];
    if (types[0] >= types[1] + types[2] && types[1] >= types[2]) {
        return true;
    }
    return false;
};
//以上解放有误
// @lc code=end

//注意点，此题是要求顺序的，即顺序不可变
//思路：3个指针记录，当前5,10,20的数量，当某个指针为负数是，找零失败var lemonadeChange = function (bills) {
    var record = [0, 0, 0];
    for (let i = 0, len = bills.length; i < len; i++) {
        if (bills[i] == 5) {
            record[0]++;
        } else if (bills[i] == 10) {
            if (record[0] == 0) {
                return false;
            }
            record[0]--;
            record[1]++;
        } else {
            if ((record[1] == 0 && record[0] < 3) || record[0] == 0) {
                return false;
            }
            if (record[1] == 0) {
                record[0] -= 3;
                record[2]++;
            } else {
                record[0]--;
                record[1]--;
                record[2]++;
            }
        }
    }
    return true;
};
