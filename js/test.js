(() => {

function printTest(name, actual, expected) {

    const ok =
        actual.hit === expected.hit &&
        actual.blow === expected.blow;

    if (ok) {
        console.log(`✅ ${name} : ${actual.hit}H ${actual.blow}B`);
    } else {
        console.error(
            `❌ ${name} : 実際=${actual.hit}H ${actual.blow}B / 期待=${expected.hit}H ${expected.blow}B`
        );
    }
}

console.log("===== Hit & Blow Tests =====");

// ---------- judgeHitBlow テスト ----------

printTest(
    "全部一致",
    judgeHitBlow([0,1,2,3], [0,1,2,3]),
    { hit: 4, blow: 0 }
);

printTest(
    "全部Blow",
    judgeHitBlow([0,1,2,3], [3,2,1,0]),
    { hit: 0, blow: 4 }
);

printTest(
    "1Hit2Blow",
    judgeHitBlow([0,1,2,3], [0,2,3,4]),
    { hit: 1, blow: 2 }
);

printTest(
    "0Hit2Blow",
    judgeHitBlow([0,1,2,3], [4,5,0,1]),
    { hit: 0, blow: 2 }
);

printTest(
    "0Hit3Blow",
    judgeHitBlow([0,1,2,3], [2,3,4,0]),
    { hit: 0, blow: 3 }
);

printTest(
    "重複あり",
    judgeHitBlow([0,0,1,2], [0,1,0,3]),
    { hit: 1, blow: 2 }
);

// ---------- filterCandidates テスト ----------

console.log("===== Filter Tests =====");

const testCandidates = generateCandidates(6, 4);

const filteredCandidates = filterCandidates(
    testCandidates,
    [0,1,2,3],
    { hit: 4, blow: 0 }
);

console.log(
    `候補数(期待値:1) : ${filteredCandidates.length}`
);

})();