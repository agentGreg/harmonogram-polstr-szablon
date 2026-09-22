# Konwencje projektu dla agenta

Ten plik czyta Copilot w czacie, w CLI i w code review. Trzymaj się poniższych zasad bez pytania, a przy wątpliwościach zapytaj zamiast zgadywać.

## Język i komunikacja

- Dokumenty, komentarze w kodzie, nazwy domenowe i komunikaty commitów po polsku, bez skrótów w nazwach (`rataKapitalowa`, nie `rk`).
- Komunikaty commitów jednolinijkowe, opisowe, np. „faza 1: domena harmonogramu z testami”.
- Odpowiadaj zwięźle. Nie streszczaj tego, co pokazuje diff.

## Kod

- TypeScript strict (tsconfig.json), bez `any`, bez `@ts-ignore`.
- Moduł domenowy w `src/` to czyste funkcje bez I/O. Wczytywanie plików i parsowanie argumentów trzymaj w osobnych modułach.
- Kwoty w groszach jako liczby całkowite albo jedna jawna decyzja o miejscu zaokrąglania. Zaokrąglaj w jednym miejscu.
- Testy w vitest, w katalogu `tests/`. Najpierw test, potem implementacja. Każda zmiana logiki obliczeń ma test z liczbą kontrolną.

## Proces

- Małe commity, jeden PR na fazę z `tasks.md`. Po zakończeniu fazy zatrzymaj się i pokaż diff. Nie zaczynaj kolejnej fazy bez polecenia.
- Nie dodawaj zależności bez zapytania. Jeśli zależność wydaje się potrzebna, uzasadnij to jednym zdaniem i poczekaj na decyzję.
- Nie edytuj plików w `dane/` bez wyraźnego polecenia. Testy je wczytują.
- Nie edytuj `.specify/` ani `.github/skills/` poza tym, co robią skille spec-kit.
- Przed zgłoszeniem gotowości uruchom `npm test` i `npm run typecheck` i pokaż wynik.
