# youtube-scraper-poc-fe

## About

- The frontend for a proof-of-concept internal tool to find and monitor copyrighted content on YouTube.

  - [Backend repository](https://github.com/Adamhunter108/youtube_scraper)

- This is a Next.js 14 application written in TypeScript, styled with Tailwind CSS. This app features serverless API routes that protect sensitive data such as API keys and database URLs by storing them server-side.

- This app allows users to search the YouTube Data API, filter out specific channels, and browse and manage the PostgreSQL database where search results are stored.

## Live Deployment:

[youtube-scraper-poc-fe.vercel.app](https://youtube-scraper-poc-fe.vercel.app/)

## Run Locally

### ‼️ Requirements:

- rename `.env.example` to `.env.local` and add your environment variables

```bash
$ # Install dependencies
$ npm i
$ # Run the development server
$ npm run dev
```
