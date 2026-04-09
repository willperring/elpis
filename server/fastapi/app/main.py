from fastapi import FastAPI, Request

app = FastAPI(
    title="Elpis FastAPI Server"
)

@app.get("/")
async def root(request: Request):
    return {"hello": "world"}