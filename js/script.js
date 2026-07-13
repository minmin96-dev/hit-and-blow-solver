// =========================
// ゲーム状態
// =========================
const gameState = {
    candidates: generateCandidates(6, 4),
    history: [],
    guess: [null, null, null, null],
    editingIndex: null,

    hit: 0,
    blow: 0,
    showCandidates: false,
    showHeatmap: false,
    editingHistoryIndex: null
};

// =========================
// 初期表示
// =========================
render();

// =========================
// 全画面再描画
// =========================
function render() {
    renderCandidateCount();
    renderGuessArea();
    renderColorPalette();
    renderHistory();
    renderCandidateList();
    renderHeatmap();
    renderConfirmButton();
}

// =========================
// 入力イベント
// =========================
function setupResultInput() {
    document
        .getElementById("hit-input")
        .onchange = (event) => {
            gameState.hit =
                Number(event.target.value);
        };

    document
        .getElementById("blow-input")
        .onchange = (event) => {
            gameState.blow =
                Number(event.target.value);
        };
}
setupResultInput();

// =========================
// 確定・更新処理
// =========================
document
    .getElementById("confirm-button")
    .onclick = () => {
        if (
            !validateResult(
                gameState.guess,
                gameState.hit,
                gameState.blow,
                gameState.guess.length
            )
        ) {
            alert("Hit / Blow の値が不正です");
            return;
        }

        if (
            gameState.editingHistoryIndex !== null
        ) {
            gameState.history[
                gameState.editingHistoryIndex
            ] = {
                guess: [...gameState.guess],
                hit: gameState.hit,
                blow: gameState.blow
            };

            rebuildCandidates();
            gameState.editingHistoryIndex = null;
            gameState.editingIndex = null;
        } else {
            gameState.history.push({
                guess: [...gameState.guess],
                hit: gameState.hit,
                blow: gameState.blow
            });
            rebuildCandidates();
        }

        gameState.guess = [null, null, null, null];
        gameState.editingIndex = null;
        gameState.hit = 0;
        gameState.blow = 0;

        document
            .getElementById("hit-input")
            .value = 0;

        document
            .getElementById("blow-input")
            .value = 0;

        render();
    };
