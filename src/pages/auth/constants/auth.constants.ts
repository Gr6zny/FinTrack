import type { Currency, Testimonial } from "../types/auth.types";

export const CURRENCIES: Currency[] = [
  { code: "RUB", symbol: "₽", name: "Российский рубль" },
  { code: "USD", symbol: "$", name: "Доллар США" },
  { code: "EUR", symbol: "€", name: "Евро" },
  { code: "GBP", symbol: "£", name: "Фунт стерлингов" },
  { code: "CNY", symbol: "¥", name: "Китайский юань" },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    text: "Лучшее приложение для учета финансов. Всегда под рукой и очень удобно!",
    author: "Анна Смирнова",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    years: "2 года",
    rating: 5,
  },
  {
    id: 2,
    text: "Благодаря FinTrack я наконец-то начала откладывать деньги на путешествия. Очень наглядно и понятно!",
    author: "Екатерина Иванова",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    years: "1 год",
    rating: 5,
  },
  {
    id: 3,
    text: "Отличный сервис, удобный интерфейс и много полезных функций. Рекомендую!",
    author: "Дмитрий Петров",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    years: "1.5 года",
    rating: 5,
  },
];
