const candidates = generateCandidates(6, 4);

console.log(candidates);

document.getElementById("candidate-count").textContent = candidates.length;

console.log(judgeHitBlow(
    [0,1,2,3],
    [2,3,4,0]
));
// 期待値
// { hit: 0, blow: 3 }

console.log(judgeHitBlow(
    [0,0,1,2],
    [0,1,0,3]
));
// 期待値
// { hit: 1, blow: 2 }