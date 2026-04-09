import { useAppState } from "@/state/provider.tsx";

export const Review = () =>
{
  const {
    conversationId,
    introReview,
    objectiveTitle,
    obstaclesTitle
  } = useAppState();

  return (
    <>
      <div className="step-wrapper">
        <div className="flex flex-col gap-4">
          <div>
            <h2>Review</h2>
            <p className="mb-5">{ introReview }</p>
          </div>
          <div>
            <h2 className="mt-4">{ objectiveTitle }</h2>
            <p>{ obstaclesTitle }</p>
          </div>
        </div>
      </div>
    </>
  )
}
