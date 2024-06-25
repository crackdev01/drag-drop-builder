import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { Trash } from "lucide-react";
import { useState } from "react";
import { ProjectElementInstance, ProjectElements } from "./ProjectElements";

interface Props {
  element: ProjectElementInstance[];
  index: number;
  projectId: number;
  removeElement: (id: string) => void;
  setSelectedElement: (element: any) => void;
}
interface ItemProps {
  item: ProjectElementInstance;
  removeElement: (id: string) => void;
  setSelectedElement: (element: any) => void;
}

export default function DesignerElementWrapper({
  element,
  index,
  removeElement,
  setSelectedElement,
}: Props) {
  const topHalf = useDroppable({
    id: index + "-top",
    data: {
      type: "group",
      elementId: index,
      isTopHalfDesignerElement: true,
    },
  });

  const bottomHalf = useDroppable({
    id: index + "-bottom",
    data: {
      type: "group",
      elementId: index,
      isBottomHalfDesignerElement: true,
    },
  });

  return (
    <div className="relative flex h-[120px] w-full flex-col rounded-md text-foreground ring-1 ring-inset ring-accent hover:cursor-pointer">
      <div>
        <div
          ref={topHalf.setNodeRef}
          className="absolute top-0 h-1/2 w-full rounded-t-md"
        />
        <div
          ref={bottomHalf.setNodeRef}
          className="absolute bottom-0 h-1/2 w-full rounded-b-md"
        />
        {topHalf.isOver && (
          <div className="absolute top-0 h-[8px] w-full rounded-md rounded-b-none bg-primary" />
        )}

        <div className="flex">
          {element.map((item) => (
            <DesignerItemWrapper
              item={item}
              setSelectedElement={setSelectedElement}
              removeElement={removeElement}
            />
          ))}
        </div>
        {bottomHalf.isOver && (
          <div className="absolute bottom-0 h-[8px] w-full rounded-md rounded-t-none bg-primary" />
        )}
      </div>
    </div>
  );
}

function DesignerItemWrapper({
  item,
  setSelectedElement,
  removeElement,
}: ItemProps) {
  const [mouseOver, setMouseOver] = useState(false);
  const DesignerElement = ProjectElements[item.type].designerComponent;
  const leftHalf = useDroppable({
    id: item.id + "-left",
    data: {
      type: item.type,
      elementId: item.id,
      isLeftHalfDesignerElement: true,
    },
  });

  const rightHalf = useDroppable({
    id: item.id + "-right",
    data: {
      type: item.type,
      elementId: item.id,
      isRightHalfDesignerElement: true,
    },
  });

  const draggable = useDraggable({
    id: item.id + "-drag-handle",
    data: {
      type: item.type,
      elementId: item.id,
      isDesignerElement: true,
    },
  });

  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.attributes}
      {...draggable.listeners}
      className="relative flex h-[120px] w-full flex-col rounded-md text-foreground ring-1 ring-inset ring-accent hover:cursor-pointer"
      onMouseOver={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement(item);
      }}
    >
      <div
        ref={leftHalf.setNodeRef}
        className="absolute left-0 h-full w-1/2 rounded-l-md"
      ></div>
      <div
        ref={rightHalf.setNodeRef}
        className="absolute right-0 h-full w-1/2 rounded-r-md"
      ></div>
      {mouseOver && (
        <>
          <div className="absolute right-0 z-10 h-full">
            <Button
              className="flex h-full justify-center rounded-md rounded-l-none border bg-red-500"
              size={"icon"}
              variant={"outline"}
              onClick={(e) => {
                e.stopPropagation();
                removeElement(item.id);
              }}
            >
              <Trash className="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
            <p>Click for properties or drag to move</p>
          </div>
        </>
      )}
      <div
        className={cn(
          "pointer-events-none flex h-[120px] w-full items-center rounded-md bg-accent/40 px-4 py-2",
          mouseOver && "opacity-30",
        )}
      >
        {leftHalf.isOver && (
          <div className="absolute left-0 h-full w-[8px] bg-primary"></div>
        )}
        <DesignerElement elementInstance={item} />
        {rightHalf.isOver && (
          <div className="absolute right-0 h-full w-[8px] bg-primary"></div>
        )}
      </div>
    </div>
  );
}
