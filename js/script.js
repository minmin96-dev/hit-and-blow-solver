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

function renderCandidateCount() {

    document.getElementById("candidate-count").textContent =
        gameState.candidates.length;

}

function renderGuessArea() {

    const guessArea =
        document.getElementById("guess-area");

    guessArea.innerHTML = "";

    for (let i = 0; i < 4; i++) {

        const slot =
            document.createElement("button");

        slot.className = "color-slot";

        const colorId =
            gameState.guess[i];

        if (colorId !== null) {
            slot.style.backgroundColor =
                COLORS[colorId].css;
        }
        if (i === gameState.editingIndex) {
            slot.classList.add("active");
        }

        slot.onclick = () => {

            gameState.editingIndex = i;
            render();
        };
        guessArea.appendChild(slot);
    }
}

function renderColorPalette() {

    const palette =
        document.getElementById("color-palette");

    palette.innerHTML = "";

    if (gameState.editingIndex === null) {
        return;
    }
    for (const color of COLORS) {
        const button =
            document.createElement("button");

        button.className = "palette-color";
        button.style.backgroundColor = color.css;

        button.onclick = () => {

            gameState.guess[
                gameState.editingIndex
            ] = color.id;

            if (gameState.editingIndex < 3) {
                gameState.editingIndex++;
            } else {
                gameState.editingIndex = null;
            }

            render();
        };
        palette.appendChild(button);
    }
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
                gameState.hit,
                gameState.blow,
                gameState.guess.length
            )
        ) {
            alert("Hit / Blow の値が不正です");
            return;
        }
        
        const filteredCandidates =
            filterCandidates(
                gameState.candidates,
                gameState.guess,
                {
                    hit: gameState.hit,
                    blow: gameState.blow
                }
            );

        if (filteredCandidates.length === 0) {
            alert(
                "条件に一致する候補がありません。入力を確認してください。"
            );
            return;
        }
        gameState.candidates = filteredCandidates;

        gameState.history.push({

            guess: [...gameState.guess],
            hit: gameState.hit,
            blow: gameState.blow

        });
        render();
    };

function renderHistory() {

    const historyArea =
        document.getElementById("history");

    historyArea.innerHTML ="<h2>履歴</h2>";

    let candidates = generateCandidates(6, 4);

    [...gameState.history]
        .reverse()
        .forEach(
            (record, index) => {
                const div =
                    document.createElement("div");

                    candidates =
                        filterCandidates(
                            candidates,
                            record.guess,
                            {
                                hit: record.hit,
                                blow: record.blow
                            }
                        );

                    div.innerHTML = "";

                const title =
                    document.createElement("div");

                title.textContent =
                    `${gameState.history.length - index}回目 : `
                    +
                    `${record.hit}H `
                    +
                    `${record.blow}B`;

                if (gameState.showCandidates) {
                    title.textContent +=
                        ` 残り候補 ${candidates.length}`;
                }

                div.appendChild(title);

                const colors =
                    document.createElement("div");

                colors.className = "history-colors";

                record.guess.forEach(colorId => {
                    colors.appendChild(
                        createColorCircle(colorId)
                    );
                });
                div.appendChild(colors);

                const editButton =
                    document.createElement("button");

                editButton.textContent = "編集";
                editButton.onclick = () => {
                    loadHistory(index);
                };
                div.appendChild(editButton);

                historyArea.appendChild(div);
             }
        );
}

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

function calculateHeatmap() {
    const result = [];

    for (let position = 0; position < 4; position++) {
        const count = {};
        for (const color of COLORS) {
            count[color.id] = 0;
        }

        for (const candidate of gameState.candidates) {
            const colorId =
                candidate[position];
            count[colorId]++;
        }

        const total =
            gameState.candidates.length;

        const positionResult =
            COLORS.map(color => {
                return {
                    colorId: color.id,
                    percentage:
                        total === 0
                            ? 0
                            : Math.round(
                                count[color.id]
                                / total
                                * 100
                            )
                };
            });
        result.push(positionResult);
    }
    return result;
}

function renderHeatmap() {
    const area =
        document.getElementById("heatmap-area");

    if (gameState.showHeatmap) {
        area.classList.remove("hidden");
    } else {
        area.classList.add("hidden");
        return;
    }

    const list =
        document.getElementById("heatmap-list");

    list.innerHTML = "";

    const heatmap =
        calculateHeatmap();

    heatmap.forEach(
        (positionData, index) => {

            const title =
                document.createElement("h3");

            title.textContent = `${index + 1}個目`;
            list.appendChild(title);

            positionData
                .sort(
                    (a,b) =>
                        b.percentage - a.percentage
                )
                .forEach(
                    data => {
                    const div =
                        document.createElement("div");
                    div.className = "heatmap-row";
                    div.innerHTML = "";
                    const circle =
                        createColorCircle(data.colorId);
                    div.appendChild(circle);

                    const label =
                        document.createElement("span");
                    label.textContent = `${data.percentage}%`;
                    div.appendChild(label);

                    const bar =
                        document.createElement("div");
                    bar.className = "heatmap-bar";
                    bar.style.width = `${data.percentage}%`;

                    div.appendChild(bar);
                    list.appendChild(div);
                }
            );
        }
    );
}

document
    .getElementById("toggle-heatmap-button")
    .onclick = () => {
        gameState.showHeatmap =
            !gameState.showHeatmap;

        document
            .getElementById("toggle-heatmap-button")
            .textContent =
                gameState.showHeatmap
                    ? "ヒートマップを隠す"
                    : "ヒートマップを見る";
        render();
    };

function createColorCircle(colorId) {
    // 色表示してくれる共通部品
    const circle =
        document.createElement("span");

    circle.className = "color-circle";
    circle.style.backgroundColor = COLORS[colorId].css;
    return circle;
}

function loadHistory(displayIndex) {
    const historyIndex =
        gameState.history.length
        - 1
        - displayIndex;

    const record =
        gameState.history[historyIndex];

    gameState.guess = [...record.guess];
    gameState.hit = record.hit;
    gameState.blow = record.blow;
    gameState.editingHistoryIndex = historyIndex;

    document
        .getElementById("hit-input")
        .value =
            record.hit;

    document
        .getElementById("blow-input")
        .value =
            record.blow;
    render();
}

function renderConfirmButton() {
    const button =
        document.getElementById("confirm-button");

    button.textContent =
        gameState.editingHistoryIndex === null
            ? "確定"
            : "更新";

}
