# medSOS

MedSOS adalah website media sosial sederhana yang memungkinkan pengguna untuk membuat, mengedit, dan menghapus tweet. Selain itu, pengguna harus membuat akun terlebih dahulu agar bisa  membuat, mengedit, dan menghapus tweet ke publik atau teman dekat saja.

Deployment:
:link: <https://ristek-medsos-lyzander.up.railway.app/>

> Tugas ini dibuat untuk memenuhi Open Recruitment Assignment | RISTEK 2023

## Cara menjalankan pada Local Environment

Pastikan bahwa Python dan pip sudah ter-install pada komputer kalian.

1. Clone repository

    ```cmd
    git clone https://github.com/LyzanderAndrylie/ristek-oprec-medSOS.git
    ```

2. Buat virtual environment

    ```cmd
    python -m venv env
    ```

3. Nyalakan virtual environment

    ```cmd
    env\Scripts\activate
    ```

    > Note: Perintah di atas dijalankan pada sistem operasi Windows

4. Install semua dependencies

    ```cmd
    pip install -r requirements.txt
    ```

5. Jalankan migrasi

    ```cmd
    python manage.py makemigrations
    python manage.py migrate
    ```

6. Jalankan development web server

    ```cmd
    python manage.py runserver
    ```

## Acknowledgment

Dropdown Button component is taken from <https://codepen.io/huphtur/pen/ordMeN> created by M.Appelman
