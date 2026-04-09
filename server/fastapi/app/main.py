from fastapi import FastAPI, Request
from openai import OpenAI

from .core.config import settings
from .routes.introduction import router as introduction_router

app = FastAPI(
    title="Elpis FastAPI Server"
)

app.include_router(introduction_router)

model = OpenAI(
    api_key=settings.OPENAI_KEY
)

@app.get("/")
async def root(request: Request):
    return {"hello": "world"}
