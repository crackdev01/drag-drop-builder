"use client";

import PreviewDialogBtn from "./PreviewDialogBtn";
import SaveProjectBtn from "./SaveProjectBtn";
import { Project } from "@prisma/client";
import React, { useState } from "react";
import Designer from "./Designer";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import DragOverlayWrapper from "./DragOverlayWrapper";
import { ProjectElementInstance } from "./ProjectElements";
import { Button } from "~/components/ui/button";
import Link from "next/link";

export default function ProjectBuilder({ project }: { project: Project }) {
  const [elements, setElements] = useState<ProjectElementInstance[][]>(
    JSON.parse(project.content),
  );

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  return (
    <DndContext sensors={sensors}>
      <main className="flex w-full flex-col">
        <div className="flex items-center justify-between gap-3 border-b-2 p-4 text-xl">
          <h2 className="truncate font-semibold text-white">
            <span className="mr-2 text-muted-foreground">Project :</span>
            {project.name}
          </h2>
          <div className="flex items-center gap-2">
            <PreviewDialogBtn elements={elements} />
            <SaveProjectBtn id={project.id} elements={elements} />
            <Button>
              <Link href={"/dashboard"}>Back</Link>
            </Button>
          </div>
        </div>
        <div className="bg-paper-pattern dark:bg-paper-pattern-dark relative flex h-[200px] w-full grow items-center justify-center overflow-hidden bg-accent">
          <Designer
            projectId={project.id}
            elements={elements}
            setElements={setElements}
          />
        </div>
      </main>
      {/* Overlay */}
      <DragOverlayWrapper elements={elements} />
    </DndContext>
  );
}
