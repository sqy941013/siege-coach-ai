# Integration plan

## Current implementation

The app is a static, browser-only prototype. `src/analytics.js` supplies 30 deterministic fictional matches and pure aggregation/report functions. `src/app.js` renders the interface. No provider endpoint is called and no model is connected.

The coaching engine is deliberately transparent: choose the map with the lowest observed win rate, report the exact numerator and denominator, label samples below 10 as limited, and propose a review/practice/reflection cycle. This threshold is a presentation heuristic, not statistical validation. Correlation is not causation.

## Approval gates

Before accepting real player data, confirm with Stats.cc:

- API eligibility, scopes, quotas and field coverage.
- Permitted historical retention, refresh frequency and caching.
- User consent and account identification requirements.
- Public/private display, attribution and deletion requirements.
- Whether aggregate or raw data may be sent to an external model provider.
- Continued compatibility with this project's free, non-commercial purpose.

Documentation: <https://r6.stats.cc/docs>. Terms: <https://stats.cc/terms-of-service>. Public documentation is not an API grant. No use of undocumented or reverse-engineered website endpoints is proposed.

## Server boundary

A future server should hold the API key, validate player identifiers, enforce per-user budgets, honor provider rate-limit headers and backoff, cache only as permitted, and return a minimal normalized response. Never embed API keys in this static client or GitHub Pages configuration. Do not store raw provider payloads in Git or public object storage.

Proposed internal record (not a claim about provider response fields):

```ts
type MatchRecord = {
  id: string;
  date: string; // ISO date
  map: string;
  operator: string | null;
  mode: string;
  won: boolean | null;
  kills: number | null;
  deaths: number | null;
  assists: number | null;
  score: string | null;
  source: 'synthetic' | 'authorized-provider';
};
```

Keep missing values null, distinguish unavailable data from zero, and validate dates/numbers. Production aggregation must count only known eligible records and expose coverage. The current fixture is complete; the demo functions are not a production importer.

## Optional language-model layer

1. Compute statistics deterministically on the server.
2. Supply only approved, minimal statistics and user-entered preferences to a chosen model.
3. Require evidence references and explicit uncertainty in structured output.
4. Validate all claimed counts/rates against computed values.
5. Fall back to the rule-based report on timeout, invalid output, or lack of permission.

Do not infer precise aim, positioning, communication, or utility errors from aggregate records. Replay/video review is a separate future feature, not implemented here. No model training, third-party model transmission, or live coaching is enabled.

## Suggested pilot

Request a small approved pilot before broad enrollment. Establish a specific user limit and refresh budget with the provider, then implement them rather than promising a quota that has not been granted. Add account consent, deletion/export controls, monitoring without unnecessary personal data, and security review before launch with real users.
