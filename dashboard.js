/* =========================================================
   NOVELLOW
   DASHBOARD
========================================================= */

"use strict";


/* =========================================================
   DOM ELEMENTS
========================================================= */

const sidebar = document.getElementById("sidebar");
const mobileOverlay = document.getElementById("mobileOverlay");

const menuButton = document.getElementById("menuButton");
const sidebarClose = document.getElementById("sidebarClose");

const addBookModal = document.getElementById("addBookModal");

const addBookButton = document.getElementById("addBookButton");
const emptyAddBookButton = document.getElementById("emptyAddBookButton");
const shelfAddBookButton = document.getElementById("shelfAddBookButton");

const addJournalButton = document.getElementById("addJournalButton");
const emptyJournalButton = document.getElementById("emptyJournalButton");

const manageShelvesButton = document.getElementById("manageShelvesButton");

const themeButton = document.getElementById("themeButton");
const profileButton = document.getElementById("profileButton");

const logoutButton = document.getElementById("logoutButton");

const librarySearch = document.getElementById("librarySearch");

const editGoalButton = document.getElementById("editGoalButton");

const welcomeName = document.getElementById("welcomeName");
const sidebarUserName = document.getElementById("sidebarUserName");

const sidebarAvatar = document.getElementById("sidebarAvatar");
const profileAvatar = document.getElementById("profileAvatar");

const booksReadCount = document.getElementById("booksReadCount");
const readingGoalTarget = document.getElementById("readingGoalTarget");
const readingGoalProgress = document.getElementById("readingGoalProgress");
const readingGoalMessage = document.getElementById("readingGoalMessage");

const totalBooksStat = document.getElementById("totalBooksStat");
const booksFinishedStat = document.getElementById("booksFinishedStat");
const currentlyReadingStat = document.getElementById("currentlyReadingStat");
const journalEntriesStat = document.getElementById("journalEntriesStat");

const activityList = document.getElementById("activityList");


/* =========================================================
   TEMPORARY DASHBOARD STATE

   Supabase will eventually replace most of this.
========================================================= */

const dashboardState = {
    user: {
        id: null,
        name: "Reader",
        email: null
    },

    stats: {
        totalBooks: 0,
        booksFinished: 0,
        currentlyReading: 0,
        journalEntries: 0
    },

    readingGoal: {
        current: 0,
        target: 24
    }
};


/* =========================================================
   INITIALIZE DASHBOARD
========================================================= */

function initDashboard() {
    setupSidebar();
    setupModal();
    setupNavigation();
    setupSearch();
    setupReadingGoal();

    updateGreeting();
    updateUserInterface();
    updateStats();
    updateReadingGoal();

    console.log("Novellow dashboard initialized.");
}


document.addEventListener("DOMContentLoaded", initDashboard);


/* =========================================================
   MOBILE SIDEBAR
========================================================= */

function openSidebar() {
    if (!sidebar || !mobileOverlay) {
        return;
    }

    sidebar.classList.add("is-open");
    mobileOverlay.classList.add("is-active");

    mobileOverlay.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
}


function closeSidebar() {
    if (!sidebar || !mobileOverlay) {
        return;
    }

    sidebar.classList.remove("is-open");
    mobileOverlay.classList.remove("is-active");

    mobileOverlay.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
}


function setupSidebar() {
    if (menuButton) {
        menuButton.addEventListener("click", openSidebar);
    }

    if (sidebarClose) {
        sidebarClose.addEventListener("click", closeSidebar);
    }

    if (mobileOverlay) {
        mobileOverlay.addEventListener("click", closeSidebar);
    }

    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) {
            closeSidebar();
        }
    });
}


/* =========================================================
   MODAL
========================================================= */

function openModal(modal) {
    if (!modal) {
        return;
    }

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    const firstFocusableElement = modal.querySelector(
        "button, input, select, textarea, a[href]"
    );

    if (firstFocusableElement) {
        setTimeout(() => {
            firstFocusableElement.focus();
        }, 100);
    }
}


function closeModal(modal) {
    if (!modal) {
        return;
    }

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
}


function openAddBookModal() {
    openModal(addBookModal);
}


