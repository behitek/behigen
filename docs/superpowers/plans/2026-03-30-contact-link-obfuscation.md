# Contact Link Obfuscation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace direct social chat links with internal JavaScript redirect pages that keep the real Zalo, Telegram, and Messenger targets out of rendered HTML while making Zalo the recommended contact path.

**Architecture:** Keep `src/utils/contact.ts` as the single contact-link generator, but change it to emit internal `/go/<channel>?m=...` URLs. Add a new static dynamic route at `src/pages/go/[channel].astro` that validates the channel and uses inline client-side JavaScript to reconstruct and open the real destination. Update all existing CTA surfaces to use the shared helper output and add Zalo recommendation copy without introducing a separate contact system.

**Tech Stack:** Astro 4, TypeScript, Tailwind CSS, Vitest, Playwright

---

## File Map

- Modify: `src/utils/contact.ts`
  - Keep message generation centralized.
  - Change `buildContactHref(...)` to generate internal redirect routes.
  - Add shared channel metadata used by the redirect page.
- Create: `src/pages/go/[channel].astro`
  - Generate static paths for the supported channels.
  - Validate the channel and render a minimal redirect UI.
  - Inline a browser script that reconstructs the destination URL, appends the encoded message, updates the manual fallback link, and redirects.
- Modify: `src/pages/contact.astro`
  - Continue using the helper-generated links.
  - Mark Zalo as the recommended channel in copy and button styling.
- Modify: `src/pages/index.astro`
  - Keep contact CTAs pointing at helper-generated internal routes.
  - Update hero/final CTA copy to prefer Zalo and visually recommend it.
- Modify: `src/components/store/ProductCTA.astro`
  - Keep product-aware contact links centralized.
  - Update CTA copy and styling so Zalo is recommended.
- Modify: `tests/unit/contact.test.ts`
  - Assert the helper now returns internal redirect URLs and still encodes the product name.
- Modify: `tests/e2e/home.spec.ts`
  - Assert homepage contact actions keep Zalo visible and recommended.
- Modify: `tests/e2e/product-detail.spec.ts`
  - Assert product CTAs use internal `/go/...` links and retain all channels.

### Task 1: Update the shared contact helper

**Files:**

- Modify: `src/utils/contact.ts`
- Test: `tests/unit/contact.test.ts`

- [ ] **Step 1: Write the failing unit assertions for internal redirect routes**

```ts
import { describe, expect, it } from 'vitest';
import {
  buildContactHref,
  buildContactMessage
} from '../../src/utils/contact';

describe('contact helpers', () => {
  it('builds a product-aware message', () => {
    expect(buildContactMessage('Google AI Pro (2TB)')).toContain('Google AI Pro (2TB)');
  });

  it('creates an internal Telegram redirect link with an encoded message', () => {
    expect(
      buildContactHref({
        baseUrl: 'https://ignored.example',
        channel: 'telegram',
        productName: 'ChatGPT Plus (Personal)'
      })
    ).toBe(
      '/go/telegram?m=Ch%C3%A0o%20b%E1%BA%A1n%2C%20m%C3%ACnh%20mu%E1%BB%91n%20mua%20g%C3%B3i%20ChatGPT%20Plus%20(Personal).%20B%E1%BA%A1n%20t%C6%B0%20v%E1%BA%A5n%20gi%C3%BAp%20m%C3%ACnh%20c%C3%A1ch%20mua%20v%C3%A0%20b%C3%A0n%20giao%20nh%C3%A9.'
    );
  });

  it('creates an internal Zalo redirect link for generic contact', () => {
    expect(
      buildContactHref({
        baseUrl: '',
        channel: 'zalo',
        productName: 'một gói phù hợp'
      })
    ).toMatch(/^\\/go\\/zalo\\?m=/);
  });
});
```

- [ ] **Step 2: Run the unit test to verify it fails**

Run: `npm test -- tests/unit/contact.test.ts`
Expected: FAIL because `buildContactHref(...)` still returns direct external URLs.

- [ ] **Step 3: Implement the minimal helper changes**

```ts
export type ContactChannel = "zalo" | "telegram" | "messenger";

export const CONTACT_CHANNELS: ContactChannel[] = [
  "zalo",
  "telegram",
  "messenger",
];

export function buildContactMessage(productName: string): string {
  return `Chào bạn, mình muốn mua gói ${productName}. Bạn tư vấn giúp mình cách mua và bàn giao nhé.`;
}

export function buildContactHref({
  channel,
  productName,
}: {
  baseUrl: string;
  channel: ContactChannel;
  productName: string;
}): string {
  const message = encodeURIComponent(buildContactMessage(productName));
  return `/go/${channel}?m=${message}`;
}
```

- [ ] **Step 4: Run the unit test to verify it passes**

Run: `npm test -- tests/unit/contact.test.ts`
Expected: PASS with 3 passing assertions.

- [ ] **Step 5: Commit**

