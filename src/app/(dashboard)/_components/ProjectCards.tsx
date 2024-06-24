import React from "react";
import ProjectCard from "./ProjectCard";
import { Project } from "@prisma/client";
import { api } from "~/trpc/server";

export default async function ProjectCards() {
  const projects: Project[] = await api.project.getList();
  return (
    <>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </>
  );
}