function setupModal() {
    const addBookButtons = [
        addBookButton,
        emptyAddBookButton,
        shelfAddBookButton
    ];

    addBookButtons.forEach((button) => {
        if (!button) {
            return;
        }

        button.addEventListener("click", openAddBookModal);
    });


    document
        .querySelectorAll('[data-action="add-book"]')
        .forEach((button) => {

            button.addEventListener("click", openAddBookModal);

        });


    document
        .querySelectorAll("[data-close-modal]")
        .forEach((button) => {

            button.addEventListener("click", () => {
                const modal = button.closest(".modal");

                closeModal(modal);
            });

        });


    document.addEventListener("keydown", (event) => {

        if (event.key !== "Escape") {
            return;
        }

        const openModalElement = document.querySelector(".modal.is-open");

        if (openModalElement) {
            closeModal(openModalElement);
            return;
        }

        if (sidebar?.classList.contains("is-open")) {
            closeSidebar();
        }

    });
}


/* =========================================================
   PAGE NAVIGATION
========================================================= */

function setupNavigation() {

    if (addJournalButton) {
        addJournalButton.addEventListener("click", () => {
            window.location.href = "journal.html?action=new";
        });
    }


    if (emptyJournalButton) {
        emptyJournalButton.addEventListener("click", () => {
            window.location.href = "journal.html?action=new";
        });
    }


    if (manageShelvesButton) {
        manageShelvesButton.addEventListener("click", () => {
            window.location.href = "shelves.html";
        });
    }


    if (themeButton) {
        themeButton.addEventListener("click", () => {
            window.location.href = "themes.html";
        });
    }


    if (profileButton) {
        profileButton.addEventListener("click", () => {
            window.location.href = "profile.html";
        });
    }


    if (sidebarAvatar) {
        sidebarAvatar.addEventListener("click", () => {
            window.location.href = "profile.html";
        });
    }


    if (logoutButton) {
        logoutButton.addEventListener("click", handleLogout);
    }
}


/* =========================================================
   LOGOUT

   This is temporary.

   Once Supabase is connected, this function will call:

   supabase.auth.signOut()

========================================================= */

function handleLogout() {

    const shouldLogout = window.confirm(
        "Are you sure you want to sign out of Novellow?"
    );

    if (!shouldLogout) {
        return;
    }

    window.location.href = "login.html";
}


/* =========================================================
   USER DISPLAY
========================================================= */

function updateUserInterface() {

    const name = dashboardState.user.name || "Reader";

    if (welcomeName) {
        welcomeName.textContent = name;
    }

    if (sidebarUserName) {
        sidebarUserName.textContent = name;
    }


    const initial = getUserInitial(name);

    if (sidebarAvatar) {
        sidebarAvatar.textContent = initial;
    }

    if (profileAvatar) {
        profileAvatar.textContent = initial;
    }
}


function getUserInitial(name) {

    if (!name) {
        return "N";
    }

    return name
        .trim()
        .charAt(0)
        .toUpperCase();
}


/* =========================================================
   GREETING
========================================================= */

function updateGreeting() {

    const welcomeHeading = welcomeName?.parentElement;

    if (!welcomeHeading) {
        return;
    }

    const currentHour = new Date().getHours();

    let greeting = "Welcome back";

    if (currentHour >= 5 && currentHour < 12) {
        greeting = "Good morning";
    }

    else if (currentHour >= 12 && currentHour < 17) {
        greeting = "Good afternoon";
    }

    else if (currentHour >= 17 && currentHour < 22) {
        greeting = "Good evening";
    }

    else {
        greeting = "Late-night reading";
    }


    /*
        The HTML contains:

        Good afternoon,
        <span id="welcomeName">Reader</span>.

        We replace that with the current greeting.
    */

    welcomeHeading.childNodes.forEach((node) => {

        if (node.nodeType === Node.TEXT_NODE) {

            const text = node.textContent.trim();

            if (
                text.includes("Good morning") ||
                text.includes("Good afternoon") ||
                text.includes("Good evening") ||
                text.includes("Welcome back") ||
                text.includes("Late-night reading")
            ) {
                node.textContent = `${greeting}, `;
            }

        }

    });
}


/* =========================================================
   READING STATS
========================================================= */

function updateStats(stats = dashboardState.stats) {

    dashboardState.stats = {
        ...dashboardState.stats,
        ...stats
    };


    if (totalBooksStat) {
        totalBooksStat.textContent =
            dashboardState.stats.totalBooks;
    }


    if (booksFinishedStat) {
        booksFinishedStat.textContent =
            dashboardState.stats.booksFinished;
    }


    if (currentlyReadingStat) {
        currentlyReadingStat.textContent =
            dashboardState.stats.currentlyReading;
    }


    if (journalEntriesStat) {
        journalEntriesStat.textContent =
            dashboardState.stats.journalEntries;
    }
}


