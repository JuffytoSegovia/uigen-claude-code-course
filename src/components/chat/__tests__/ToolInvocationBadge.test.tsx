import { test, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { ToolInvocationBadge } from "../ToolInvocationBadge";

afterEach(() => {
  cleanup();
});

test("str_replace_editor create command shows Creating message", () => {
  render(
    <ToolInvocationBadge
      toolName="str_replace_editor"
      args={{ command: "create", path: "/components/Card.jsx" }}
      state="result"
    />
  );

  expect(screen.getByText("Creating Card.jsx")).toBeDefined();
});

test("str_replace_editor str_replace command shows Editing message", () => {
  render(
    <ToolInvocationBadge
      toolName="str_replace_editor"
      args={{ command: "str_replace", path: "/App.jsx" }}
      state="result"
    />
  );

  expect(screen.getByText("Editing App.jsx")).toBeDefined();
});

test("str_replace_editor insert command shows Editing message", () => {
  render(
    <ToolInvocationBadge
      toolName="str_replace_editor"
      args={{ command: "insert", path: "/utils/helpers.ts" }}
      state="result"
    />
  );

  expect(screen.getByText("Editing helpers.ts")).toBeDefined();
});

test("str_replace_editor view command shows Reading message", () => {
  render(
    <ToolInvocationBadge
      toolName="str_replace_editor"
      args={{ command: "view", path: "/index.tsx" }}
      state="result"
    />
  );

  expect(screen.getByText("Reading index.tsx")).toBeDefined();
});

test("file_manager rename command shows Renaming message with both filenames", () => {
  render(
    <ToolInvocationBadge
      toolName="file_manager"
      args={{ command: "rename", path: "/old.jsx", new_path: "/new.jsx" }}
      state="result"
    />
  );

  expect(screen.getByText("Renaming old.jsx → new.jsx")).toBeDefined();
});

test("file_manager delete command shows Deleting message", () => {
  render(
    <ToolInvocationBadge
      toolName="file_manager"
      args={{ command: "delete", path: "/unused.jsx" }}
      state="result"
    />
  );

  expect(screen.getByText("Deleting unused.jsx")).toBeDefined();
});

test("shows spinner when state is call", () => {
  const { container } = render(
    <ToolInvocationBadge
      toolName="str_replace_editor"
      args={{ command: "create", path: "/App.jsx" }}
      state="call"
    />
  );

  expect(container.querySelector(".animate-spin")).toBeDefined();
  expect(container.querySelector(".bg-emerald-500")).toBeNull();
});

test("shows spinner when state is partial-call", () => {
  const { container } = render(
    <ToolInvocationBadge
      toolName="str_replace_editor"
      args={{ command: "create", path: "/App.jsx" }}
      state="partial-call"
    />
  );

  expect(container.querySelector(".animate-spin")).toBeDefined();
});

test("shows green dot when state is result", () => {
  const { container } = render(
    <ToolInvocationBadge
      toolName="str_replace_editor"
      args={{ command: "create", path: "/App.jsx" }}
      state="result"
    />
  );

  expect(container.querySelector(".bg-emerald-500")).toBeDefined();
  expect(container.querySelector(".animate-spin")).toBeNull();
});

test("handles unknown tool gracefully by showing tool name", () => {
  render(
    <ToolInvocationBadge
      toolName="unknown_tool"
      args={{ some: "args" }}
      state="result"
    />
  );

  expect(screen.getByText("unknown_tool")).toBeDefined();
});

test("handles missing path by showing tool name", () => {
  render(
    <ToolInvocationBadge
      toolName="str_replace_editor"
      args={{ command: "create" }}
      state="result"
    />
  );

  expect(screen.getByText("str_replace_editor")).toBeDefined();
});

test("extracts filename from nested path", () => {
  render(
    <ToolInvocationBadge
      toolName="str_replace_editor"
      args={{ command: "create", path: "/src/components/ui/Button.tsx" }}
      state="result"
    />
  );

  expect(screen.getByText("Creating Button.tsx")).toBeDefined();
});
