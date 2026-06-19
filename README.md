<h1 align="center">
   <strong>AI Coach - Pendamping Belajar Canggih</strong>
</h1>

<p align="center">
  <img src="./assets/images/icon.png" alt="AI Coach Logo" width="120" height="120" />
</p>

<p align="center">
  <strong>Belajar apa saja, kapan saja, dipandu oleh Kecerdasan Buatan.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Platform-Android-green?style=for-the-badge&logo=android" alt="Android Support" />
  <img src="https://img.shields.io/badge/Framework-Expo%20%2F%20React%20Native-blue?style=for-the-badge&logo=expo" alt="Framework" />
  <img src="https://img.shields.io/badge/Javascript-Ready-blue?style=for-the-badge&logo=javascript" alt="Javascript" />
</p>

---

## 💡 Tentang AI Coach

**AI Coach** adalah aplikasi mobile berbasis android yang dirancang untuk mengubah cara orang mempelajari hal baru. Menggunakan kekuatan Generative AI, aplikasi ini bertindak sebagai mentor pribadi yang menyusun kurikulum materi secara instan berdasarkan topik apa pun yang diinginkan oleh pengguna. 

Baik kamu ingin belajar pemrograman, sejarah dunia, memasak, hingga persiapan ujian akademik, **AI Coach** akan meracik materi terbaik yang disesuaikan khusus untuk kecepatan belajarmu.

---

## 🚀 Fitur Utama

* **🔍 Custom Topic Discovery:** Masukkan topik apa pun yang ingin kamu pelajari tanpa batasan kaku.
* **📚 Dynamic Syllabus Generation:** AI akan memunculkan daftar materi/bab relevan yang bisa kamu pilih dan susun sendiri sesuai kebutuhan.
* **🎯 4-In-1 AI Course Generation:** Setelah memilih materi, AI akan mengonversinya secara instan menjadi 4 instrumen belajar:
    * 📖 **Bacaan Interaktif:** Materi teks mendalam namun mudah dipahami yang dibagi per halaman (*paginated reading*).
    * 📝 **Kuis Adaptif:** Uji pemahamanmu dengan pertanyaan dinamis yang dirakit langsung oleh AI.
    * 📇 **Flashcards:** Metode *spaced repetition* untuk mengingat istilah atau konsep penting dengan cepat.
    * ❓ **Q&A Session:** Ajukan pertanyaan tentang materi yang belum kamu pahami dan dapatkan jawaban instan dari *coach* AI kamu.
* **🌙 Modern Retro UI:** Antarmuka yang bersih, responsif, dan nyaman di mata (optimalisasi penuh pada *Status Bar* dan *Native Navigation Bar* Android).

---

## 🛠️ Tech Stack

Aplikasi ini dibangun menggunakan ekosistem teknologi modern:

* **Framework:** [React Native](https://reactnative.dev/) dengan [Expo SDK](https://expo.dev/)
* **Navigation:** [Expo Router](https://docs.expo.dev/router/introduction/) (File-based routing)
* **Language:** JavaScript
* **State Management:** React Context API
* **Styling:** React Native StyleSheet
* **AI Engine:** Google Gemini API

---

## 📦 Panduan Instalasi Lokal

Ikuti langkah-langkah berikut untuk menjalankan proyek ini di komputer lokal kamu:

### Prasyarat
* Sudah menginstal **Node.js** (versi v18 atau yang terbaru)
* Sudah menginstal aplikasi **Expo Go** (SDK versi 56.0.0) di HP Android kamu (untuk keperluan testing tanpa kabel).

### Langkah-Langkah

1.  **Clone Repositori Ini**
    ```bash
    git clone [https://github.com/username_kamu/ai-coach.git](https://github.com/username_kamu/ai-coach.git)
    cd ai-coach
    ```

2.  **Install Dependensi**
    ```bash
    npm install
    ```

3.  **Konfigurasi Environment Variables (`.env`)**
    Buat file bernama `.env` di folder root proyek, lalu masukkan API Key yang dibutuhkan:
    ```env
    EXPO_PUBLIC_FIREBASE_API_KEY=isi_dengan_api_key_ai_kamu
    EXPO_PUBLIC_GEMINI_API_KEY=isi_dengan_api_key_ai_kamu
    ```

4.  **Jalankan Aplikasi**
    ```bash
    npx expo start
    ```

5.  **Scan QR Code**
    Buka aplikasi **Expo Go** di HP Android kamu, pilih **Scan QR Code**, lalu arahkan kamera ke kode QR yang muncul di terminal atau browser laptopmu.

---

## 📥 Unduh Aplikasi (Production APK)

Bagi kamu yang ingin mencoba langsung aplikasi **AI Coach** tanpa perlu melakukan instalasi kode di atas, kamu bisa langsung mengunduh file mentahan Android mentah (`.apk`) melalui tautan di bawah ini:

👉 **[Download AI Coach v1.0.0 APK](https://drive.google.com/drive/folders/1OoNPjwOegMQQnmDnC4NsNev2KczUk4sy?usp=drive_link)**

> *Catatan: Karena aplikasi ini tidak diunduh via Play Store, pastikan kamu mengaktifkan izin "Install dari Sumber Tidak Dikenal" (*Unknown Sources*) pada pengaturan keamanan HP Android-mu saat menginstal.*

---

## 🤝 Kontribusi

Kontribusi selalu terbuka lebar! Jika kamu menemukan *bug*, ingin menambahkan fitur baru, atau memperbaiki dokumentasi, silakan ikuti alur berikut:

1. Fork repositori ini.
2. Buat branch fitur baru (`git checkout -b fitur/FiturKerenKamu`).
3. Commit perubahanmu (`git commit -m 'Menambahkan fitur keren X'`).
4. Push ke branch tersebut (`git push origin fitur/FiturKerenKamu`).
5. Buat *Pull Request* baru di GitHub.

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah **MIT License**
---

<p align="center">
  Dibuat dengan 💻 dan 🥤 oleh <a href="https://arisandi-satria.vercel.app">Arisandi Satria</a>
</p>