/* =========================================================
   READING GOAL
========================================================= */

function setupReadingGoal() {

    const savedGoal = localStorage.getItem(
        "novellowReadingGoal"
    );

    if (savedGoal) {

        const parsedGoal = Number(savedGoal);

        if (
            Number.isFinite(parsedGoal) &&
            parsedGoal > 0
        ) {
            dashboardState.readingGoal.target = parsedGoal;
        }

    }


    if (editGoalButton) {

        editGoalButton.addEventListener(
            "click",
            editReadingGoal
        );

    }
}


function editReadingGoal() {

    const currentTarget =
        dashboardState.readingGoal.target;


    const newGoal = window.prompt(
        "How many books would you like to read this year?",
        currentTarget
    );


    if (newGoal === null) {
        return;
    }


    const parsedGoal = Number(newGoal);


    if (
        !Number.isInteger(parsedGoal) ||
        parsedGoal <= 0
    ) {

        window.alert(
            "Please enter a whole number greater than zero."
        );

        return;
    }


    dashboardState.readingGoal.target = parsedGoal;


    /*
        Temporary local storage.

        Later this will be saved to the user's
        Supabase profile instead.
    */

    localStorage.setItem(
        "novellowReadingGoal",
        parsedGoal
    );


    updateReadingGoal();
}


function updateReadingGoal(
    current = dashboardState.readingGoal.current,
    target = dashboardState.readingGoal.target
) {

    current = Number(current) || 0;
    target = Number(target) || 1;


    dashboardState.readingGoal.current = current;
    dashboardState.readingGoal.target = target;


    if (booksReadCount) {
        booksReadCount.textContent = current;
    }


    if (readingGoalTarget) {
        readingGoalTarget.textContent = target;
    }


    let progress = (current / target) * 100;

    progress = Math.max(
        0,
        Math.min(progress, 100)
    );


    if (readingGoalProgress) {
        readingGoalProgress.style.width =
            `${progress}%`;
    }


    const progressContainer =
        readingGoalProgress?.parentElement;


    if (progressContainer) {

        progressContainer.setAttribute(
            "aria-valuemin",
            "0"
        );

        progressContainer.setAttribute(
            "aria-valuemax",
            String(target)
        );

        progressContainer.setAttribute(
            "aria-valuenow",
            String(current)
        );

    }


    updateReadingGoalMessage(
        current,
        target
    );
}


function updateReadingGoalMessage(
    current,
    target
) {

    if (!readingGoalMessage) {
        return;
    }


    const remaining = target - current;


    if (current === 0) {

        readingGoalMessage.textContent =
            "Your reading year is ready to begin.";

        return;
    }


    if (current >= target) {

        readingGoalMessage.textContent =
            "You reached your reading goal. Beautifully done.";

        return;
    }


    if (remaining === 1) {

        readingGoalMessage.textContent =
            "Just one more book to reach your goal.";

        return;
    }


    readingGoalMessage.textContent =
        `${remaining} books left to reach your goal.`;
}


/* =========================================================
   LIBRARY SEARCH
========================================================= */

function setupSearch() {

    if (!librarySearch) {
        return;
    }


    librarySearch.addEventListener(
        "input",
        handleLibrarySearch
    );
}


function handleLibrarySearch(event) {

    const query = event.target.value
        .trim()
        .toLowerCase();


    /*
        Books generated later should use:

        data-book-title
        data-book-author

        Example:

        <button
            class="book"
            data-book-title="Dracula"
            data-book-author="Bram Stoker"
        >
        </button>
    */

    const books =
        document.querySelectorAll("[data-book-title]");


    books.forEach((book) => {

        const title =
            book.dataset.bookTitle
                ?.toLowerCase() || "";

        const author =
            book.dataset.bookAuthor
                ?.toLowerCase() || "";


        const matchesSearch =
            title.includes(query) ||
            author.includes(query);


        book.hidden = !matchesSearch;

    });
}


/* =========================================================
   ACTIVITY
========================================================= */

