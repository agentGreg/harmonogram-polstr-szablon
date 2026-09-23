/**
 * Moduł domenowy kalkulatora harmonogramu spłat: czyste funkcje, bez React i bez I/O.
 *
 * To jest szkielet. Właściwe typy i funkcje powstaną z /speckit-plan
 * i /speckit-implement na podstawie BRIEF.md. Poniższy typ i funkcja
 * są punktem zaczepienia, żeby typecheck, testy i route handler działały od pierwszej minuty.
 */

export interface ParametryKredytu {
  /** Kwota kredytu w groszach (liczba całkowita). */
  kwotaGr: number;
  liczbaRat: number;
  /** Marża banku jako ułamek, np. 0.0211 dla 2,11 pp. */
  marza: number;
  typRat: 'rowne' | 'malejace';
  wskaznik: 'POLSTR_1M' | 'WIBOR_3M';
  /** Data pierwszej raty w formacie YYYY-MM-DD. */
  pierwszaRata: string;
}

export function policzHarmonogram(parametry: ParametryKredytu): never {
  throw new Error(`nie zaimplementowano: policzHarmonogram (${parametry.liczbaRat} rat, ${parametry.typRat})`);
}

/** Miesięczna stopa z rocznej, zaokrąglona do 6 miejsc po przecinku. */
export function stopaMiesieczna(stopaRoczna: number): number {
  return Math.round((stopaRoczna / 12) * 1_000_000) / 1_000_000;
}

/** Rata równa (annuitetowa) w groszach dla stałej stopy rocznej. */
export function rataRowna(kwotaGr: number, liczbaRat: number, stopaRoczna: number): number {
  const q = 1 + stopaMiesieczna(stopaRoczna);
  const potega = Math.pow(q, liczbaRat);
  const rata = (kwotaGr * potega * (q - 1)) / (potega - 1);
  return Math.round(Math.round(rata * 100) / 100);
}

/** Wartość wskaźnika obowiązująca w danym dniu (YYYY-MM-DD). */
export function stopaNaDzien(wartosci: { od: string; stopa: number }[], dzien: string): number {
  let wynik = 0;
  for (const wpis of wartosci) {
    if (wpis.od < dzien) {
      wynik = wpis.stopa;
    }
  }
  return wynik;
}
