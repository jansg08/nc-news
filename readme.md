# NC News

## Demo

You can visit the hosted project [here](https://nc-news.pages.dev/)

## About

This project consists of a React-based frontend to deliver data from my earlier [news-api](https://github.com/jansg08/news-api/tree/main) project. The user is able to view a list of articles and refine their search with an expandable menu to control sort options. They can also view a list of topics where each one will take them through to the subset of related articles. From there, the user can click an article to view it in full along with any comments associated with it. The user is also able to up-vote or down-vote an article along with posting and deleting their own comments. All necessary components are error-handled and substituted with loading icons when needed.

## Running it locally

The project uses Vite to manage to development and build process. To run it on your own system follow these steps:
1. Clone the project with the `git clone` command, or directly into your chosen editor.
2. `cd` to the projects directory and and run `npm i` to install the relevant dependencies.
3. To view the app locally run `npm run dev`, or to build the project, run `npm run build`.

The app has been tested to work with Node.js v22.9.0 and later.

---

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
