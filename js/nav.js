(function () {
    function getSitePrefix() {
        return window.location.pathname.includes("/page/") ? "../" : "./";
    }

    function resolveSiteUrl(target) {
        if (!target || /^(https?:|mailto:|tel:|#)/i.test(target)) {
            return target;
        }

        return getSitePrefix() + target.replace(/^\/+/, "");
    }

    function resolveSiteLinks(root) {
        const scope = root || document;

        scope.querySelectorAll("[data-site-href]").forEach(link => {
            link.setAttribute("href", resolveSiteUrl(link.dataset.siteHref));
        });

        scope.querySelectorAll("[data-site-src]").forEach(media => {
            media.setAttribute("src", resolveSiteUrl(media.dataset.siteSrc));
        });
    }

    function updateFooterYear(root) {
        const year = (root || document).querySelector("#year");
        if (year) {
            year.textContent = new Date().getFullYear();
        }
    }

    window.initNavbar = function initNavbar() {
        const mvNav = document.getElementById("mvNav");
        if (!mvNav) return;

        resolveSiteLinks(mvNav);

        if (mvNav.dataset.initialized === "true") return;
        mvNav.dataset.initialized = "true";

        const mvToggle = document.getElementById("mvMobileToggle");
        const mvMenu = document.getElementById("mvNavMenu");

        window.addEventListener("scroll", () => {
            mvNav.classList.toggle("mv-nav-solid", window.scrollY > 40);
        }, { passive: true });

        if (mvToggle && mvMenu) {
            const mvIcon = mvToggle.querySelector("i");

            const setMenuState = (isOpen) => {
                mvMenu.classList.toggle("mv-menu-active", isOpen);
                document.body.classList.toggle("mv-body-lock", isOpen);
                mvToggle.setAttribute("aria-expanded", String(isOpen));

                if (mvIcon) {
                    mvIcon.classList.toggle("fa-bars", !isOpen);
                    mvIcon.classList.toggle("fa-xmark", isOpen);
                }
            };

            mvToggle.addEventListener("click", () => {
                setMenuState(!mvMenu.classList.contains("mv-menu-active"));
            });

            mvMenu.querySelectorAll("a").forEach(link => {
                link.addEventListener("click", () => {
                    if (window.innerWidth <= 992 && !link.closest(".mv-has-dropdown > .mv-nav-link")) {
                        setMenuState(false);
                    }
                });
            });

            document.addEventListener("keydown", (event) => {
                if (event.key === "Escape") {
                    setMenuState(false);
                }
            });
        }

        document.querySelectorAll(".mv-has-dropdown > .mv-nav-link").forEach(link => {
            link.setAttribute("aria-expanded", "false");

            link.addEventListener("click", function (event) {
                if (window.innerWidth <= 992) {
                    event.preventDefault();

                    const parent = this.parentElement;
                    const isOpen = parent.classList.toggle("active");
                    this.setAttribute("aria-expanded", String(isOpen));
                }
            });
        });
    };

    window.initSiteFragment = function initSiteFragment(root) {
        const scope = root || document;
        resolveSiteLinks(scope);
        updateFooterYear(scope);
        window.initNavbar();
    };

    function startFragmentObserver() {
        window.initSiteFragment(document);

        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        window.initSiteFragment(node);
                    }
                });
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", startFragmentObserver);
    } else {
        startFragmentObserver();
    }
})();
