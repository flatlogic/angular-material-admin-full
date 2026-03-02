# Security Exceptions Register

Last reviewed: 2026-03-02

## GHSA-5c6j-r48x-rmvq (`serialize-javascript` <= 7.0.2)

- Severity: High
- Status: Accepted temporarily
- Scope: Development/build toolchain only (webpack via `@angular-devkit/build-angular`)
- Runtime impact: Not loaded in production runtime bundle of the app
- Upstream fix: Not available at the time of review (`npm audit` reports `No fix available`)
- Mitigation:
  - Track Angular CLI / `@angular-devkit/build-angular` updates and re-run audit after each upgrade
  - Use `npm run audit:prod` in CI as the production risk gate
  - Keep `npm run audit:full` informational until upstream fix exists

## Review policy

- Re-check this register on every dependency upgrade cycle.
- Remove exceptions immediately once an upstream fix is available and applied.
