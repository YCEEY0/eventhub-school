# EventHub School

Уеб платформа за училищни събития — календар, записване със строг контрол на местата и автоматичен списък на чакащите, известия и отчети. Интерфейс на **български** (по подразбиране) и **английски**.

*English: a bilingual (BG/EN) web app for school events — calendar, registration with capacity control and an automatic waitlist, notifications and reports.*

Учебен екипен проект №08 (HTML, CSS, JavaScript, Supabase, GitHub).

## Участници

| Участник | GitHub | Основна област |
| --- | --- | --- |
| **Максим** | `@[YCEEY0]` | интерфейс, навигация, визуализации, UX |
| **Кристиан** | `@[Kristian-bit]` | база данни, алгоритъм, права за достъп, тестове |

## Състояние

**Етап 1 от 5 — проучване и планиране.** Все още няма работещ код. Приложението се разработва по седмици (виж `docs/PROJECT_PLAN.md`).

- Работеща версия (демо): *ще бъде добавена*
- Тестови акаунти: *ще бъдат добавени*

## Какво ще прави приложението

- календар със събитията и филтри;
- създаване и управление на събития (организатор);
- записване и отписване; **собствен алгоритъм** за капацитет, списък на чакащите и защита от едновременни записвания;
- места (зали, кабинети) с капацитет;
- роли: ученик, организатор, администратор;
- известия и отчети с графики.

## Технологии

HTML5, CSS3, JavaScript (ES6+), Supabase (PostgreSQL, Auth, RLS), Chart.js, Vitest, GitHub и GitHub Pages.

## Структура

```
eventhub-school/
├── README.md
├── LICENSE
├── .gitignore
├── .env.example
├── docs/            документация, скици на екрани, ER диаграма
│   ├── RESEARCH.md
│   ├── PROJECT_PLAN.md
│   ├── PRODUCT_SPEC.md
│   ├── ER_DIAGRAM.md
│   ├── SCREENS.md
│   ├── ISSUES.md
│   ├── WEEK_1_REPORT.md
│   ├── AI_USAGE.md
│   ├── SOURCES.md
│   └── design/      скици (SVG, PNG) и ER диаграма
├── database/        schema.sql (Етап 2)
├── src/             приложението (Етап 2+)
├── tests/           автоматизирани тестове (Етап 4)
└── presentation/    презентация (Етап 5)
```

Предстоящи файлове: `TESTS.md`, `USER_GUIDE.md`, `database/schema.sql`.

## Документация

- [Проучване](docs/RESEARCH.md)
- [План на проекта](docs/PROJECT_PLAN.md)
- [Спецификация на продукта](docs/PRODUCT_SPEC.md)
- [ER диаграма и таблици](docs/ER_DIAGRAM.md)
- [Скици на екрани](docs/SCREENS.md)
- [Issues](docs/ISSUES.md)
- [Седмичен отчет 1](docs/WEEK_1_REPORT.md)
- [Използване на ИИ](docs/AI_USAGE.md)
- [Източници](docs/SOURCES.md)

## Настройка (когато има код)

1. Създайте проект в Supabase.
2. Копирайте `.env.example` като `.env` и въведете `SUPABASE_URL` и `SUPABASE_ANON_KEY`.
3. Никога не публикувайте `service_role` ключ и не качвайте `.env` в хранилището.

## Лиценз

MIT — виж [LICENSE](LICENSE).
