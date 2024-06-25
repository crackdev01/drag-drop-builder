import {
  ElementsType,
  ProjectElementInstance,
  ProjectElements,
} from "./ProjectElements";
import { SidebarBtnElementOverlay } from "./SidebarBtnElement";
import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { useState } from "react";

interface Props {
  elements: ProjectElementInstance[][];
}

export default function DragOverlayWrapper({ elements }: Props) {
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);

  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    },
  });

  if (!draggedItem) return null;

  let node = <div>No drag overlay</div>;

  const isSidebarBtnElement = draggedItem.data?.current?.isDesignerBtnElement;

  if (isSidebarBtnElement) {
    const type = draggedItem.data?.current?.type as ElementsType;
    node = <SidebarBtnElementOverlay formElement={ProjectElements[type]} />;
  }

  const isDesignerElement = draggedItem.data?.current?.isDesignerElement;
  if (isDesignerElement) {
    const elementId = draggedItem.data?.current?.elementId;
    let element: ProjectElementInstance | undefined;

    elements.map((row) => {
      const item = row.find((element) => element?.id === elementId);
      if (item) {
        element = item;
        return true;
      }
      return false;
    });

    if (!element) node = <div>Element not found!</div>;
    else {
      const DesignerElementComponent =
        ProjectElements[element.type].designerComponent;

      node = (
        <div className="pointer-events-none flex h-[120px] w-full rounded-md border bg-accent px-4 py-2 opacity-80">
          <DesignerElementComponent elementInstance={element} />
        </div>
      );
    }
  }

  return <DragOverlay>{node}</DragOverlay>;
}
