import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import type { Plugin, ViteDevServer } from "vite";

const moduleId = "virtual:project-images";
const resolvedModuleId = `\0${moduleId}`;
const supportedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);

async function readProjectImages(directory: string) {
  let projectDirectories;
  try {
    projectDirectories = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return {};
    throw error;
  }

  const projects: Record<string, { src: string; alt: string }[]> = {};
  for (const project of projectDirectories.filter((entry) => entry.isDirectory())) {
    const projectDirectory = path.join(directory, project.name);
    const files = await readdir(projectDirectory, { withFileTypes: true });
    const images = files
      .filter(
        (file) =>
          file.isFile() &&
          supportedExtensions.has(path.extname(file.name).toLowerCase()),
      )
      .sort((left, right) =>
        left.name.localeCompare(right.name, undefined, {
          numeric: true,
          sensitivity: "base",
        }),
      );

    if (images.length > 0) {
      projects[project.name] = images.map((image, index) => ({
        src: `/images/projects/${project.name}/${image.name}`,
        alt: `${index + 1} — ${project.name.replaceAll("-", " ")} project photo`,
      }));
    }
  }

  return projects;
}

function isWithinDirectory(directory: string, file: string): boolean {
  const relative = path.relative(directory, file);
  return relative !== "" && !relative.startsWith(`..${path.sep}`) && relative !== "..";
}

function invalidateProjectImages(server: ViteDevServer): void {
  const projectImagesModule = server.moduleGraph.getModuleById(resolvedModuleId);
  if (projectImagesModule) server.moduleGraph.invalidateModule(projectImagesModule);
  server.ws.send({ type: "full-reload" });
}

export function projectImages(): Plugin {
  let projectDirectory = "";

  return {
    name: "project-images",
    configResolved(config) {
      projectDirectory = path.join(config.root, "public", "images", "projects");
    },
    resolveId(id) {
      if (id === moduleId) return resolvedModuleId;
    },
    async load(id) {
      if (id !== resolvedModuleId) return;
      const projects = await readProjectImages(projectDirectory);
      return `export default ${JSON.stringify(projects)};`;
    },
    async configureServer(server) {
      await mkdir(projectDirectory, { recursive: true });
      server.watcher.add(projectDirectory);
    },
    handleHotUpdate({ file, server }) {
      if (isWithinDirectory(projectDirectory, file)) {
        invalidateProjectImages(server);
      }
    },
  };
}
