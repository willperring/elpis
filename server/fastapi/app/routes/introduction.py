from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field

from app.core.config import settings
from app.model import with_model, system_prompts

from pprint import pprint

router = APIRouter()

introduction_prompts = [
    { "role": "system", "content": "We are meeting a new user, and are getting their communucation preferences." }
]

class IntroductionRequest(BaseModel):
    name: str = Field(..., description="The first name of the user", example="John")

class IntroductionResponse(BaseModel):
    greeting: str = Field(..., description="A generic greeting to the user")
    intro_mindset: str = Field(..., description="A greeting and a cheery question to the user, to ask how they're feeling today. "
        + "We're specifically interested in their mental state and how productive they feel.")

@router.post("/introduction")
async def introduction(
    request: IntroductionRequest,
    model = Depends(with_model)
) -> IntroductionResponse:
    response = model.responses.parse(
        model=settings.OPENAI_MODEL,
        text_format=IntroductionResponse,
        input=[
            *system_prompts,
            *introduction_prompts,
            {
                "role": "system",
                "content": f"Create personalised messages for a user named {request.name}. Be warm and personable."
            }
        ]
    )

    pprint( response.usage )

    if response.output_parsed:
        return response.output_parsed


    raise HTTPException(
        status_code=500,
        detail="Something went wrong"
    )