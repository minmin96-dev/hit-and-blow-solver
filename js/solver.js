const COLORS = [
    { id: 0, name: "青", css: "blue" },
    { id: 1, name: "赤", css: "red" },
    { id: 2, name: "緑", css: "green" },
    { id: 3, name: "黄", css: "yellow" },
    { id: 4, name: "桃", css: "pink" },
    { id: 5, name: "白", css: "white" }
];

/**
 * 候補一覧を生成する
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
