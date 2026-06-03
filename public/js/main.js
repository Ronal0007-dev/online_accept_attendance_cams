// Modal close function
function closeModal() {
  const modal = document.getElementById('successModal');
  if (modal) {
    modal.style.opacity = '0';
    modal.style.pointerEvents = 'none';
    setTimeout(() => { modal.remove(); }, 300);
  }
}

// Close modal on overlay click
document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('successModal');
  if (modal && modal.dataset.open === 'true') {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });

    // Also close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });
  }

  // Phone number formatting (optional)
  const phoneInput = document.getElementById('phoneNumber');
  if (phoneInput) {
    phoneInput.addEventListener('input', function () {
      // Remove non-numeric chars except +, -, (, ), space
      this.value = this.value.replace(/[^0-9\+\-\(\)\s]/g, '');
    });
  }

  // Form submit loading state
  const form = document.getElementById('rsvpForm');
  if (form) {
    form.addEventListener('submit', function () {
      const btn = form.querySelector('.rsvp-btn');
      if (btn) {
        btn.disabled = true;
        btn.querySelector('.rsvp-btn__text').textContent = 'Confirming...';
      }
    });
  }
});
