import {
  calculateGroupPricing,
  formatDiscountLabel,
  formatPriceLabel,
  sanitizeQuantity
} from '@utils/products';

function setText(parent: ParentNode, selector: string, value: string) {
  const node = parent.querySelector<HTMLElement>(selector);

  if (node) {
    node.textContent = value;
  }
}

function updateCard(card: HTMLElement, quantity: number) {
  const basePrice = Number(card.dataset.basePrice ?? '0');

  if (!Number.isFinite(basePrice) || basePrice <= 0) {
    return;
  }

  const summary = calculateGroupPricing(basePrice, quantity);

  setText(card, '[data-group-pricing-badge]', formatDiscountLabel(summary.discountRate));
  setText(card, '[data-group-pricing-tier-label]', summary.tierLabel);
  setText(card, '[data-group-pricing-listed]', formatPriceLabel(basePrice));
  setText(card, '[data-group-pricing-unit]', formatPriceLabel(summary.unitPrice));
  setText(card, '[data-group-pricing-total]', formatPriceLabel(summary.totalPrice));
  setText(card, '[data-group-pricing-savings]', formatPriceLabel(summary.savings));
  setText(
    card,
    '[data-group-pricing-copy]',
    summary.savings > 0
      ? `Tiết kiệm ${formatPriceLabel(summary.savings)} khi chốt ${summary.quantity} account cùng lúc.`
      : 'Mua từ 2 account để bắt đầu có mức giá tốt hơn trên mỗi account.'
  );
}

function syncRoot(root: HTMLElement, nextQuantity: number) {
  const quantity = sanitizeQuantity(nextQuantity);

  root.querySelectorAll<HTMLInputElement>('[data-group-pricing-input]').forEach((input) => {
    input.value = String(quantity);
  });

  root.querySelectorAll<HTMLElement>('[data-group-pricing-card]').forEach((card) => {
    updateCard(card, quantity);
  });

  root.querySelectorAll<HTMLElement>('[data-group-pricing-quantity]').forEach((node) => {
    node.textContent = String(quantity);
  });
}

function attachQuantityButtons(root: HTMLElement) {
  root.querySelectorAll<HTMLButtonElement>('[data-group-pricing-decrement]').forEach((button) => {
    button.addEventListener('click', () => {
      const input = root.querySelector<HTMLInputElement>('[data-group-pricing-input]');

      if (!input) return;

      syncRoot(root, Number(input.value) - 1);
    });
  });

  root.querySelectorAll<HTMLButtonElement>('[data-group-pricing-increment]').forEach((button) => {
    button.addEventListener('click', () => {
      const input = root.querySelector<HTMLInputElement>('[data-group-pricing-input]');

      if (!input) return;

      syncRoot(root, Number(input.value) + 1);
    });
  });
}

function attachRoot(root: HTMLElement) {
  const firstInput = root.querySelector<HTMLInputElement>('[data-group-pricing-input]');
  const initialQuantity = sanitizeQuantity(Number(firstInput?.value ?? '1'));

  root.querySelectorAll<HTMLInputElement>('[data-group-pricing-input]').forEach((input) => {
    input.addEventListener('input', () => {
      syncRoot(root, Number(input.value));
    });

    input.addEventListener('change', () => {
      syncRoot(root, Number(input.value));
    });
  });

  attachQuantityButtons(root);
  syncRoot(root, initialQuantity);
}

document.querySelectorAll<HTMLElement>('[data-group-pricing-root]').forEach((root) => {
  attachRoot(root);
});
