# React Movie List

This is an example project using a Movie api written with **React** and **Typescript**.

Live example: [http://movies.willbrennan.tech/](http://movies.willbrennan.tech/)

### Overview:

- Two basic routes: **List** `/` and **Item** `/:movieId`.
- **List**: URL driven pagination, sort type, and view type. Pagination at top and bottom, dropdown for the sort type, and two options for the view type (Poster/Detailed list).
- **Item**: The movieId drives which item gets loaded, shows poster image and various details (Release Date, Runtime, Budget etc.).
- Using *The Movie Database API*. 
- Uses generic and common components (controller/loading/images logic).
- Basic css, fonts, and responsiveness.

### Set Up:

- Go to main directory.
- Install packages, `npm i`.
- Run server, `npm run start`.
- Go to **localhost:3000/** and lets hope it worked.

### Deployment notes:

- Set the **homepage** in the package.json.
- Run build, `npm run build`.
- Copy **build** folder content.
- Copy **.htaccess** file to main directory for item url redirect.

