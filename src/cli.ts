import { policzHarmonogram } from './index';

// Minimalne CLI. Docelowo: parametry z argumentów lub pliku, wynik jako JSON lub CSV.
const argumenty = process.argv.slice(2);

if (argumenty.length === 0 || argumenty.includes('--help')) {
  console.log('harmonogram-polstr, kalkulator harmonogramu spłat kredytu (szkielet).');
  console.log('Użycie docelowe: npm start -- --kwota 400000 --raty 300 --marza 2.11 --wskaznik POLSTR_1M --typ rowne');
  console.log('Parametry i format wyjścia (JSON lub CSV) powstaną z /speckit-plan. Zobacz BRIEF.md.');
  process.exit(0);
}

const harmonogram = policzHarmonogram({
  kwotaGr: 400_000_00,
  liczbaRat: 300,
  marza: 0.0211,
  typRat: 'rowne',
  wskaznik: 'POLSTR_1M',
  pierwszaRata: '2026-10-15',
});
console.log(JSON.stringify(harmonogram, null, 2));
