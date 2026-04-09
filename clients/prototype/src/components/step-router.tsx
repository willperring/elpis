import { Introduction } from "@/components/steps/introduction.tsx";
import { Mindset } from "@/components/steps/mindset.tsx";
import { Objective } from "@/components/steps/objective.tsx";
import { Obstacles } from "@/components/steps/obstacles.tsx";
import { useAppState } from "@/state/provider.tsx";
import { Stages } from "@/state/reducer.ts";
import { Review } from "@/components/steps/review.tsx";

export const StepRouter = () =>
{
  const { name, activeStage, objectiveTitle } = useAppState();

  return (
    <>
      <h1>Elpis</h1>

      { name && <p>Hello {name}!</p> }

      { objectiveTitle && (
        <div className="step-wrapper">
          <div className="flex flex-col gap-0 p-4 rounded-lg border-2 bg-green-700 border-green-900">
            <span className="text-sm font-bold">Achievement Waiting</span>
            <p>{ objectiveTitle }</p>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4 w-full justify-stretch">

        { activeStage === Stages.INTRODUCTION && <Introduction /> }
        { activeStage === Stages.MINDSET      && <Mindset />   }
        { activeStage === Stages.OBJECTIVE    && <Objective /> }
        { activeStage === Stages.OBSTACLES    && <Obstacles /> }
        { activeStage === Stages.REVIEW       && <Review />    }

      </div>
    </>
  )
}
