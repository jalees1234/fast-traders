import path from "node:path";
import type { Plugin, ViteDevServer } from "vite";
import { generateProjectImages } from "../project-images.mjs";

function isWithinDirectory(directory: string, file: string): boolean {
  const relative = path.relative(directory, file);
  return relative !== "" && !relative.startsWith(`..${path.sep}`) && relative !== "..";
}

function invalidateProjectImages(server: ViteDevServer): void {
  server.ws.send({ type: "full-reload" });
}

export function projectImages(): Plugin {
  let projectDirectory = "";

  return {
    name: "project-images",
    configResolved(config) {
      projectDirectory = path.join(config.root, "public", "images", "projects");
    },
    async configureServer(server) {
      await generateProjectImages(server.config.root);
      server.watcher.add(projectDirectory);
    },
    async handleHotUpdate({ file, server }) {
      if (isWithinDirectory(projectDirectory, file)) {
        await generateProjectImages(server.config.root);
        invalidateProjectImages(server);
      }
    },
  };
}
