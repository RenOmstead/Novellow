# Connecting Novellow to Supabase

Novellow's code already points at your Supabase project
(`js/config.js`). This guide sets up the project itself so
sign-ups, books, journals and covers are saved. It takes about
ten minutes and is done once.

You'll need the Supabase dashboard for your project
(`idqlbfckdggsvmiktwuq`) and the GitHub repository settings.

---

## 1. Create the tables, security rules and cover storage

In Supabase, open **SQL Editor** → **New query**. Run these four
files from the `sql/` folder, **in this order**. For each one, paste the
whole file into the editor and select **Run**:

1. `sql/schema.sql`: the tables (profiles, settings, shelves, books,
   journal sections, quotes, words, reviews, challenges, decorations,
   the sign-in log), plus the trigger that creates a profile for every
   new account.
2. `sql/policies.sql`: Row Level Security. Every table only lets a
   signed-in reader see and change their own rows.
3. `sql/storage.sql`: the private `book-covers` bucket and its rules.
   Each reader can only reach the covers in their own folder.
4. `sql/community.sql`: friends, shared shelves, book clubs and buddy
   reads. Shelves are private unless a reader turns sharing on, and then
   only their friends can see them. Journals, notes, quotes and words are
   never shared. It's safe to run again.
5. `sql/account.sql`: lets readers delete their own account (Settings →
   Delete my account), which deletes everything in it. It's safe to run
   again.
6. `sql/notes.sql`: the "What's new" list and readers' notes on the About
   Novellow page. It's safe to run again. Add updates in **Table Editor**
   → `site_updates`; read notes in `reader_notes`, where you can set a
   `status` (seen, planned, done, not_planned) and a `reply` that the
   reader sees.
7. `sql/notes-inbox.sql`: the Novellow account's notes inbox. First
   create an account on the site with novellow.contact@gmail.com and
   confirm it, then run this file. It makes that account the one that
   sees every reader's note on About Novellow. It's safe to run again.
8. `sql/public.sql`: who can visit a library (only me, friends, or
   everyone aged 18 and over), the public library page, and reporting,
   blocking and hiding. It's safe to run again.
9. `sql/wall.sql`: lets decorations sit anywhere on the wall, up to the
   ceiling and out across the floor. It's safe to run again.

Each should finish with "Success. No rows returned". If one shows an
error, stop there and send me the message.

**Check:** in **Table Editor**, every table should show a green
"RLS enabled" label. In **Storage**, you should see a `book-covers`
bucket marked Private.

## 2. Turn on email confirmation and set the addresses

In **Authentication** → **Sign In / Providers** → **Email**:

- **Enable Email provider**: on
- **Confirm email**: on

In **Authentication** → **URL Configuration**:

- **Site URL**: `https://novellow.com/`
- **Redirect URLs**: add `https://novellow.com/**` (and
  `https://www.novellow.com/**` if you use the www address too)

These addresses are where the confirmation and password-reset emails
send people back to. If they're wrong, the email links won't work.

Optional: under **Authentication** → **Email Templates** you can reword
the "Confirm signup" and "Reset password" emails. Keep the
`{{ .ConfirmationURL }}` link in each one.

> Supabase's built-in email service only sends a few emails an hour.
> That's fine for you and a few friends. For more readers, add your own
> email service under **Authentication** → **Emails** → **SMTP Settings**.

## 3. Publish with Cloudflare Pages

1. In Cloudflare, open **Workers & Pages** → **Create** → **Pages** tab →
   **Import an existing Git repository** (not "Create a Worker"), and
   choose the `Novellow` repository.
2. Set up the build:
   - **Project name**: `novellow`
   - **Production branch**: `main`
   - **Framework preset**: None
   - **Build command**: `bash build.sh`
   - **Build output directory**: `_site`
3. **Save and Deploy**. After that, every merge into `main` publishes
   the site. `build.sh` stamps each file with the commit ID so browsers
   always load the newest version, and publishes only the site (not
   `sql/` or `docs/`). Pages shows `404.html` for addresses that don't
   exist.
4. In the project, open **Custom domains** → **Set up a custom domain**,
   enter `novellow.com` and follow the steps (then `www.novellow.com` if
   you want it). If the domain's DNS is already on this Cloudflare
   account, Cloudflare adds the record for you. If it says a record
   already exists, delete that record under the domain's **DNS** →
   **Records** (for example the old GitHub Pages ones) and try again.

The site will be at <https://novellow.com/>.

GitHub Pages is kept as a backup and no longer publishes on its own.
To publish there by hand, open **Actions** → **Publish to GitHub
Pages** → **Run workflow**.

## 4. Try it

1. Open the site and choose **Create an account**.
2. Confirm the email, then sign in. You'll arrive at an empty bookcase.
3. Add a book with a cover picture, open it, and write a note.
4. In Supabase → **Table Editor** → `sign_in_events`, each sign-in
   appears with its time and browser. That's the sign-in history. Each
   reader also sees their own under **Settings** → **Recent sign-ins**.

## Keys: what's safe where

- `js/config.js` holds the project URL and the **anon (public) key**.
  That key is meant to be in the browser. It can only do what the Row
  Level Security rules allow, which is a signed-in reader working with
  their own rows.
- The **service_role** key must **never** go in this repository or any
  browser code. Novellow doesn't use it.

## Moving to a different Supabase project later

Change the two values in `js/config.js` (`SUPABASE_URL` and
`SUPABASE_PUBLISHABLE_KEY`) and run steps 1–2 on the new project. Nothing
else in the code mentions the project.
