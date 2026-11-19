// Smooth scroll is handled by CSS; this highlights the active nav link
const links = document.querySelectorAll('.links a');
const sections = [...links].map(a => document.querySelector(a.getAttribute('href')));

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => s && observer.observe(s));

// Search: scrolls to the first section containing the typed text
const form = document.getElementById('searchForm');
const input = document.getElementById('searchInput');

form.addEventListener('submit', e => {
  e.preventDefault();
  const q = input.value.trim().toLowerCase();
  if (!q) return;
  const match = sections.find(s => s && s.textContent.toLowerCase().includes(q));
  if (match) {
    match.scrollIntoView({ behavior: 'smooth' });
    match.animate(
      [{ boxShadow: '0 0 0 rgba(255,42,61,0)' }, { boxShadow: '0 0 30px rgba(255,42,61,.9)' }, { boxShadow: '0 0 0 rgba(255,42,61,0)' }],
      { duration: 1200 }
    );
  } else {
    input.setCustomValidity('No results found');
    input.reportValidity();
    setTimeout(() => input.setCustomValidity(''), 1500);
  }
});
