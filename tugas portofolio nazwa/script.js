    document.addEventListener("DOMContentLoaded", () => {
    const yearNode = document.getElementById("year");
    const nav = document.querySelector(".nav");
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelectorAll(".nav-link");
    const revealItems = document.querySelectorAll(".reveal");

    if (yearNode) {
        yearNode.textContent = new Date().getFullYear();
    }

    const setActiveLink = (id) => {
        navLinks.forEach((link) => {
        const active = link.getAttribute("href") === id;
        link.classList.toggle("active", active);
        });
    };

    navLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
        const targetId = link.getAttribute("href");
        if (!targetId || !targetId.startsWith("#")) return;

        const targetSection = document.querySelector(targetId);
        if (!targetSection) return;

        event.preventDefault();
        targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
        setActiveLink(targetId);

        if (nav && nav.classList.contains("open")) {
            nav.classList.remove("open");
            if (menuToggle) {
            menuToggle.setAttribute("aria-expanded", "false");
            }
        }
        });
    });

    const sections = document.querySelectorAll("main section[id]");
    const sectionObserver = new IntersectionObserver(
        (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
            setActiveLink(`#${entry.target.id}`);
            }
        });
        },
        { threshold: 0.55 },
    );

    sections.forEach((section) => sectionObserver.observe(section));

    const revealObserver = new IntersectionObserver(
        (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
            }
        });
        },
        { threshold: 0.15 },
    );

    revealItems.forEach((item) => revealObserver.observe(item));

    if (menuToggle && nav) {
        menuToggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        });
    }
    });
