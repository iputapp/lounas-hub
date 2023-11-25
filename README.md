# lounas-hub

Admin tools for Dev. team 🐧

## Conventions

- [Contribution Guidelines](.github/CONTRIBUTING.md)
- [Code of Conduct](.github/CODE_OF_CONDUCT.md)
- [Security Policy](.github/SECURITY.md)

For copy.

```
template=develop.md
```

```
template=main.md
```

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

## Next.js

[Docs](https://nextjs.org/docs)

## NextUI

[Docs](https://nextui.org/docs/frameworks/nextjs)

## Framer Motion

[Docs](https://www.framer.com/motion/)

## React Hook Form

[Docs](https://react-hook-form.com/docs)

## Prisma

[Docs](https://www.prisma.io/docs)

## Zod

[Docs](https://zod.dev/)

### zod-prisma-types

[Docs](https://github.com/chrishoermann/zod-prisma-types)

## Supabase

[Docs](https://supabase.com/docs/reference/javascript/)

---

🐧
