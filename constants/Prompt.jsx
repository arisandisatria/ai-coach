import dedent from "dedent";

export default {
  IDEA: dedent`: Anda sebagai pengajar terbaik
    - Pengguna ingin mempelajari tentang topik
    - Hasilkan 5-7 judul kursus untuk belajar (pendek)
    - Pastikan itu terkait dengan deskripsi
    - Output akan berupa ARRAY String dalam FORMAT JSON saja
    - Jangan menambahkan teks biasa apa pun dalam output
    `,
  // - Chapter Explain in HTML Form, (Code example if required), add line break if required
  COURSE: dedent`: Anda sebagai pengajar terbaik
    - Pengguna ingin mempelajari semua topik
    - Hasilkan kursus dengan nama kursus, deskripsi, dan 5/7 bab di setiap kursus
    - Pastikan untuk menambahkan bab
    - Buat daftar konten disetiap bab beserta deskripsi dalam 5 hingga 8 baris
    - Jangan hanya menjelaskan tentang babnya, jelaskan secara detail dengan contoh
    - Juga buat kursus mudah, sedang dan lanjutan tergantung pada topiknya
    - Tambahkan gambar banner kursus dari ('/banner1.png','/banner2.png','/banner3.png','/banner4.png','/banner5.png','/banner6.png'), pilih secara acak
    - Jelaskan isi bab sebagai tutorial terperinci dengan daftar konten
    - Generate 10 Quizz, 10 Flashcard and 10 Questions answer
    - Tag setiap kursus ke salah satu kategori dari :["Tech & Coding","Business & Finance","Health & Fitness","Science & Engineering","Arts & Creativity"]
    - **Hasilkan kursus dalam format JSON valid**
    - **Gunakan tanda kutip ganda ("") untuk semua kunci dan string**
    - **Tidak ada komentar, tidak ada teks tambahan di luar JSON**
    - **Mulai dengan { "courses": [ ... ] }**
    - **BATASI JUMLAH KARAKTER SEBANYAK 8000 KARAKTER SAJA. TIDAK LEBIH DARI 7500 KARAKTER**
    - Contoh output:
        "courses": [
          {
            "courseTitle": "Intro to Python",
            "description": "Deskripsi kursus...",
            "banner_image": "/banner1.png",
            "category": "Tech & Coding",
            "chapters": [
              {
                "chapterName": "Dasar Python",
                "content": [
                  {
                    "topic": "Membuat Variabel",
                    "explain": "Penjelasan tentang variabel...",
                    "code": "x = 10",
                    "example": "Misalnya, x dapat digunakan untuk menyimpan angka."
                  }
                ]
              }
            ],
            "quiz": [
              {
                "question": "Apa itu variabel?",
                "options": ["Penyimpanan data", "Sebuah fungsi", "Tipe data", "Loop"],
                "correctAns": "Penyimpanan data"
              }
            ],
            "flashcards": [
              {
                "front": "Apa itu variabel?",
                "back": "Penyimpanan data dalam program."
              }
            ],
            "qa": [
              {
                "question": "Apa itu Python?",
                "answer": "Python adalah bahasa pemrograman yang mudah dipelajari."
              }
            ]
          }
        ]
    - **Hanya JSON! Tidak ada teks lain sebelum atau sesudah output.**
    `,
};
