/* =========================================================
   NOVELLOW
   DASHBOARD INTERACTIONS
========================================================= */

"use strict";


/* =========================================================
   ELEMENTS
========================================================= */

const sidebar =
    document.getElementById("sidebar");

const sidebarCollapse =
    document.getElementById("sidebarCollapse");

const mobileOverlay =
    document.getElementById("mobileOverlay");

const menuButton =
    document.getElementById("menuButton");

const addBookButton =
    document.getElementById("addBookButton");

const addBookModal =
    document.getElementById("addBookModal");

const journalBook =
    document.getElementById("journalBook");

const journalBookTitle =
    document.getElementById("journalBookTitle");

const journalBookAuthor =
    document.getElementById("journalBookAuthor");

const journalCoverTitle =
    document.getElementById("journalCoverTitle");

const journalCoverAuthor =
    document.getElementById("journalCoverAuthor");

const journalCoverImage =
    document.getElementById("journalCoverImage");

const journalCoverPlaceholder =
    document.getElementById("journalCoverPlaceholder");

const librarySearch =
    document.getElementById("librarySearch");


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        setupSidebar();
        setupBookInteractions();
        setupModal();
        setupSearch();

    }
);


/* =========================================================
   SIDEBAR
========================================================= */

function setupSidebar() {

    if (sidebarCollapse) {

        sidebarCollapse.addEventListener(
            "click",
            toggleSidebarCollapse
        );

    }


    if (menuButton) {

        menuButton.addEventListener(
            "click",
            openMobileSidebar
        );

    }


    if (mobileOverlay) {

        mobileOverlay.addEventListener(
            "click",
            closeMobileSidebar
        );

    }


    const savedSidebarState =
        localStorage.getItem(
            "novellowSidebarCollapsed"
        );


    if (savedSidebarState === "true") {

        sidebar?.classList.add(
            "is-collapsed"
        );

        document.body.classList.add(
            "sidebar-collapsed"
        );

    }

}


function toggleSidebarCollapse() {

    if (!sidebar) {
        return;
    }


    const collapsed =
        sidebar.classList.toggle(
            "is-collapsed"
        );


    document.body.classList.toggle(
        "sidebar-collapsed",
        collapsed
    );


    localStorage.setItem(
        "novellowSidebarCollapsed",
        String(collapsed)
    );

}


function openMobileSidebar() {

    sidebar?.classList.add(
        "is-open"
    );


    mobileOverlay?.classList.add(
        "is-active"
    );


    mobileOverlay?.setAttribute(
        "aria-hidden",
        "false"
    );

}


function closeMobileSidebar() {

    sidebar?.classList.remove(
        "is-open"
    );


    mobileOverlay?.classList.remove(
        "is-active"
    );


    mobileOverlay?.setAttribute(
        "aria-hidden",
        "true"
    );

}


/* =========================================================
   BOOK INTERACTION
========================================================= */

function setupBookInteractions() {

    const books =
        document.querySelectorAll(
            ".book-spine"
        );


    books.forEach((book) => {

        book.addEventListener(
            "click",
            () => {

                selectBook(book);

            }
        );

    });

}


function selectBook(book) {

    if (!book) {
        return;
    }


    /*
        Pull selected book from shelf.
    */

    document
        .querySelectorAll(".book-spine")
        .forEach((item) => {

            item.classList.remove(
                "is-selected"
            );

        });


    book.classList.add(
        "is-selected"
    );


    /*
        Read book information.
    */

    const title =
        book.dataset.bookTitle ||
        "Untitled";

    const author =
        book.dataset.bookAuthor ||
        "Unknown Author";

    const cover =
        book.dataset.cover || "";


    /*
        Update open journal.
    */

    if (journalBookTitle) {
        journalBookTitle.textContent =
            title;
    }


    if (journalBookAuthor) {

        journalBookAuthor.textContent =
            `by ${author}`;

    }


    if (journalCoverTitle) {
        journalCoverTitle.textContent =
            title;
    }


    if (journalCoverAuthor) {
        journalCoverAuthor.textContent =
            author;
    }


    /*
        Real cover images will eventually
        come from the database.
    */

    if (cover && journalCoverImage) {

        journalCoverImage.src =
            cover;

        journalCoverImage.alt =
            `${title} book cover`;

        journalCoverImage.hidden =
            false;


        if (journalCoverPlaceholder) {

            journalCoverPlaceholder.hidden =
                true;

        }

    }

    else {

        if (journalCoverImage) {

            journalCoverImage.hidden =
                true;

        }


        if (journalCoverPlaceholder) {

            journalCoverPlaceholder.hidden =
                false;

        }

    }


    /*
        Animate journal opening.
    */

    animateJournal();


    /*
        On smaller screens, bring the journal
        into view after selecting a book.
    */

    if (window.innerWidth < 1050) {

        journalBook?.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }

}


function animateJournal() {

    if (!journalBook) {
        return;
    }


    journalBook.classList.remove(
        "is-changing"
    );


    void journalBook.offsetWidth;


    journalBook.classList.add(
        "is-changing"
    );


    window.setTimeout(
        () => {

            journalBook.classList.remove(
                "is-changing"
            );

        },
        600
    );

}


/* =========================================================
   SEARCH
========================================================= */

function setupSearch() {

    if (!librarySearch) {
        return;
    }


    librarySearch.addEventListener(
        "input",
        handleSearch
    );

}


function handleSearch(event) {

    const query =
        event.target.value
            .trim()
            .toLowerCase();


    const books =
        document.querySelectorAll(
            ".book-spine"
        );


    books.forEach((book) => {

        const title =
            book.dataset.bookTitle
                ?.toLowerCase() || "";

        const author =
            book.dataset.bookAuthor
                ?.toLowerCase() || "";


        const matches =
            title.includes(query) ||
            author.includes(query);


        book.style.display =
            matches
                ? ""
                : "none";

    });

}


/* =========================================================
   ADD BOOK MODAL
========================================================= */

function setupModal() {

    if (addBookButton) {

        addBookButton.addEventListener(
            "click",
            openAddBookModal
        );

    }


    document
        .querySelectorAll(
            "[data-close-modal]"
        )
        .forEach((button) => {

            button.addEventListener(
                "click",
                closeAddBookModal
            );

        });


    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {

                closeAddBookModal();
                closeMobileSidebar();

            }

        }
    );

}


function openAddBookModal() {

    if (!addBookModal) {
        return;
    }


    addBookModal.classList.add(
        "is-open"
    );


    addBookModal.setAttribute(
        "aria-hidden",
        "false"
    );

}


function closeAddBookModal() {

    if (!addBookModal) {
        return;
    }


    addBookModal.classList.remove(
        "is-open"
    );


    addBookModal.setAttribute(
        "aria-hidden",
        "true"
    );

}
