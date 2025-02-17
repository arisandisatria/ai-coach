import dedent from "dedent";

export default {
  IDEA: dedent`: Anda sebagai pengajar terbaik
    - Pengguna ingin mempelajari tentang topik
    - Hasilkan 7-10 judul kursus untuk belajar (pendek)
    - Pastikan itu terkait dengan deskripsi
    - Output akan berupa ARRAY String dalam FORMAT JSON saja
    - Jangan menambahkan teks biasa apa pun dalam output
    `,
  // - Chapter Explain in HTML Form, (Code example if required), add line break if required
  COURSE: dedent`: Anda sebagai pengajar terbaik
    - Pengguna ingin mempelajari semua topik
    - Hasilkan kursus dengan nama kursus, deskripsi, dan 10 bab di setiap kursus
    - Pastikan untuk menambahkan bab
    - Buat daftar konten disetiap bab beserta deskripsi dalam 5 hingga 10 baris
    - Jangan hanya menjelaskan tentang babnya, jelaskan secara detail dengan contoh
    - Juga buat kursus mudah, sedang dan lanjutan tergantung pada topiknya
    - Tambahkan gambar banner kursus dari ('/banner1.png','/banner2.png','/banner3.png','/banner4.png','/banner5.png','/banner6.png'), pilih secara acak
    - Jelaskan isi bab sebagai tutorial terperinci dengan daftar konten
    - Generate 10 Quizz, 10 Flashcard and 10 Questions answer
    - Tag setiap kursus ke salah satu kategori dari :["Tech & Coding","Business & Finance","Health & Fitness","Science & Engineering","Arts & Creativity"]
    - Output hanya dalam Format JSON 
    -  "courses": [
          {
            "courseTitle": '<Intro to Python>',
            "description": '',
            "banner_image": "/banner1.png",
            "category":"",
            "chapters": [
              {
                chapterName: '',
                content: [
                  {
                    topic: '<Nama topik dalam 2 hingga 4 dunia cth. (Membuat Variabel)>'
                    explain: '<Penjelasan Rinci dalam 6 hingga 8 baris jika diperlukan>',
                    code: '<Contoh kode yang diperlukan jika tidak null>',
                    example: '<Contoh yang diperlukan jika tidak null>'
                  },
                  
                    ...
                  
                ]
              }
            ],
            quiz:[
              {
                question:'',
                options:['a',b,c,d],
                correctAns:''
              }
            ],
            flashcards:[
              {
                front:'',
                back:''
              }
            ],
            qa:[
              {
                question:'',
                answer:''
              }
            ]
          }
        ]
    `,
};
