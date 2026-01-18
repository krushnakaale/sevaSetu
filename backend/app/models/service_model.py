from pydantic import BaseModel, Field

class Service(BaseModel):
    id: str | None = Field(alias="_id")
    name: str
    description: str
