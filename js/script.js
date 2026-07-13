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

render();

function render() {
    renderCandidateCount();
    renderGuessArea();
    renderColorPalette();
    renderHistory();
    renderCandidateList();
    renderHeatmap();
    renderConfirmButton();
}

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

document
    .getElementById("toggle-candidate-button")
    .onclick = () => {
        gameState.showCandidates =
            !gameState.showCandidates;

        document
            .getElementById("toggle-candidate-button")
            .textContent =
                gameState.showCandidates
                    ? "候補を隠す"
                    : "候補を見る";
        render();
    };

function renderCandidateList() {
    
    const area = document.getElementById("candidate-area");

    if (gameState.showCandidates) {
        area.classList.remove("hidden");
    } else {
        area.classList.add("hidden");
        return;
    }

    const list = document.getElementById("candidate-list");
    list.innerHTML = "";

    gameState.candidates.forEach(
        candidate => {

            const row = document.createElement("div");
            row.className = "candidate-row";

            candidate.forEach(
                colorId => {

                    row.appendChild(
                        createColorCircle(colorId)
                    );

                }
            );
            list.appendChild(row);
        }
    );
}

function rebuildCandidates() {
    let candidates = generateCandidates(6, 4);

    for (const record of gameState.history) {
        candidates =
            filterCandidates(
                candidates,
                record.guess,
                {
                    hit: record.hit,
                    blow: record.blow
                }
            );
    }
    gameState.candidates = candidates;
}

function createColorCircle(colorId) {
    // 色表示してくれる共通部品
    const circle =
        document.createElement("span");

    circle.className = "color-circle";
    circle.style.backgroundColor = COLORS[colorId].css;
    return circle;
}
