/* Local UI demonstration only. Never call payment endpoints or change the database. */
(() => {
  'use strict';
  const overlay = document.getElementById('paymentDemo');
  if (!overlay) return;
  const dialog = overlay.querySelector('.demo-dialog');
  const plan = document.getElementById('demoPlan');
  const days = document.getElementById('demoDays');
  const price = document.getElementById('demoPrice');
  const state = document.getElementById('demoState');
  let trigger = null;

  const formatVnd = (value) => new Intl.NumberFormat('vi-VN', {
    style: 'currency', currency: 'VND', maximumFractionDigits: 0
  }).format(value);
  const close = () => {
    overlay.hidden = true;
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (trigger) trigger.focus();
  };
  document.querySelectorAll('.demo-launch').forEach(button => {
    button.addEventListener('click', () => {
      trigger = button;
      const amount = Number(button.dataset.price);
      if (!Number.isSafeInteger(amount) || amount <= 0) return;
      plan.textContent = button.dataset.plan || 'Premium';
      days.textContent = (button.dataset.days || '—') + ' ngày';
      price.textContent = formatVnd(amount);
      state.textContent = 'Bước 1/2: Xác nhận thông tin. Đây chỉ là bản xem thử.';
      state.removeAttribute('data-result');
      overlay.hidden = false;
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      dialog.focus();
    });
  });
  document.getElementById('demoClose').addEventListener('click', close);
  overlay.addEventListener('click', ev => { if (ev.target === overlay) close(); });
  document.addEventListener('keydown', ev => {
    if (ev.key === 'Escape' && !overlay.hidden) close();
    if (ev.key === 'Tab' && !overlay.hidden) {
      const buttons = Array.from(dialog.querySelectorAll('button:not([disabled])'));
      if (buttons.length === 0) return;
      const first = buttons[0], last = buttons[buttons.length - 1];
      if (ev.shiftKey && document.activeElement === first) { ev.preventDefault(); last.focus(); }
      else if (!ev.shiftKey && document.activeElement === last) { ev.preventDefault(); first.focus(); }
    }
  });
  const result = (message, type) => {
    state.textContent = message;
    state.setAttribute('data-result', type);
  };
  document.getElementById('demoSuccess').addEventListener('click', () => result(
    'GIẢ LẬP THÀNH CÔNG: Đây chỉ là minh họa kết quả. Không có thanh toán hay cấp Premium.', 'success'));
  document.getElementById('demoFailure').addEventListener('click', () => result(
    'GIẢ LẬP THẤT BẠI: Bạn có thể kiểm tra trạng thái UI, không có giao dịch nào được ghi.', 'failed'));
  document.getElementById('demoCancel').addEventListener('click', () => result(
    'GIẢ LẬP HỦY: Quá trình xem thử đã dừng, không có giao dịch.', 'failed'));
})();
