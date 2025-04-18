import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

const isExternal = (id: string) => !id.startsWith(".") && !path.isAbsolute(id);

export const getBaseConfig = ({ plugins = [], lib }) =>
  defineConfig({
    plugins: [react(), ...plugins],
    build: {
      lib: {
        entry: path.resolve(__dirname, "src/index.ts"),
        ...lib,
      },
      rollupOptions: {
        external: isExternal,
        output: {
          globals: {
            react: "React",
          },
        },
      },
    },
  });

const config = getBaseConfig({
  lib: {
    name: "UI",
    fileName: "ui",
  },
});

export default config;
