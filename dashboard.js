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
   LIBRARY DATA
   Sample shelves until books come from the database.
   A shelf item is either a book or a piece of decor.
========================================================= */

const LIBRARY_SHELVES = {

    fantasy: [
        { title: "The Hollow Wood", author: "M. Vale", color: "#34503f", accent: "#d8b27a", motif: "sprig", style: "classic", w: 30, h: 122 },
        { title: "Small Magic", author: "Nora Bell", color: "#dca4a6", accent: "#2b1d22", motif: "cat", style: "classic", w: 44, h: 126 },
        { title: "Garden of Spells", author: "Rowan Gray", color: "#3b3560", accent: "#ecc68a", motif: "potion", style: "classic", w: 36, h: 128 },
        { title: "Moth & Moon", author: "L. Bloom", color: "#c86f7e", accent: "#f6e0b6", motif: "fleur", style: "lattice", w: 40, h: 132 },
        { title: "The Spell House", author: "Hazel Hart", color: "#2f5552", accent: "#e2b76c", motif: "diamond", style: "classic", w: 26, h: 116 },
        { title: "A Willow of Stars", author: "Elara Finch", color: "#74444f", accent: "#ecc68a", motif: "moon", style: "panel", w: 42, h: 130 },
        { title: "Crown of Ivy", author: "E. Wren", color: "#6a5486", accent: "#f0cf8a", motif: "leafvine", style: "vine", w: 42, h: 130 },
        { decor: "candle", h: 64 },
        { title: "Moonlit Pages", author: "June Avery", color: "#e6d2ac", accent: "#6e4029", motif: "star", style: "classic", w: 24, h: 118 },
        { title: "Ember & Ash", author: "A. Moore", color: "#a1493f", accent: "#f0cf8a", motif: "flower", style: "panel", w: 32, h: 126 },
        { title: "The Starling Court", author: "C. Hollow", color: "#2f3552", accent: "#e2b76c", motif: "castle", style: "lattice", w: 36, h: 124 },
        { title: "Forest Tea", author: "Ivy June", color: "#5f7d45", accent: "#f3ddb2", motif: "mushroom", style: "classic", w: 28, h: 112 },
        { title: "Velvet Night", author: "Mara Rose", color: "#5b3a52", accent: "#ecc68a", motif: "eye", style: "panel", w: 32, h: 128 },
        { title: "Rose Grimoire", author: "S. Thorn", color: "#c47f82", accent: "#3b2a2e", motif: "heart", style: "classic", w: 34, h: 118, lean: true }
    ],

    cozy: [
        { decor: "teacup", h: 50 },
        { title: "A Quiet Autumn", author: "P. Maple", color: "#b0654e", accent: "#f3ddb2", motif: "sprig", style: "classic", w: 34, h: 124 },
        { title: "Tea at Midnight", author: "Mara Rose", color: "#6a405b", accent: "#ecc68a", motif: "moon", style: "panel", w: 38, h: 130 },
        { title: "Soft Places", author: "A. Fern", color: "#9fa883", accent: "#3f3328", motif: "flower", style: "classic", w: 30, h: 116 },
        { title: "The Pink Cottage", author: "Elsie Moon", color: "#d98f9c", accent: "#fbe7d0", motif: "heart", style: "lattice", w: 40, h: 128 },
        { title: "Little Familiar", author: "R. Moss", color: "#2e4a40", accent: "#e2b76c", motif: "cat", style: "classic", w: 32, h: 122 },
        { title: "Rainy Day Reader", author: "Faye Bell", color: "#5d607c", accent: "#f0d6b6", motif: "star", style: "classic", w: 28, h: 118 },
        { title: "Coffee & Chapters", author: "Cora Lane", color: "#8c5746", accent: "#f3ddb2", motif: "candle", style: "panel", w: 36, h: 126 },
        { title: "Honey & Hearth", author: "B. Hale", color: "#c69a4a", accent: "#4a2f1e", motif: "fleur", style: "classic", w: 30, h: 120 },
        { title: "Sunday Letters", author: "Wren Fox", color: "#7b5d8c", accent: "#f0cf8a", motif: "feather", style: "vine", w: 36, h: 130 },
        { title: "The Lantern Café", author: "Iris Vane", color: "#a3564f", accent: "#f3ddb2", motif: "diamond", style: "lattice", w: 34, h: 124 },
        { title: "Wool & Wishes", author: "T. Fenn", color: "#5c6b51", accent: "#f3ddb2", motif: "star", style: "panel", w: 30, h: 120 },
        { decor: "lantern", h: 78 },
        { title: "Kind Hours", author: "M. Pell", color: "#e2cfa6", accent: "#6a405b", motif: "butterfly", style: "classic", w: 26, h: 114 }
    ],

    mystery: [
        { title: "Murder at Dusk", author: "M. Crow", color: "#283d38", accent: "#d9a45f", motif: "moon", style: "classic", w: 36, h: 128 },
        { title: "Curious Crimes", author: "A. Black", color: "#4d3434", accent: "#d6a66c", motif: "skull", style: "panel", w: 32, h: 120 },
        { decor: "skull", h: 42 },
        { title: "The Black Bird", author: "E. Hollis", color: "#dcc9a4", accent: "#1f1b22", motif: "crow", style: "classic", w: 40, h: 130 },
        { title: "A House in Fog", author: "Nell Gray", color: "#5e5870", accent: "#e8cfae", motif: "castle", style: "lattice", w: 34, h: 124 },
        { title: "The Last Lantern", author: "C. Hollow", color: "#754a38", accent: "#e8b66a", motif: "candle", style: "classic", w: 30, h: 118 },
        { title: "Crime & Curses", author: "V. Stone", color: "#2b2833", accent: "#d9b06a", motif: "eye", style: "panel", w: 38, h: 132 },
        { decor: "belljar", h: 66 },
        { title: "The Silent Key", author: "O. Lark", color: "#3f5f4f", accent: "#e8c27c", motif: "key", style: "vine", w: 32, h: 126 },
        { title: "The Raven Room", author: "D. Ashby", color: "#6e2f3e", accent: "#e8c27c", motif: "diamond", style: "classic", w: 28, h: 116 },
        { title: "Poison Garden", author: "R. Vesper", color: "#4b5d3a", accent: "#e8c27c", motif: "potion", style: "classic", w: 34, h: 126 },
        { title: "Midnight Ledger", author: "F. Quill", color: "#39304a", accent: "#d9b06a", motif: "moon", style: "lattice", w: 36, h: 122 },
        { title: "Bone Orchard", author: "I. Marsh", color: "#a3564f", accent: "#f3ddb2", motif: "skull", style: "classic", w: 26, h: 114 },
        { decor: "crow", h: 60 }
    ],

    classics: [
        { title: "Jane Eyre", author: "Charlotte Brontë", color: "#3a4f3c", accent: "#e2b76c", motif: "flower", style: "panel", w: 36, h: 128 },
        { title: "Wuthering Heights", author: "Emily Brontë", color: "#5b3a52", accent: "#e8c27c", motif: "sprig", style: "classic", w: 40, h: 132 },
        { title: "Pride and Prejudice", author: "Jane Austen", color: "#d4a4a4", accent: "#4a2f36", motif: "heart", style: "lattice", w: 38, h: 126 },
        { title: "Frankenstein", author: "Mary Shelley", color: "#2f3552", accent: "#d9b06a", motif: "star", style: "classic", w: 30, h: 122 },
        { decor: "bust", h: 74 },
        { title: "Little Women", author: "Louisa May Alcott", color: "#b0654e", accent: "#f3ddb2", motif: "feather", style: "classic", w: 34, h: 120 },
        { title: "Dracula", author: "Bram Stoker", color: "#4a2230", accent: "#e2b76c", motif: "castle", style: "panel", w: 36, h: 130 },
        { title: "The Secret Garden", author: "Frances Hodgson Burnett", color: "#6d8a5a", accent: "#f6e6c4", motif: "leafvine", style: "vine", w: 34, h: 126 },
        { title: "Emma", author: "Jane Austen", color: "#e6d2ac", accent: "#7a4a30", motif: "butterfly", style: "classic", w: 26, h: 114 },
        { title: "Persuasion", author: "Jane Austen", color: "#6a5486", accent: "#f0cf8a", motif: "fleur", style: "lattice", w: 30, h: 122 },
        { title: "Great Expectations", author: "Charles Dickens", color: "#2f5552", accent: "#e2b76c", motif: "key", style: "classic", w: 34, h: 126 },
        { title: "Anne of Green Gables", author: "L. M. Montgomery", color: "#c86f7e", accent: "#fbe7d0", motif: "flower", style: "panel", w: 32, h: 120 },
        { decor: "plant", h: 76 }
    ]

};


