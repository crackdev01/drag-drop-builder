import { Suspense } from "react";
import { Separator } from "~/components/ui/separator";
import CreateProjectBtn from "../_components/CreateProjectBtn";
import ProjectCardSkeleton from "../_components/ProjectCardSkeleton";
import ProjectCards from "../_components/ProjectCards";

export default function DashboardPage() {
  return (
    <div className="container pt-4">
      <h2 className="text-2xl font-bold text-zinc-50">All Your Projects</h2>
      <Separator className="my-6" />
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        <CreateProjectBtn />
        <Suspense
          fallback={[...Array(5)].map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        >
          <ProjectCards />
        </Suspense>
      </div>
    </div>
  );
}
