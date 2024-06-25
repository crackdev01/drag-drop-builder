import FormElementsSidebar from "./FormElementsSidebar";
import PropertiesFormSidebar from "./PropertiesFormSidebar";
import { ScrollArea } from "~/components/ui/scroll-area";
import { ProjectElementInstance } from "./ProjectElements";
import { SetStateAction } from "react";

interface Props {
  selectedElement: SetStateAction<ProjectElementInstance | null>;
  setSelectedElement: (element: any) => void;
  setElements: (element: any) => void;
}

export default function DesignerSidebar({
  selectedElement,
  setSelectedElement,
  setElements,
}: Props) {
  return (
    <aside className="flex h-full w-[400px] max-w-[400px] grow flex-col gap-2 overflow-y-auto border-l-2 border-border bg-background p-4">
      <ScrollArea>
        {!selectedElement && <FormElementsSidebar />}
        {selectedElement && (
          <PropertiesFormSidebar
            selectedElement={selectedElement}
            setSelectedElement={setSelectedElement}
            setElements={setElements}
          />
        )}
      </ScrollArea>
    </aside>
  );
}
