# Android Helping Guides

Простой сайт на **Next.js** с пошаговыми инструкциями для людей, которые плохо разбираются в смартфоне. Крупный текст, понятные шаги и кнопки быстрого перехода в приложения Android.

## Гайды

| Тема | URL |
|------|-----|
| Чёрный список | `/guides/blacklist` |
| Как фотографировать | `/guides/take-photo` |
| Как отправить фото | `/guides/send-photo` |
| Как узнать баланс | `/guides/balance` |
| Добавить номер в книжку | `/guides/add-contact` |
| Удалить номер из книжки | `/guides/delete-contact` |
| Переслать номер | `/guides/share-number` |
| Написать и переслать сообщение | `/guides/send-forward-message` |
| Прочитать сообщения | `/guides/read-messages` |

## Локальный запуск

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Сборка

```bash
npm run build
npm start
```

## Деплой на Vercel (бесплатно)

1. Залейте репозиторий на GitHub: [world-helping/android-helping-guides](https://github.com/world-helping/android-helping-guides).
2. Зайдите на [vercel.com](https://vercel.com) → **Add New Project**.
3. Импортируйте репозиторий `android-helping-guides`.
4. Framework Preset: **Next.js** (определится автоматически).
5. Нажмите **Deploy** — дополнительных настроек не нужно.

После деплоя сайт будет доступен по адресу вида `https://ваш-проект.vercel.app`.

## Добавление нового гайда

Отредактируйте `src/lib/guides.ts`: добавьте объект в массив `guides` с полями `slug`, `title`, `steps`, `quickLinks`. У каждого шага можно указать картинку (`image.src`, `variant: "icon" | "screenshot"`). Файлы кладите в `public/guides/<slug>/`. Страница создастся автоматически по адресу `/guides/<slug>`.

## Git

```bash
git init
git remote add origin https://github.com/world-helping/android-helping-guides.git
# первый коммит — когда будете готовы:
# git add .
# git commit -m "Initial Next.js guides app"
# git push -u origin main
```

## Репозиторий

https://github.com/world-helping/android-helping-guides
