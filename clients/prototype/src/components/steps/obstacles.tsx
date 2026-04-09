import { Button } from "@/components/button.tsx";
import { useAppState } from "@/state/provider.tsx";

export const Obstacles = () =>
{
  const { introObstacles } = useAppState();

  const canSubmit = true;

  const onSubmit = () => {

  }

  return (
    <>
      <div className="step-wrapper">
        <h2>Obstacles</h2>
        <p>{ introObstacles }</p>
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