/*
    Decor drawings and their viewBox proportions.
*/

const SHELF_DECOR = {
    candle: "0 0 40 90",
    lantern: "0 0 50 92",
    teacup: "0 0 56 58",
    skull: "0 0 52 48",
    belljar: "0 0 50 72",
    crow: "0 0 64 66",
    bust: "0 0 48 76",
    plant: "0 0 60 78",
    potion: "0 0 40 64"
};


/*
    Spine motif proportions, used to size each drawing.
*/

const SPINE_MOTIFS = {
    moon: "0 0 20 20",
    star: "0 0 20 20",
    cat: "0 0 20 28",
    potion: "0 0 20 26",
    sprig: "0 0 20 40",
    flower: "0 0 20 20",
    key: "0 0 16 40",
    skull: "0 0 20 20",
    crow: "0 0 24 22",
    mushroom: "0 0 20 20",
    heart: "0 0 20 20",
    butterfly: "0 0 24 20",
    castle: "0 0 24 26",
    candle: "0 0 14 28",
    feather: "0 0 16 34",
    eye: "0 0 24 16",
    fleur: "0 0 20 26",
    diamond: "0 0 20 28",
    leafvine: "0 0 16 60"
};


const SVG_NS =
    "http://www.w3.org/2000/svg";


/* =========================================================
   RENDER SHELVES
========================================================= */