function addActivity({
    title,
    description = "",
    icon = "✦"
}) {

    if (!activityList || !title) {
        return;
    }


    const activityItem =
        document.createElement("div");


    activityItem.className =
        "activity-item";


    const marker =
        document.createElement("span");


    marker.className =
        "activity-item__marker";

    marker.textContent =
        icon;


    const content =
        document.createElement("div");


    content.className =
        "activity-item__content";


    const activityTitle =
        document.createElement("strong");


    activityTitle.textContent =
        title;


    content.appendChild(
        activityTitle
    );


    if (description) {

        const activityDescription =
            document.createElement("p");

        activityDescription.textContent =
            description;

        content.appendChild(
            activityDescription
        );

    }


    activityItem.append(
        marker,
        content
    );


    activityList.prepend(
        activityItem
    );
}


/* =========================================================
   USER DATA

   Supabase will eventually call this after login.
========================================================= */

function setUser(userData = {}) {

    dashboardState.user = {
        ...dashboardState.user,
        ...userData
    };


    updateUserInterface();
}


/* =========================================================
   BOOK STATS

   Eventually this will be calculated from Supabase books.
========================================================= */

function setLibraryStats({
    totalBooks = 0,
    booksFinished = 0,
    currentlyReading = 0,
    journalEntries = 0
} = {}) {

    updateStats({
        totalBooks,
        booksFinished,
        currentlyReading,
        journalEntries
    });


    updateReadingGoal(
        booksFinished,
        dashboardState.readingGoal.target
    );
}


/* =========================================================
   BOOK ELEMENT CREATOR

   This is a starter function for later.

   We will expand this when we build actual book spines.
========================================================= */

function createBookElement(book) {

    if (!book) {
        return null;
    }


    const bookElement =
        document.createElement("button");


    bookElement.type =
        "button";


    bookElement.className =
        "book-spine";


    bookElement.dataset.bookId =
        book.id || "";


    bookElement.dataset.bookTitle =
        book.title || "";


    bookElement.dataset.bookAuthor =
        book.author || "";


    bookElement.setAttribute(
        "aria-label",
        `${book.title || "Book"} by ${book.author || "Unknown Author"}`
    );


    const title =
        document.createElement("span");


    title.className =
        "book-spine__title";


    title.textContent =
        book.title || "Untitled";


    const author =
        document.createElement("span");


    author.className =
        "book-spine__author";


    author.textContent =
        book.author || "";


    bookElement.append(
        title,
        author
    );


    bookElement.addEventListener(
        "click",
        () => {

            if (!book.id) {
                return;
            }


            window.location.href =
                `book.html?id=${encodeURIComponent(book.id)}`;

        }
    );


    return bookElement;
}


/* =========================================================
   RENDER BOOKS TO A SHELF

   Example:

   renderBooksToShelf(
       "favoritesShelf",
       books
   );
========================================================= */

function renderBooksToShelf(
    shelfId,
    books = []
) {

    const shelf =
        document.getElementById(shelfId);


    if (!shelf) {
        return;
    }


    /*
        Remove previously generated books,
        but keep our Add Book slot.
    */

    shelf
        .querySelectorAll(".book-spine")
        .forEach((book) => {
            book.remove();
        });


    books.forEach((book) => {

        const bookElement =
            createBookElement(book);


        if (!bookElement) {
            return;
        }


        const addBookSlot =
            shelf.querySelector(
                ".empty-book-slot"
            );


        if (addBookSlot) {

            shelf.insertBefore(
                bookElement,
                addBookSlot
            );

        }

        else {

            shelf.appendChild(
                bookElement
            );

        }

    });
}


/* =========================================================
   EMPTY STATE HELPERS
========================================================= */

function showElement(element) {

    if (!element) {
        return;
    }

    element.hidden = false;
}


function hideElement(element) {

    if (!element) {
        return;
    }

    element.hidden = true;
}


/* =========================================================
   NOVELLOW DASHBOARD API

   This lets our future Supabase code update the
   dashboard without rewriting this entire file.

   Example:

   NovellowDashboard.setUser({
       name: "Lauren"
   });

========================================================= */

window.NovellowDashboard = {

    state: dashboardState,

    setUser,

    setLibraryStats,

    updateStats,

    updateReadingGoal,

    openAddBookModal,

    closeModal,

    addActivity,

    createBookElement,

    renderBooksToShelf,

    openSidebar,

    closeSidebar

};
