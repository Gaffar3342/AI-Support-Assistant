from enum import Enum
from pydantic import BaseModel
class Category(str,Enum):
    shipping="shipping"
    billing="billing"
    technical="technical"
    general="general"
class Priorty(str,Enum):
    low="low"
    medium="medium"
    high="high"
class sentiment(str,Enum):
    positive="positive"
    negative="negative"
    neutral="neutral"
class SupportRequest(BaseModel):
   message:str
class AIAnalysis(BaseModel):
    sentiment:sentiment
    category:Category
    priorty:Priorty
    reply:str