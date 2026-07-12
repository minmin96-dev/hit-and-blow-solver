const gameState = {
    candidates: generateCandidates(6, 4),
    history: []
};

render();

function render() {
    document.getElementById("candidate-count").textContent =
        gameState.candidates.length;

}
