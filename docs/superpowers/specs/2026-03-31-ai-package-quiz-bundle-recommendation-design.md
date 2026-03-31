# AI Package Quiz Bundle Recommendation Design

## Goal

Improve the AI package quiz so users who need both coding performance and Google storage/ecosystem benefits are not forced into a misleading ChatGPT-only recommendation.

## Problem

The current quiz short-circuits to ChatGPT whenever the user selects the coding-first path. That hides storage, Drive, Photos, and family-management needs even when those needs are explicitly present elsewhere in the form.

This makes the recommendation feel too binary and weakens trust in the result card.

## Approved Direction

Add a third recommendation mode:

- `single` for one clear product fit
- `bundle` when the user clearly needs both ChatGPT and Google ecosystem value

The result card should explain the recommendation in plain language and make the triggering reasons visible instead of only showing a short paragraph.

## Logic Changes

- Add an explicit `needsGoogleStorage` answer so storage/ecosystem need is captured directly.
- Keep Google follow-up questions focused on storage intensity and owner control.
- Return a bundle recommendation when:
  - the user is coding-first, and
  - the user also confirms they need Google storage/ecosystem benefits
- Keep single-package recommendations for pure coding-only and Google-first cases.

## UI Changes

- Rework the form labels so the storage question is explicit and easy to scan.
- Hide Google-specific follow-up questions unless storage/ecosystem need is enabled.
- Expand the result card to show:
  - recommendation type
  - heading
  - short summary
  - bullet reasons derived from the user answers
  - one or two product CTAs depending on result mode
  - a short explanation for why the other path was not chosen

## Testing

- Add unit coverage for bundle recommendations.
- Update the tool page end-to-end test to verify the dual-package path appears when the user selects coding plus storage.
