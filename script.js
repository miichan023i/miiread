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

// Ambil elemen-elemen yang diperlukan
const submitCommentBtn = document.getElementById('submitCommentBtn');
const commentInput = document.getElementById('commentInput');
const commentList = document.getElementById('commentList');

// Tambahkan "event listener" untuk tombol kirim
submitCommentBtn.addEventListener('click', () => {
    const commentText = commentInput.value.trim();

    if (commentText !== '') {
        // Ini adalah langkah penting: Mengirim data ke server (back-end)
        // Kita menggunakan fungsi 'fetch' untuk mengirim data ke URL tertentu
        fetch('https://nama-domain-kamu.com/api/post-comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ comment: commentText })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Komentar berhasil dikirim:', data);
            // Tambahkan komentar ke daftar setelah berhasil dikirim
            displayNewComment(commentText);
            commentInput.value = ''; // Hapus teks dari input
        })
        .catch(error => {
            console.error('Ada kesalahan saat mengirim komentar:', error);
            // Tampilkan pesan error ke pengguna
        });
    }
});

// Fungsi untuk menampilkan komentar baru di halaman
function displayNewComment(comment) {
    const newCommentDiv = document.createElement('div');
    newCommentDiv.className = 'comment';
    newCommentDiv.innerHTML = `<strong>Pengguna:</strong> ${comment}`;
    commentList.prepend(newCommentDiv); // Tampilkan di paling atas
}

// Konfigurasi Firebase Anda (dari Langkah 1)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Ambil elemen-elemen dari HTML
const submitCommentBtn = document.getElementById('submitCommentBtn');
const commentInput = document.getElementById('commentInput');
const commentList = document.getElementById('commentList');

// Fungsi untuk menampilkan komentar baru di halaman
function displayComment(commentText) {
    const newCommentDiv = document.createElement('div');
    newCommentDiv.className = 'comment';
    newCommentDiv.innerHTML = `<strong>Pengguna:</strong> ${commentText}`;
    commentList.prepend(newCommentDiv);
}

// Fungsi untuk mengirim komentar ke Firebase
submitCommentBtn.addEventListener('click', () => {
    const commentText = commentInput.value.trim();
    if (commentText !== '') {
        db.collection("comments").add({
            text: commentText,
            timestamp: firebase.firestore.FieldValue.serverTimestamp() // Timestamp dari server
        })
        .then(() => {
            console.log("Komentar berhasil dikirim!");
            commentInput.value = ''; // Kosongkan input
        })
        .catch((error) => {
            console.error("Ada error:", error);
        });
    }
});

// Fungsi untuk mengambil komentar dari Firebase dan menampilkannya
function fetchComments() {
    // Ambil komentar terbaru, diurutkan berdasarkan timestamp
    db.collection("comments").orderBy("timestamp", "desc").limit(50).get()
    .then((querySnapshot) => {
        commentList.innerHTML = ''; // Kosongkan daftar sebelum diisi
        querySnapshot.forEach((doc) => {
            displayComment(doc.data().text);
        });
    })
    .catch((error) => {
        console.log("Error mengambil komentar:", error);
    });
}

// Panggil fungsi untuk memuat komentar saat halaman pertama kali dimuat
fetchComments();
</script>
