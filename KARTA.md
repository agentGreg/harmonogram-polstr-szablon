# Karta uczestnika: Harmonogram na POLSTR

Pracujesz sam, w swoim prywatnym repo, w VS Code z Copilotem (tryb Agent) albo w Copilot CLI. Metodyka: spec-kit. Zasada dnia: implementacja faza po fazie, PR na fazę, review przed kolejną fazą. W PowerShell wpisuj komendy pojedynczo, jedna na linię.

## Bramki

### Bramka 0, do 12:10: repo działa

- [ ] szablon sklonowany, `gh repo create harmonogram-polstr --private --source . --remote origin --push` wykonane
- [ ] `gh run list` pokazuje zielony workflow „Testy” (jeśli Actions są wyłączone w organizacji, pomiń)
- [ ] lokalnie `npm install`, `npm test`, `npm run typecheck` zielone
- [ ] sprawdź, że przy tworzeniu PR w www lista Reviewers zawiera Copilota; jeśli nie, powiedz prowadzącemu, użyjesz rutyny `skrypty/review-pr.ps1`

### Bramka 1, do 14:00: artefakty spec-kit i pierwszy PR

- [ ] `.specify/memory/constitution.md` wypełniony
- [ ] `specs/001-*/spec.md`, `plan.md`, `tasks.md` w repo
- [ ] PR #1 z artefaktami, Copilot jako recenzent, review przeczytane, PR scalony

### Bramka 2, do 15:00: MVP

- [ ] implementacja faza po fazie, każda faza w osobnym PR
- [ ] testy zielone lokalnie i w Actions
- [ ] co najmniej jeden PR z implementacją scalony po review Copilota
- [ ] liczba kontrolna z BRIEF.md się zgadza (rata 2 494,72 zł, tolerancja ±0,05 zł)
- [ ] faza 4: ekran z Claude Design w `ui/index.html` podpięty do logiki, `npm run ui` pokazuje harmonogram na http://localhost:4180 (albo świadoma decyzja o 14:50: v0.1.0 bez ekranu, ekran po karcie zmiany)
- [ ] MVP scalony do main i otagowany jako wydanie: `git tag v0.1.0`, potem `git push --tags`

### Bramka 3, do 15:45: karta zmiany

- [ ] karta zmiany od prowadzącego wdrożona w kolejności: test, poprawka, PR, review, scalenie
- [ ] karta zmiany scalona do main i otagowana jako utrzymanie: `git tag v0.2.0`, potem `git push --tags`

## Komendy spec-kit z przykładowymi promptami

Najpierw gałąź, potem skille: `git switch -c spec-mvp` przed `/speckit-constitution`. Spec-kit w tej wersji nie tworzy gałęzi sam, artefakty trafią do `.specify/memory/` i `specs/001-<nazwa>/`. Prompty wpisujesz w czacie Copilota. Skill widzi pliki repo, więc możesz odwoływać się do BRIEF.md po nazwie. Skille spec-kit zadają do 3 pytań z tabelą opcji: odpowiadaj krótko, wybieraj opcję zgodną z BRIEF; na pytanie o checklistę odpowiedz yes.

`/speckit-constitution` Zasady projektu: TypeScript strict, testy w vitest, TDD (najpierw test, potem kod), brak nowych zależności bez uzasadnienia w PR, kwoty w groszach jako liczby całkowite albo jedna jawna decyzja o miejscu zaokrąglania, dokumenty i komunikaty commitów po polsku.

`/speckit-specify` Wklej pełną treść sekcji „Treść zgłoszenia” i „Zakres MVP” z BRIEF.md, razem z podsekcją „Ekran”. Dopisz: liczba kontrolna z BRIEF.md jest kryterium akceptacji; ekran www to osobna, ostatnia historia użytkownika, jego wygląd dostarczę jako gotowy plik ui/index.html.

`/speckit-plan` Czysty TypeScript bez frameworka i bez nowych zależności. Cztery moduły: domena (czyste funkcje, bez I/O), dane (wczytanie serii wskaźników z dane/), cli (parsowanie argumentów, wyjście JSON lub CSV), www (src/server.ts na node:http: pliki statyczne z ui/ oraz GET /api/harmonogram zwracający JSON, skrypt npm run ui na porcie 4180). Testy w tests/, vitest już skonfigurowany; ekran bez testów jednostkowych.

`/speckit-tasks` Faza Setup ma być pusta, szkielet projektu już istnieje; pierwsza historia to obliczenie harmonogramu rat równych przy stałej stopie, z testem na liczbie kontrolnej z BRIEF. Spec-kit generuje w tasks.md Fazę 1 Setup, Fazę 2 Foundational i Fazę 3 z pierwszą historią użytkownika, sprawdź, czy tak wyszło.

