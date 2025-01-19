document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const strengthBar = document.querySelector('.strength-bar');
    const requirements = {
        length: document.getElementById('length'),
        uppercase: document.getElementById('uppercase'),
        lowercase: document.getElementById('lowercase'),
        number: document.getElementById('number'),
        special: document.getElementById('special')
    };
    const speakButton = document.getElementById('speak');
    const languageSelect = document.getElementById('language');

    const strengthTexts = {
        'en-US': {
            weak: 'Password strength is weak',
            medium: 'Password strength is medium',
            strong: 'Password strength is strong',
            veryStrong: 'Password strength is very strong'
        },
        'es-ES': {
            weak: 'La contraseña es débil',
            medium: 'La contraseña es media',
            strong: 'La contraseña es fuerte',
            veryStrong: 'La contraseña es muy fuerte'
        },
        'fr-FR': {
            weak: 'Le mot de passe est faible',
            medium: 'Le mot de passe est moyen',
            strong: 'Le mot de passe est fort',
            veryStrong: 'Le mot de passe est très fort'
        },
        'de-DE': {
            weak: 'Passwort ist schwach',
            medium: 'Passwort ist mittel',
            strong: 'Passwort ist stark',
            veryStrong: 'Passwort ist sehr stark'
        }
    };

    function checkStrength(password) {
        let strength = 0;
        
        // Check length
        if (password.length >= 8) {
            strength += 25;
            requirements.length.innerHTML = '✅ At least 8 characters';
        } else {
            requirements.length.innerHTML = '❌ At least 8 characters';
        }

        // Check uppercase
        if (/[A-Z]/.test(password)) {
            strength += 25;
            requirements.uppercase.innerHTML = '✅ At least one uppercase letter';
        } else {
            requirements.uppercase.innerHTML = '❌ At least one uppercase letter';
        }

        // Check lowercase
        if (/[a-z]/.test(password)) {
            strength += 25;
            requirements.lowercase.innerHTML = '✅ At least one lowercase letter';
        } else {
            requirements.lowercase.innerHTML = '❌ At least one lowercase letter';
        }

        // Check numbers
        if (/[0-9]/.test(password)) {
            strength += 25;
            requirements.number.innerHTML = '✅ At least one number';
        } else {
            requirements.number.innerHTML = '❌ At least one number';
        }

        // Check special characters
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            strength += 25;
            requirements.special.innerHTML = '✅ At least one special character';
        } else {
            requirements.special.innerHTML = '❌ At least one special character';
        }

        return strength;
    }

    function updateStrengthBar(strength) {
        strengthBar.style.width = `${strength}%`;
        
        if (strength < 25) {
            strengthBar.style.backgroundColor = '#ff4444';
        } else if (strength < 50) {
            strengthBar.style.backgroundColor = '#ffbb33';
        } else if (strength < 75) {
            strengthBar.style.backgroundColor = '#00C851';
        } else {
            strengthBar.style.backgroundColor = '#007E33';
        }
    }

    function speakStrength(strength) {
        const language = languageSelect.value;
        let text;

        if (strength < 25) {
            text = strengthTexts[language].weak;
        } else if (strength < 50) {
            text = strengthTexts[language].medium;
        } else if (strength < 75) {
            text = strengthTexts[language].strong;
        } else {
            text = strengthTexts[language].veryStrong;
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language;
        speechSynthesis.speak(utterance);
    }

    passwordInput.addEventListener('input', (e) => {
        const strength = checkStrength(e.target.value);
        updateStrengthBar(strength);
    });

    speakButton.addEventListener('click', () => {
        const strength = checkStrength(passwordInput.value);
        speakStrength(strength);
    });
}); 