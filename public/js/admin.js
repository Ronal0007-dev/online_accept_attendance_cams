// ---- Table Search/Filter ----
function filterTable(query) {
  const rows = document.querySelectorAll('#attendeeTable tbody tr');
  const q = query.toLowerCase().trim();

  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = q === '' || text.includes(q) ? '' : 'none';
  });
}

// ---- Delete Attendee ----
let pendingDeleteId = null;
let pendingDeleteRow = null;

function deleteAttendee(id, btnEl) {
  pendingDeleteId = id;
  pendingDeleteRow = btnEl.closest('tr');

  const modal = document.getElementById('deleteModal');
  modal.classList.add('open');

  document.getElementById('confirmDeleteBtn').onclick = function () {
    performDelete();
  };
}

async function performDelete() {
  if (!pendingDeleteId) return;

  const confirmBtn = document.getElementById('confirmDeleteBtn');
  confirmBtn.textContent = 'Removing...';
  confirmBtn.disabled = true;

  try {
    const res = await fetch(`/admin/attendee/${pendingDeleteId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await res.json();

    if (data.success) {
      if (pendingDeleteRow) {
        pendingDeleteRow.style.transition = 'opacity 0.3s, transform 0.3s';
        pendingDeleteRow.style.opacity = '0';
        pendingDeleteRow.style.transform = 'translateX(-20px)';
        setTimeout(() => {
          pendingDeleteRow.remove();
          updateStats();
        }, 300);
      }
      closeDeleteModal();
    } else {
      alert('Failed to remove attendee: ' + data.message);
    }
  } catch (err) {
    console.error('Delete error:', err);
    alert('An error occurred. Please try again.');
  } finally {
    confirmBtn.textContent = 'Yes, Remove';
    confirmBtn.disabled = false;
  }
}

function closeDeleteModal() {
  const modal = document.getElementById('deleteModal');
  modal.classList.remove('open');
  pendingDeleteId = null;
  pendingDeleteRow = null;
}

// Update row numbers and stats after deletion
function updateStats() {
  const rows = document.querySelectorAll('#attendeeTable tbody tr');
  rows.forEach((row, i) => {
    const numCell = row.querySelector('.td-num');
    if (numCell) numCell.textContent = i + 1;
  });
  // Update total count in stats
  const totalEl = document.querySelector('.stat-card:nth-child(1) .stat-card__num');
  if (totalEl) totalEl.textContent = rows.length;
}

// ---- CSV Export ----
function exportCSV() {
  const table = document.getElementById('attendeeTable');
  if (!table) return;

  const rows = [];
  const headers = [];

  // Get headers (exclude "Actions" column)
  table.querySelectorAll('thead th').forEach((th, i) => {
    if (i < 6) headers.push('"' + th.textContent.trim() + '"');
  });
  rows.push(headers.join(','));

  // Get data rows
  table.querySelectorAll('tbody tr').forEach(tr => {
    if (tr.style.display === 'none') return;
    const cells = tr.querySelectorAll('td');
    const row = [];
    for (let i = 0; i < 6; i++) {
      const text = cells[i] ? cells[i].textContent.trim().replace(/"/g, '""') : '';
      row.push('"' + text + '"');
    }
    rows.push(row.join(','));
  });

  const csvContent = rows.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `ceremony-attendees-${new Date().toISOString().slice(0,10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Close modal on overlay click
document.addEventListener('DOMContentLoaded', function () {
  const deleteModal = document.getElementById('deleteModal');
  if (deleteModal) {
    deleteModal.addEventListener('click', function (e) {
      if (e.target === deleteModal) closeDeleteModal();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeDeleteModal();
  });
});
