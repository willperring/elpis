import { useAppState } from "@/state/provider.tsx";

export const Advice = () =>
{
  const { adviceTitle, adviceDescription, adviceSteps } = useAppState();

  return (
    <>
      <div className="step-wrapper flex flex-col gap-4">
        <h2>Advice</h2>
        <p className="text-lg">{ adviceTitle }</p>
        <p>{ adviceDescription }</p>
        <ul className="flex flex-col gap-6 mt-5">
          { adviceSteps.map( (step, index) => (
            <li className="flex flex-col gap-2" key={index}>
              <p>{ step.step_title }</p>
              <p className="text-sm">
                { step.step_description }
              </p>
            </li>
          )) }
        </ul>
      </div>
    </>
  )
}
