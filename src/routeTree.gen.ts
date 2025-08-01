/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as CrudImport } from './routes/crud'
import { Route as AuthImport } from './routes/auth'
import { Route as IndexImport } from './routes/index'
import { Route as VehicleIdImport } from './routes/vehicle/$id'

// Create/Update Routes

const CrudRoute = CrudImport.update({
  id: '/crud',
  path: '/crud',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/auth',
  path: '/auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const VehicleIdRoute = VehicleIdImport.update({
  id: '/vehicle/$id',
  path: '/vehicle/$id',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/auth': {
      id: '/auth'
      path: '/auth'
      fullPath: '/auth'
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/crud': {
      id: '/crud'
      path: '/crud'
      fullPath: '/crud'
      preLoaderRoute: typeof CrudImport
      parentRoute: typeof rootRoute
    }
    '/vehicle/$id': {
      id: '/vehicle/$id'
      path: '/vehicle/$id'
      fullPath: '/vehicle/$id'
      preLoaderRoute: typeof VehicleIdImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/auth': typeof AuthRoute
  '/crud': typeof CrudRoute
  '/vehicle/$id': typeof VehicleIdRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/auth': typeof AuthRoute
  '/crud': typeof CrudRoute
  '/vehicle/$id': typeof VehicleIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/auth': typeof AuthRoute
  '/crud': typeof CrudRoute
  '/vehicle/$id': typeof VehicleIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/auth' | '/crud' | '/vehicle/$id'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/auth' | '/crud' | '/vehicle/$id'
  id: '__root__' | '/' | '/auth' | '/crud' | '/vehicle/$id'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthRoute: typeof AuthRoute
  CrudRoute: typeof CrudRoute
  VehicleIdRoute: typeof VehicleIdRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthRoute: AuthRoute,
  CrudRoute: CrudRoute,
  VehicleIdRoute: VehicleIdRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.ts",
      "children": [
        "/",
        "/auth",
        "/crud",
        "/vehicle/$id"
      ]
    },
    "/": {
      "filePath": "index.ts"
    },
    "/auth": {
      "filePath": "auth.ts"
    },
    "/crud": {
      "filePath": "crud.tsx"
    },
    "/vehicle/$id": {
      "filePath": "vehicle/$id.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
