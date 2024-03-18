# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list


-Components: https://www.figma.com/file/CSpjclGoIEdMBT8Q56AfsA/Untitled?type=design&node-id=0%3A1&mode=design&t=bg7KohmlJT0PZNlb-1

-COMMAND FOR BACKEND INITIALIZE: go into the backend folder and run the command "npm install" then "npx prisma generate" and "npm run dev"

-COMMAND FOR FRONTEND INITIALIZE: go into the frontend folder and run the command "npm install" and "npm run dev"

-OBSERVE IMPORTANT!!!!: DON'T FORGET TO CREATE AN .ENV AND ENTER THE VARIABLE DATABASE_URL="mongodb+srv://dev_luiz:<PASSWORD>@task.oz5pts5.mongodb.net/<your_database_name>?retryWrites=true&w=majority&appName=task"
