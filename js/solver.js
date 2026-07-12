const COLORS = [
    { id: 0, name: "青", css: "blue" },
    { id: 1, name: "赤", css: "red" },
    { id: 2, name: "緑", css: "green" },
    { id: 3, name: "黄", css: "yellow" },
    { id: 4, name: "桃", css: "pink" },
    { id: 5, name: "白", css: "white" }
];

/**
 * 候補一覧を生成する関数
 *
 * @param {number} colorCount 使用する色数
 * @param {number} answerLength 桁数
 * @returns {number[][]}
 */
function generateCandidates(colorCount, answerLength) {
    const candidates = [];
    function buildCandidate(current) {

        // [0,1,2,3]が完成したらcandidates に保存する。
        // [...current] としているのは配列のコピーを保存するため。
        if (current.length === answerLength) {
            candidates.push([...current]);
            return;
        }
        for (let color = 0; color < colorCount; color++) {
            if (current.includes(color)) {
                continue;
            }
            current.push(color);
            buildCandidate(current);
            current.pop();
        }
    }
    buildCandidate([]);
    return candidates;
}

/**
 * 2つの候補を比較してHit/Blowを返す関数
 *
 * @param {number[]} guess プレイヤーの予想
 * @param {number[]} answer 比較対象
 * @returns {{hit:number, blow:number}}
 */
function judgeHitBlow(guess, answer) {

    let hit = 0;
    let blow = 0;
    const guessRemain = [];
    const answerRemain = [];

    // まずHitを数え、Hitでない色だけ残す
    for (let i = 0; i < guess.length; i++) {
        if (guess[i] === answer[i]) {
            hit++;
        } else {
            guessRemain.push(guess[i]);
            answerRemain.push(answer[i]);
        }
    }
    // 残った色同士でBlowを数える
    for (const color of guessRemain) {
        const index = answerRemain.indexOf(color);
        if (index !== -1) {
            blow++;
            answerRemain.splice(index, 1);
        }
    }

    return {
        hit: hit,
        blow: blow
    };
}

/**
 * 候補一覧をHit/Blow結果で絞り込む
 *
 * @param {number[][]} candidates 現在の候補一覧
 * @param {number[]} guess プレイヤーの予想
 * @param {{hit:number, blow:number}} result ゲームから返ってきた結果
 * @returns {number[][]}
 */
function filterCandidates(candidates, guess, result) {

    return [];
}