const gameState = {
    candidates: generateCandidates(6, 4),
    history: [],
    guess: [null, null, null, null],
    editingIndex: null,

    hit: 0,
    blow: 0
};

render();

function render() {

    renderCandidateCount();
    renderGuessArea();
    renderColorPalette();
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

    console.log("renderColorPalette", gameState.editingIndex);

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
