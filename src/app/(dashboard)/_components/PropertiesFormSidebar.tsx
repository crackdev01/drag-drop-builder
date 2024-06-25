import { Button } from "~/components/ui/button";
import { X } from "lucide-react";
import React, { SetStateAction } from "react";
import { ProjectElementInstance, ProjectElements } from "./ProjectElements";
import { Separator } from "~/components/ui/separator";

interface Props {
  selectedElement: SetStateAction<ProjectElementInstance | null>;
  setSelectedElement: (element: any) => void;
  setElements: (element: any) => void;
}

export default function PropertiesFormSidebar({
  selectedElement,
  setSelectedElement,
  setElements,
}: Props) {
  if (!selectedElement || typeof selectedElement === "function") return null;

  const updateElement = (id: string, element: ProjectElementInstance) => {
    setElements((prev: ProjectElementInstance[][]) =>
      prev.map((el) => el.map((item) => (item.id === id ? element : item))),
    );
  };
  const PropertiesForm =
    ProjectElements[selectedElement.type]?.propertiesComponent;

  return (
    <div className="flex flex-col p-2">
      <div className="flex items-center justify-between">
        <p className="text-sm text-foreground/70">Element Properties</p>
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={() => {
            setSelectedElement(null);
          }}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <Separator className="mb-4" />
      <PropertiesForm
        elementInstance={selectedElement}
        updateElement={updateElement}
      />
    </div>
  );
}
