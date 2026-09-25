/* =========================================================
   NOVELLOW
   CONFIGURATION

   The ONE place for project settings. Every page reads from
   here; nothing else hardcodes these values.
========================================================= */


/* ---------------------------------------------------------
   SUPABASE
   The publishable (anon) key is safe in browser code: it only
   identifies the project. Row Level Security in the database
   is what protects each reader's library.

   Never put a secret / service_role key here.
--------------------------------------------------------- */

export const SUPABASE_URL = "https://idqlbfckdggsvmiktwuq.supabase.co";

export const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkcWxiZmNrZGdnc3ZtaWt0d3VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAyNjk4MDgsImV4cCI6MjEwNTg0NTgwOH0.eb2_q2yzAkhQBFlEIqaH-M2CVYiYa7l7ZOCVwcilL30";

export const COVER_BUCKET = "book-covers";


/* ---------------------------------------------------------
   VERSION
   Replaced with the commit id by .github/workflows/pages.yml
   on every deploy, so browsers fetch fresh files.
--------------------------------------------------------- */

export const APP_VERSION = "__VERSION__";


/* ---------------------------------------------------------
   LIBRARY
--------------------------------------------------------- */

// A wooden shelf row holds about this many books before a
// new row is added beneath it.
export const SHELF_ROW_CAPACITY = 10;

export const READING_STATUSES = [
    { id: "want_to_read", label: "Want to Read", short: "To Be Read" },
    { id: "reading", label: "Currently Reading", short: "Reading" },
    { id: "paused", label: "Paused", short: "Paused" },
    { id: "finished", label: "Finished", short: "Finished" },
    { id: "dnf", label: "Did Not Finish", short: "DNF" },
    { id: "reference", label: "Reference", short: "Reference" }
];

export const SHELF_STYLES = [
    { id: "classic_wood", label: "Classic Wood" },
    { id: "dark_oak", label: "Dark Oak" },
    { id: "walnut", label: "Walnut" },
    { id: "painted", label: "Painted" },
    { id: "floating", label: "Floating Shelf" }
];

export const SHELF_SORTS = [
    { id: "manual", label: "My own order" },
    { id: "title", label: "Title" },
    { id: "author", label: "Author" },
    { id: "rating", label: "Rating" },
    { id: "date_added", label: "Date added" },
    { id: "date_finished", label: "Date finished" }
];


/* ---------------------------------------------------------
   SETTINGS DEFAULTS
   Mirrors the defaults in sql/schema.sql.
--------------------------------------------------------- */

export const DEFAULT_SETTINGS = {
    theme: "original",
    candle_glow: true,
    dust: true,
    rain: null,
    oddities: true,
    reduced_motion: false,
    decoration_density: "cozy",
    default_shelf_sort: "manual",
    annual_goal: 20
};


/* ---------------------------------------------------------
   COVERS
--------------------------------------------------------- */

export const COVER_MAX_HEIGHT = 900;

export const COVER_MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

export const COVER_URL_LIFETIME_SECONDS = 60 * 60;


/* ---------------------------------------------------------
   EXPORT FORMAT
--------------------------------------------------------- */

export const EXPORT_FORMAT = "novellow-library";

export const EXPORT_FORMAT_VERSION = 1;


/* ---------------------------------------------------------
   WHICH COPY OF NOVELLOW THIS IS
   Leave empty on the real site. Any text here (for example
   "Test copy") shows as a ribbon on every page.
--------------------------------------------------------- */

export const SITE_LABEL = "";
