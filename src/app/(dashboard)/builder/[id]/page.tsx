import ProjectBuilder from "../../_components/ProjectBuilder";
import { api } from "~/trpc/server";

export default async function BuilderPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const project = await api.project.getById(Number(id));

  if (!project) {
    throw new Error("Project not found");
  }

  return <ProjectBuilder project={project} />;
}
