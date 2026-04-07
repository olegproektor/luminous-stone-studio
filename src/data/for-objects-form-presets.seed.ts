import type { LeadFormPreset } from "@/types/lead-form-contract";

export const forObjectsQualificationPreset: LeadFormPreset = {
  formId: "request_project",
  submitLabel: "Отправить квалификацию",
  analyticsEvent: "request_project",
  fields: [
    { name: "name", label: "Имя", type: "text", required: true, placeholder: "Как к вам обращаться" },
    { name: "phone", label: "Телефон", type: "tel", required: true, placeholder: "+7 (___) ___-__-__" },
    { name: "email", label: "Email", type: "email", required: true, placeholder: "email@example.com" },
    {
      name: "clientType",
      label: "Роль в проекте",
      type: "select",
      required: true,
      options: [
        { value: "architect", label: "Архитектор / дизайнер" },
        { value: "developer", label: "Девелопер / заказчик" },
        { value: "hospitality", label: "Команда объекта / hospitality" },
        { value: "private", label: "Частный премиальный клиент" },
      ],
    },
    {
      name: "objectType",
      label: "Тип объекта",
      type: "select",
      required: true,
      options: [
        { value: "hospitality", label: "Отель / глэмпинг / hospitality" },
        { value: "developer", label: "Девелоперский или масштабируемый проект" },
        { value: "private", label: "Частный премиальный объект" },
      ],
    },
    {
      name: "budget",
      label: "Ориентировочный бюджет",
      type: "select",
      options: [
        { value: "lt-500", label: "До 500 000 ₽" },
        { value: "500-1500", label: "500 000 — 1 500 000 ₽" },
        { value: "1500-plus", label: "Более 1 500 000 ₽" },
        { value: "unknown", label: "Пока неизвестно" },
      ],
    },
    {
      name: "timeline",
      label: "Срок проекта",
      type: "select",
      options: [
        { value: "asap", label: "Срочно / ближайший запуск" },
        { value: "1-3m", label: "1-3 месяца" },
        { value: "3-6m", label: "3-6 месяцев" },
        { value: "6m+", label: "Более 6 месяцев" },
      ],
    },
    {
      name: "message",
      label: "Вводные по проекту",
      type: "textarea",
      placeholder: "Тип пространства, стадия проекта, площадь, ожидаемый сценарий света, ограничения или пожелания",
      half: false,
    },
  ],
};
