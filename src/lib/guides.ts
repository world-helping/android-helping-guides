export type AppQuickLink = {
  label: string;
  href: string;
  hint?: string;
};

export type OpenContactsQuickLink = {
  kind: "openContacts";
  hint?: string;
};

export type OpenSmsQuickLink = {
  kind: "openSms";
  hint?: string;
};

export type NewSmsQuickLink = {
  kind: "newSms";
  hint?: string;
};

export type OpenCameraQuickLink = {
  kind: "openCamera";
  hint?: string;
};

export type OpenGalleryQuickLink = {
  kind: "openGallery";
  hint?: string;
};

export type QuickLink =
  | AppQuickLink
  | OpenContactsQuickLink
  | OpenSmsQuickLink
  | NewSmsQuickLink
  | OpenCameraQuickLink
  | OpenGalleryQuickLink;

export type StepImage = {
  src: string;
  alt: string;
  variant: "icon" | "screenshot";
};

export type StepTextLink = {
  match: string;
  href: string;
};

export type GuideStep = {
  text: string;
  image?: StepImage;
  textLinks?: StepTextLink[];
};

export type Guide = {
  slug: string;
  title: string;
  shortDescription: string;
  icon: string;
  steps: GuideStep[];
  tips?: string[];
  quickLinks: QuickLink[];
};

const createContactHref =
  "intent://#Intent;action=android.intent.action.INSERT;type=vnd.android.cursor.dir/raw_contact;end";

