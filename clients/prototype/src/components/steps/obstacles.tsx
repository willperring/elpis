import { Button } from "@/components/button.tsx";

export const Obstacles = () =>
{
  const canSubmit = true;

  const onSubmit = () => {

  }

  return (
    <>
      <div className="step-wrapper">
        <h2>Obstacles</h2>
        <p>value</p>
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