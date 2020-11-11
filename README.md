This is a [Next.js](https://nextjs.org/) application that implements To Dos. It uses [Deta Base](https://docs.deta.sh/docs/base/about) for persistent To Dos.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Interacting with Deta Base

A valid Deta Project key is required to interact with the database. You need to set an environment variable `DETA_PROJECT_KEY` which will be read the `pages/api/todos/index.js` and `pages/api/todos/[tid].js` files.

In production, these can be set in the [Vercel web app](https://vercel.com/docs/serverless-functions/introduction#environment-variables).

Do not commit this project key into a git repo.


## Deploy To Dos on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/xeust/base-nextjs/)

For the click to deploys, simply add the `DETA_PROJECT_KEY` as an environment variable during the deploy flow.

This app can be easily deployed on [Vercel](https://vercel.com/).

