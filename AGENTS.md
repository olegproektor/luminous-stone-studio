# AGENTS.md — STŌN / luminous-stone-studio

Краткие правила для агентов (Cursor, Codex, Antigravity). Полный контекст Project: store `docs/project-context.md`, handoff Codex/Antigravity — `docs/handoff-codex.md` / `docs/handoff-antigravity.md`.

## Канон

- Единственный канонический GitHub-репозиторий: **`olegproektor/luminous-stone-studio`**.
- Не создавать и не считать каноном `luminous-stone-studio-codex` (пока не создан пользователем; агентам создавать нельзя).

## Роли (три нейросети)

| Роль | Зона |
|---|---|
| **Cursor** | Оркестрация Project, Context, cloud checkout, PR |
| **Codex** | Исполнитель по брифу Codex |
| **Antigravity** | Исполнитель по брифу Antigravity |

Синхронизация — через GitHub (`main` / feature-ветки / PR), не через скрытые копии репо.

## Ключевые правила

1. Общаться с пользователем **по-русски**.
2. **Не пушить** (и не force-push) без явного запроса пользователя.
3. Не создавать GitHub-репозитории и не менять Cloud Agent environment без запроса.
4. PR в `main` — не мержить без явной просьбы.
5. Локальный путь пользователя (worker `my thinkbook`): `D:\Ai\luminous-stone-studio` — не делать `git pull` на эту машину из чужой сессии без отдельного поручения.
6. **Не перетирать чужие ветки** (force-push / rewrite history / перехват PR) и **не конфликтовать зоны** с Cursor / Codex / Antigravity без явного согласования.
7. Нейминг feature-веток Cursor-агентов: префикс **`cursor/...`** (например `cursor/agents-md-handoff-5820`) — чтобы отличать их ветки от `main` и от веток Codex/Antigravity.
