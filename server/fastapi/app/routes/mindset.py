from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field
from textwrap import dedent

from app.core.config import settings
from app.model import with_model, system_prompts

from pprint import pprint

router = APIRouter()

mindset_instruction = '''
    We are trying to understand the nature of a task the user wants to complete.
    Be mindful of their current state of mind when addressing them, and be sure to acknowledge how they feel in your responses.
    Include a few sentences of encouragement and smalltalk at the start of your response.
'''

mindset_prompts = [
    { "role": "system", "content": dedent(mindset_instruction) }
]

class MindsetRequest(BaseModel):
    name: str = Field(..., description="The first name of the user", example="John")
    mindset: str = Field(..., description="A description of the user's current mental state")

class MindsetResponse(BaseModel):
    intro_objective: str = Field(..., description="A question to the user to determine what they want to accomplish.")

@router.post("/mindset")
async def mindset(
    request: MindsetRequest,
    model = Depends(with_model)
) -> MindsetResponse:
    response = model.responses.parse(
        model=settings.OPENAI_MODEL,
        text_format=MindsetResponse,
        input=[
            *system_prompts,
            {
                "role": "user",
                "content": f"My name is {request.name}"
            },
            {
                "role": "user",
                "content": f"I would describe myself as feeling {request.mindset}."
            },
            *mindset_prompts,
        ]
    )

    pprint( response.usage )

    if response.output_parsed:
        return response.output_parsed

    raise HTTPException(
        status_code=500,
        detail="Something went wrong"
    )