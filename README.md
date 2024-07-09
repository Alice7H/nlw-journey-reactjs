# React + TypeScript + Vite

Este modelo fornece uma configuração mínima para fazer o React funcionar no Vite com HMR e algumas regras ESLint.

Atualmente, dois plugins oficiais estão disponíveis:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) use [Babel](https://babeljs.io/) para atualização rápida
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) use [SWC](https://swc.rs/) para atualização rápida

## Expandindo a configuração do ESLint

Se você estiver desenvolvendo um aplicativo de produção, recomendamos atualizar a configuração para ativar regras de lint com reconhecimento de tipo:

- Configure a propriedade `parserOptions` de nível superior assim:

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

- Substituir `plugin:@typescript-eslint/recommended` para `plugin:@typescript-eslint/recommended-type-checked` ou `plugin:@typescript-eslint/strict-type-checked`
- Opcionalmente adicione `plugin:@typescript-eslint/stylistic-type-checked`
- Instale [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) e adicione `plugin:react/recommended` & `plugin:react/jsx-runtime` para a lista `extends`

## Trip Planner

NLW Journey Frontend project - ReactJS by Rocketseat

### Class 1

- Configurações iniciais
  - Google Fonts: Inter
  - Instalação do tailwindcss
    - Configuração
  - Instalação do lucide-react
- Criação
  - Layout para registar destino, data e hora da viagem
  - Layout para registrar convidados
- Hook: useState

### Class 2

- Refatoração do projeto
  - Criação da página de viagem
    - Passos
      - Destino and data
      - Convidar pessoas
    - Modal para Confirmar viagem
    - Modal para Convidar pessoas
- Criação
  - Página de detalhes da viagem
    - Atividades
    - Links importantes
    - Convidados
- Páginas
  - Routes: react-router-dom
    - Hook: useNavigate
- Componentes
  - Button
- Instalação do tailwind-variants
