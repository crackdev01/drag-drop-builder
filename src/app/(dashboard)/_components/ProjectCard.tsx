"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { useToast } from "~/components/ui/use-toast";
import { Project } from "@prisma/client";
import { formatDistance } from "date-fns";
import { Edit, Loader2, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "~/trpc/react";

export default function ProjectCard({ project }: { project: Project }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const deleteProject = api.project.delete.useMutation({
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Project deleted successfully.",
      });
      setLoading(false);
      setOpen(false);
      router.refresh();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Couldn't delete project.",
      });
      setLoading(false);
      setOpen(false);
    },
  });

  function deleteProjectHandler() {
    setLoading(true);
    deleteProject.mutate(project.id);
  }

  return (
    <Card className="min-h-[195px]">
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          <span className="truncate text-xl font-bold">{project.name}</span>
        </CardTitle>
        <CardDescription>
          {formatDistance(project.createdAt, new Date(), {
            addSuffix: true,
          })}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
        {project.description || "No description provided"}
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button asChild className="mt-2 w-full gap-4 text-sm text-zinc-50">
          <Link href={`/builder/${project.id}`}>
            Edit Project <Edit className="h-4 w-4" />
          </Link>
        </Button>
        <AlertDialog open={open}>
          <AlertDialogTrigger asChild>
            <Button
              variant={"destructive"}
              onClick={() => setOpen(true)}
              className="w-full items-center gap-4"
            >
              Delete
              <Trash className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete this project?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpen(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={deleteProjectHandler}
                className="bg-rose-500 text-zinc-50 hover:bg-rose-600"
              >
                {loading && <Loader2 className="mr-2 animate-spin" />}
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
