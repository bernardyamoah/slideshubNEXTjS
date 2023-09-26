# SlidesHub

SlidesHub is a web application for managing slides, campuses, programs, and courses. It utilizes technologies like Next.js, React, Appwrite, and Tailwind CSS to provide a user-friendly interface for organizing educational materials.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Key Features](#key-features)
- [Dependencies](#dependencies)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

To run this project locally, you can use npm, yarn, or pnpm as package managers. Run the following command:

bash
```npm run dev```
### or
```yarn dev```
### or
```pnpm dev```


After running the server, open http://localhost:3000 with your browser to see the result. You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Project Structure

The project is structured into several directories and files. Here are some of the key files and their roles:

- `README.md`: Provides an overview of the project and instructions on how to get started.
- `package.json`: Lists the project's npm dependencies.
- `public/site.webmanifest`: The web app manifest is a simple JSON file that tells the browser about your web application and how it should behave when 'installed' on the user's mobile device or desktop.
- `appwrite.tsx`: Sets up the Appwrite client and exports it for use in other parts of the application.
- `components/`: Contains React components used in the application.
- `lib/functions.ts`: Contains utility functions used across the application.
- `lib/AppwiteNodeJs.tsx`: Sets up the Appwrite SDK for Node.js.
- `tsconfig.json`: Specifies the root files and the compiler options required to compile the project.
- `next.config.js`: Allows you to adjust the behavior of Next.js.
- `postcss.config.js`: Configuration file for PostCSS.
- `tailwind.config.js`: Configuration file for Tailwind CSS.

## Key Features

SlidesHub has several key features, including:

- Adding and managing campuses, programs, and courses.
- Uploading and managing slides.
- User authentication and profile management.

## Dependencies

SlidesHub uses several dependencies for its functionality. Some of the key dependencies include:

- `next`: The React framework used for the frontend.
- `react`: A JavaScript library for building user interfaces.
- `appwrite`: A backend server used for user authentication, database management, storage, and more.
- `tailwindcss`: A utility-first CSS framework for rapidly building custom user interfaces.
- `lucide-react`: A package for using Lucide icons in React.

For a full list of dependencies, refer to the `package.json` file.

## Configuration

The project uses environment variables for configuration. These include the Appwrite endpoint, project ID, and collection IDs. These should be set in a `.env` file in the root of the project.

The `.env` file is used to set environment variables that the application needs to function correctly. Here is the structure of the `.env` file for the SlidesHub project:

```
NEXT_PUBLIC_APPWRITE_ENDPOINT=<Your Appwrite Endpoint>
NEXT_PUBLIC_APPWRITE_PROJECT_ID=<Your Appwrite Project ID>
NEXT_PUBLIC_APPWRITE_API_KEY=<Your Appwrite API Key>
NEXT_PUBLIC_DATABASE_ID=<Your Database ID>
NEXT_PUBLIC_CAMPUSES_COLLECTION_ID=<Your Campuses Collection ID>
NEXT_PUBLIC_PROGRAMS_COLLECTION_ID=<Your Programs Collection ID>
NEXT_PUBLIC_COURSE_COLLECTION_ID=<Your Courses Collection ID>
NEXT_PUBLIC_PROGRAMMES_COLLECTION_ID=<Your Programmes Collection ID>
NEXT_PUBLIC_SLIDES_COLLECTION_ID=<Your Slides Collection ID>
NEXT_PUBLIC_BOOKS_COLLECTION_ID=<Your Books Collection ID>
NEXT_PUBLIC_SLIDES_STORAGE_ID=<Your Slides Storage ID>
NEXT_PUBLIC_BOOKS_STORAGE_ID= <Your Books Storage  ID>
NEXT_PUBLIC_PRORAM_IMAGES_ID= <Your Programs Image ID>
NEXT_PUBLIC_COURSE_IMAGES_ID= <Your Courses Collection ID>
NEXT_PUBLIC_CAMPUS_IMAGES_ID=
NEXT_PUBLIC_USER_PROFILE_IMAGES_ID= <User Profile Image Storage ID>
NEXT_PUBLIC_TEAM_ID= <Appwrite Team ID>

```



## Contributing

Contributions to the project are welcome. Please ensure that you follow the existing code style and test your changes before submitting a pull request.

## License

SlidesHub is open-source software licensed under the MIT license.


Icons:
- 🔧: Refactor
- 📝: Update documentation
- ➕: Add new feature
- 🐛: Fix bug
- 🚀: Improve performance
- ♻️: Code refactoring
- 🎨: Improve code structure/formatting
- 📦: Update dependencies
- 🚧: Work in progress