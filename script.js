document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const languageSelect = document.getElementById('language-select');
    const idChapters = document.getElementById('id-chapters');
    const enChapters = document.getElementById('en-chapters');
    const statusBadge = document.querySelector('.status-badge');

    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
        if (savedTheme === 'dark-mode') {
            themeToggle.checked = true;
        }
    } else {
        body.classList.add('light-mode');
    }

    // Toggle between light and dark mode
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
        }
    });

    // Handle language selection
    languageSelect.addEventListener('change', (event) => {
        if (event.target.value === 'id') {
            idChapters.classList.remove('hidden');
            enChapters.classList.add('hidden');
        } else {
            idChapters.classList.add('hidden');
            enChapters.classList.remove('hidden');
        }
    });

    // Set initial chapter list visibility
    if (languageSelect.value === 'id') {
        enChapters.classList.add('hidden');
    } else {
        idChapters.classList.add('hidden');
    }
});
