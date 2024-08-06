# Practical Task

## Features:

### Auth [(signin page)](https://practical-task-olive.vercel.app/signin)
- Securing pages with `next.js middleware`. Preventing user going to,
  -  main page when not signed in
  -  signin page when already signed in
- Form data handling with `react-hook-form` and `zod`
- Used [dummyjson](https://dummyjson.com/docs/auth) auth api to get access token
- Stored access token into the cookie using `cookies-next`
- Redirecting to main page when successfully signed in
- Created custom mutate hook to handle mutations, inspired by `tanstack query`
- Logout button in index page

### Main [(products page)](https://practical-task-olive.vercel.app)
- Fetched products on **server side** using next.js server actions
- Products table containing each columns mentioned in tasks pdf using `tanstack table`
- Added styles as in Figma
- Added reviews rating circular progress
- Added MUI `<Chip />` to render tags
- Added "View Reviews" buttons to each rows
- Reviews Dialog
  - Opening upon click on "View Reviews" button
  - Fetched product by it's id
  - Loading handling by showing skeletons
  - Rendering reviews with efficient details including MUI `<Rating />` component

### Jest test cases
- Wrote useful tests for signin page and products component


## Tech Stack:
- Nextjs 14
- Typescript
- MUI material
- Jest, @testing-library
- Tanstack Table


## Run in your local

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
