function renderHistory() {

    const historyArea =
        document.getElementById("history");

    historyArea.innerHTML ="<h2>履歴</h2>";

    let candidates = generateCandidates(6, 4);
    const remainingList = [];

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

        remainingList.push(
            candidates.length
        );
    }

    [...gameState.history]
        .reverse()
        .forEach(
            (record, index) => {
                const div =
                    document.createElement("div");
                div.className = "history-row";
                div.innerHTML = "";
                
                const turn =
                    document.createElement("div");

                turn.className = "history-turn";
                turn.textContent = `${gameState.history.length - index}回目`;
                div.appendChild(turn);

                const result =
                    document.createElement("div");

                result.className = "history-result";
                result.textContent = `${record.hit}H ${record.blow}B`;
                div.appendChild(result);

                if (gameState.showCandidates) {

                    const remain =
                        document.createElement("div");

                    remain.className = "history-remain";

                    remain.textContent =
                        `残り候補数：${remainingList[
                            gameState.history.length - 1 - index
                        ]}`;
                    div.appendChild(remain);
                }

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
                editButton.className = "edit-button";
                editButton.textContent = "修正";
                editButton.onclick = () => {
                    loadHistory(index);
                };
                div.appendChild(editButton);

                historyArea.appendChild(div);
             }
        );
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
            : "修正反映";
}