Po `/speckit-tasks` otwórz PR #1 z artefaktami:

```
git add -A
git commit -m "spec: konstytucja, specyfikacja, plan, zadania"
git push -u origin spec-mvp
gh pr create --fill --reviewer "@copilot"
```

Review Copilota przychodzi po ok. 3 minutach, zobaczysz je w przeglądarce (`gh pr view --web`), a `gh pr view` pokaże Copilota dopiero po nadejściu review. Na PR z samymi plikami .md Copilot często nie ma uwag i to jest w porządku. Po review: `gh pr merge --squash --delete-branch`, potem `git switch main` i `git pull`.

`/speckit-implement` Wykonaj tylko fazy 1 do 3 z tasks.md, zatrzymaj się i pokaż diff. Po review i scaleniu: „Wykonaj tylko fazę 4 z tasks.md, zatrzymaj się i pokaż diff”, i tak dalej.

## Tor równoległy: ekran w Claude Design (od 14:00)

Czas, gdy agent implementuje fazy 1 do 3, nie jest czasem patrzenia w terminal. Otwórz Claude Design (claude.ai/design) na koncie szkoleniowym, jak w cw00 pierwszego dnia, i zaprojektuj ekran kalkulatora. Prompt do wklejenia:

> Ekran kalkulatora harmonogramu spłat kredytu hipotecznego dla doradcy w oddziale banku. Formularz: kwota kredytu (PLN), liczba rat, data pierwszej raty, marża (pp), wskaźnik (POLSTR 1M albo WIBOR 3M), typ rat (równe albo malejące), lista nadpłat (miesiąc, kwota, tryb: obniż ratę albo skróć okres), przycisk „Policz”. Wyniki: rata pierwsza i ostatnia, suma odsetek, tabela rat (nr, data, kapitał, odsetki, rata, saldo), przycisk „Eksport CSV”. Kwoty z separatorem tysięcy i dwoma miejscami po przecinku. Styl prosty i czytelny, bez logotypów. Jeden plik HTML z CSS i JS, bez frameworka; dane pobiera z GET /api/harmonogram z parametrami formularza w query string i wyświetla JSON z polem `raty`.

Popraw jedną rzecz po pierwszej wersji, jak w cw00. Wyeksportuj jako jeden plik HTML i zapisz w repo jako `ui/index.html` (jeśli eksport wychodzi w React, wklej go agentowi z prośbą o przepisanie na statyczny HTML). Gdy fazy 1 do 3 są scalone, faza 4 to podpięcie ekranu. Prompt dla agenta, jeśli tasks.md nie ma tej fazy: „Dodaj src/server.ts na node:http: serwuj pliki z ui/ i wystaw GET /api/harmonogram, który parsuje parametry z query string, woła funkcję domenową i zwraca JSON. Skrypt npm run ui uruchamia serwer na porcie 4180. Bez nowych zależności. Nie zmieniaj ui/index.html poza adresem endpointu.” Sprawdź w przeglądarce na liczbie kontrolnej z BRIEF.md, potem PR jak przy każdej fazie.

## Komendy git i gh na każdą fazę

Nazwa gałęzi: `faza-<n>-<nazwa>`, np. dla fazy 3:

```
git switch -c faza-3-rowne-raty
git add -A
git commit -m "faza 3: raty równe przy stałej stopie z testem"
git push -u origin faza-3-rowne-raty
gh pr create --fill --reviewer "@copilot"
gh pr view --web
gh pr merge --squash --delete-branch
```

Jeśli `--reviewer "@copilot"` przy tworzeniu nie zadziała: `gh pr edit <numer> --add-reviewer "@copilot"`, a w ostateczności w przeglądarce: PR, panel Reviewers, „Copilot”. Rutyna review z terminala: `.\skrypty\review-pr.ps1 <numer PR>`, tryb na sucho z `-DryRun`.

## Gwiazdki (po MVP, dla chętnych)

- okresowo stała stopa przez 5 lat, potem zmienna (Rekomendacja S),
- rekompensata za nadpłatę z art. 40 ustawy o kredycie hipotecznym,
- składanie dziennych stawek POLSTR wstecz za okres odsetkowy,
- RRSO,
- test E2E ekranu przez Playwright MCP (jak w cw16b),
- hook pre-commit uruchamiający testy,
- własny skill „odbiór” sprawdzający kryteria odbioru.

## Zasada awaryjna

Jeśli o 14:45 nie masz zielonych testów, zmniejsz zakres do rat równych bez nadpłat i idź do review z tym, co masz. Mały zakres z review i scaleniem jest lepszy niż duży bez.
