document.addEventListener('DOMContentLoaded', () => {
    const languageSelector = document.getElementById('language-selector');
    const selectedOption = languageSelector.querySelector('.selected-option');
    const optionsContainer = languageSelector.querySelector('.options-container');
    const options = languageSelector.querySelectorAll('.option');

    // Load saved language or default to English
    const savedLanguage = localStorage.getItem('migra-lang') || 'en';
    updateSelectedOption(savedLanguage);
    loadLanguage(savedLanguage);

    // Toggle dropdown
    selectedOption.addEventListener('click', (e) => {
        e.stopPropagation();
        optionsContainer.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        optionsContainer.classList.remove('active');
    });

    // Handle option selection
    options.forEach(option => {
        option.addEventListener('click', () => {
            const lang = option.getAttribute('data-value');
            localStorage.setItem('migra-lang', lang);
            updateSelectedOption(lang);
            loadLanguage(lang);
            optionsContainer.classList.remove('active');
        });
    });
});

function updateSelectedOption(lang) {
    const languageSelector = document.getElementById('language-selector');
    const flagSpan = languageSelector.querySelector('.selected-option .flag');
    const codeSpan = languageSelector.querySelector('.selected-option .lang-code');

    const flags = {
        'en': '🇺🇸',
        'ht': '🇭🇹',
        'es': '🇪🇸'
    };

    const codes = {
        'en': 'EN',
        'ht': 'HT',
        'es': 'ES'
    };

    if (flagSpan && codeSpan) {
        flagSpan.textContent = flags[lang] || flags['en'];
        codeSpan.textContent = codes[lang] || codes['en'];
    }
}

async function loadLanguage(lang) {
    try {
        const response = await fetch(`locales/${lang}.json`);
        const translations = await response.json();
        applyTranslations(translations);
        document.documentElement.lang = lang;
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

function applyTranslations(translations) {
    const elements = document.querySelectorAll('[data-i18n]');

    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[key]) {
            // Check if element has child elements (like icons) that we want to preserve
            // For simplicity in this static site, we'll mostly replace innerHTML
            // But for buttons with icons, we might need a specific structure or just replace text

            // If the element has a specific structure like <i class="..."></i> Text
            // We should only replace the text node.

            if (element.children.length > 0) {
                // Simple heuristic: if it has children, find the text node and replace it
                // Or assume the translation includes the HTML if needed (e.g. <br>)
                element.innerHTML = translations[key];
            } else {
                element.innerHTML = translations[key];
            }
        }
    });
}
