import { defineConfig } from 'vitest/config';

// Strefa czasowa przypięta na stałe, żeby daty rat liczyły się identycznie
// na każdej maszynie i w GitHub Actions (tam domyślnie jest UTC).
process.env.TZ = 'Europe/Warsaw';

export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts'],
  },
});
