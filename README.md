# lounas-hub

Admin tools for TEAM PIPLUP 🐧

## Development

Install environment packages.

```bash
npm i
```

### Environment variables

The below file and variables must be created in the root directory.

#### `.env.local`

```bash
# supabase
NEXT_PUBLIC_SUPABASE_URL=https://yourprojecturl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YourApiKey

# https://supabase.com/partners/integrations/prisma
# postgres connection string used for migrations
DIRECT_URL=postgresql://postgres:[pw]@db.[url].supabase.co:5432/postgres
# postgres connection string with Supavisor config - used by Prisma Client
DATABASE_URL=postgres://postgres.[url]:[pw]@[region].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1

# cdn
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=YourId
```

### Code formatter

You have to run `npm run format` before PR.

#### VS Code Extentions

- [TypeScript](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
- [Tailwind CSS](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [PostCSS](https://marketplace.visualstudio.com/items?itemName=csstools.postcss)

## Tailwind CSS

[Docs](https://tailwindcss.com/docs/installation)

### `tailwind.config.js`

Support iOS 15.4 or later.

```js
module.exports = {
  theme: {
    extend: {
      height: {
        screen: ["100vh", "100dvh"],
      },
      minHeight: {
        screen: ["100vh", "100dvh"],
      },
      maxHeight: {
        screen: ["100vh", "100dvh"],
      },
    },
  },
};
```

## Next.js

[Docs](https://nextjs.org/docs)

## Material UI

[Docs](https://mui.com/material-ui/getting-started/overview/)

## Framer Motion

[Docs](https://www.framer.com/motion/)

## Prisma

[Docs](https://www.prisma.io/docs)

## Zod

- [Docs - Zod](https://zod.dev/)

- [ Docs - zod-prisma-types](https://github.com/chrishoermann/zod-prisma-types)

## Supabase

[Docs](https://supabase.com/docs/reference/javascript/)

---
🐧
