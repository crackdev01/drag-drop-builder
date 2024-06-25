"use client";

import {
  ElementsType,
  ProjectElement,
} from "~/app/(dashboard)/_components/ProjectElements";
import { Label } from "@radix-ui/react-label";
import { Minus } from "lucide-react";
import { Separator } from "../ui/separator";

const type: ElementsType = "SeperatorField";

export const SeparatorFieldFormElement: ProjectElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
  }),
  designerBtnElement: {
    icon: <Minus className="h-8 w-8" />,
    label: "Seperator Field",
  },
  designerComponent: DesignerComponent,
  projectComponent: ProjectComponent,
  propertiesComponent: PropertiesComponent,

  validate: () => true,
};

function ProjectComponent() {
  return <Separator />;
}

function DesignerComponent() {
  return (
    <div className="flex w-full flex-col gap-2">
      <Label className="text-muted-foreground">Paragraph Field</Label>
      <Separator />
    </div>
  );
}

function PropertiesComponent() {
  return <p>No properties for this element</p>;
}
