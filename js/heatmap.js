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
