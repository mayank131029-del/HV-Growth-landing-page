/* =========================================================
   THE MANUFACTURING GROWTH BLUEPRINT — behaviour
   1) Live countdown to the workshop (21 Aug 2026, 4:00 PM IST)
   2) FAQ accordion
   3) Reserve-seat form (front-end only demo handler)
   ========================================================= */

(function () {
  "use strict";

  /* ---------- 1. Countdown ---------- */
  // Workshop date/time, treated as IST (UTC+5:30)
  var TARGET_DATE = new Date("2026-08-21T16:00:00+05:30");

  function pad(n) {
    return String(Math.max(n, 0)).padStart(2, "0");
  }

  function updateCountdowns() {
    var now = new Date();
    var diff = TARGET_DATE.getTime() - now.getTime();

    var days = 0, hours = 0, mins = 0, secs = 0;
    if (diff > 0) {
      days = Math.floor(diff / (1000 * 60 * 60 * 24));
      hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      mins = Math.floor((diff / (1000 * 60)) % 60);
      secs = Math.floor((diff / 1000) % 60);
    }

    var values = { days: days, hours: hours, mins: mins, secs: secs };

    document.querySelectorAll(".countdown").forEach(function (el) {
      Object.keys(values).forEach(function (unit) {
        var target = el.querySelector('[data-unit="' + unit + '"]');
        if (target) target.textContent = pad(values[unit]);
      });
    });

    if (diff <= 0) {
      clearInterval(countdownTimer);
    }
  }

  updateCountdowns();
  var countdownTimer = setInterval(updateCountdowns, 1000);

  /* ---------- 2. FAQ accordion ---------- */
  var faqItems = document.querySelectorAll(".faq__item");

  faqItems.forEach(function (item) {
    var btn = item.querySelector(".faq__q");
    if (!btn) return;

    btn.addEventListener("click", function () {
      var isOpen = item.classList.contains("is-open");

      // Close all others (single-open accordion)
      faqItems.forEach(function (other) {
        other.classList.remove("is-open");
        var otherBtn = other.querySelector(".faq__q");
        if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
      });

      // Toggle current
      if (!isOpen) {
        item.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ---------- 3. Reserve-seat form ---------- */
  var form = document.getElementById("reserveForm");
  var note = document.getElementById("reserveNote");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var emailInput = document.getElementById("email");
      var email = emailInput ? emailInput.value.trim() : "";

      if (!email) return;

      // Front-end only: swap in a real endpoint / CRM integration here.
      note.textContent = "Seat reserved — a confirmation is on its way to " + email + ".";
      form.reset();
    });
  }

  /* ---------- Smooth-scroll offset for sticky top bar ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href");
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var topbar = document.querySelector(".topbar");
      var offset = topbar ? topbar.offsetHeight + 12 : 12;
      var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: top, behavior: "smooth" });
    });
  });
})();


const registrationOverlay =
  document.querySelector(".registration-overlay");

const registrationModal =
  document.querySelector(".registration-modal");

const closeBtn =
  document.querySelector(".close-btn");


/* ================================
   OPEN REGISTRATION
================================ */

function openRegistration() {

  registrationOverlay.classList.add("active");

  document.body.style.overflow = "hidden";
}


/* ================================
   CLOSE REGISTRATION
================================ */

function closeRegistration() {

  registrationOverlay.classList.remove("active");

  document.body.style.overflow = "";
}


/* ================================
   CLOSE BUTTON
================================ */

closeBtn.addEventListener("click", function () {
  closeRegistration();
});


/* ================================
   CLICK OUTSIDE MODAL
================================ */

registrationOverlay.addEventListener("click", function (e) {

  if (!registrationModal.contains(e.target)) {
    closeRegistration();
  }

});


/* ================================
   ESC KEY
================================ */

document.addEventListener("keydown", function (e) {

  if (e.key === "Escape") {
    closeRegistration();
  }

});
let vh = 0
window.addEventListener("resize", () => {
  vh = window.innerHeight
})

if (window.innerWidth <= 767) {

  // location.reload()

  const topbar = document.querySelector(".topbar")
  const topbarrect = topbar.getBoundingClientRect().height
  // topbar.style.top = `${window.innerHeight - topbarrect}px`
  // topbar.style.top = `${vh-topbarrect}px`
  console.log(vh - topbarrect)
  console.log(topbarrect)
  // console.log(vh)

}

const testiRow = document.querySelector(".testi-row");
const testiCards = document.querySelectorAll(".testi");

let currentTesti = 0;

function autoTestimonial() {

    const isMobile = window.innerWidth <= 768;
    const visibleCards = isMobile ? 1 : 3;

    const maxIndex = testiCards.length - visibleCards;

    currentTesti++;

    if (currentTesti > maxIndex) {
        currentTesti = 0;
    }

    const targetCard = testiCards[currentTesti];

    testiRow.scrollTo({
        left: targetCard.offsetLeft,
        behavior: "smooth"
    });
}

setInterval(autoTestimonial, 1000);


