"use client";

import { cn, idGenerator } from "~/lib/utils";
import { useDndMonitor, useDroppable } from "@dnd-kit/core";
import { DragEndEvent } from "@dnd-kit/core/dist/types";
import DesignerElementWrapper from "./DesignerElementWrapper";
import DesignerSidebar from "./DesignerSidebar";
import {
  ElementsType,
  ProjectElementInstance,
  ProjectElements,
} from "./ProjectElements";
import { SetStateAction, useState } from "react";

interface Props {
  projectId: number;
  elements: ProjectElementInstance[][];
  setElements: (e: any) => void;
}

export default function Designer({ projectId, elements, setElements }: Props) {
  const [selectedElement, setSelectedElement] =
    useState<SetStateAction<ProjectElementInstance | null>>(null);

  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });

  const addElement = (
    index: number,
    subIndex: number,
    element: ProjectElementInstance,
    isVerticalExtend?: boolean,
  ) => {
    setElements((prev: ProjectElementInstance[][]) => {
      const newElements = prev.map((row, i) => {
        if (i === index) {
          if (isVerticalExtend) {
            return row;
          } else {
            return [...row.slice(0, subIndex), element, ...row.slice(subIndex)];
          }
        }
        return row;
      });

      if (isVerticalExtend) {
        newElements.splice(index, 0, [element]);
      }

      return newElements;
    });
  };

  const removeElement = (id: string) => {
    setElements((prev: ProjectElementInstance[][]) =>
      prev
        .map((element) => element.filter((item) => item.id !== id))
        .filter((element) => element.length > 0),
    );
  };

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;
      const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement;
      const isDroppingOverDesignerDropArea =
        over.data?.current?.isDesignerDropArea;

      const droppingSidebarBtnOverDesignerDropArea =
        isDesignerBtnElement && isDroppingOverDesignerDropArea;

      // If we're dropping a sidebar button over the designer drop area
      if (droppingSidebarBtnOverDesignerDropArea) {
        const type = active.data?.current?.type;
        const newElement =
          ProjectElements[type as ElementsType].construct(idGenerator());

        addElement(elements.length, 0, newElement, true);
        return;
      }

      const isDroppingOverDesignerElementTopHalf =
        over.data?.current?.isTopHalfDesignerElement;

      const isDroppingOverDesignerElementBottomHalf =
        over.data?.current?.isBottomHalfDesignerElement;

      const isDroppingOverDesignerElementLeftHalf =
        over.data?.current?.isLeftHalfDesignerElement;

      const isDroppingOverDesignerElementRightHalf =
        over.data?.current?.isRightHalfDesignerElement;

      const isDroppingOverDesignerElement =
        isDroppingOverDesignerElementTopHalf |
        isDroppingOverDesignerElementBottomHalf |
        isDroppingOverDesignerElementLeftHalf |
        isDroppingOverDesignerElementRightHalf;

      const droppingSidebarBtnOverDesignerElement =
        isDesignerBtnElement && isDroppingOverDesignerElement;

      // If we're dropping a sidebar button over a designer element
      if (droppingSidebarBtnOverDesignerElement) {
        const type = active.data?.current?.type;
        const newElement =
          ProjectElements[type as ElementsType].construct(idGenerator());
        const overId = over.data?.current?.elementId;

        const isDraggingVertical = over.data?.current?.type === "group";
        if (isDraggingVertical) {
          let index = overId;
          if (isDroppingOverDesignerElementBottomHalf) index = overId + 1;

          addElement(index, 0, newElement, true);
        } else {
          let index = -1;
          let subIndex = -1;
          elements.some((row, i) => {
            const j = row.findIndex((element) => element.id === overId);
            if (j !== -1) {
              index = i;
              subIndex = j;
              return true;
            }
            return false;
          });
          let newElementIndex = subIndex;
          if (isDroppingOverDesignerElementRightHalf)
            newElementIndex = subIndex + 1;

          addElement(index, newElementIndex, newElement, false);
        }
        return;
      }

      // If we're dragging designer element over another designer element

      const isDraggingDesginerElement = active.data?.current?.isDesignerElement;

      const draggingDesignerElementOverDesignerElement =
        isDroppingOverDesignerElement && isDraggingDesginerElement;

      if (draggingDesignerElementOverDesignerElement) {
        const activeId = active.data?.current?.elementId;
        const overId = over.data?.current?.elementId;

        let activeElement: ProjectElementInstance | null = null;

        elements.map((row) => {
          const active = row.find((element) => element?.id === activeId);
          if (active) {
            activeElement = active;
            return true;
          }
          return false;
        });

        if (!activeElement) {
          throw new Error("Could not find element index");
        }
        removeElement(activeId);

        const isDraggingVertical = over.data?.current?.type === "group";
        if (isDraggingVertical) {
          let index = overId;
          if (isDroppingOverDesignerElementBottomHalf) index = overId + 1;

          addElement(index, 0, activeElement, true);
        } else {
          let index = -1;
          let subIndex = -1;
          elements.some((row, i) => {
            const j = row.findIndex((element) => element.id === overId);
            if (j !== -1) {
              index = i;
              subIndex = j;
              return true;
            }
            return false;
          });
          let newElementIndex = subIndex;
          if (isDroppingOverDesignerElementRightHalf)
            newElementIndex = subIndex + 1;

          addElement(index, newElementIndex, activeElement, false);
        }
        return;
      }
    },
  });

  return (
    <div className="flex h-full w-full">
      <div
        className="w-full p-4"
        onClick={() => {
          if (selectedElement) setSelectedElement(null);
        }}
      >
        <div
          ref={droppable.setNodeRef}
          className={cn(
            "m-auto flex h-full max-w-[920px] flex-1 flex-grow flex-col items-center justify-start overflow-auto rounded-xl bg-background",
            droppable.isOver && "ring-2 ring-inset ring-primary",
          )}
        >
          {!droppable.isOver && elements.length === 0 && (
            <p className="flex grow items-center text-3xl font-bold text-muted-foreground">
              Drop here
            </p>
          )}
          {droppable.isOver && elements.length === 0 && (
            <div className="w-full p-4">
              <div className="h-[120px] rounded-md bg-primary/20"></div>
            </div>
          )}
          {elements.length > 0 && (
            <div className="flex w-full flex-col gap-2 p-4">
              {elements.map((element, index) => (
                <DesignerElementWrapper
                  key={index}
                  element={element}
                  projectId={projectId}
                  index={index}
                  removeElement={removeElement}
                  setSelectedElement={setSelectedElement}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <DesignerSidebar
        selectedElement={selectedElement}
        setSelectedElement={setSelectedElement}
        setElements={setElements}
      />
    </div>
  );
}
