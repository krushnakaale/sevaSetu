from fastapi import APIRouter
from app.controllers.hero_controller import get_all_services, create_service
from app.models.service_model import Service

router = APIRouter(prefix="/services", tags=["services"])

@router.get("/")
async def read_services():
    return await get_all_services()

@router.post("/")
async def add_service(service: Service):
    return await create_service(service)