```bash
git add src/utils/contact.ts tests/unit/contact.test.ts
git commit -m "refactor: route contact links through internal redirects"
```

### Task 2: Add the redirect page with channel-specific browser logic

**Files:**

- Create: `src/pages/go/[channel].astro`
- Modify: `src/utils/contact.ts`

- [ ] **Step 1: Create the redirect route with known channels**

```astro
---
import Layout from '@layouts/Layout.astro';
import { CONTACT_CHANNELS, type ContactChannel } from '@utils/contact';

const CHANNEL_LABELS: Record<ContactChannel, string> = {
  zalo: 'Zalo',
  telegram: 'Telegram',
  messenger: 'Messenger'
};

export function getStaticPaths() {
  return CONTACT_CHANNELS.map((channel) => ({ params: { channel } }));
}

const channel = Astro.params.channel as ContactChannel;

if (!CONTACT_CHANNELS.includes(channel)) {
  return Astro.redirect('/404');
}

const label = CHANNEL_LABELS[channel];
const encodedMessage = Astro.url.searchParams.get('m') ?? '';
---
```

- [ ] **Step 2: Replace the invalid-route handling with Astro’s 404 pattern**

```astro
---
import { CONTACT_CHANNELS, type ContactChannel } from '@utils/contact';

const channelParam = Astro.params.channel;

if (!channelParam || !CONTACT_CHANNELS.includes(channelParam as ContactChannel)) {
  throw new Error('Not found');
}

const channel = channelParam as ContactChannel;
---
```

Expected adjustment: replace the placeholder redirect-to-404 approach with Astro’s supported not-found behavior after checking how the route is compiled.

- [ ] **Step 3: Add the redirect UI and inline browser script**

```astro
<Layout
  title={`Đang mở ${label}`}
  description={`Behitek đang mở ${label} để bạn nhắn tin nhanh hơn.`}
  canonical={`/go/${channel}`}
>
  <section class="container py-16">
    <div class="mx-auto max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-8 text-center">
      <p class="text-sm font-semibold uppercase tracking-[0.12em] text-cyan-700">
        Đang chuyển hướng
      </p>
      <h1 class="mt-3 text-3xl font-black text-slate-950">Đang mở {label}</h1>
      <p class="mt-4 text-base leading-7 text-slate-600">
        Nếu trình duyệt chưa tự mở ứng dụng chat, dùng nút bên dưới để tiếp tục.
      </p>
      <a id="continue-link" href={`${import.meta.env.BASE_URL}contact`} class="mt-6 inline-flex rounded-full bg-cyan-600 px-6 py-3 font-semibold text-white">
        Tiếp tục tới {label}
      </a>
    </div>
  </section>
  <script define:vars={{ channel, encodedMessage }}>
    const channelConfig = {
      zalo: {
        parts: ['https://za', 'lo.me/g/', 'csrribk24f1y5x5xlimh'],
        queryKey: 'text'
      },
      telegram: {
        parts: ['https://t.', 'me/', 'hieunv11'],
        queryKey: 'text'
      },
      messenger: {
        parts: ['http://m.', 'me/', 'realbehitek/'],
        queryKey: 'ref'
      }
    };

    const config = channelConfig[channel];

    if (config) {
      const target = new URL(config.parts.join(''));
      if (encodedMessage) {
        target.searchParams.set(config.queryKey, decodeURIComponent(encodedMessage));
      }

      const href = target.toString();
      const link = document.getElementById('continue-link');
      if (link instanceof HTMLAnchorElement) link.href = href;
      window.location.replace(href);
    }
  </script>
</Layout>
```

- [ ] **Step 4: Run a focused build check for the new route**

Run: `npm run build`
Expected: PASS with Astro generating `/go/zalo`, `/go/telegram`, and `/go/messenger`.

- [ ] **Step 5: Commit**

```bash
git add src/pages/go/[channel].astro src/utils/contact.ts
git commit -m "feat: add obfuscated contact redirect routes"
```

### Task 3: Update contact CTA surfaces to recommend Zalo

**Files:**

- Modify: `src/pages/contact.astro`
- Modify: `src/pages/index.astro`
- Modify: `src/components/store/ProductCTA.astro`
- Test: `tests/e2e/home.spec.ts`
- Test: `tests/e2e/product-detail.spec.ts`

- [ ] **Step 1: Update the contact page copy and CTA styling**

```astro
<p class="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
  Chọn kênh chat bạn đang dùng. Zalo là kênh khuyên dùng để nhận phản hồi nhanh nhất, còn Telegram và Messenger vẫn luôn sẵn sàng.
</p>
<div class="mt-8 grid gap-4 sm:grid-cols-3">
  <a href={zaloHref} class="rounded-[2rem] border border-cyan-300 bg-cyan-50 px-6 py-8 text-center font-semibold text-slate-900">
    Zalo • Khuyên dùng
  </a>
  <a href={telegramHref} class="rounded-[2rem] border border-slate-200 bg-white px-6 py-8 text-center font-semibold text-slate-900">
    Telegram
  </a>
  <a href={messengerHref} class="rounded-[2rem] border border-slate-200 bg-white px-6 py-8 text-center font-semibold text-slate-900">
    Messenger
  </a>
</div>
```

