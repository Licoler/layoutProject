document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registrationForm');
    const modal = document.getElementById('successModal');
    const closeModal = document.getElementById('closeModal');

    // Валидация имени пользователя
    function validateUsername(username) {
        const regex = /^[a-zA-Z0-9]{3,20}$/;
        return regex.test(username);
    }

    // Валидация email
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Форматирование телефона
    function formatPhone(phone) {
        return phone.replace(/\D/g, '')
            .replace(/(\d{1})?(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3-$4-$5');
    }

    // Переключение видимости пароля
    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', function () {
            const input = this.parentElement.querySelector('input');
            if (input.type === 'password') {
                input.type = 'text';
                this.textContent = '🙈';
            } else {
                input.type = 'password';
                this.textContent = '👁️';
            }
        });
    });

    // Автоформатирование телефона
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            value = value.replace(/(\d{1})?(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/, function (match, p1, p2, p3, p4, p5) {
                let result = '';
                if (p1) result += `+${p1}`;
                if (p2) result += ` (${p2}`;
                if (p3) result += `) ${p3}`;
                if (p4) result += `-${p4}`;
                if (p5) result += `-${p5}`;
                return result;
            });
        }
        e.target.value = value;
    });

    // Валидация формы
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let isValid = true;

        // Валидация имени пользователя
        const username = document.getElementById('username');
        const usernameError = username.parentElement.querySelector('.error-message');
        if (!validateUsername(username.value)) {
            username.classList.add('error');
            usernameError.textContent = 'Имя пользователя должно содержать 3-20 символов (буквы и цифры)';
            isValid = false;
        } else {
            username.classList.remove('error');
            username.classList.add('success');
            usernameError.textContent = '';
        }

        // Валидация email
        const email = document.getElementById('email');
        const emailError = email.parentElement.querySelector('.error-message');
        if (!validateEmail(email.value)) {
            email.classList.add('error');
            emailError.textContent = 'Введите корректный email';
            isValid = false;
        } else {
            email.classList.remove('error');
            email.classList.add('success');
            emailError.textContent = '';
        }

        // Валидация пароля
        const password = document.getElementById('password');
        const passwordError = password.parentElement.querySelector('.error-message');
        if (password.value.length < 6) {
            password.classList.add('error');
            passwordError.textContent = 'Пароль должен содержать минимум 6 символов';
            isValid = false;
        } else {
            password.classList.remove('error');
            password.classList.add('success');
            passwordError.textContent = '';
        }

        // Подтверждение пароля
        const confirmPassword = document.getElementById('confirmPassword');
        const confirmError = confirmPassword.parentElement.querySelector('.error-message');
        if (password.value !== confirmPassword.value) {
            confirmPassword.classList.add('error');
            confirmError.textContent = 'Пароли не совпадают';
            isValid = false;
        } else {
            confirmPassword.classList.remove('error');
            confirmPassword.classList.add('success');
            confirmError.textContent = '';
        }
        if (isValid) {
            modal.style.display = 'flex';
        }
    });

    // Закрытие модального окна
    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
    });
});