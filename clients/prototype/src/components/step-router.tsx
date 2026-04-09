import { Introduction } from "@/components/steps/introduction.tsx";
import { Mindset } from "@/components/steps/mindset.tsx";
import { Objective } from "@/components/steps/objective.tsx";
import { Obstacles } from "@/components/steps/obstacles.tsx";
import { useAppState } from "@/state/provider.tsx";
import { Stages } from "@/state/reducer.ts";

export const StepRouter = () =>
{
  const { name, activeStage } = useAppState();

  return (
    <>
      <h1>Elpis</h1>

      { name && <p>Hello {name}!</p> }

      <div className="flex flex-col gap-4 w-full justify-stretch">

        { activeStage === Stages.INTRODUCTION && <Introduction /> }
        { activeStage === Stages.MINDSET      && <Mindset /> }
        { activeStage === Stages.OBJECTIVE    && <Objective /> }
        { activeStage === Stages.OBSTACLES    && <Obstacles /> }

      </div>
    </>
  )
}