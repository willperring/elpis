import { Button } from "@/components/button.tsx";
import { useAppState } from "@/state/provider.tsx";

export const Objective = () =>
{
  const { introObjective } = useAppState();

  const canSubmit = true;

  const onSubmit = () => {

  }

  return (
    <>
      <div className="step-wrapper">
        <h2>Objective</h2>
        <p>{ introObjective }</p>
        <Button
          className="mt-2"
          onPress={ onSubmit }
          disabled={ ! canSubmit }
          title="Submit"
        />
      </div>
    </>
  )
}