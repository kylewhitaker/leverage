# Yarn Workspaces :zap:

Yarn Workspaces manage package dependencies across applications within a monorepo.

Guidelines:

1. Use Yarn, not NPM. Also important: Use Yarn 1, not Yarn 2.
1. Think of workspaces as applications.
1. There are _many_ `package.json` files. The **monorepo (root)** gets one and **each workspace** gets one. The root `package.json` is where workspaces and global dependencies are defined. Each workspace's `package.json` defines its own dependencies & scripts.
1. There is one and only one `yarn.lock` file, located at the **root**, for _all_ workspaces within the monorepo.
1. _Most_ dependencies will reside in the **root** `node_modules`. When dependency conflicts exist between workspaces, _some_ dependencies will then reside in the **workspace** `node_modules` in order to resolve these conflicts.
1. Installs for _all_ dependencies can happen with one single `yarn install` _anywhere_ in the monorepo folder structure.

## Adding new dependencies

**Global(root):** `yarn add -W <package>`

**Workspace:** `cd <workspace>` && `yarn add <package>`

## Adding a new workspace

1. Create a new folder at the root: `./workspace-new`
1. Add a new `package.json` inside the new `workspace-new` folder.

   ```json
   "name": "workspace-new"
   ```

1. Add the workspace name to the root `package.json` file.

   ```json
   "workspaces": [
     "workspace-existing-a",
     "workspace-existing-b",
     "workspace-new"
   ]
   ```

## Resources

- doc: [Yarn Installation (v1)](https://classic.yarnpkg.com/en/docs/install#mac-stable)
- doc: [Yarn Workspaces (v1)](https://classic.yarnpkg.com/en/docs/workspaces/)
- blog: [Workspaces in Yarn](https://classic.yarnpkg.com/blog/2017/08/02/introducing-workspaces/)
- blog: [Yarn 1 vs. Yarn 2 vs. NPM](https://shift.infinite.red/yarn-1-vs-yarn-2-vs-npm-a69ccf0229cd)
