# Locales directory
This directory contains the translation files for the project.

## Directory structure
```
src
└── locales
    ├── en.json
    ├── fr.json
    └── locale.json
```
The `locale.json` file contains the list of available languages, and their corresponding flag. It is used by the `TheLanguageSelector` component to allow users to choose their desired display language.

## Adding a new language
To add a new language : 
1. Create a new file in the `locales` directory, with the language code as the file name. For example, to add a new language `es`, create a file named `es.json`.
2. Add the language code and the corresponding flag to the `locale.json` file. For example, to add the `es` language, add the following code to the `locale.json` file:
```json
{
  "lang": "es",
  "icon": "flag:es-4x3"
}
```
We use the flag icons in a 4*3 version from the [Flag-icons](https://icon-sets.iconify.design/flag) icon set. You can find the list of available flags [here](https://icon-sets.iconify.design/flag).

3. Add the new language to the `i18n` module in the `src\modules\i18n.ts` file. For example, to add the `es` language, add the following code to the `src\modules\i18n.ts` file:

```ts
import es from '../locales/es.json'
const messages = {
  fr:fr,
  en:en,
  es:es
}
```
