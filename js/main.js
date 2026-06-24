// ─── COUNTER ANIMATION ───
document.addEventListener("DOMContentLoaded", () => {

    const statsSection = document.querySelector("#stats-section");
    const counters = document.querySelectorAll(".stat-num[data-target]");

    function animateCounter(counter) {
        const target = +counter.getAttribute("data-target");
        const duration = 2000;
        const increment = target / (duration / 16);

        let current = 0;

        counter.innerText = "0";

        const updateCounter = () => {
            current += increment;

            if (current < target) {

                if (target >= 1000) {
                    counter.innerText =
                        Math.floor(current).toLocaleString() + "+";
                } else {
                    counter.innerText =
                        Math.floor(current) + "+";
                }

                requestAnimationFrame(updateCounter);
            } else {

                if (target >= 1000) {
                    counter.innerText =
                        target.toLocaleString() + "+";
                } else {
                    counter.innerText =
                        target + "+";
                }
            }
        };

        updateCounter();
    }

    function startCounters() {
        counters.forEach(counter => {
            animateCounter(counter);
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {

            if (entry.isIntersecting) {
                startCounters();
            }

        });
    }, {
        threshold: 0.4
    });

    observer.observe(statsSection);
});


document.querySelectorAll('.faq-q').forEach(button => {

  button.addEventListener('click', () => {

    const faqItem = button.parentElement;
    const content = faqItem.querySelector('.faq-a');

    const isActive = faqItem.classList.contains('active');

    // Close all
    document.querySelectorAll('.faq-item').forEach(item => {
      item.classList.remove('active');

      const body = item.querySelector('.faq-a');
      body.style.height = "0px";
    });

    // Open clicked
    if (!isActive) {
      faqItem.classList.add('active');
      content.style.height = content.scrollHeight + "px";
    }
  });

});

// ─── SCROLL REVEAL ───
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
