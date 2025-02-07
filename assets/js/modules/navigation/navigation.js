let currentRoute = null;

function selectNavigation(id) {
    const $selectedNav = document.querySelector(`#${id}`);
    if (!$selectedNav) {
        throw new Error(`No navigation item with such id`);
    }

    const navItems = document.querySelectorAll(`header nav li`);
    navItems.forEach($nav => {
        $nav.classList.remove("selected");
    });
    $selectedNav.classList.add("selected");

    const sectionId = id.replace('-route', '');
    const sections = document.querySelectorAll('section');
    sections.forEach($section => {
        $section.classList.add("hidden");
    });
    document.querySelector(`section#${sectionId}`).classList.remove("hidden");

    currentRoute = id;
}

function getCurrentRoute() {
    return currentRoute;
}

export { selectNavigation, getCurrentRoute };