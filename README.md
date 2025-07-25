# Vite React Boilerplate

![](/public/vite-react-boilerplate.png)

Everything you need to kick off your next Vite + React web app!

---

## Table of Contents

- [Overview](#overview)
- [Features & Functionality](#features--functionality)
- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [Important Note](#important-note)
- [Testing](#testing)
- [Preparing for Deployment](#preparing-for-deployment)
- [DevTools](#devtools)
- [Installed Packages](#installed-packages)

---

## Overview

Built with type safety, scalability, and developer experience in mind. A batteries included Vite + React template.

- [pnpm](https://pnpm.io) - A strict and efficient alternative to npm with up to 3x faster performance
- [TypeScript](https://www.typescriptlang.org) - A typed superset of JavaScript designed with large scale applications in mind
- [ESLint](https://eslint.org) - Static code analysis to help find problems within a codebase
- [Prettier](https://prettier.io) - An opinionated code formatter
- [Vite](https://vitejs.dev) - Feature rich and highly optimized frontend tooling with TypeScript support out of the box
- [React](https://react.dev) - A modern front-end JavaScript library for building user interfaces based on components
- [Tailwind CSS](https://tailwindcss.com) - A utility-first CSS framework packed with classes to build any web design imaginable
- [TanStack Router](https://tanstack.com/router/v1) - Fully typesafe, modern and scalable routing for React applications
- [TanStack Query](https://tanstack.com/query/latest) - Declarative, always-up-to-date auto-managed queries and mutations
- [TanStack Table](https://tanstack.com/table/v8) - Headless UI for building powerful tables & datagrids
- [Zustand](https://zustand-demo.pmnd.rs) - An unopinionated, small, fast and scalable bearbones state-management solution
- [React Hook Form](https://react-hook-form.com) - Performant, flexible and extensible forms with easy-to-use validation
- [Zod](https://zod.dev) - TypeScript-first schema validation with static type inference
- [React Testing Library](https://testing-library.com) - A very light-weight, best practice first, solution for testing React components
- [Vitest](https://vitest.dev) - A blazing fast unit test framework powered by Vite
- [Playwright](https://playwright.dev) - Enables reliable end-to-end testing for modern web apps
- [Nivo](https://nivo.rocks) - A rich set of data visualization components, built on top of D3 and React
- [react-i18next](https://react.i18next.com/) - A powerful internationalization framework for React/React Native based on i18next
- [Faker](https://fakerjs.dev/) - Generate massive amounts of fake (but realistic) data for testing and development
- [Dayjs](https://day.js.org/en/) - A minimalist JavaScript library that parses, validates, manipulates, and displays dates and times for modern browsers
- [Husky](https://github.com/typicode/husky#readme) + [Commitizen](https://github.com/commitizen/cz-cli#readme) + [Commitlint](https://github.com/conventional-changelog/commitlint#readme) - Git hooks and commit linting to ensure use of descriptive and practical commit messages
- [ts-reset](https://github.com/total-typescript/ts-reset#readme) - Improvements for TypeScripts built-in typings for use in applications
- [Docker](https://www.docker.com) - Containerization tool for deploying your vite-react-boilerplate app

A more detailed list of the included packages can be found in the [Installed Packages](#installed-packages) section. Packages not shown above include Devtools, ui helper libraries, and eslint plugins/configs.

---

## Features & Functionality

This boilerplate has evolved to support modern, scalable, and production-ready web apps with a focus on enterprise patterns and best practices.

### **Authentication & Authorization**

- **Auth with JWT tokens, refresh tokens, and persisted user state** using Zustand & localStorage.
- **Role-Based Access Control (RBAC)** via `withAuth` HOC: secure routes/pages by user roles (e.g. "USER", "ADMIN").
- **Login & Registration** forms built with React Hook Form and Zod, with validation, error handling, and global loading states.
- **Multi-language (i18n)** support for auth flows.

### **Dashboard & Page Structure**

- **Dashboard Home** with:
  - **Tab-based navigation**: switch between "List" and "Map" views.
  - **Vehicle List**: Table with stats, status badge, skeleton loading, and error handling.
  - **Vehicle Map**: Interactive map (MapLibre) showing vehicle pins, detail popups, and responsive sidebar/bottom sheet vehicle list.
- **Vehicle Detail Page** (`/vehicle/:id`):
  - **Detail telemetry**: Speed, fuel, odometer, time, and location.
  - **Map**: Non-interactive (fixed) map showing the vehicle position.
  - **Multi-metric chart**: Recharts line chart displaying normalized speed, fuel, and odometer in one graph, with real values on hover.

### **Dark Mode**

- **Global dark mode toggle** (with Zustand persist), full Tailwind dark theme, and shadcn/ui component support.

### **Atomic, Reusable UI Components**

- **shadcn/ui** and custom atomic UI components (Card, Button, Tabs, Badge, Skeleton, Typography).
- **Typography**: all heading, label, table, and badge text uses a centralized Typography component for theme consistency.
- **Breadcrumbs** for navigation context.

### **State Management**

- **Zustand**: all global state (auth, user, darkmode, vehicles, etc.) persisted and modular.
- **React Query**: all API/data fetching, cache, mutation, and error handling.

### **Map Integration**

- **MapLibre** with MapTiler styles, interactive pins, animated focus, and custom popups.
- **Responsive design**: sidebar on desktop, bottom sheet on mobile.

### **Testing**

- **Unit Testing**: Vitest + React Testing Library.
- **E2E Testing**: Playwright.

### **Dev Experience**

- **TypeScript everywhere**: strong types, inference, and schema validation.
- **Linting & Formatting**: ESLint and Prettier pre-configured.
- **DevTools**: TanStack Query, Router, Table, and React Hook Form devtools included, auto-hide in production.
- **Docker**: Dockerfile for production builds with NGINX.

### **Internationalization**

- **react-i18next**: instant language switching, fallback, and browser locale detection.

---

## Requirements

- [NodeJS 18+](https://nodejs.org/en)
- [pnpm](https://pnpm.io) (or equivalent)

If you'd like to use the included Dockerfile then [Docker](https://www.docker.com) is required as well.

---

## Getting Started

Getting started is as simple as cloning the repository:

```sh
git clone git@github.com:RicardoValdovinos/vite-react-boilerplate.git
cd vite-react-boilerplate
rm -rf .git
pnpm install
pnpm run setup
```

Or, all in one go:

```sh
git clone git@github.com:RicardoValdovinos/vite-react-boilerplate.git &&\
cd vite-react-boilerplate &&\
rm -rf .git &&\
pnpm install &&\
pnpm run setup
```

**Note**: This project comes with two git hooks added by [husky](https://typicode.github.io/husky/): a prepare-commit-msg hook to run [Commitizen](https://github.com/commitizen/cz-cli#readme) and a commit-msg hook to run [Commitlint](https://commitlint.js.org/#/). These help enforce [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

If you wish to remove any hooks, simply delete the corresponding file in the .husky directory.

---

## Important Note

1. This boilerplate project does not include a demo. At most, a few utilities (types, devtools, initial home page routes) are included. There is no glue to get in your way when trying to modify the template.

2. Due to empty directories not being included in git commits, placeholder README files have been added to these empty directories. These README files contain simple descriptions about how the different directories in the accompanying folder structure may be used. As an example check out the [recommended component organizational structure](src/components/README.md) as well as the [recommended folder structure](src/features/README.md).

3. [Faker](https://fakerjs.dev/) is included to encourage more isolated testing and allow for rapid development of demos and MVPs. However, please make note that, [due to a bug](https://github.com/faker-js/faker/issues/1791), importing Faker from the main package (without a locale) will result in the entire Faker lib being imported causing bundle sizes to increase up to 2+ MB. Instead prefer [localized imports](https://fakerjs.dev/guide/localization.html#individual-localized-packages) as shown below.

   ```
   // import { faker } from '@faker-js/faker';
   import { faker } from '@faker-js/faker/locale/en'; // prefer localization when possible
   ```

   The imported lib will instead be around 600 KB. Nonetheless, Faker should **NOT** be used in production and instead be limited to testing and demos.

4. Starting May 2025, this project and its dependencies are set to be updated once a month or as issues/PR's come in.

---

## Testing

Unit testing is handled by React Testing Library and Vitest while End-to-End (E2E) Testing is conducted by Playwright.

If you'd like to run all tests, Unit and E2E alike, execute the following command:

```sh
pnpm run test
```

### Unit Testing

When running unit test scripts, it is assumed that unit tests will be colocated with the source files. Take a look at the placeholder README file in `src/components` for [an example](src/components/README.md).

If you'd like to execute unit tests specifically, the below command will execute vitest:

```sh
pnpm run test:unit
```

If instead you are interested in coverage reporting, run:

```sh
pnpm run test:unit:coverage
```

All unit tests run in watch mode by default. If you'd like to disable watch mode, change the package.json test scripts with the following

before:

```
"scripts": {
  	"test:unit": "vitest src/",
	"test:unit:coverage": "vitest --coverage src/"
}
```

After:

```
"scripts": {
  	"test:unit": "vitest run src/",
	"test:unit:coverage": "vitest run --coverage src/"
}
```

**Note**: Faker is included to provide mock data. See the [Important Note](#important-note) section for crucial details regarding this package. Specifically, point 3.

### End-to-End (E2E) Testing

Running E2E tests use a similar syntax to running unit tests:

```sh
pnpm run test:e2e
```

If you wish to see the reports, run:

```sh
pnpm run test:e2e:report
```

---

## Preparing for Deployment

Instructions are provided for deploying both with and without Docker. Both options still require a platform to host the application.

### Without Docker

Deploying is as easy as running

```sh
pnpm run build
```

and pointing your web server to the generated `index.html` file found at `dist/index.html`

### With Docker

A Dockerfile with an [NGINX](https://www.nginx.com) base image is also provided for quick and easy deployments. Simply execute the following commands:

1. `pnpm run build`
2. `docker build . -t <container_name>`
   - Example: `docker build . -t todo-app`
3. `docker run  -p <port_number>:80 <container_name>`
   - Example: `docker run -p 8080:80 todo-app`

### Continuous Integration

Due to the vast array of tools, opinions, requirements and preferences a CI template is not included in this project.

---

## Devtools

This project includes a set of Devtools. Some are additional package dependencies whereas others come built-in to the packages themselves.

### Devtool dependencies:

- [@tanstack/react-query-devtools](https://tanstack.com/query/v4/docs/react/devtools) - Dedicated dev tools to help visualize the inner workings of React Query
- [@tanstack/router-devtools](https://tanstack.com/router/v1/docs/devtools) - Dedicated dev tools to help visualize the inner workings of TanStack Router
- [@tanstack/react-table-devtools](https://www.npmjs.com/package/@tanstack/react-table-devtools) - Dedicated dev tools to help visualize the inner workings of TanStack Table
- [@hookform/DevTools](https://react-hook-form.com/dev-tools) - React Hook Form Devtools to help debug forms with validation

A set of utility components are provided in `src/components/utils/development-tools/`. These [wrapper components](https://tanstack.com/router/v1/docs/devtools#only-importing-and-using-devtools-in-developmentgit) check whether the application is running in development or production mode and render the component or null respectively. In other words, you can confidently use them during development without having to worry about them showing up for end users in production.

**TanStack Query Devtools** are ready to go out of the box. The development vs. production rendering mechanism is built into the devtools. If you do wish to [render the devtools in production](https://tanstack.com/query/latest/docs/react/devtools) you can freely do so by following the TanStack Query Devtools documentation. The devtools component can be found in `src/App.tsx`.

When running the application in development mode you can find the TanStack Query Devtools icon in the bottom left corner of the page sporting the [React Query Logo](https://img.stackshare.io/service/25599/default_c6db7125f2c663e452ba211df91b2ced3bb7f0ff.png).

**TanStack Router Devtools**, however, utilizes its respective utility component in this project. The initial setup has been taken care of but if you wish to modify or remove the component, have a look in `src/App.tsx`.

The TanStack Router Devtools icon can be found in the bottom right corner of the page denoted by the vertically stacked "TANSTACK ROUTER" logo.

The above components, along with their imports, are commented out to start.

**TanStack Table Devtools** Documentation is, at the time of writing this, non-existent. Having said that, usage is similar to the other TanStack devtools. A utility component restricting the devtools to development builds has been provided. The difference in comparison to the other TanStack devtools is the lack of floating mode. Instead, the Devtools are rendered as a component within the actual TanStack Table you define. An additional caveat being that the DevTools component (built-in and provided utility alike) require a table prop from the `useReactTable()` hook. In other words, if you have multiple tables, each table must have its own Devtools component. Check the simplified code below.

```
function Table(): FunctionComponent {
  /* some code */

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      {/* table code */}
      <TanStackTableDevelopmentTools table={table} />
    </>
  )
}
```

**React Hook Form DevTools** icon can be recognized in the top right corner of the page by the pink React Hook Form clipboard logo. A utility component has also provided. Like the TanStack Table Devtools component above, a prop must be passed from a specific hook. In this case, it is the control prop from the `useForm()` hook. Similar to TanStack Table, use of React Hook Form DevTools requires the component be added to each unique form. More information can be found in the [React Hook Form DevTools documentation](https://react-hook-form.com/dev-tools).

To reiterate, if you wish to restrict the Devtools to development builds use the provided components found at `src/components/utils/development-tools` instead of the built-in components from their respective modules.

### Built-in Devtools:

- Zustand

**Zustand** provides a built-in [devtools middleware](https://github.com/pmndrs/zustand#redux-devtools) for use with [Redux DevTools](https://github.com/reduxjs/redux-devtools#redux-devtools).

---

## Installed Packages

A simplified list can be found in the [Overview](#overview) section.

### Base

- [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vitejs.dev)
- [React](https://react.dev)

### Routing

- [TanStack Router](https://tanstack.com/router/v1)

### Linting & Formatting

- [ESLint](https://eslint.org)
  - [typescript-eslint](https://typescript-eslint.io)
  - [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier#readme)
  - [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react#readme)
  - [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)
  - [eslint-plugin-react-refresh](https://github.com/ArnaudBarre/eslint-plugin-react-refresh)
  - [eslint-plugin-unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn#readme)
- [Prettier](https://prettier.io)

### State Management

- [TanStack Query (React Query)](https://tanstack.com/query/latest)
- [Zustand](https://zustand-demo.pmnd.rs)

### UI

- [Tailwind CSS](https://tailwindcss.com)
- [HeadlessUI](https://headlessui.com)
- [heroicons](https://heroicons.com)
- [shadcn/ui](https://ui.shadcn.com)
- [TanStack Table](https://tanstack.com/table/v8)

### Forms

- [React Hook Form](https://react-hook-form.com)
- [Zod](https://zod.dev)

### Data Visualization

- [Nivo](https://nivo.rocks)
  - [Line](https://nivo.rocks/line/)
  - [Bar](https://nivo.rocks/bar/)
  - [Pie](https://nivo.rocks/pie/)
- [Recharts](https://recharts.org) - Charting for vehicle telemetry

### Map

- [MapLibre GL JS](https://maplibre.org/) - Interactive and static maps with vector tiles (MapTiler)
- [Lucide React](https://lucide.dev/) - Icon set for UI and map markers

### Testing

- [Vitest](https://vitest.dev)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright](https://playwright.dev)

### Development Tools

- [TanStack Query Devtools](https://tanstack.com/query/latest/docs/react/devtools?from=reactQueryV3&original=https%3A%2F%2Ftanstack.com%2Fquery%2Fv3%2Fdocs%2Fdevtools)
- [TanStack Router Devtools](https://tanstack.com/router/v1/docs/devtools)
- [TanStack Table Devtools](https://www.npmjs.com/package/@tanstack/react-table-devtools)
- [React Hook Form Devtools](https://react-hook-form.com/dev-tools)

### Git

- [Husky](https://github.com/typicode/husky#readme)
- [Commitizen](https://github.com/commitizen/cz-cli#readme)
- [Commitlint](https://github.com/conventional-changelog/commitlint#readme)

### Other

- [i18next-browser-languageDetector](https://github.com/i18next/i18next-browser-languageDetector)
- [i18next](https://www.i18next.com/)
- [react-i18next](https://react.i18next.com/)
- [ts-reset](https://github.com/total-typescript/ts-reset#readme)
- [Faker](https://fakerjs.dev/)
- [Dayjs](https://day.js.org/en/)

---

## Changelog

- **July 2025**: Added advanced auth (JWT, refresh), RBAC, multi-metric vehicle dashboard, MapLibre integration, shadcn/ui for all atomic components, improved devtools and DX.
- **May 2025**: Project and dependencies set for monthly update schedule.
- See git history for a complete changelog.

---

> **This Vite React Boilerplate is designed to be your best starting point for modern, scalable, and beautiful React apps. Happy coding!**
