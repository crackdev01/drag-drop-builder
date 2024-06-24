"use client";

import { Button } from "~/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { toast } from "~/components/ui/use-toast";
import { Loader, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { ProjectSchema, projectSchema } from "~/schemas/project";
import { useState } from "react";

export default function CreateProjectBtn() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const project = useForm<ProjectSchema>({
    resolver: zodResolver(projectSchema),
  });

  const create = api.project.create.useMutation({
    onSuccess: (res) => {
      toast({
        title: "Success",
        description: "Project created successfully",
      });
      setLoading(false);

      router.push(`/builder/${res.id}`);

      project.reset({
        name: "",
        description: "",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Couldn't create project",
        variant: "destructive",
      });
      setLoading(false);
    },
  });

  const onSubmit = (values: ProjectSchema) => {
    setLoading(true);
    create.mutate(values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="group flex h-[250px] w-full flex-col items-center justify-center gap-4 border border-dashed border-primary/20 hover:cursor-pointer hover:border-primary"
        >
          <Plus className="h-8 w-8 text-muted-foreground group-hover:text-primary" />
          <p className="text-base font-bold text-muted-foreground group-hover:text-primary">
            Create New Project
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>This is a description</DialogDescription>
        </DialogHeader>

        {/* Form input */}
        <Form {...project}>
          <form onSubmit={project.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={project.control}
              name="name"
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Project Name</FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Name of your project..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{formState.errors.name?.message}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={project.control}
              name="description"
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      id="description"
                      rows={5}
                      placeholder="Description of your form..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>
                    {formState.errors.description?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <Button
            onClick={project.handleSubmit(onSubmit)}
            disabled={loading}
            className="mt-4 w-full font-semibold text-zinc-50"
          >
            {!loading && <span>Create Project</span>}
            {loading && (
              <div className="inline-flex items-center gap-2">
                <Loader className="w-5 animate-spin" />
                <span>Creating...</span>
              </div>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
