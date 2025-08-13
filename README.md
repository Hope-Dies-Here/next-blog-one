# Next Blog – Plug-and-Play Next.js Blog Feature

A plug-and-play Next.js blog feature for instant integration into any Next.js project.  
Easily set up a `/blog` route with PostgreSQL backend, Tailwind CSS styling, and public assets using a single command.

---

## Features

- **Instant `/blog` route**: All pages, components, and API routes are set up for you.
- **PostgreSQL backend**: Automatic schema creation and ready-to-use CRUD endpoints.
- **Tailwind CSS**: Modern styling out of the box.
- **Public assets**: Images and SVGs included.
- **No root file conflicts**: Does not overwrite your existing `layout.js` or `page.js`.

---

## Installation & Usage

### 1. Install 

```bash
npm i @hope-dies-here/next-blog-one
```

Then 

```bash
npx next-blog init
```

- By default, this copies the blog feature into your project's `app` or `src/app` folder (auto-detected).
- To force a specific target, use:
  - `npx next-blog init --app` (for `/app`)
  - `npx next-blog init --src` (for `/src/app`)

### 2. What Gets Added

- `/app/blog` or `/src/app/blog` – Blog pages and components
- `/app/api/blog-posts` – API routes for blog CRUD
- `/app/styles` – Blog and global CSS
- `/app/lib` – Database connection
- `/public` – Blog assets (images, SVGs, etc.)

### 3. Required Dependencies

When you install the package, these dependencies are automatically installed:

- `pg` (PostgreSQL client)
- `tailwindcss`, `postcss`, `autoprefixer` (for styling)

### 4. Database Setup

Set your PostgreSQL connection string in your environment:

```env
DATABASE_URL=postgres://user:password@host:port/database
```

The schema is created automatically on first run.

### 5. Access Your Blog

Visit `/blog` in your Next.js project to see your new blog in action!

---

## Customization

- Edit `/blog/page.jsx` and components in `/blog` and `/components` as needed.
- Add or modify assets in `/public`.
- API routes are in `/api/blog-posts`.

---

## Notes

- **No root files are overwritten**: Your existing `layout.js` and `page.js` remain untouched.
- **Safe for existing projects**: Only adds the `/blog` feature and its dependencies.

---

## Uninstall

To remove, simply delete the `/blog`, `/api/blog-posts`, `/styles`, `/lib`, and any assets added to `/public`.

---

## License

MIT

---

## Author

name.Random()