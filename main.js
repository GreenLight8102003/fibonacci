function generateFibonacci() {
    const input = document.getElementById('number');
    const resultDiv = document.getElementById('result');
    const finalResultDiv = document.getElementById('final-result');
    const n = parseInt(input.value);
    
    if (n < 0) {
        alert('Vui lòng nhập số không âm');
        return;
    }

    let fib = [BigInt(0), BigInt(1)];
    for(let i = 2; i <= n; i++) {
        fib[i] = fib[i-1] + fib[i-2];
    }

    finalResultDiv.innerHTML = `<div class="final-result">F(${n}) = ${fib[n]}</div>`;

    let steps = [];
    
    for(let i = n; i >= 2; i--) {
        steps.push({
            type: 'down',
            text: `Tính F(${i})`
        });
    }

    steps.push({
        type: 'down',
        text: `Tính F(1)`
    });
    steps.push({
        type: 'base',
        text: `→ F(1) = 1 [điều kiện cơ sở]`
    });
    steps.push({
        type: 'down',
        text: `Tính F(0)`
    });
    steps.push({
        type: 'base',
        text: `→ F(0) = 0 [điều kiện cơ sở]`
    });

    for(let i = 2; i <= n; i++) {
        steps.push({
            type: 'up',
            text: `← F(${i}) = F(${i-1}) + F(${i-2}) = ${fib[i-1]} + ${fib[i-2]} = ${fib[i]}`
        });
    }

    let html = '<div class="steps-container">';
    html += '<div class="step title">Các bước thực hiện:</div>';
    steps.forEach(step => {
        html += `<div class="step ${step.type}-case">${step.text}</div>`;
    });
    html += '</div>';
    
    resultDiv.innerHTML = html;
}

// Thêm function để chuyển đổi giữa các tab code
function showCode(language) {
    // Ẩn tất cả code blocks
    document.querySelectorAll('.code-block').forEach(block => {
        block.classList.remove('active');
    });
    
    // Bỏ active khỏi tất cả buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Hiển thị code block được chọn
    document.getElementById(`${language}-code`).classList.add('active');
    
    // Active button được chọn
    document.querySelector(`[onclick="showCode('${language}')"]`).classList.add('active');
}

// Thêm các functions mới
function printFibonacciSequence() {
    const input = document.getElementById('print-number');
    const resultDiv = document.getElementById('print-result');
    const n = parseInt(input.value);
    
    if (n < 0) {
        alert('Vui lòng nhập số không âm');
        return;
    }

    let a = BigInt(0), b = BigInt(1);
    let sequence = [];
    
    for(let i = 0; i < n; i++) {
        sequence.push(a.toString());
        [a, b] = [b, a + b];
    }

    resultDiv.innerHTML = `<div class="sequence-result">${sequence.join(' ')}</div>`;
}

function checkFibonacci() {
    const input = document.getElementById('check-number');
    const resultDiv = document.getElementById('check-result');
    const n = parseInt(input.value);
    
    if (n < 0) {
        alert('Vui lòng nhập số không âm');
        return;
    }

    function isPerfectSquare(x) {
        const s = Math.sqrt(x);
        return s * s === x;
    }

    const isFib = isPerfectSquare(5 * n * n + 4) || isPerfectSquare(5 * n * n - 4);
    
    resultDiv.innerHTML = `
        <div class="check-result ${isFib ? 'is-fib' : 'not-fib'}">
            ${n} ${isFib ? 'là' : 'không phải là'} số Fibonacci
        </div>
    `;
}

// Thêm functions cho mê cung
let maze = [];
let startPos = null;
let endPos = null;

function showProblem(problem) {
    // Log để debug
    console.log('Switching to:', problem);
    
    // Ẩn tất cả các section
    const sections = document.querySelectorAll('.problem-content');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Bỏ active khỏi tất cả các tabs
    document.querySelectorAll('.main-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Hiển thị section được chọn
    const selectedSection = document.getElementById(`${problem}-section`);
    if (selectedSection) {
        selectedSection.style.display = 'block';
        console.log('Showing section:', selectedSection.id);
    }
    
    // Active tab được chọn
    const selectedTab = document.querySelector(`[onclick="showProblem('${problem}')"]`);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
}

function generateMaze() {
    const size = parseInt(document.getElementById('maze-size').value);
    maze = Array(size).fill().map(() => Array(size).fill(0));
    startPos = null;
    endPos = null;
    
    const grid = document.getElementById('maze-grid');
    grid.style.gridTemplateColumns = `repeat(${size}, 40px)`;
    grid.innerHTML = '';
    
    for(let i = 0; i < size; i++) {
        for(let j = 0; j < size; j++) {
            const cell = document.createElement('div');
            cell.className = 'maze-cell maze-empty';
            cell.onclick = () => toggleCell(i, j);
            grid.appendChild(cell);
        }
    }
}

function toggleCell(i, j) {
    const cells = document.querySelectorAll('.maze-cell');
    const cell = cells[i * maze.length + j];
    
    if(!startPos) {
        startPos = {x: i, y: j};
        cell.className = 'maze-cell maze-start';
        cell.textContent = 'S';
    } else if(!endPos) {
        endPos = {x: i, y: j};
        cell.className = 'maze-cell maze-end';
        cell.textContent = 'E';
    } else if(cell.classList.contains('maze-empty')) {
        maze[i][j] = 1;
        cell.className = 'maze-cell maze-wall';
    } else if(cell.classList.contains('maze-wall')) {
        maze[i][j] = 0;
        cell.className = 'maze-cell maze-empty';
    }
}

async function solveMazeVisual() {
    if(!startPos || !endPos) {
        alert('Hãy đặt điểm bắt đầu (S) và điểm kết thúc (E)');
        return;
    }
    
    const visited = Array(maze.length).fill().map(() => Array(maze.length).fill(false));
    const result = await findPath(startPos.x, startPos.y, visited);
    
    document.getElementById('maze-result').innerHTML = `
        <div class="check-result ${result ? 'is-fib' : 'not-fib'}">
            ${result ? 'Tìm thấy đường đi!' : 'Không tìm thấy đường đi!'}
        </div>
    `;
}

async function findPath(x, y, visited) {
    if(x < 0 || x >= maze.length || y < 0 || y >= maze.length || 
       maze[x][y] === 1 || visited[x][y]) return false;
    
    visited[x][y] = true;
    
    const cells = document.querySelectorAll('.maze-cell');
    if(!(x === startPos.x && y === startPos.y) && 
       !(x === endPos.x && y === endPos.y)) {
        cells[x * maze.length + y].className = 'maze-cell maze-path';
    }
    
    await new Promise(resolve => setTimeout(resolve, 100));
    
    if(x === endPos.x && y === endPos.y) return true;
    
    if(await findPath(x, y+1, visited) || await findPath(x, y-1, visited) ||
       await findPath(x+1, y, visited) || await findPath(x-1, y, visited))
        return true;
    
    if(!(x === startPos.x && y === startPos.y) && 
       !(x === endPos.x && y === endPos.y)) {
        cells[x * maze.length + y].className = 'maze-cell maze-empty';
    }
    
    return false;
}

function resetMaze() {
    generateMaze();
    document.getElementById('maze-result').innerHTML = '';
}

// Khởi tạo ban đầu
document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded');
    showProblem('fibonacci');
});