- [ ] **Step 2: Update homepage CTAs and closing-copy emphasis**

```astro
<p class="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
  Xem giá rõ ràng, chọn đúng gói cần dùng, rồi nhắn Zalo để chốt nhanh. Telegram và Messenger vẫn có sẵn nếu đó là kênh bạn dùng thường xuyên.
</p>
<div class="mt-8 flex flex-wrap gap-3 text-sm font-semibold">
  <a href={zaloHref} class="rounded-full bg-cyan-600 px-5 py-3 text-white shadow-sm">Zalo • Khuyên dùng</a>
  <a href={telegramHref} class="rounded-full bg-white px-5 py-3 text-slate-900 shadow-sm">Telegram</a>
  <a href={messengerHref} class="rounded-full bg-white px-5 py-3 text-slate-900 shadow-sm">Messenger</a>
</div>
```

- [ ] **Step 3: Update the product CTA component**

```astro
<p class="mt-3 text-sm leading-6 text-slate-600">
  Zalo là kênh khuyên dùng để chốt đơn nhanh nhất. Telegram và Messenger vẫn mở sẵn tin nhắn với tên sản phẩm nếu bạn tiện dùng hơn.
</p>
<div class="mt-6 grid gap-3 sm:grid-cols-3">
  <a href={zaloHref} class="rounded-2xl border border-cyan-300 bg-white px-4 py-3 text-center font-semibold text-cyan-700">
    Zalo • Khuyên dùng
  </a>
  <a href={telegramHref} class="rounded-2xl bg-white px-4 py-3 text-center font-semibold text-slate-900">
    Telegram
  </a>
  <a href={messengerHref} class="rounded-2xl bg-white px-4 py-3 text-center font-semibold text-slate-900">
    Messenger
  </a>
</div>
```

- [ ] **Step 4: Update end-to-end assertions for the new link shape**

```ts
test('homepage shows featured products and recommended contact choices', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: /Gói nổi bật/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Zalo/i }).first()).toHaveAttribute('href', /\\/go\\/zalo\\?m=/);
  await expect(page.getByRole('link', { name: /Zalo/i }).first()).toContainText(/Khuyên dùng/i);
  await expect(page.getByRole('link', { name: /Telegram/i }).first()).toHaveAttribute('href', /\\/go\\/telegram\\?m=/);
  await expect(page.getByRole('link', { name: /Messenger/i }).first()).toHaveAttribute('href', /\\/go\\/messenger\\?m=/);
});

test('product detail page shows pricing and internal contact links', async ({ page }) => {
  await page.goto('/store/google-ai-pro-2tb-family-owner');

  await expect(page.getByRole('link', { name: /Zalo/i }).first()).toHaveAttribute(
    'href',
    /\\/go\\/zalo\\?m=.*Google%20AI%20Pro/
  );
});
```

- [ ] **Step 5: Run the affected test suites**

Run: `npm test -- tests/unit/contact.test.ts`
Expected: PASS

Run: `npm run test:e2e -- tests/e2e/home.spec.ts tests/e2e/product-detail.spec.ts`
Expected: PASS with updated contact CTA assertions.

- [ ] **Step 6: Commit**

```bash
git add src/pages/contact.astro src/pages/index.astro src/components/store/ProductCTA.astro tests/e2e/home.spec.ts tests/e2e/product-detail.spec.ts
git commit -m "feat: recommend zalo across contact call-to-actions"
```

### Task 4: Verify built HTML no longer exposes the real chat URLs

**Files:**

- Verify build output under `dist/`

- [ ] **Step 1: Build the production site**

Run: `npm run build`
Expected: PASS with generated output in `dist/`.

- [ ] **Step 2: Scan the built HTML for leaked external chat URLs**

Run: `rg -n "zalo\\.me/g/csrribk24f1y5x5xlimh|t\\.me/hieunv11|m\\.me/realbehitek" dist`
Expected: No matches in homepage, contact page, or product pages. Redirect page script matches are acceptable only if the URLs are split across fragments and therefore do not appear as one literal string.

- [ ] **Step 3: Spot-check internal contact URLs in built pages**

Run: `rg -n "/go/(zalo|telegram|messenger)\\?m=" dist/index.html dist/contact/index.html dist/store`
Expected: Matches showing internal redirect links in built output.

- [ ] **Step 4: Commit**

```bash
git add src/utils/contact.ts src/pages/go/[channel].astro src/pages/contact.astro src/pages/index.astro src/components/store/ProductCTA.astro tests/unit/contact.test.ts tests/e2e/home.spec.ts tests/e2e/product-detail.spec.ts
git commit -m "test: verify contact link obfuscation flow"
```
