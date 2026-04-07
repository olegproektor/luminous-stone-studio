import type { LeadFormField, LeadFormPreset } from "@/types/lead-form-contract";

export const contactFormPreset: LeadFormPreset = {
  formId: "contact_general",
  submitLabel: "Отправить запрос",
  analyticsEvent: "request_consultation",
  fields: [
    { name: "name", label: "Имя", type: "text", required: true, placeholder: "Как к вам обращаться" },
    { name: "phone", label: "Телефон", type: "tel", required: true, placeholder: "+7 (___) ___-__-__" },
    { name: "email", label: "Email", type: "email", placeholder: "Куда отправить ответ и материалы" },
    {
      name: "clientType",
      label: "Роль в проекте",
      type: "select",
      options: [
        { value: "private", label: "Частный премиальный клиент" },
        { value: "architect", label: "Архитектор / дизайнер" },
        { value: "glamping-hotel", label: "Команда объекта / hospitality" },
        { value: "developer", label: "Девелопер / заказчик" },
        { value: "other", label: "Другое" },
      ],
    },
    {
      name: "message",
      label: "Коротко о запросе",
      type: "textarea",
      placeholder: "Тип объекта, город, стадия проекта, задача и что важно обсудить в первую очередь...",
      half: false,
    },
  ],
};

export const requestProjectStep1Fields: LeadFormField[] = [
  { name: "name", label: "Имя", type: "text", required: true, placeholder: "Как вас зовут" },
  { name: "phone", label: "Телефон", type: "tel", required: true, placeholder: "+7 (___) ___-__-__" },
  { name: "email", label: "Email", type: "email", placeholder: "email@example.com" },
  {
    name: "clientType",
    label: "Роль в проекте",
    type: "select",
    options: [
      { value: "private", label: "Частный премиальный клиент" },
      { value: "architect", label: "Архитектор / дизайнер" },
      { value: "glamping-hotel", label: "Команда объекта / hospitality" },
      { value: "developer", label: "Девелопер / заказчик" },
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
