<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

# eBalance Plus Game

This project is a game designed to help people get a better idea of what impact renewable energy has on our electrical consumption.   It's goal is to help players understand how to change their consumption habits to better fit the constraints of green energy production.  The main objectives are as follows : 
- Learn to shift consumption to times when renewable energy is available
- Get to know the positive impact of investing in more efficient items
- Apprehend the order of magnitudes of the consumption of different household appliances
- Take a look at what a leaner electrical consumption looks like

The desired format is a Single Page Application (SPA)

## Table of Contents
- [eBalance Plus Game](#ebalance-plus-game)
  - [Table of Contents](#table-of-contents)
  - [Project Structure](#project-structure)
    - [Files and folders structure](#files-and-folders-structure)
    - [Application pages](#application-pages)
  - [Recommended IDE Setup](#recommended-ide-setup)
  - [Project Setup](#project-setup)
    - [Compiles and hot-reloads for development](#compiles-and-hot-reloads-for-development)
    - [Compiles and minifies for production](#compiles-and-minifies-for-production)
  - [Technologies Used](#technologies-used)
    - [Main technologies](#main-technologies)
    - [Development tools, frameworks and libraries](#development-tools-frameworks-and-libraries)
  - [License](#license)
  - [Contact](#contact)

## Project Structure
### Files and folders structure
- **locales**: Translation files
- **public**: Static assets
- **src** : 
  - **components**: VueJS single file components (SFC), they are reusable and can be imported in other components or pages (see [Vue SFC](https://v3.vuejs.org/guide/single-file-component.html))
  - **data**: JSON files containing the data used in the game (see [Data](#data)), it will later be replaced by a database connection
  - **modules**: configuration files for the different modules used in the project (see [Modules](#modules)), such as [Vue Router][Vue-router-url] or [Vue I18n](https://vite-plugin-vue-i18n.intlify.dev/) or [Pinia][Pinia-url]
  - **stores**: [Pinia][Pinia-url] stores, they are used to store the state of the application (see [Pinia](#pinia)) making it accessible to all components without the need to pass everything as a prop
  - **styles**: scss files used to style the application, they are broken down into different files to make it easier to find what you are looking for, which are then imported in the global.scss file (see [Styles](#styles))
    - **base**: base styles, such as the reset and the typography
    - **components**: styles for the different components
    - **layout**: styles for the layout (header, footer, etc.)
    - **themes**: styles for the different themes (dark, light, etc.)
    - **utilities**: utility classes (mixins, functions, variables, etc.)
    - **views**: styles for the different views
  - **views**: VueJS single file components (SFC) that are used as pages (see [Vue SFC](https://v3.vuejs.org/guide/single-file-component.html))
- **App.vue**: Main VueJS component and entry point of the application
- **main.ts**: Main TypeScript file and starting script of the application
- **index.html** : Index of the SPA containing the root element and the headers
- **package.json**: Project configuration file, it contains the dependencies and scripts used in the project
- **tsconfig.json**: TypeScript configuration file, it contains the configuration of the TypeScript compiler
- **vite.config.ts**: Vite configuration file, it contains the configuration of the Vite server and the plugins used in the project

### Application pages


## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Project Setup
1. Clone the repo
```sh
git clone https://github.com/gabrieljunia/ebalanceplusgame.git
```
2. Install [pnpm](https://pnpm.io/installation)
3. Install pnpm packages
```
pnpm install
```

### Compiles and hot-reloads for development
```
pnpm dev
```

### Compiles and minifies for production
```
pnpm build
```
## Technologies Used
### Main technologies
- [![Vue 3][Vue.js]][Vue-url]
- [![Vue Router][Vue-router]][Vue-router-url]
- [![Vue I18n][Vue-i18n]][Vue-i18n-url]
- [![Pinia][Pinia]][Pinia-url]

### Development tools, frameworks and libraries
- [![Vite][Vite]][Vite-url]
- [![TypeScript][TypeScript]][TypeScript-url]
- [![Sass][Sass]][Sass-url]

## License
Distributed under the MIT License. See `LICENSE` for more information.

## Contact

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/gabrieljunia/ebalanceplusgame.svg?style=for-the-badge
[contributors-url]: https://github.com/gabrieljunia/ebalanceplusgame/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/gabrieljunia/ebalanceplusgame.svg?style=for-the-badge
[forks-url]: https://github.com/gabrieljunia/ebalanceplusgame/network/members
[stars-shield]: https://img.shields.io/github/stars/gabrieljunia/ebalanceplusgame.svg?style=for-the-badge
[stars-url]: https://github.com/gabrieljunia/ebalanceplusgame/stargazers
[issues-shield]: https://img.shields.io/github/issues/gabrieljunia/ebalanceplusgame.svg?style=for-the-badge
[issues-url]: https://github.com/gabrieljunia/ebalanceplusgame/issues
[license-shield]: https://img.shields.io/github/license/gabrieljunia/ebalanceplusgame.svg?style=for-the-badge
[license-url]: https://github.com/gabrieljunia/ebalanceplusgame/blob/master/LICENSE.txt
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://v3.vuejs.org/
[Vue-router]: https://img.shields.io/badge/Vue_Router-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-router-url]: https://next.router.vuejs.org/
[Vue-i18n]: https://img.shields.io/badge/Vue_I18n-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-i18n-url]: https://vue-i18n.intlify.dev/
[Pinia]: https://img.shields.io/badge/Pinia-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Pinia-url]: https://pinia.esm.dev/
[Vite]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vitejs.dev/
[Typescript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[Typescript-url]: https://www.typescriptlang.org/
[Sass]: https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white
[Sass-url]: https://sass-lang.com/
