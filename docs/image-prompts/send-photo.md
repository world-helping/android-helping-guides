# Промпты для изображений — гайд `send-photo`

Гайд: **Как отправить фотографию?** (`/guides/send-photo`)

Рекомендуемые имена файлов после генерации (положить в `public/guides/send-photo/`):

| Шаг | Файл | `variant` в guides.ts |
|-----|------|------------------------|
| 1 | `step-1-gallery-photo.png` | `screenshot` |
| 2 | `step-2-share-button.png` | `screenshot` |
| 3 | `step-3-choose-app.png` | `screenshot` |
| 4 | `step-4-pick-contact.png` | `screenshot` |
| 5 | `step-5-send.png` | `screenshot` |

Общие требования ко всем скриншотам (шаги 1–5):

- Android smartphone screenshot mockup, Russian UI labels
- Material Design 3, Google apps style (Gallery / Photos)
- Light theme, educational tutorial mockup, no real personal data
- Phone screen aspect ratio **9:19**
- Generic fake names and numbers only

---

## Шаг 1 — Открыть галерею и выбрать снимок

**Текст шага:** Откройте «Галерея» или «Фото» и выберите нужный снимок.

**Промпт (EN):**

```
Android smartphone screenshot mockup, Russian UI. Google Photos or Gallery app grid view showing photo thumbnails, one photo selected with blue checkmark or highlighted border, top bar title "Фото" or "Галерея", bottom tabs optional, Material Design 3 light theme, tutorial educational mockup, generic landscape and portrait thumbnails, no real faces, 9:19 phone screen aspect ratio
```

**Кратко (RU):** Сетка миниатюр в «Галерее», один снимок выделен галочкой.

---

## Шаг 2 — Нажать «Поделиться»

**Текст шага:** Нажмите значок «Поделиться» (три точки со стрелками или стрелка вверх).

**Промпт (EN):**

```
Android smartphone screenshot mockup, Russian UI. Full-screen photo preview in Gallery app, share icon highlighted at top (three dots connected by lines or upward arrow), subtle arrow annotation pointing to share button, toolbar with back arrow and "Поделиться" tooltip, Material Design 3 light theme, tutorial mockup, 9:19 aspect ratio
```

**Кратко (RU):** Открытый снимок на весь экран, подсвечена кнопка «Поделиться» вверху.

---

## Шаг 3 — Выбрать приложение

**Текст шага:** Выберите приложение: WhatsApp, Telegram, Сообщения (SMS) и т.д.

**Промпт (EN):**

```
Android smartphone screenshot mockup, Russian UI. Android share sheet bottom panel "Поделиться через" with app icons in row: WhatsApp green, Telegram blue, Messages/SMS blue envelope, Gmail, Copy link, Material Design 3, light theme, clear readable Russian labels under icons, tutorial educational style, 9:19 phone screen
```

**Кратко (RU):** Нижняя панель «Поделиться через» с иконками WhatsApp, Telegram, Сообщения.

---

## Шаг 4 — Указать получателя

**Текст шага:** Укажите контакт или чат, кому отправить.

**Промпт (EN):**

```
Android smartphone screenshot mockup, Russian UI. WhatsApp or Telegram "Выберите чат" / "Кому отправить" contact picker list with search bar at top, generic Russian contact names like "Мама", "Сосед", avatars with initials, one row highlighted ready to tap, Material Design 3, light theme, tutorial mockup, no real phone numbers, 9:19 aspect ratio
```

**Кратко (RU):** Список контактов/чатов с поиском, выбран получатель.

---

## Шаг 5 — Нажать «Отправить»

**Текст шага:** Нажмите «Отправить» (значок самолётика или стрелки).

**Промпт (EN):**

```
Android smartphone screenshot mockup, Russian UI. Messaging chat screen with photo attached as preview thumbnail above text field, large send button highlighted (paper plane icon or arrow), Russian label "Отправить" or send icon circled, chat header with generic contact name, Material Design 3 WhatsApp-like green accents or Telegram blue, tutorial annotation, 9:19 phone screen, light theme
```

**Кратко (RU):** Чат с прикреплённым фото, подсвечена кнопка отправки (самолётик).

---

## Подключение в `src/lib/guides.ts`

Изображения сгенерированы и подключены в `src/lib/guides.ts` (все шаги — `variant: "screenshot"`).
