let cordinatsX = [
    0,
    99,
    197,
    296,
    394,
    493,
    591,
    689,
    788,
    886,
    985,
    1083,
    1182,
]
let cordinatsY = [
    0,
    306,
    459,
    613
]

/**
 * This function returns a rendom number betwen 0 (included) and  "limit"(excluded) that is given to the function 
 * 
 * @param {int} limit - betwen this number and 0 is the random output
 * @returns {int} - gives the random number
 */
function rndNum(limit) {
    let rnd = Math.random();
    let number = Math.floor(rnd * limit);
    return number;
}