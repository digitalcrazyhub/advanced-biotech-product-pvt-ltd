function initNavbar() {

    /* NAV SCROLL */

    const mvNav = document.getElementById("mvNav");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 40) {
            mvNav.classList.add("mv-nav-solid");
        } else {
            mvNav.classList.remove("mv-nav-solid");
        }
    });

    /* MOBILE MENU */

    const mvToggle = document.getElementById("mvMobileToggle");
    const mvMenu = document.getElementById("mvNavMenu");
    const mvIcon = mvToggle.querySelector("i");

    mvToggle.addEventListener("click", () => {

        mvMenu.classList.toggle("mv-menu-active");
        document.body.classList.toggle("mv-body-lock");

        if (mvMenu.classList.contains("mv-menu-active")) {

            mvIcon.classList.remove("fa-bars");
            mvIcon.classList.add("fa-xmark");

        } else {

            mvIcon.classList.remove("fa-xmark");
            mvIcon.classList.add("fa-bars");

        }

    });

    /* MOBILE DROPDOWN */

    document.querySelectorAll(".mv-has-dropdown > .mv-nav-link").forEach((dropdownLink) => {

        dropdownLink.addEventListener("click", function (e) {

            if (window.innerWidth <= 992) {

                e.preventDefault();

                const parent = this.parentElement;
                parent.classList.toggle("active");

            }

        });

    });

}