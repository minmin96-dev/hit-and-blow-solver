const gameState = {
    candidates: generateCandidates(6, 4),
    history: [],
    guess: [null, null, null, null],
    editingIndex: null,

    hit: 0,
    blow: 0,
    showCandidates: false,
    showHeatmap: false
};

render();

function render() {
    renderCandidateCount();
    renderGuessArea();
    renderColorPalette();
    renderHistory();
    renderCandidateList();
    renderHeatmap();
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
        gameState.candidates =
            filterCandidates(
                gameState.candidates,
                gameState.guess,
                {
                    hit: gameState.hit,
                    blow: gameState.blow
                }
            );

        gameState.history.push({

            guess: [...gameState.guess],
            hit: gameState.hit,
            blow: gameState.blow,
            remaining:
                gameState.candidates.length

        });
        render();
    };

function renderHistory() {

    const historyArea =
        document.getElementById("history");

    historyArea.innerHTML ="<h2>履歴</h2>";

    [...gameState.history]
        .reverse()
        .forEach(
            (record, index) => {

            const div =
                document.createElement("div");

            div.textContent =
                `${gameState.history.length - index}回目 : `
                +
                `${record.hit}H `
                +
                `${record.blow}B `
                +
                `残り候補 ${record.remaining}`;

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
                    const circle =
                        document.createElement("div");

                    circle.className = "candidate-color";
                    circle.style.backgroundColor = COLORS[colorId].css;
                    row.appendChild(circle);
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

            positionData.forEach(
                data => {
                    const div =
                        document.createElement("div");

                    div.textContent = `${COLORS[data.colorId].name} : ${data.percentage}%`;
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