export const guides: Guide[] = [
  {
    slug: "blacklist",
    title: "Как занести номер в чёрный список?",
    shortDescription: "Заблокировать звонки и сообщения от нежелательного номера",
    icon: "🚫",
    steps: [
      {
        text: "Откройте приложение «Телефон» (значок трубки на главном экране).",
        image: {
          src: "/guides/blacklist/step-1-phone-icon.png",
          alt: "Иконка приложения «Телефон» на Android",
          variant: "icon",
        },
      },
      {
        text: "Найдите номер в списке недавних звонков или откройте «Контакты» и выберите человека.",
        image: {
          src: "/guides/blacklist/step-2-recent-calls.png",
          alt: "Список недавних звонков в приложении «Телефон»",
          variant: "screenshot",
        },
      },
      {
        text: "Нажмите на номер и удерживайте палец 1–2 секунды (или нажмите значок «⋮» / «Ещё» справа).",
        image: {
          src: "/guides/blacklist/step-3-long-press-menu.png",
          alt: "Меню после нажатия на номер в списке звонков",
          variant: "screenshot",
        },
      },
      {
        text: "В появившемся меню выберите «Заблокировать», «В чёрный список» или «Block».",
        image: {
          src: "/guides/blacklist/step-4-block-menu.png",
          alt: "Пункт меню «Заблокировать» или «В чёрный список»",
          variant: "screenshot",
        },
      },
      {
        text: "Подтвердите действие кнопкой «ОК» или «Заблокировать».",
        image: {
          src: "/guides/blacklist/step-5-confirm.png",
          alt: "Подтверждение блокировки номера",
          variant: "screenshot",
        },
      },
    ],
    tips: [
      "На некоторых телефонах блокировка находится в «Настройки» → «Звонки» → «Чёрный список».",
      "Заблокированный абонент не сможет дозвониться и часто не сможет отправить SMS.",
    ],
    quickLinks: [
      {
        label: "Открыть набор номера",
        href: "tel:",
        hint: "Откроется приложение «Телефон». Дальше — шаги выше.",
      },
    ],
  },
  {
    slug: "take-photo",
    title: "Как фотографировать?",
    shortDescription: "Сделать снимок встроенной камерой",
    icon: "📷",
    steps: [
      {
        text: "На главном экране найдите приложение «Камера» (значок объектива).",
        image: {
          src: "/guides/take-photo/step-1-camera-icon.png",
          alt: "Иконка приложения «Камера» на главном экране Android",
          variant: "screenshot",
        },
      },
      {
        text: "Держите телефон двумя руками, направьте камеру на то, что хотите снять.",
        image: {
          src: "/guides/take-photo/step-2-holding-phone.png",
          alt: "Как держать телефон двумя руками при съёмке",
          variant: "screenshot",
        },
      },
      {
        text: "На экране появится изображение. При необходимости подождите 1–2 секунды — картинка станет чётче.",
        image: {
          src: "/guides/take-photo/step-3-viewfinder.png",
          alt: "Экран камеры с чётким изображением в видоискателе",
          variant: "screenshot",
        },
      },
      {
        text: "Нажмите большую кнопку спуска внизу экрана (обычно круг или белый круг).",
        image: {
          src: "/guides/take-photo/step-4-shutter-button.png",
          alt: "Кнопка спуска затвора внизу экрана камеры",
          variant: "screenshot",
        },
      },
      {
        text: "Услышите щелчок или увидите короткую анимацию — фото сохранено в галерее.",
        image: {
          src: "/guides/take-photo/step-5-photo-saved.png",
          alt: "Фото сохранено — миниатюра снимка в углу экрана камеры",
          variant: "screenshot",
        },
      },
    ],
    tips: [
      "Если экран тёмный — уберите палец с объектива камеры (маленькое кружочко сверху телефона).",
      "Готовые фото ищите в приложении «Галерея» или «Фото».",
    ],
    quickLinks: [
      {
        kind: "openCamera",
        hint: "Откроется приложение «Камера». Если не открылось — найдите «Камера» на главном экране.",
      },
      {
        kind: "openGallery",
        hint: "Просмотр уже сделанных снимков.",
      },
    ],
  },
  {
    slug: "send-photo",
    title: "Как отправить фотографию?",
    shortDescription: "Переслать снимок в мессенджере или по SMS",
    icon: "📤",
    steps: [
      {
        text: "Откройте «Галерея» или «Фото» и выберите нужный снимок.",
        textLinks: [
          {
            match: "«Галерея»",
            href: "intent:#Intent;action=android.intent.action.MAIN;category=android.intent.category.APP_GALLERY;end",
          },
        ],
        image: {
          src: "/guides/send-photo/step-1-gallery-photo.png",
          alt: "Выбор снимка в приложении «Галерея»",
          variant: "screenshot",
        },
      },
      {
        text: "Нажмите значок «Поделиться» (три точки со стрелками или стрелка вверх).",
        image: {
          src: "/guides/send-photo/step-2-share-button.png",
          alt: "Кнопка «Поделиться» при просмотре фотографии",
          variant: "screenshot",
        },
      },
      {
        text: "Выберите приложение: WhatsApp, Telegram, Сообщения (SMS) и т.д.",
        image: {
          src: "/guides/send-photo/step-3-choose-app.png",
          alt: "Выбор приложения для отправки фото",
          variant: "screenshot",
        },
      },
      {
        text: "Укажите контакт или чат, кому отправить.",
        image: {
          src: "/guides/send-photo/step-4-pick-contact.png",
          alt: "Выбор контакта или чата для отправки",
          variant: "screenshot",
        },
      },
      {
        text: "Нажмите «Отправить» (значок самолётика или стрелки).",
        image: {
          src: "/guides/send-photo/step-5-send.png",
          alt: "Кнопка «Отправить» в чате с прикреплённым фото",
          variant: "screenshot",
        },
      },
    ],
    tips: [
      "В WhatsApp и Telegram можно отправить фото прямо из чата: значок «скрепка» или «+» → «Галерея».",
      "По SMS фото отправляется как MMS — может взиматься плата оператора.",
    ],
    quickLinks: [
      {
        kind: "openGallery",
        hint: "Выберите фото, затем «Поделиться».",
      },
      {
        kind: "openSms",
        hint: "Если не открылось — найдите приложение «Сообщения» на главном экране.",
      },
    ],
  },
  {
    slug: "balance",
    title: "Как узнать баланс?",
    shortDescription: "Проверить остаток на счёте мобильного телефона",
    icon: "💰",
    steps: [
      {
        text: "Откройте приложение «Телефон» (значок трубки).",
        image: {
          src: "/guides/balance/step-1-phone.png",
          alt: "Приложение «Телефон» на Android",
          variant: "screenshot",
        },
      },
      {
        text: "Перейдите на вкладку «Клавиши» / «Набор номера» (иконка с кнопками 0–9).",
        image: {
          src: "/guides/balance/step-2-dial-pad.png",
          alt: "Вкладка «Клавиши» с набором номера",
          variant: "screenshot",
        },
      },
      {
        text: "Наберите код вашего оператора (см. подсказки ниже) и нажмите зелёную трубку «Вызов».",
        image: {
          src: "/guides/balance/step-3-ussd-code.png",
          alt: "Набор кода *100# и кнопка «Вызов»",
          variant: "screenshot",
        },
      },
      {
        text: "Через несколько секунд придёт SMS или голосовое сообщение с балансом — прочитайте экран.",
        image: {
          src: "/guides/balance/step-4-balance-sms.png",
          alt: "SMS или сообщение с балансом от оператора",
          variant: "screenshot",
        },
      },
      {
        text: "Либо установите приложение оператора (Мой МТС, Мой Билайн и т.д.) и войдите по номеру телефона.",
        image: {
          src: "/guides/balance/step-5-operator-app.png",
          alt: "Приложение оператора с отображением баланса",
          variant: "screenshot",
        },
      },
    ],
    tips: [
      "МТС: *100# · Билайн: *102# · МегаФон: *100# · Tele2: *105#",
      "Коды могут отличаться — уточните на сайте оператора или в салоне связи.",
    ],
    quickLinks: [
      {
        label: "МТС — *100#",
        href: "tel:%2A100%23",
        hint: "Наберёт код и предложит вызов. Нажмите «Вызов».",
      },
      {
        label: "Билайн — *102#",
        href: "tel:%2A102%23",
        hint: "Наберёт код и предложит вызов. Нажмите «Вызов».",
      },
      {
        label: "МегаФон — *100#",
        href: "tel:%2A100%23",
      },
      {
        label: "Tele2 — *105#",
        href: "tel:%2A105%23",
      },
      {
        kind: "openSms",
        hint: "Если ответ пришёл SMS — откройте входящие сообщения.",
      },
    ],
  },
  {
    slug: "add-contact",
    title: "Как добавить новый номер в телефонную книжку?",
    shortDescription: "Сохранить имя и номер в контактах",
    icon: "📒",
    steps: [
      {
        text: "Откройте приложение «Контакты» или «Телефон» и перейдите на вкладку «Контакты».",
        image: {
          src: "/guides/add-contact/step-1-contacts.png",
          alt: "Список контактов в приложении «Контакты»",
          variant: "screenshot",
        },
      },
      {
        text: "Нажмите кнопку «+», «Создать контакт» или «Добавить контакт» (обычно внизу справа).",
        image: {
          src: "/guides/add-contact/step-2-add-button.png",
          alt: "Кнопка «+» для создания нового контакта",
          variant: "screenshot",
        },
      },
      {
        text: "В поле «Имя» введите, как хотите записать человека (например, «Маша» или «Внук»).",
        image: {
          src: "/guides/add-contact/step-3-name-field.png",
          alt: "Поле «Имя» при создании контакта",
          variant: "screenshot",
        },
      },
      {
        text: "В поле «Телефон» введите номер цифрами. Проверьте, что всё верно.",
        image: {
          src: "/guides/add-contact/step-4-phone-field.png",
          alt: "Поле «Телефон» с введённым номером",
          variant: "screenshot",
        },
      },
      {
        text: "Нажмите «Сохранить» (галочка ✓ или кнопка вверху справа). Контакт появится в списке.",
        image: {
          src: "/guides/add-contact/step-5-save.png",
          alt: "Сохранение контакта и появление в списке",
          variant: "screenshot",
        },
      },
    ],
    tips: [
      "Можно добавить контакт из недавнего звонка: откройте номер → «Добавить в контакты».",
      "Если не видите кнопку «+», нажмите «⋮» (три точки) вверху — там часто есть «Создать контакт».",
    ],
    quickLinks: [
      {
        kind: "openContacts",
        hint: "Если не открылось — найдите приложение «Контакты» на главном экране.",
      },
      {
        label: "Создать новый контакт",
        href: createContactHref,
        hint: "Сразу откроется форма нового контакта на многих телефонах.",
      },
    ],
  },
  {
    slug: "delete-contact",
    title: "Как удалить ненужный номер из телефонной книжки?",
    shortDescription: "Убрать запись из списка контактов",
    icon: "🗑️",
    steps: [
      {
        text: "Откройте приложение «Контакты» или вкладку «Контакты» в «Телефоне».",
        image: {
          src: "/guides/delete-contact/step-1-contacts.png",
          alt: "Приложение «Контакты» или вкладка «Контакты»",
          variant: "screenshot",
        },
      },
      {
        text: "Найдите в списке нужный контакт (можно прокрутить или воспользоваться поиском 🔍 вверху).",
        image: {
          src: "/guides/delete-contact/step-2-find-contact.png",
          alt: "Поиск контакта в списке",
          variant: "screenshot",
        },
      },
      {
        text: "Нажмите на контакт, чтобы открыть его карточку.",
        image: {
          src: "/guides/delete-contact/step-3-contact-card.png",
          alt: "Карточка контакта",
          variant: "screenshot",
        },
      },
      {
        text: "Нажмите «⋮» (три точки) или значок корзины, затем выберите «Удалить» или «Delete».",
        image: {
          src: "/guides/delete-contact/step-4-delete-menu.png",
          alt: "Меню с пунктом «Удалить»",
          variant: "screenshot",
        },
      },
      {
        text: "Подтвердите удаление кнопкой «Удалить» или «ОК». Контакт исчезнет из книжки.",
        image: {
          src: "/guides/delete-contact/step-5-confirm.png",
          alt: "Подтверждение удаления контакта",
          variant: "screenshot",
        },
      },
    ],
    tips: [
      "Удаляется только запись в телефоне — у собеседника ваш номер останется.",
      "На некоторых телефонах: удерживайте контакт в списке 1–2 секунды → «Удалить».",
    ],
    quickLinks: [
      {
        kind: "openContacts",
        hint: "Дальше найдите контакт и удалите по шагам выше.",
      },
    ],
  },
  {
    slug: "share-number",
    title: "Как переслать номер на другой телефон?",
    shortDescription: "Отправить чужой или свой номер в SMS или мессенджер",
    icon: "📲",
    steps: [
      {
        text: "Откройте «Контакты» или «Телефон» и найдите контакт с нужным номером (или откройте недавний звонок).",
        image: {
          src: "/guides/share-number/step-1-contacts.png",
          alt: "Список контактов или недавних звонков",
          variant: "screenshot",
        },
      },
      {
        text: "Откройте карточку контакта или нажмите «⋮» рядом с номером в списке звонков.",
        image: {
          src: "/guides/share-number/step-2-contact-card.png",
          alt: "Карточка контакта или меню у номера",
          variant: "screenshot",
        },
      },
      {
        text: "Выберите «Поделиться», «Отправить контакт», «Share» или значок со стрелкой.",
        image: {
          src: "/guides/share-number/step-3-share-option.png",
          alt: "Пункт «Поделиться» или «Отправить контакт»",
          variant: "screenshot",
        },
      },
      {
        text: "Выберите способ: «Сообщения» (SMS), WhatsApp, Telegram, «Копировать» и т.д.",
        image: {
          src: "/guides/share-number/step-4-share-apps.png",
          alt: "Выбор приложения для отправки номера",
          variant: "screenshot",
        },
      },
      {
        text: "Укажите, кому отправить (контакт или номер), и нажмите «Отправить».",
        image: {
          src: "/guides/share-number/step-5-send-contact.png",
          alt: "Отправка контакта получателю",
          variant: "screenshot",
        },
      },
    ],
    tips: [
      "«Копировать номер» — вставьте его вручную в чат: долгое нажатие в поле ввода → «Вставить».",
      "Можно продиктовать номер по телефону, если пересылка через приложение неудобна.",
    ],
    quickLinks: [
      {
        kind: "openContacts",
        hint: "Выберите контакт → «Поделиться».",
      },
      {
        kind: "newSms",
        hint: "Если копировали номер — вставьте его в новое сообщение.",
      },
    ],
  },
  {
    slug: "send-forward-message",
    title: "Как написать сообщение и переслать?",
    shortDescription: "Отправить новое SMS или переслать чужое сообщение",
    icon: "✉️",
    steps: [
      {
        text: "Откройте приложение «Сообщения» (значок облачка или конверта на главном экране).",
        image: {
          src: "/guides/send-forward-message/step-1-messages-app.png",
          alt: "Приложение «Сообщения» на главном экране",
          variant: "screenshot",
        },
      },
      {
        text: "Чтобы написать новое: нажмите «+», «Написать» или «Новое сообщение», выберите получателя.",
        image: {
          src: "/guides/send-forward-message/step-2-new-message.png",
          alt: "Создание нового сообщения",
          variant: "screenshot",
        },
      },
      {
        text: "Введите текст в поле внизу и нажмите «Отправить» (стрелка или самолётик ✈).",
        image: {
          src: "/guides/send-forward-message/step-3-type-send.png",
          alt: "Ввод текста и кнопка «Отправить»",
          variant: "screenshot",
        },
      },
      {
        text: "Чтобы переслать чужое: откройте чат, нажмите на сообщение и удерживайте 1–2 секунды.",
        image: {
          src: "/guides/send-forward-message/step-4-long-press.png",
          alt: "Удержание сообщения для меню действий",
          variant: "screenshot",
        },
      },
      {
        text: "Выберите «Переслать», «Forward», укажите получателя и снова нажмите «Отправить».",
        image: {
          src: "/guides/send-forward-message/step-5-forward.png",
          alt: "Пересылка сообщения другому получателю",
          variant: "screenshot",
        },
      },
    ],
    tips: [
      "В WhatsApp и Telegram пересылка похожа: удержать сообщение → «Переслать».",
      "Новое SMS может стоить денег по тарифу оператора — уточните в салоне связи.",
    ],
    quickLinks: [
      {
        kind: "openSms",
        hint: "Если не открылось — найдите «Сообщения» на главном экране.",
      },
      {
        kind: "newSms",
        hint: "Откроется создание нового сообщения.",
      },
    ],
  },
  {
    slug: "read-messages",
    title: "Как прочитать полученные сообщения?",
    shortDescription: "Открыть входящие SMS и просмотреть переписку",
    icon: "💬",
    steps: [
      {
        text: "Откройте приложение «Сообщения» (на иконке может быть красный кружок с цифрой — это непрочитанные).",
        image: {
          src: "/guides/read-messages/step-1-app-badge.png",
          alt: "Иконка «Сообщения» с меткой непрочитанных",
          variant: "screenshot",
        },
      },
      {
        text: "В списке чатов найдите нужный разговор (имя или номер отправителя).",
        image: {
          src: "/guides/read-messages/step-2-chat-list.png",
          alt: "Список чатов в приложении «Сообщения»",
          variant: "screenshot",
        },
      },
      {
        text: "Нажмите на этот чат один раз — откроется переписка.",
        image: {
          src: "/guides/read-messages/step-3-open-chat.png",
          alt: "Открытая переписка с сообщениями",
          variant: "screenshot",
        },
      },
      {
        text: "Прочитайте сообщения. Если текст не помещается — проведите пальцем вверх по экрану.",
        image: {
          src: "/guides/read-messages/step-4-read-scroll.png",
          alt: "Прокрутка переписки для чтения сообщений",
          variant: "screenshot",
        },
      },
      {
        text: "Чтобы вернуться к списку всех чатов, нажмите стрелку «←» вверху слева.",
        image: {
          src: "/guides/read-messages/step-5-back-arrow.png",
          alt: "Стрелка «назад» к списку чатов",
          variant: "screenshot",
        },
      },
    ],
    tips: [
      "Сообщения из WhatsApp и Telegram читаются в своих приложениях — иконки другие.",
      "Если не слышите оповещение — проверьте, не включён ли беззвучный режим (значок 🔇).",
    ],
    quickLinks: [
      {
        kind: "openSms",
        hint: "Откроется список чатов с входящими SMS.",
      },
    ],
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