function renderLibrary() {

    document
        .querySelectorAll(".shelf-books[data-shelf]")
        .forEach((shelf) => {

            const items =
                LIBRARY_SHELVES[shelf.dataset.shelf] || [];

            shelf.replaceChildren(
                ...items.map((item) =>
                    item.decor
                        ? createDecor(item)
                        : createSpine(item)
                )
            );

        });

}


function createSvgUse(symbolId, viewBox, className) {

    const svg =
        document.createElementNS(SVG_NS, "svg");

    svg.setAttribute("viewBox", viewBox);
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("class", className);

    const use =
        document.createElementNS(SVG_NS, "use");

    use.setAttribute("href", `#${symbolId}`);

    svg.appendChild(use);

    return svg;

}


function createDecor(item) {

    const decor =
        createSvgUse(
            `decor-${item.decor}`,
            SHELF_DECOR[item.decor],
            "shelf-decor"
        );

    decor.style.setProperty(
        "--h",
        `${item.h}px`
    );

    return decor;

}


function createMotif(name, size = "") {

    return createSvgUse(
        `motif-${name}`,
        SPINE_MOTIFS[name],
        `spine-motif ${size}`.trim()
    );

}


function createSpine(book) {

    const spine =
        document.createElement("button");

    spine.type = "button";

    spine.className =
        `book-spine spine--${book.style}`;

    if (book.lean) {
        spine.classList.add("book-spine--lean");
    }

    spine.dataset.bookTitle = book.title;
    spine.dataset.bookAuthor = book.author;

    if (book.cover) {
        spine.dataset.cover = book.cover;
    }

    spine.setAttribute(
        "aria-label",
        `${book.title} by ${book.author}`
    );

    spine.style.setProperty("--book-color", book.color);
    spine.style.setProperty("--book-accent", book.accent);
    spine.style.setProperty("--w", `${book.w}px`);
    spine.style.setProperty("--h", `${book.h}px`);


    const topBand =
        document.createElement("span");

    topBand.className =
        "spine-band spine-band--dotted";

    const bottomBand =
        topBand.cloneNode();


    const core =
        document.createElement("span");

    core.className = "spine-core";


    if (book.style === "vine") {

        core.appendChild(
            createMotif(book.motif, "spine-motif--tall")
        );

        spine.append(topBand, core, bottomBand);

    }

    else if (book.style === "classic") {

        spine.append(
            topBand,
            createMotif("star", "spine-motif--small"),
            createMotif(book.motif),
            createMotif("star", "spine-motif--small"),
            bottomBand
        );

    }

    else {

        core.appendChild(
            createMotif(book.motif)
        );

        spine.append(topBand, core, bottomBand);

    }


    const tag =
        document.createElement("span");

    tag.className = "spine-tag";

    tag.setAttribute("aria-hidden", "true");

    tag.textContent = book.title;

    const byline =
        document.createElement("small");

    byline.textContent = book.author;

    tag.appendChild(byline);

    spine.appendChild(tag);

    return spine;

}


/* =========================================================
   IVY
   Leaves are grown along each .ivy-stem path so vines
   look hand-placed but stay light in the markup.
========================================================= */

const IVY_LEAF =
    "M0 0C-2-2-6-2-8-4C-6-6-7-9-9-11C-5-11-3-10-2-9C-2-12-1-15 0-17C1-15 2-12 2-9C3-10 5-11 9-11C7-9 6-6 8-4C6-2 2-2 0 0Z";

const IVY_VEINS =
    "M0 0V-14M0-5L-6-9M0-5L6-9";

const IVY_COLORS = [
    "#3e5a36",
    "#4f6b3c",
    "#5f7d45",
    "#6f8b4e",
    "#7f9c56"
];


