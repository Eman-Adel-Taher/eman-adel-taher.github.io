const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");
const navigationLinks = document.querySelectorAll(".site-nav a");
const yearElement = document.getElementById("current-year");
const revealElements = document.querySelectorAll(".reveal");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

function updateHeader() {
  if (!header) return;

  header.classList.toggle("scrolled", window.scrollY > 10);
}

updateHeader();

window.addEventListener("scroll", updateHeader, {
  passive: true
});

function closeNavigation() {
  if (!menuToggle || !navigation) return;

  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");

  navigation.classList.remove("open");
  document.body.classList.remove("nav-open");
}

function toggleNavigation() {
  if (!menuToggle || !navigation) return;

  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Open navigation menu" : "Close navigation menu"
  );

  navigation.classList.toggle("open", !isOpen);
  document.body.classList.toggle("nav-open", !isOpen);
}

if (menuToggle) {
  menuToggle.addEventListener("click", toggleNavigation);
}

navigationLinks.forEach((link) => {
  link.addEventListener("click", closeNavigation);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 680) {
    closeNavigation();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeNavigation();
  }
});

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (prefersReducedMotion) {
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
} else if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -30px 0px"
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
}