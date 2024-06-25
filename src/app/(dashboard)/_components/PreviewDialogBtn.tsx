import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { EyeIcon } from "lucide-react";
import React from "react";
import { ProjectElementInstance, ProjectElements } from "./ProjectElements";

interface Props {
  elements: ProjectElementInstance[][];
}

export default function PreviewDialogBtn({ elements }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="gap-2">
          <EyeIcon className="h-5 w-5" />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-screen max-h-screen w-screen max-w-full grow flex-col gap-0 p-0">
        <div className="border-b px-4 py-2">
          <p className="text-xl font-bold">Project Preview</p>
          <p className="text-sm text-muted-foreground">
            This is what your project will look like to your users.
          </p>
        </div>
        <div className="bg-paper-pattern dark:bg-paper-pattern-dark flex grow flex-col items-center justify-center overflow-y-auto bg-accent p-4">
          <div className="flex h-full w-full max-w-[650px] grow flex-col gap-4 rounded-2xl bg-background p-8">
            {elements.map((element) => {
              return (
                <div className="w-ful flex">
                  {element.map((item) => {
                    const ProjectComponent =
                      ProjectElements[item.type].projectComponent;
                    return (
                      <ProjectComponent key={item.id} elementInstance={item} />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
