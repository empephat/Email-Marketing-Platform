
*glöm inte : Installera beroenden med `npm i` :)*

Utvecklingsmiljöns grundrutt : http://localhost:5173

## *Våra ruttter och vad dom visar:*

http://localhost:5173/
**RegisterPage**

http://localhost:5173/register
**RegisterPage**
*Sida för att registrera sig på plattformen*

http://localhost:5173/login
**LoginPage**
*Sida för att logga in* 

http://localhost:5173/campaigns
**CampaignListAndCreate**
*Sida för inloggade att hantera och skapa sina olika kampanjer.*

http://localhost:5173/campaign-detail
**CampaignDetailsAndEmails**
*Kampanjsida för specifik kampanj. här kan man se sina email tillhörande den specifika kampanjen samt skapa nya utskick*


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
