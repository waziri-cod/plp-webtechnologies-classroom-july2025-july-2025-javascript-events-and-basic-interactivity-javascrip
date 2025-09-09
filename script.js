// Part 1: JavaScript Event Handling

// Click event example
document.getElementById('click-btn').addEventListener('click', function() {
    document.getElementById('click-message').textContent = 'Button clicked! Event handling works!';
    document.getElementById('click-message').style.color = 'var(--success)';
});

// Mouseover and mouseout events
const hoverBox = document.getElementById('hover-box');
hoverBox.addEventListener('mouseover', function() {
    this.style.backgroundColor = 'var(--primary)';
    this.style.color = 'white';
    this.textContent = 'Mouse is over!';
});

hoverBox.addEventListener('mouseout', function() {
    this.style.backgroundColor = '';
    this.style.color = '';
    this.textContent = 'Hover over me!';
});

// Double-click event
document.getElementById('reset-btn').addEventListener('dblclick', function() {
    hoverBox.style.backgroundColor = '';
    hoverBox.style.color = '';
    hoverBox.textContent = 'Hover over me!';
});

// Keyboard event
document.getElementById('keyboard-input').addEventListener('input', function() {
    document.getElementById('mirror-text').textContent = this.value;
});

// Part 2: Interactive Elements

// Dark mode toggle
document.getElementById('dark-mode-toggle').addEventListener('change', function() {
    document.body.classList.toggle('dark-mode', this.checked);
});

// Counter game
let count = 0;
const counterElement = document.getElementById('counter');

document.getElementById('increment').addEventListener('click', function() {
    count++;
    counterElement.textContent = count;
    updateCounterColor();
});

document.getElementById('decrement').addEventListener('click', function() {
    count--;
    counterElement.textContent = count;
    updateCounterColor();
});

function updateCounterColor() {
    if (count > 0) {
        counterElement.style.color = 'var(--success)';
    } else if (count < 0) {
        counterElement.style.color = 'var(--danger)';
    } else {
        counterElement.style.color = 'var(--primary)';
    }
}

// FAQ section
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        item.classList.toggle('active');
        question.querySelector('span').textContent = item.classList.contains('active') ? '-' : '+';
    });
});

// Tabbed interface
const tabButtons = document.querySelectorAll('.tab-btn');
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and content
        tabButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        document.getElementById(button.dataset.tab).classList.add('active');
    });
});

// Part 3: Form Validation
const form = document.getElementById('user-form');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;
    
    // Validate name
    const nameInput = document.getElementById('name');
    const nameError = document.getElementById('name-error');
    if (nameInput.value.trim().length < 2) {
        nameError.style.display = 'block';
        isValid = false;
    } else {
        nameError.style.display = 'none';
    }
    
    // Validate email
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        emailError.style.display = 'block';
        isValid = false;
    } else {
        emailError.style.display = 'none';
    }
    
    // Validate password
    const passwordInput = document.getElementById('password');
    const passwordError = document.getElementById('password-error');
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(passwordInput.value)) {
        passwordError.style.display = 'block';
        isValid = false;
    } else {
        passwordError.style.display = 'none';
    }
    
    // Validate confirm password
    const confirmPasswordInput = document.getElementById('confirm-password');
    const confirmPasswordError = document.getElementById('confirm-password-error');
    if (confirmPasswordInput.value !== passwordInput.value) {
        confirmPasswordError.style.display = 'block';
        isValid = false;
    } else {
        confirmPasswordError.style.display = 'none';
    }
    
    // If form is valid, show success message
    if (isValid) {
        document.getElementById('form-success').style.display = 'block';
        form.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            document.getElementById('form-success').style.display = 'none';
        }, 5000);
    }
});

// Real-time validation for better UX
document.getElementById('name').addEventListener('input', function() {
    if (this.value.trim().length >= 2) {
        document.getElementById('name-error').style.display = 'none';
    }
});

document.getElementById('email').addEventListener('input', function() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(this.value)) {
        document.getElementById('email-error').style.display = 'none';
    }
});

document.getElementById('password').addEventListener('input', function() {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    if (passwordRegex.test(this.value)) {
        document.getElementById('password-error').style.display = 'none';
    }
});

document.getElementById('confirm-password').addEventListener('input', function() {
    const passwordInput = document.getElementById('password');
    if (this.value === passwordInput.value) {
        document.getElementById('confirm-password-error').style.display = 'none';
    }
});

// Part 4: Drag and Drop Box
const draggableBox = document.getElementById('draggableBox');
const dropZone = document.getElementById('dropZone');

if (draggableBox && dropZone) {
    draggableBox.addEventListener('dragstart', function (e) {
        e.dataTransfer.setData('text/plain', 'dragged');
        draggableBox.classList.add('dragging');
    });

    draggableBox.addEventListener('dragend', function () {
        draggableBox.classList.remove('dragging');
    });

    dropZone.addEventListener('dragover', function (e) {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', function () {
        dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', function (e) {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        // Move the image into the drop zone
        const dragImg = document.getElementById('dragImg');
        if (dragImg) {
            dropZone.innerHTML = '';
            dropZone.appendChild(dragImg);
        } else {
            dropZone.textContent = 'Dropped!';
        }
        draggableBox.style.display = 'none';
    });
}