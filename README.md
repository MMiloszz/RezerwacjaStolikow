# 🍽️ System Rezerwacji Stolików

Prosty i elegancki system do zarządzania rezerwacjami stolików w restauracji. Aplikacja umożliwia użytkownikom rezerwowanie stolików oraz administratorom zarządzanie dostępnością.

## ✨ Funkcjonalności

- **Rejestracja i logowanie** — bezpieczne konta dla użytkowników
- **Zarządzanie stolikami** — dodawanie, edycja i usuwanie stolików
- **Rezerwacje** — prostszy proces rezerwowania stolika
- **Moje rezerwacje** — przegląd i anulowanie własnych rezerwacji
- **Responsywny design** — aplikacja działa na komputerach i urządzeniach mobilnych

## 🛠️ Technologia

- **Backend:** Node.js + Express
- **Frontend:** EJS (server-side rendering)
- **Baza danych:** SQLite
- **Autoryzacja:** express-session + bcrypt
- **Styling:** CSS3 (nowoczesny, responsywny design)

## 📦 Instalacja

1. **Klonuj repozytorium:**
   ```bash
   git clone https://github.com/MMiloszz/RezerwacjaStolikow.git
   cd Rezerwacja-stolikow
   ```

2. **Zainstaluj zależności:**
   ```bash
   cd backend
   npm install
   ```

3. **Uruchom serwer:**
   ```bash
   npm start
   ```

4. **Otwórz w przeglądarce:**
   ```
   http://localhost:3000
   ```

## 🚀 Struktura projektu

```
backend/
├── app.js              # Główny plik serwera
├── package.json        # Zależności
├── config/             # Konfiguracja
├── controllers/        # Logika biznesowa
├── database/           # Inicjalizacja bazy danych
├── middleware/         # Middleware (autoryzacja)
├── models/             # Modele danych
├── routes/             # Definicje tras
├── views/              # Szablony EJS
└── public/             # Statyczne pliki CSS
```

## 📋 Dostępne trasy

- `GET /login` — strona logowania
- `GET /register` — strona rejestracji
- `GET /dashboard` — panel główny
- `GET /tables` — zarządzanie stolikami
- `GET /tables/edit/:id` — edycja stolika
- `GET /reservations` — moje rezerwacje
- `GET /reservations/new` — nowa rezerwacja

## 👤 Konta testowe

Możesz zarejestrować nowe konto lub testować system z domyślnymi danymi.

## 📝 Licencja

MIT License — zobacz [LICENSE](LICENSE) dla szczegółów.

## 👨‍💻 Autor

**Milosz** — [GitHub](https://github.com/MMiloszz)