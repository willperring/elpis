from fastapi import APIRouter

router = APIRouter()

@router.post("/introduction")
async def introduction():
    return {"message": "Hello, world!"}