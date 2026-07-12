function printTest(name, actual, expected) {

    const ok =
        actual.hit === expected.hit &&
        actual.blow === expected.blow;

    console.log(
        `${ok ? "✅" : "❌"} ${name}`,
        actual
    );

}

console.log("===== Hit & Blow Tests =====");

console.log(judgeHitBlow(
    [0,1,2,3],
    [0,1,2,3]
));
// 期待値: { hit: 4, blow: 0 }

console.log(judgeHitBlow(
    [0,1,2,3],
    [3,2,1,0]
));
// 期待値: { hit: 0, blow: 4 }

console.log(judgeHitBlow(
    [0,1,2,3],
    [0,2,3,4]
));
// 期待値: { hit: 1, blow: 2 }

console.log(judgeHitBlow(
    [0,1,2,3],
    [4,5,0,1]
));
// 期待値: { hit: 0, blow: 2 }

console.log(judgeHitBlow(
    [0,1,2,3],
    [2,3,4,0]
));
// 期待値: { hit: 0, blow: 3 }

console.log(judgeHitBlow(
    [0,0,1,2],
    [0,1,0,3]
));
// 期待値: { hit: 1, blow: 2 }
