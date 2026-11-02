import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  // cans are transparent cutouts served untouched, so next/image's re-encoding stays off
  { rules: { "@next/next/no-img-element": "off" } },
  globalIgnores([".next/**", "next-env.d.ts"]),
]);
