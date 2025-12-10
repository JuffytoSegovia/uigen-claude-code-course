"use client";

import { Loader2 } from "lucide-react";

interface ToolInvocationBadgeProps {
  toolName: string;
  args: Record<string, unknown>;
  state: "partial-call" | "call" | "result";
}

function getFilename(path: string): string {
  const parts = path.split("/");
  return parts[parts.length - 1] || path;
}

function getFriendlyMessage(
  toolName: string,
  args: Record<string, unknown>
): string {
  const command = args.command as string | undefined;
  const path = args.path as string | undefined;
  const newPath = args.new_path as string | undefined;

  if (toolName === "str_replace_editor" && path) {
    const filename = getFilename(path);
    switch (command) {
      case "create":
        return `Creating ${filename}`;
      case "str_replace":
        return `Editing ${filename}`;
      case "insert":
        return `Editing ${filename}`;
      case "view":
        return `Reading ${filename}`;
      default:
        return `Editing ${filename}`;
    }
  }

  if (toolName === "file_manager" && path) {
    const filename = getFilename(path);
    switch (command) {
      case "rename":
        if (newPath) {
          return `Renaming ${filename} → ${getFilename(newPath)}`;
        }
        return `Renaming ${filename}`;
      case "delete":
        return `Deleting ${filename}`;
      default:
        return `Managing ${filename}`;
    }
  }

  return toolName;
}

export function ToolInvocationBadge({
  toolName,
  args,
  state,
}: ToolInvocationBadgeProps) {
  const message = getFriendlyMessage(toolName, args);
  const isComplete = state === "result";

  return (
    <div className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-neutral-50 rounded-lg text-xs border border-neutral-200">
      {isComplete ? (
        <div className="w-2 h-2 rounded-full bg-emerald-500" />
      ) : (
        <Loader2 className="w-3 h-3 animate-spin text-blue-600" />
      )}
      <span className="text-neutral-700">{message}</span>
    </div>
  );
}
