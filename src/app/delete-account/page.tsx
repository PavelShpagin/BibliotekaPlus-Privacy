/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

type Lang = "uk" | "en";

const STORAGE_KEY = "bibliotekaplus_privacy_lang";
const CONTACT_EMAIL = "libraryplus0@gmail.com";

function isLang(value: string | null): value is Lang {
  return value === "uk" || value === "en";
}

export default function DeleteAccountPage() {
  const [lang, setLang] = useState<Lang>("uk");
  const year = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    const url = new URL(window.location.href);
    const fromQuery = url.searchParams.get("lang");
    const fromHash = (url.hash || "").replace("#", "");

    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      // ignore
    }

    const preferred: Lang = isLang(fromQuery)
      ? fromQuery
      : isLang(fromHash)
        ? fromHash
        : isLang(stored)
          ? stored
          : "uk";

    setLang((current) => (current === preferred ? current : preferred));
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }

    try {
      const url = new URL(window.location.href);
      url.searchParams.set("lang", lang);
      url.hash = "";
      window.history.replaceState({}, "", url.toString());
    } catch {
      // ignore
    }
  }, [lang]);

  return (
    <div className="bp-page">
      {/* Header */}
      <header className="bp-header">
        <div className="bp-header-inner">
          <a href="/" className="bp-logo">
            <Image
              src="/logo.svg"
              alt="Бібліотека+"
              width={115}
              height={18}
              className="bp-logo-img"
              priority
            />
          </a>
          <nav className="bp-nav">
            <button
              type="button"
              className="bp-lang-btn"
              aria-pressed={lang === "uk"}
              onClick={() => setLang("uk")}
            >
              UA
            </button>
            <button
              type="button"
              className="bp-lang-btn"
              aria-pressed={lang === "en"}
              onClick={() => setLang("en")}
            >
              EN
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="bp-wrap">
        <div className="bp-main">
          <article className="bp-content">
            <div className="bp-content-logo" aria-hidden="true">
              <Image src="/logo.svg" alt="" width={115} height={18} />
            </div>

            {lang === "uk" ? (
              <section>
                <h1>Видалення акаунта</h1>

                <h2>Як видалити акаунт</h2>
                <ol>
                  <li>Відкрийте застосунок <strong>Бібліотека+</strong></li>
                  <li>Увійдіть за допомогою <strong>електронної пошти та пароля</strong></li>
                  <li>Введіть PIN-код, якщо застосунок його запитує</li>
                  <li>Натисніть на <strong>Меню</strong> (☰)</li>
                  <li>Виберіть <strong>Профіль</strong></li>
                  <li>Натисніть <strong>«Видалити акаунт»</strong></li>
                  <li>Підтвердіть видалення</li>
                </ol>

                <h2>Що буде видалено</h2>
                <ul>
                  <li>Дані профілю (email, ПІБ, телефон)</li>
                  <li>Токени автентифікації та PIN-код</li>
                  <li>Історія чату з AI-асистентом</li>
                  <li>Сповіщення та прогрес навчання</li>
                </ul>

                <h2>Що залишиться</h2>
                <p>
                  Завантажені файли та курси передаються адміністратору платформи.
                </p>

                <h2>Не можете увійти?</h2>
                <p>
                  Напишіть на{" "}
                  <a href={`mailto:${CONTACT_EMAIL}?subject=Видалення акаунта`}>
                    {CONTACT_EMAIL}
                  </a>
                </p>
              </section>
            ) : (
              <section>
                <h1>Delete Account</h1>

                <h2>How to delete your account</h2>
                <ol>
                  <li>Open the <strong>Biblioteka+</strong> app</li>
                  <li>Sign in with your <strong>email address and password</strong></li>
                  <li>Enter your PIN if the app asks for it</li>
                  <li>Tap the <strong>Menu</strong> (☰)</li>
                  <li>Select <strong>Profile</strong></li>
                  <li>Tap <strong>"Delete Account"</strong></li>
                  <li>Confirm deletion</li>
                </ol>

                <h2>What will be deleted</h2>
                <ul>
                  <li>Profile data (email, name, phone)</li>
                  <li>Authentication tokens and PIN</li>
                  <li>AI assistant chat history</li>
                  <li>Notifications and learning progress</li>
                </ul>

                <h2>What will be retained</h2>
                <p>
                  Uploaded files and courses are transferred to the platform administrator.
                </p>

                <h2>Can't log in?</h2>
                <p>
                  Email{" "}
                  <a href={`mailto:${CONTACT_EMAIL}?subject=Account Deletion`}>
                    {CONTACT_EMAIL}
                  </a>
                </p>
              </section>
            )}
          </article>
        </div>
      </main>

      {/* Footer */}
      <footer className="bp-footer">
        <div className="bp-footer-inner">
          <a href="/" className="bp-footer-logo">
            <Image src="/logo.svg" alt="Бібліотека+" width={90} height={14} />
          </a>
          <span className="bp-footer-text">© {year} BibliotekaPlus</span>
          <nav className="bp-footer-links">
            <a href="/privacy">{lang === "uk" ? "Конфіденційність" : "Privacy"}</a>
            <a href={`mailto:${CONTACT_EMAIL}`}>
              {lang === "uk" ? "Контакт" : "Contact"}
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
