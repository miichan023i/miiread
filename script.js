<script>
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const langSelect = document.getElementById('lang-select');
    const chapterItems = document.querySelectorAll('.chapter-item');

    // Theme Switch functionality
    themeToggle.addEventListener('change', () => {
        body.classList.toggle('dark-mode');
        localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.checked = true;
    }

    // Language Switch functionality
    langSelect.addEventListener('change', () => {
        const selectedLang = langSelect.value;
        chapterItems.forEach(item => {
            if (item.classList.contains('lang-' + selectedLang)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });

    // Set initial language display
    langSelect.dispatchEvent(new Event('change'));

</script>
