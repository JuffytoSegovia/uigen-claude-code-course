# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

UIGen is an AI-powered React component generator with live preview. Users describe components in a chat interface and Claude generates React code that renders in real-time within a sandboxed iframe.

## Commands

```bash
npm run setup      # Install deps, generate Prisma client, run migrations
npm run dev        # Start dev server with Turbopack (http://localhost:3000)
npm run build      # Production build
npm run lint       # ESLint
npm test           # Vitest (jsdom environment)
npx vitest run src/lib/__tests__/file-system.test.ts  # Run single test file
npm run db:reset   # Reset database
```

## Architecture

### Core Data Flow

1. User sends message via `ChatInterface` → `ChatProvider` (uses Vercel AI SDK's `useChat`)
2. Request hits `/api/chat/route.ts` with messages + serialized virtual file system
3. Claude generates code using two tools:
   - `str_replace_editor`: create/view/edit files (view, create, str_replace, insert commands)
   - `file_manager`: rename/delete files
4. Tool calls stream back and `FileSystemContext` applies changes to `VirtualFileSystem`
5. `PreviewFrame` transforms files via Babel and renders in sandboxed iframe with import maps

### Key Abstractions

**VirtualFileSystem** (`src/lib/file-system.ts`): In-memory file system with tree structure. Supports serialization for persistence and API transport. No files written to disk.

**JSX Transformer** (`src/lib/transform/jsx-transformer.ts`): Uses `@babel/standalone` to transpile JSX/TSX. Creates blob URLs for each file and builds an import map. Third-party packages resolve via esm.sh CDN.

**Context Providers** (`src/lib/contexts/`):
- `FileSystemContext`: Manages virtual file system state and handles tool calls from AI
- `ChatContext`: Wraps Vercel AI SDK's useChat, syncs with file system

### Layout

Main UI is a resizable two-panel layout (`src/app/main-content.tsx`):
- Left: Chat interface
- Right: Preview/Code tabs (Code view has FileTree + CodeEditor)

### Database

SQLite via Prisma. Models: User, Project. Projects store serialized messages and file system data as JSON strings. Prisma client generated to `src/generated/prisma/`.

## Key Patterns

- Path alias: `@/*` maps to `./src/*`
- UI components in `src/components/ui/` (Radix-based)
- Server actions in `src/actions/`
- Tests colocated in `__tests__/` directories
- Mock provider returns static code when `ANTHROPIC_API_KEY` not set

## Environment

- `ANTHROPIC_API_KEY`: Optional. Without it, mock responses are used.

## Code Style

- Use comments sparingly. Only comment complex code.
- The database schema is defined in the @prisma/schema.prisma file. Reference it anytime you need to understand the structure of data stored in the database.