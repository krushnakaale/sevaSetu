from motor.motor_asyncio import AsyncIOMotorClient
import asyncio

client = AsyncIOMotorClient("mongodb://localhost:27017")
db = client["aipp"]  # DATABASE_NAME

async def insert_test():
    service = {"name": "Test Service", "description": "This is a test"}
    result = await db.services.insert_one(service)  # "services" collection
    print("Inserted ID:", result.inserted_id)

asyncio.run(insert_test())
