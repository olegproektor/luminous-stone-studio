import type { LeadFormField, LeadFormPreset } from "@/types/lead-form-contract";

export const contactFormPreset: LeadFormPreset = {
  formId: "contact_general",
  submitLabel: "Отправить",
  analyticsEvent: "request_consultation",
  fields: [
    { name: "name", label: "Имя", type: "text", required: true, placeholder: "Как вас зовут" },
    { name: "phone", label: "Телефон", type: "tel", required: true, placeholder: "+7 (___) ___-__-__" },
    { name: "email", label: "Email", type: "email", placeholder: "email@example.com" },
    {
      name: "clientType",
      label: "Я обращаюсь как",
      type: "select",
      options: [
        { value: "private", label: "Частный клиент" },
        { value: "architect", label: "Архитектор / дизайнер" },
        { value: "glamping-hotel", label: "Глэмпинг / отель" },
        { value: "developer", label: "Девелопер" },
        { value: "other", label: "Другое" },
      ],
    },
    { name: "message", label: "Сообщение", type: "textarea", placeholder: "Расскажите о вашем запросе...", half: false },
  ],
};

export const requestProjectStep1Fields: LeadFormField[] = [
  { name: "name", label: "Имя", type: "text", required: true, placeholder: "Как вас зовут" },
  { name: "phone", label: "Телефон", type: "tel", required: true, placeholder: "+7 (___) ___-__-__" },
  { name: "email", label: "Email", type: "email", placeholder: "email@example.com" },
  {
    name: "clientType",
    label: "Тип клиента",
    type: "select",
    options: [
      { value: "private", label: "Частный клиент" },
      { value: "architect", label: "Архитектор / дизайнер" },
      { value: "glamping-hotel", label: "Глэмпинг / отель / ресторан" },
      { value: "developer", label: "Девелопер / комплектатор" },
      { value: "other", label: "Другое" },
    ],
  },
];

export const requestProjectFinalPreset: LeadFormPreset = {
  formId: "request_project",
  submitLabel: "Отправить заявку",
  analyticsEvent: "request_project",
  fields: [
    { name: "city", label: "Город / регион", type: "text", placeholder: "Москва" },
    {
      name: "objectType",
      label: "Тип объекта",
      type: "select",
      options: [
        { value: "private-house", label: "Загородный дом" },
        { value: "apartment-complex", label: "ЖК / комплекс" },
        { value: "glamping", label: "Глэмпинг" },
        { value: "hotel", label: "Отель" },
        { value: "restaurant", label: "Ресторан / кафе" },
        { value: "park", label: "Парк / сквер" },
        { value: "commercial", label: "Коммерческий объект" },
        { value: "other", label: "Другое" },
      ],
    },
    {
      name: "budget",
      label: "Ориентировочный бюджет",
      type: "select",
      placeholder: "Выберите диапазон",
      options: [
        { value: "to-50k", label: "До 50 000 ₽" },
        { value: "50-150k", label: "50 000 — 150 000 ₽" },
        { value: "150-500k", label: "150 000 — 500 000 ₽" },
        { value: "500k+", label: "Более 500 000 ₽" },
        { value: "unknown", label: "Пока не определён" },
      ],
    },
    { name: "message", label: "Комментарий", type: "textarea", placeholder: "Опишите задачу, площадь, пожелания...", half: false },
  ],
};
