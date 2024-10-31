document.addEventListener('DOMContentLoaded', function() {
    // Lấy tất cả các tab buttons
    const tabs = document.querySelectorAll('.nav-tab');
    
    // Thêm event listener cho mỗi tab
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Xóa active class từ tất cả các tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Thêm active class cho tab được click
            tab.classList.add('active');
            
            // Lấy id của content cần hiển thị
            const tabId = tab.getAttribute('data-tab');
            
            // Ẩn tất cả các content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Hiển thị content được chọn
            document.getElementById(tabId).classList.add('active');
        });
    });
});

function showCode(blockId) {
    // Remove active class from all code blocks and tabs
    document.querySelectorAll('.code-block').forEach(block => {
        block.classList.remove('active');
    });
    document.querySelectorAll('.code-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Add active class to selected code block and tab
    document.getElementById(`${blockId}-code`).classList.add('active');
    document.querySelector(`[onclick="showCode('${blockId}')"]`).classList.add('active');
}

function calculateFibonacci() {
    const input = document.getElementById('calc-number');
    const resultDiv = document.getElementById('calc-result');
    const n = parseInt(input.value);
    
    if (n < 0) {
        alert('Vui lòng nhập số không âm');
        return;
    }

    // Tính toán với số lớn
    let fib = [BigInt(0), BigInt(1)];
    for(let i = 2; i <= n; i++) {
        fib[i] = fib[i-1] + fib[i-2];
    }

    // Hiển thị kết quả cuối cùng
    let html = `<div class="final-result">F(${n}) = ${fib[n]}</div>`;
    
    // Tạo các bước minh họa
    html += '<div class="steps">';
    
    // Bước đi xuống
    for(let i = n; i > 1; i--) {
        html += `<div class="step down-case">F(${i}) = F(${i-1}) + F(${i-2})</div>`;
    }
    
    // Điều kiện cơ sở
    html += `<div class="step base-case">F(1) = 1 (điều kiện cơ sở)</div>`;
    html += `<div class="step base-case">F(0) = 0 (điều kiện cơ sở)</div>`;
    
    // Bước đi lên
    for(let i = 2; i <= n; i++) {
        html += `
            <div class="step up-case">
                F(${i}) = F(${i-1}) + F(${i-2}) = ${fib[i-1]} + ${fib[i-2]} = ${fib[i]}
            </div>
        `;
    }
    
    html += '</div>';
    resultDiv.innerHTML = html;
}

function printFibonacci() {
    const input = document.getElementById('print-number');
    const resultDiv = document.getElementById('print-result');
    const n = parseInt(input.value);
    
    if (n < 0) {
        alert('Vui lòng nhập số không âm');
        return;
    }

    let sequence = [];
    let a = BigInt(0), b = BigInt(1);
    
    for(let i = 0; i < n; i++) {
        sequence.push(a.toString());
        [a, b] = [b, a + b];
    }

    resultDiv.innerHTML = `
        <div class="final-result">
            ${n} số Fibonacci đầu tiên:
            <div class="sequence">${sequence.join(' ')}</div>
        </div>
    `;
}

// Kiểm tra số Fibonacci
function checkFibonacci() {
    const input = document.getElementById('check-number');
    const resultDiv = document.getElementById('check-result');
    const num = parseInt(input.value);
    
    if (num < 0) {
        alert('Vui lòng nhập số không âm');
        return;
    }

    // Kiểm tra số Fibonacci bằng cách sử dụng tính chất số chính phương
    function isPerfectSquare(x) {
        const s = Math.sqrt(x);
        return Math.floor(s) * Math.floor(s) === x;
    }

    // Một số là số Fibonacci khi và chỉ nếu 5n^2 + 4 hoặc 5n^2 - 4 là số chính phương
    const isFib = isPerfectSquare(5 * num * num + 4) || 
                 isPerfectSquare(5 * num * num - 4);
    
    resultDiv.innerHTML = `
        <div class="final-result ${isFib ? 'is-fib' : 'not-fib'}">
            ${num} ${isFib ? 'là' : 'không phải là'} số Fibonacci
        </div>
    `;
}

// Khởi tạo mặc định
document.addEventListener('DOMContentLoaded', () => {
    showCode('calc-python');
});