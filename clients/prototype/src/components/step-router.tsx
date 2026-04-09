import { Introduction } from "@/components/steps/introduction.tsx";
import { Mindset } from "@/components/steps/mindset.tsx";
import { Objective } from "@/components/steps/objective.tsx";
import { Obstacles } from "@/components/steps/obstacles.tsx";

export const StepRouter = () =>
{
  return (
    <>
      <h1>Step Router</h1>

      <div className="flex flex-col gap-4 w-full justify-stretch">
        <Introduction />
        <Mindset />
        <Objective />
        <Obstacles />
      </div>
    </>
  )
}