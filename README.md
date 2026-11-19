# FounderFlow CRM

FounderFlow is a lightweight CRM for startup founders. It helps a small team keep track of
leads, see which ones need a follow-up, and review a simple dashboard of their pipeline.

It is the training project of the **NumericSlick Product Engineering Bootcamp**.

> **Training project.** FounderFlow uses fictional sample data only. There is no login,
> no database, and no external service. Adding or removing a lead only changes the copy
> in your browser, so nothing is saved when you reload the page.

> **Status: setup guide only.** The application source code will be published to this
> repository before your session. Until then, `npm install` and `npm run dev` will not work
> here. Make sure your computer meets the system requirements below so you are ready.

---

## Technology stack

| Part | Tool |
|---|---|
| Framework | [Next.js](https://nextjs.org/) 16 (App Router) |
| UI library | React 19 |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS 4 |
| Code quality | ESLint 9 |
| Package manager | npm |

---

## System requirements

- **Node.js 20.9 or newer.** The LTS version from [nodejs.org](https://nodejs.org/) is a good choice.
- **npm**, which is installed together with Node.js.
- **Git**, to clone the repository ([git-scm.com](https://git-scm.com/)).
- A code editor. [VS Code](https://code.visualstudio.com/) is recommended.
- A modern browser (Chrome, Edge, Firefox or Safari).

Check what you have installed:

```bash
node -v    # should print v20.9.0 or higher
npm -v
git --version
```

---

## Getting started

### 1. Clone the repository

```bash
git clone https://github.com/BilalMaarbani/founder-flow.git
cd founder-flow
```

### 2. Install dependencies

```bash
npm install
```

This downloads everything listed in `package.json` into a `node_modules` folder.
It can take a minute or two the first time.

### 3. Start the development server

```bash
npm run dev
```

Wait until the terminal shows a line like `Ready in ...`.

### 4. Open the app in your browser

Go to **http://localhost:3000**

You should see the FounderFlow Dashboard. Use the navigation bar to move between pages.

To stop the server, go back to the terminal and press `Ctrl + C`.

---

## Available npm scripts

| Command | What it does |
|---|---|
| `npm run dev` | Starts the development server at http://localhost:3000 with hot reload. |
| `npm run build` | Creates an optimized production build. |
| `npm run start` | Serves the production build. Run `npm run build` first. |
| `npm run lint` | Checks the code with ESLint. |
| `npm run typecheck` | Checks TypeScript types without producing output (`tsc --noEmit`). |
| `npm run lab:day1` | Runs the Day 1 TypeScript lab in the terminal. |

---

## Project structure

```
src/
  app/                 Pages and routes (the Dashboard is at "/")
    api/leads/         GET /api/leads returns the sample leads as JSON
    leads/             Leads pages
  components/          Reusable UI components
    leads/             Dashboard leads: state, form, filter, list, summary
  labs/day01/          Day 1 TypeScript lab
```

---

## Troubleshooting

**`node: command not found` or `npm: command not found`**
Node.js is not installed, or your terminal was opened before you installed it.
Install Node.js, then close and reopen the terminal.

**`npm install` reports an unsupported engine, or the app fails to start with syntax errors**
Your Node.js version is too old. Run `node -v` and upgrade to 20.9 or newer.

**`Port 3000 is in use`**
Another program is already using port 3000. Next.js will usually pick the next free port
(for example 3001). Read the URL printed in the terminal and open that one.
You can also stop the other program, or run `npm run dev -- -p 3001`.

**`npm install` fails with `EACCES` or permission errors**
Do not use `sudo`. Make sure the project folder is inside your user folder
(for example Desktop or Documents), not a system folder.

**`npm install` fails with network or `ETIMEDOUT` errors**
Check your internet connection and try again. If you are behind a company or school proxy,
ask your instructor for help.

**Strange errors after pulling new changes**
Delete the `node_modules` folder and the `.next` folder, then run `npm install` again.

```bash
rm -rf node_modules .next     # macOS / Linux
npm install
```

On Windows (PowerShell):

```powershell
Remove-Item -Recurse -Force node_modules, .next
npm install
```

**The page is blank or shows an error**
Look at the terminal where `npm run dev` is running and at the browser console
(press `F12`, then open the **Console** tab). The error message there tells you where to look.

---

Built for the NumericSlick Product Engineering Bootcamp.
