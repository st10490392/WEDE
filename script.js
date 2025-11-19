 // =============== 1. FAQ ACCORDION ===============
document.querySelectorAll(".faq dt").forEach((item) => {
    item.addEventListener("click", () => {
        item.classList.toggle("active");
        let answer = item.nextElementSibling;
        // animate via max-height for smoother transition
        if (answer.style.maxHeight) {
            answer.style.maxHeight = null;
        } else {
            answer.style.maxHeight = answer.scrollHeight + "px";
        }
    });
});

// =============== 2. LIGHTBOX GALLERY ===============
document.querySelectorAll(".gallery img").forEach((image) => {
    image.addEventListener("click", () => {
        let lightbox = document.createElement("div");
        lightbox.id = "lightbox";
        document.body.appendChild(lightbox);

        let img = document.createElement("img");
        img.src = image.src;
        lightbox.appendChild(img);

        lightbox.addEventListener("click", () => {
            lightbox.remove();
        });
    });
});

// =============== 3. SEARCH FILTER (Products / Jobs / Services) ===============
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search");
    if (searchInput) {
        searchInput.addEventListener("keyup", () => {
            let filter = searchInput.value.toLowerCase();
            document.querySelectorAll(".item").forEach((item) => {
                let text = item.textContent.toLowerCase();
                item.style.display = text.includes(filter) ? "" : "none";
            });
        });
    }
});

// =============== 7. MOBILE NAV TOGGLE ===============
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');
if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
        const opened = mainNav.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', opened ? 'true' : 'false');
    });
    // close nav when a link is clicked (mobile)
    mainNav.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            if (mainNav.classList.contains('open')) {
                mainNav.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
    // optional: close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mainNav.classList.contains('open')) {
            mainNav.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// =============== 4. PAGE-LOAD FADE-IN ANIMATION ===============
window.onload = () => {
    document.body.classList.add("fade-in");
};

// =============== 5. DYNAMIC CONTENT LOADER (Example for products) ===============
const productsContainer = document.getElementById("products-list");

if (productsContainer) {
    const products = [
        { name: "Mentorship Program", price: "R500", description: "Learn Smart Money trading." },
        { name: "Signals Package", price: "Free", description: "Daily Forex signals." }
    ];

    products.forEach(p => {
        let div = document.createElement("div");
        div.classList.add("item");
        div.innerHTML = `<h3>${p.name}</h3><p>${p.description}</p><strong>${p.price}</strong>`;
        productsContainer.appendChild(div);
    });
}

// =============== 6. SIMPLE MODAL ===============
const openModalBtn = document.getElementById("open-modal");
const siteModal = document.getElementById("site-modal");
if (openModalBtn && siteModal) {
    const closeBtn = siteModal.querySelector(".modal-close");
    const mainEl = document.getElementById('main');
    let previouslyFocused = null;
    let trapHandler = null;

    function getFocusableElements(container) {
        const selector = 'a[href], area[href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable]';
        return Array.from(container.querySelectorAll(selector)).filter(el => el.offsetParent !== null || el === document.activeElement);
    }

    openModalBtn.addEventListener("click", () => {
        previouslyFocused = document.activeElement;
        siteModal.classList.add("open");
        siteModal.setAttribute("aria-hidden", "false");
        if (mainEl) mainEl.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = "hidden";

        // focus first focusable element inside modal
        const focusable = getFocusableElements(siteModal);
        if (focusable.length) focusable[0].focus();
        else siteModal.focus();

        // trap focus
        trapHandler = function(e) {
            if (e.key !== 'Tab') return;
            const elems = getFocusableElements(siteModal);
            if (!elems.length) {
                e.preventDefault();
                return;
            }
            const first = elems[0];
            const last = elems[elems.length - 1];
            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };
        document.addEventListener('keydown', trapHandler);
    });

    function closeModal() {
        if (trapHandler) document.removeEventListener('keydown', trapHandler);
        siteModal.classList.remove("open");
        siteModal.setAttribute("aria-hidden", "true");
        if (mainEl) mainEl.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = "auto";
        if (previouslyFocused && typeof previouslyFocused.focus === 'function') previouslyFocused.focus();
    }

    closeBtn && closeBtn.addEventListener("click", closeModal);
    siteModal.addEventListener("click", (e) => {
        if (e.target === siteModal) closeModal();
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && siteModal.classList.contains("open")) closeModal();
    });
}
