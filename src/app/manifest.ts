import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Помощь с телефоном",
    short_name: "Помощь",
    description:
      "Простые пошаговые инструкции для Android с крупным текстом и быстрыми ссылками.",
    lang: "ru",
    dir: "ltr",
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#f4f7fb",
    theme_color: "#2563eb",
    categories: ["education", "utilities"],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "Как фотографировать?",
        short_name: "Камера",
        description: "Открыть инструкцию по съёмке фото.",
        url: "/guides/take-photo",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "Как отправить фотографию?",
        short_name: "Фото",
        description: "Открыть инструкцию по отправке фотографии.",
        url: "/guides/send-photo",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "Как прочитать сообщения?",
        short_name: "SMS",
        description: "Открыть инструкцию по чтению SMS.",
        url: "/guides/read-messages",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "Добавить контакт",
        short_name: "Добавить контакт",
        description: "Открыть инструкцию по добавлению контакта.",
        url: "/guides/add-contact",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }],
      },
    ],
  };
}
