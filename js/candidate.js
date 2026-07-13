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
