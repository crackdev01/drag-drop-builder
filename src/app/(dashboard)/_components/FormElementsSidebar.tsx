import React from "react";
import SidebarBtnElement from "./SidebarBtnElement";
import { ProjectElements } from "./ProjectElements";
import { Separator } from "~/components/ui/separator";

export default function FormElementsSidebar() {
  return (
    <div>
      <p className="text-sm text-foreground/70">Drag and Drop Elements</p>
      <Separator className="my-2" />
      <div className="grid grid-cols-1 place-items-center gap-4 md:grid-cols-2 lg:gap-2">
        <p className="col-span-1 my-2 place-self-start text-sm md:col-span-2">
          Layout Elements
        </p>
        <SidebarBtnElement formElement={ProjectElements.TitleField} />
        <SidebarBtnElement formElement={ProjectElements.SubTitleField} />
        <SidebarBtnElement formElement={ProjectElements.ParagraphField} />
        <SidebarBtnElement formElement={ProjectElements.SeperatorField} />
        <SidebarBtnElement formElement={ProjectElements.SpacerField} />

        <p className="col-span-1 my-2 place-self-start text-sm md:col-span-2">
          Form Elements
        </p>
        <SidebarBtnElement formElement={ProjectElements.TextField} />
        <SidebarBtnElement formElement={ProjectElements.NumberField} />
        <SidebarBtnElement formElement={ProjectElements.TextAreaField} />
        <SidebarBtnElement formElement={ProjectElements.DateField} />
        <SidebarBtnElement formElement={ProjectElements.SelectField} />
        <SidebarBtnElement formElement={ProjectElements.CheckboxField} />
      </div>
    </div>
  );
}
