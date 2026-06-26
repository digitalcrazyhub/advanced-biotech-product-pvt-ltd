function initNavbar() {

    const mvNav = document.getElementById("mvNav");

    if (!mvNav) return;

    /* NAV SCROLL */

    window.addEventListener("scroll", () => {
        mvNav.classList.toggle("mv-nav-solid", window.scrollY > 40);
    });

    /* MOBILE MENU */

    const mvToggle = document.getElementById("mvMobileToggle");
    const mvMenu = document.getElementById("mvNavMenu");

    if (mvToggle && mvMenu) {

        const mvIcon = mvToggle.querySelector("i");

        mvToggle.addEventListener("click", () => {

            mvMenu.classList.toggle("mv-menu-active");
            document.body.classList.toggle("mv-body-lock");

            mvIcon.classList.toggle("fa-bars");
            mvIcon.classList.toggle("fa-xmark");

        });

    }

    /* MOBILE DROPDOWN */

    document.querySelectorAll(".mv-has-dropdown > .mv-nav-link").forEach(link => {

        link.addEventListener("click", function(e){

            if(window.innerWidth <= 992){

                e.preventDefault();

                this.parentElement.classList.toggle("active");

            }

        });

    });

}