import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

interface PlikWskaznika {
  wskaznik: string;
  wartosci: { od: string; stopa: number }[];
}

async function wczytajDane(nazwaPliku: string): Promise<PlikWskaznika> {
  const tresc = await readFile(new URL(`../dane/${nazwaPliku}`, import.meta.url), 'utf8');
  return JSON.parse(tresc) as PlikWskaznika;
}

describe('dane wskaźników z katalogu dane/', () => {
  it.each(['polstr-1m.json', 'wibor-3m.json'])('%s wczytuje się i jest uporządkowany rosnąco po dacie', async (nazwaPliku) => {
    const plik = await wczytajDane(nazwaPliku);
    expect(plik.wartosci.length).toBeGreaterThan(0);
    for (const wpis of plik.wartosci) {
      expect(wpis.od).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(wpis.stopa).toBeGreaterThan(0);
      expect(wpis.stopa).toBeLessThan(0.2);
    }
    const daty = plik.wartosci.map((wpis) => wpis.od);
    expect([...daty].sort()).toEqual(daty);
  });

  it('testy działają w strefie Europe/Warsaw', () => {
    expect(process.env.TZ).toBe('Europe/Warsaw');
  });
});