function seededRandom(seed) {

    let value = seed;

    return () => {

        value =
            (value * 16807) % 2147483647;

        return (value - 1) / 2147483646;

    };

}


function growIvy() {

    document
        .querySelectorAll("svg.ivy")
        .forEach((ivy) => {

            const random =
                seededRandom(
                    Number(ivy.dataset.seed) || 7
                );

            const spacing =
                Number(ivy.dataset.density) || 14;

            const leafSize =
                Number(ivy.dataset.leafSize) || 0.75;

            const leaves =
                document.createElementNS(SVG_NS, "g");

            ivy
                .querySelectorAll(".ivy-stem")
                .forEach((stem) => {

                    const length =
                        stem.getTotalLength();

                    let side = 1;

                    for (
                        let distance = 4;
                        distance < length - 2;
                        distance += spacing * (0.75 + random() * 0.5)
                    ) {

                        const point =
                            stem.getPointAtLength(distance);

                        const ahead =
                            stem.getPointAtLength(
                                Math.min(length, distance + 1)
                            );

                        const heading =
                            Math.atan2(
                                ahead.y - point.y,
                                ahead.x - point.x
                            ) * 180 / Math.PI;

                        const angle =
                            heading +
                            side * (55 + random() * 45);

                        const scale =
                            leafSize * (0.7 + random() * 0.55);

                        const color =
                            IVY_COLORS[
                                Math.floor(random() * IVY_COLORS.length)
                            ];

                        const leaf =
                            document.createElementNS(SVG_NS, "g");

                        leaf.setAttribute(
                            "transform",
                            `translate(${point.x.toFixed(1)} ${point.y.toFixed(1)}) rotate(${(angle + 90).toFixed(1)}) scale(${scale.toFixed(2)})`
                        );

                        leaf.innerHTML =
                            `<path d="M0 0V-3" stroke="#4a5a2c" stroke-width="1.4" />` +
                            `<path d="${IVY_LEAF}" transform="translate(0 -2)" fill="${color}" stroke="#22301c" stroke-width="0.9" stroke-linejoin="round" />` +
                            `<path d="${IVY_VEINS}" transform="translate(0 -2)" fill="none" stroke="#a9bf7a" stroke-width="0.6" stroke-opacity="0.55" />`;

                        leaves.appendChild(leaf);

                        side *= -1;

                    }

                });

            ivy.appendChild(leaves);

        });

}


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


    /*
        Start with the book currently being read
        pulled from the shelf.
    */

    const currentBook =
        [...books].find((book) =>
            book.dataset.bookTitle === "A Willow of Stars"
        ) || books[0];

    selectBook(
        currentBook,
        { quiet: true }
    );

}


/* =========================================================
   JOURNAL CONTROLS
========================================================= */

function setupJournalControls() {

    document
        .querySelector(".journal-arrow--left")
        ?.addEventListener(
            "click",
            () => stepBook(-1)
        );


    document
        .querySelector(".journal-arrow--right")
        ?.addEventListener(
            "click",
            () => stepBook(1)
        );


    const tabs =
        document.querySelectorAll(".journal-tab");

    tabs.forEach((tab) => {

        tab.addEventListener(
            "click",
            () => {

                tabs.forEach((item) => {

                    const active =
                        item === tab;

                    item.classList.toggle(
                        "journal-tab--active",
                        active
                    );

                    item.setAttribute(
                        "aria-selected",
                        String(active)
                    );

                });

            }
        );

    });

}


function stepBook(direction) {

    const books =
        [...document.querySelectorAll(".book-spine")]
            .filter((book) => book.style.display !== "none");

    if (!books.length) {
        return;
    }


    const current =
        books.findIndex((book) =>
            book.classList.contains("is-selected")
        );

    const next =
        (current + direction + books.length) % books.length;

    selectBook(books[next]);

}


function selectBook(book, options = {}) {

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
        Tint the illustrated cover with the book's color.
    */

    journalCoverPlaceholder?.style.setProperty(
        "--cover-sky",
        book.style.getPropertyValue("--book-color")
    );


    if (options.quiet) {
        return;
    }


    /*
        Animate journal opening.
    */

    animateJournal();


    /*
        On smaller screens, bring the journal
        into view after selecting a book.
    */

    if (window.innerWidth < 1180) {

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


/* =========================================================
   INITIALIZE
========================================================= */

/*
    dashboard.js is injected after the page parses, so
    DOMContentLoaded may already have fired by now.
    This runs last so every constant above is defined.
*/

function initDashboard() {

    renderLibrary();
    growIvy();

    setupSidebar();
    setupBookInteractions();
    setupJournalControls();
    setupModal();
    setupSearch();

}


if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        initDashboard
    );

}

else {

    initDashboard();

}
