/* ---------- helpers ---------- */
function getCookie(name) {
  const match = document.cookie.match(
    new RegExp('(?:^|;\\s*)' + name + '=([^;]*)')
  );
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name, value, days = 365) {
  const maxAge = days * 24 * 60 * 60;            // seconds
  document.cookie = `${name}=${encodeURIComponent(value)};path=/;max-age=${maxAge}`;
}

function applyPreferences(sizePx, colorHex) {
  document.documentElement.style.setProperty('--fontsize', `${sizePx}px`);
  document.documentElement.style.setProperty('--fontcolor', colorHex);
}

/* ---------- main ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const sizeInput  = document.getElementById('fontsize');
  const colorInput = document.getElementById('fontcolor');
  const form       = document.getElementById('prefsForm');

  // 1.  Load any existing cookies
  const savedSize  = getCookie('fontsize');
  const savedColor = getCookie('fontcolor');

  if (savedSize)  sizeInput.value  = savedSize;
  if (savedColor) colorInput.value = savedColor;

  // 2.  Apply prefs immediately (either defaults or saved values)
  applyPreferences(sizeInput.value, colorInput.value);

  // 3.  Save + re‑apply when the user clicks “Save”
  form.addEventListener('submit', (e) => {
    e.preventDefault();          // stop page refresh

    const sizePx  = sizeInput.value;
    const colorHex = colorInput.value;

    setCookie('fontsize',  sizePx);
    setCookie('fontcolor', colorHex);

    applyPreferences(sizePx, colorHex);
  });
});
