/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

type Lang = "uk" | "en";

const STORAGE_KEY = "bibliotekaplus_privacy_lang";
const LAST_UPDATED_ISO = "2026-01-04";
const CONTACT_EMAIL = "libraryplus0@gmail.com";

function isLang(value: string | null): value is Lang {
  return value === "uk" || value === "en";
}

export function PrivacyPolicy() {
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
          <div className="bp-content">
            {/* Ukrainian Version */}
            <section lang="uk" hidden={lang !== "uk"}>
              <a href="/" className="bp-content-logo">
                <Image
                  src="/logo.svg"
                  alt="Бібліотека+"
                  width={115}
                  height={22}
                  priority
                />
              </a>

              <h1>Повідомлення про обробку персональних даних</h1>

              <p>
                Ця Політика конфіденційності описує, які дані ми обробляємо у
                застосунку <strong>«Бібліотека+»</strong> («Застосунок»), як і з якою метою
                ми їх використовуємо, кому можемо передавати, як довго зберігаємо та які
                у вас є права.
              </p>

              <p>
                Застосунок «Бібліотека+» створено командою BibliotekaPlus для забезпечення
                доступу до навчальних матеріалів, документів та інформаційних ресурсів
                для навчальних закладів та підрозділів.
              </p>

              <div className="bp-note">
                <strong>Важливо:</strong> Застосунок «Бібліотека+» наразі перебуває на етапі
                тестування та альфа-версії. Він не є державною послугою та розробляється з метою
                подальшого впровадження для потреб освітніх установ.
              </div>

              <ul>
                <li>
                  <strong>Володільцем персональних даних</strong>, що обробляються за допомогою
                  програмних засобів Застосунку «Бібліотека+», є розробник і оператор — команда
                  BibliotekaPlus. Якщо Застосунок впроваджується/адмініструється вашим навчальним
                  закладом або організацією, така організація може виступати окремим
                  володільцем/контролером даних.
                </li>

                <li>
                  <strong>Контакт для звернень:</strong>{" "}
                  <a className="bp-link" href={`mailto:${CONTACT_EMAIL}`}>
                    {CONTACT_EMAIL}
                  </a>
                </li>

                <li>
                  <p><strong>До складу персональних даних можуть включатися:</strong></p>
                  <ul>
                    <li>
                      <strong>дані акаунта та профілю:</strong>
                      <ul>
                        <li>Email</li>
                        <li>ПІБ, позивний, група (для курсантів)</li>
                        <li>Ідентифікатор для верифікації доступу</li>
                        <li>Номер телефону</li>
                        <li>Роль та пов&apos;язані дані менторства</li>
                      </ul>
                    </li>
                    <li>
                      <strong>дані безпеки та автентифікації:</strong>
                      <ul>
                        <li>Пароль (зберігається у захищеному вигляді)</li>
                        <li>PIN-код для швидкого входу</li>
                        <li>Ідентифікатор пристрою для прив&apos;язки до сесії</li>
                        <li>Токени автентифікації</li>
                        <li>Дані про спроби входу для захисту від несанкціонованого доступу</li>
                      </ul>
                    </li>
                    <li>
                      <strong>контент бібліотеки:</strong>
                      <ul>
                        <li>Файли, які ви завантажуєте (документи, зображення тощо) та їх метадані</li>
                        <li>Структура папок та налаштування доступів</li>
                      </ul>
                    </li>
                    <li>
                      <strong>дані AI-асистента:</strong>
                      <ul>
                        <li>Ваші повідомлення у чаті та історія діалогу</li>
                        <li>Контекст документів для формування відповідей</li>
                      </ul>
                    </li>
                    <li>
                      <strong>технічні дані:</strong>
                      <ul>
                        <li>IP-адреса та журнали запитів</li>
                        <li>Технічні логи роботи сервісу</li>
                      </ul>
                    </li>
                  </ul>
                </li>

                <li>
                  <p><strong>Мета обробки персональних даних:</strong></p>
                  <ul>
                    <li>Надання функцій сервісу: автентифікація, керування доступами, бібліотека, менторство</li>
                    <li>Безпека: захист облікових записів та даних користувачів</li>
                    <li>AI-функції: пошук та обробка документів, чат-асистент</li>
                    <li>Підтримка: діагностика та виправлення помилок</li>
                  </ul>
                </li>

                <li>
                  <p><strong>Третіми особами, яким можуть передаватися персональні дані, є:</strong></p>
                  <ul>
                    <li>Постачальники хмарної інфраструктури для роботи сервісу</li>
                    <li>Провайдери автентифікації (для входу через зовнішні облікові записи)</li>
                    <li>Постачальники AI-обробки для функцій асистента</li>
                    <li>Адміністратори/викладачі у межах ваших прав доступу</li>
                    <li>Інші особи за вимогою закону</li>
                  </ul>
                  <p>
                    Передача персональних даних здійснюється відповідно до чинного законодавства
                    України про захист персональних даних.
                  </p>
                </li>

                <li>
                  <strong>Персональні дані зберігаються</strong> протягом часу існування акаунта
                  та/або поки це потрібно для роботи сервісу. Файли зберігаються доки вони не видалені
                  користувачем або адміністратором.
                </li>

                <li>
                  <p>
                    <strong>
                      Згідно з Законом України «Про захист персональних даних» суб&apos;єкт
                      персональних даних має право:
                    </strong>
                  </p>
                  <ul>
                    <li>знати про джерела збирання, місцезнаходження своїх персональних даних, мету їх обробки</li>
                    <li>отримувати інформацію про умови надання доступу до персональних даних</li>
                    <li>на доступ до своїх персональних даних</li>
                    <li>отримувати відповідь про те, чи обробляються його персональні дані</li>
                    <li>пред&apos;являти вмотивовану вимогу із запереченням проти обробки своїх персональних даних</li>
                    <li>пред&apos;являти вмотивовану вимогу щодо зміни або знищення своїх персональних даних</li>
                    <li>на захист своїх персональних даних від незаконної обробки та випадкової втрати</li>
                    <li>звертатися із скаргами на обробку своїх персональних даних</li>
                    <li>застосовувати засоби правового захисту в разі порушення законодавства</li>
                  </ul>
                </li>

                <li>
                  <p><strong>Запити</strong></p>
                  <p>
                    Щоб звернутися до володільця своїх персональних даних у випадках, визначених
                    Законом України «Про захист персональних даних», ви можете надіслати нам
                    електронного листа за адресою{" "}
                    <a className="bp-link" href={`mailto:${CONTACT_EMAIL}`}>
                      {CONTACT_EMAIL}
                    </a>.
                  </p>
                </li>
              </ul>

              <h2>Стандарти безпеки щодо неповнолітніх</h2>
              <p>
                Використання застосунку забороняє сексуальне насильство над дітьми та експлуатацію неповнолітніх.
              </p>
              <p>
                Якщо у вас є будь-які питання або повідомлення щодо безпеки неповнолітніх, будь ласка,
                зверніться до нас за адресою{" "}
                <a className="bp-link" href={`mailto:${CONTACT_EMAIL}`}>
                  {CONTACT_EMAIL}
                </a>.
              </p>
              <p>
                Застосунок «Бібліотека+» не призначений для дітей віком до 13 років. Ми не збираємо
                свідомо дані дітей до 13 років. Якщо ви вважаєте, що такі дані були надані
                помилково — напишіть нам, і ми вживемо заходів для їх видалення.
              </p>
            </section>

            {/* English Version */}
            <section lang="en" hidden={lang !== "en"}>
              <a href="/" className="bp-content-logo">
                <Image
                  src="/logo.svg"
                  alt="Бібліотека+"
                  width={115}
                  height={22}
                  priority
                />
              </a>

              <h1>Privacy notice</h1>

              <p>
                This Privacy Policy explains what data we process in the{" "}
                <strong>«Бібліотека+» (BibliotekaPlus)</strong> application («App»), how and why we use it,
                who we may share it with, how long we keep it, and what rights you have.
              </p>

              <p>
                The «Бібліотека+» App was developed by the BibliotekaPlus team to provide access
                to educational materials, documents, and information resources for educational
                institutions and units.
              </p>

              <div className="bp-note">
                <strong>Important:</strong> The «Бібліотека+» App is currently in testing and alpha stage.
                It is not a government service and is being developed for future implementation
                in educational institutions.
              </div>

              <ul>
                <li>
                  <strong>The Controller of personal data</strong> processed by the «Бібліотека+» App
                  is the developer and operator — the BibliotekaPlus team. If the App is deployed/managed
                  by your institution or organization, that organization may act as an additional
                  controller for access management and learning processes.
                </li>

                <li>
                  <strong>Contact:</strong>{" "}
                  <a className="bp-link" href={`mailto:${CONTACT_EMAIL}`}>
                    {CONTACT_EMAIL}
                  </a>
                </li>

                <li>
                  <p><strong>Personal data may include:</strong></p>
                  <ul>
                    <li>
                      <strong>account & profile data:</strong>
                      <ul>
                        <li>Email</li>
                        <li>Full name, callsign, group (for students)</li>
                        <li>Identifier for access verification</li>
                        <li>Phone number</li>
                        <li>Role and mentorship relationships</li>
                      </ul>
                    </li>
                    <li>
                      <strong>authentication & security data:</strong>
                      <ul>
                        <li>Password (stored securely)</li>
                        <li>PIN for quick login</li>
                        <li>Device identifier for session binding</li>
                        <li>Authentication tokens</li>
                        <li>Login attempt data for unauthorized access protection</li>
                      </ul>
                    </li>
                    <li>
                      <strong>library content:</strong>
                      <ul>
                        <li>Files you upload (documents, images, etc.) and their metadata</li>
                        <li>Folder structure and access settings</li>
                      </ul>
                    </li>
                    <li>
                      <strong>AI assistant data:</strong>
                      <ul>
                        <li>Your chat messages and conversation history</li>
                        <li>Document context for generating responses</li>
                      </ul>
                    </li>
                    <li>
                      <strong>technical data:</strong>
                      <ul>
                        <li>IP address and request logs</li>
                        <li>Technical service logs</li>
                      </ul>
                    </li>
                  </ul>
                </li>

                <li>
                  <p><strong>The purpose of personal data processing:</strong></p>
                  <ul>
                    <li>Provide core features: authentication, access control, library, mentorship</li>
                    <li>Security: protecting user accounts and data</li>
                    <li>AI features: document processing and search, chat assistant</li>
                    <li>Support: diagnostics and bug fixes</li>
                  </ul>
                </li>

                <li>
                  <p><strong>Third parties to whom personal data may be transferred:</strong></p>
                  <ul>
                    <li>Cloud infrastructure providers for service operation</li>
                    <li>Authentication providers (for external account sign-in)</li>
                    <li>AI processing providers for assistant features</li>
                    <li>Administrators/teachers within your access rights</li>
                    <li>Other parties when required by law</li>
                  </ul>
                  <p>
                    Personal data transfer is carried out in accordance with applicable Ukrainian
                    personal data protection legislation.
                  </p>
                </li>

                <li>
                  <strong>Personal data is stored</strong> while your account exists and as needed
                  to operate the service. Files are stored until deleted by the user or administrator.
                </li>

                <li>
                  <p>
                    <strong>
                      In accordance with the Law of Ukraine «On Personal Data Protection»,
                      the personal data subject has the right to:
                    </strong>
                  </p>
                  <ul>
                    <li>know about the sources of collection, location of personal data, purpose of their processing</li>
                    <li>receive information on conditions of access to personal data</li>
                    <li>access to his/her personal data</li>
                    <li>receive a response regarding whether personal data are processed</li>
                    <li>submit a motivated request objecting to processing of personal data</li>
                    <li>submit a motivated request to change or destroy personal data</li>
                    <li>protect personal data from illegal processing and accidental loss</li>
                    <li>lodge complaints regarding personal data processing</li>
                    <li>use legal remedies in case of legislation violation</li>
                  </ul>
                </li>

                <li>
                  <p><strong>Requests</strong></p>
                  <p>
                    To contact the controller of your personal data in cases defined by the
                    Law of Ukraine «On Personal Data Protection», you can send us an
                    email at{" "}
                    <a className="bp-link" href={`mailto:${CONTACT_EMAIL}`}>
                      {CONTACT_EMAIL}
                    </a>.
                  </p>
                </li>
              </ul>

              <h2>Child safety standards</h2>
              <p>
                The use of the application prohibits sexual abuse and exploitation of minors.
              </p>
              <p>
                If you have any questions or reports regarding the safety of minors, please
                contact us at{" "}
                <a className="bp-link" href={`mailto:${CONTACT_EMAIL}`}>
                  {CONTACT_EMAIL}
                </a>.
              </p>
              <p>
                The «Бібліотека+» App is not intended for children under 13. We do not knowingly
                collect personal data from children under 13. If you believe such data was provided
                by mistake, contact us and we will take steps to delete it.
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bp-footer">
        <div className="bp-footer-inner">
          <a href="/" className="bp-footer-logo">
            <Image
              src="/logo.svg"
              alt="Бібліотека+"
              width={100}
              height={16}
            />
          </a>
          <div className="bp-footer-text">
            © {year} BibliotekaPlus
          </div>
          <div className="bp-footer-links">
            <a href={`mailto:${CONTACT_EMAIL}`}>
              {lang === "uk" ? "Контакт" : "Contact"}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
