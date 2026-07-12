const candidates = generateCandidates(6, 4);

console.log(candidates);

document.getElementById("candidate-count").textContent = candidates.length;

console.log(
    judgeHitBlow(
        [0,1,2,3],
        [0,2,3,4]
    )
);