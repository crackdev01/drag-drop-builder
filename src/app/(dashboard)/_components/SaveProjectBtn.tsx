import { Button } from "~/components/ui/button";
import { toast } from "~/components/ui/use-toast";
import { Loader2, Save } from "lucide-react";
import { useState } from "react";
import { ProjectElementInstance } from "./ProjectElements";
import { api } from "~/trpc/react";

interface Props {
  elements: ProjectElementInstance[][];
  id: number;
}
export default function SaveProjectBtn({ id, elements }: Props) {
  const [loading, setLoading] = useState(false);

  const create = api.project.updateContent.useMutation({
    onSuccess: (res) => {
      toast({
        title: "Project Saved!",
        description: "Your project has been saved.",
      });
      setLoading(false);
    },
    onError: (error) => {
      toast({
        title: "Project Not Saved!",
        description: "Your project has not been saved.",
        variant: "destructive",
      });
      setLoading(false);
    },
  });
  const updateFormContent = async () => {
    setLoading(true);
    const jsonElements = JSON.stringify(elements);
    create.mutate({ id, jsonElements });
  };

  return (
    <Button
      variant={"secondary"}
      className="gap-2"
      disabled={loading}
      onClick={updateFormContent}
    >
      {loading ? (
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
      ) : (
        <Save className="mr-2 h-5 w-5" />
      )}
      Save
    </Button>
  );
}
