from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI

from .routes.introduction import router as introduction_router
from .routes.mindset import router as mindset_router

app = FastAPI(
    title="Elpis FastAPI Server"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5174",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(introduction_router)
app.include_router(mindset_router)


@app.get("/")
async def root(request: Request):
    return {"hello": "world"}
