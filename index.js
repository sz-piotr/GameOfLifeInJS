const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const resolution = 10;
canvas.height = 400;
canvas.width = 400;


const columns = canvas.width / resolution;
const rows = canvas.height / resolution;


function buildGrid() {
    return new Array(columns).fill(null)
        .map(() => new Array(rows).fill(null)
            .map(() => Math.floor(Math.random() * 2)));
}
let grid = buildGrid();

let nextTime = Date.now()

requestAnimationFrame(update)
function update() {
    const now = Date.now()
    if (now >= nextTime) {
        grid = nextGeneration(grid)
        render(grid);
        if (now > nextTime + 100) {
            nextTime = now
        }
        nextTime += 100
    }
    requestAnimationFrame(update)
}

function nextGeneration() {
    const nextGeneration = grid.map(arr => [...arr]);

    for (let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[col].length; row++) {
            const cell = grid[col][row];
            let numNeighbors = 0;
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    if (i === 0 && j === 0) {
                        continue;
                    }
                    const x_cell = col + i;
                    const y_cell = row + j;

                    if (x_cell >= 0 && y_cell >= 0 && x_cell < columns && y_cell < rows) {
                        const currentNeighbor = grid[col + i][row + j]
                        numNeighbors += currentNeighbor;

                    }

                }
            }
            //rules
            if (cell === 1 && numNeighbors < 2) {
                nextGeneration[col][row] = 0;
            } else if (cell === 1 && numNeighbors > 3) {
                nextGeneration[col][row] = 0;
            } else if (cell === 0 && numNeighbors === 3) {
                nextGeneration[col][row] = 1;
            }
        }
    }
    return nextGeneration
}
nextGeneration()
function render(grid) {
    for (let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[col].length; row++) {
            const cell = grid[col][row];

            ctx.beginPath();
            ctx.rect(col * resolution, row * resolution, resolution, resolution);
            ctx.fillStyle = cell ? 'green' : 'white';
            ctx.fill();
            ctx.stroke();
        }
    }

}