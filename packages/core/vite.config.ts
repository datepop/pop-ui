import * as path from "path";

import { getBaseConfig } from "../../vite.config";

import type { Plugin } from "vite";

const preserveUseClientDirective = (): Plugin => ({
  name: "preserve-use-client-directive",
  renderChunk(code, chunk) {
    if (!chunk.fileName.endsWith(".js")) {
      return;
    }

    return `"use client";\n${code}`;
  },
});

export default getBaseConfig({
  plugins: [preserveUseClientDirective()],
  lib: {
    entry: path.resolve(__dirname, "src/index.ts"),
    name: "Core",
    fileName: "core",
  },
});
