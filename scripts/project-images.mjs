import { mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "..");
const supportedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);

export async function generateProjectImages(root = projectRoot) {
  const projectDirectory = path.join(root, "public", "images", "projects");
  const manifestPath = path.join(root, "app", "project-images.generated.json");
  await mkdir(projectDirectory, { recursive: true });

  const projects = {};
  const directories = await readdir(projectDirectory, { withFileTypes: true });

  for (const project of directories.filter((entry) => entry.isDirectory())) {
    const files = await readdir(path.join(projectDirectory, project.name), {
      withFileTypes: true,
    });
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

  await writeFile(manifestPath, `${JSON.stringify(projects, null, 2)}\n`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await generateProjectImages();
}
