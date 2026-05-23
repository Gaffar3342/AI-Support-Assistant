import json 
from openai import OpenAI
from config import OPEN_AI_API_KEY,OPENAI_MODEL,EMBEDDING_MODEL
from utils.logger import logger
from models.schemas import AIAnalysis

client=openai=OpenAI(api_key=OPEN_AI_API_KEY)
def analyze_message_with_ai(message:str,context:str)->dict:
    prompt=f"""   
    Sen Profesyonel bir müşteri destek analiz uzmanısın.
    Görev: Kullanıcının mesajını analiz et ve cevap öner.
    Sadece aşşağıdaki contexti kullan 
    eğer context yetersiz ise genel ve dikkatli cevap ver.
    Context: {context}
    Kullanıcı Mesajı: {message}
    sadece json formatında cevap ver.
    Cevap formatı:
    {{
    "category":"shipping" veya "billing" veya "technical support" veya "general inquiry",
    "priorty":"low" veya "medium" veya "high",
    "sentiment":"positive" veya "negative" veya "neutral",
    "reply":"kullanıcı mesajına uygun profesyonel bir cevap"
    }}
    """
    response=client.responses.create(
        model=OPENAI_MODEL,
        input=prompt,
        max_output_tokens=500,
    )
    raw_output=response.output_text.strip()
    if raw_output.startswith("```json"):
        raw_output=raw_output.replace("```json","").replace("```","").strip()
    elif raw_output.startswith("```"):
        raw_output=raw_output.replace("```","").strip()
    
    if not raw_output:
        raise ValueError("AI'den geçerli bir cevap alınamadı.")
    try:
        data=json.loads(raw_output)
    except json.JSONDecodeError as e:
        logger.error(f"JSON decode error: {e}")
        raise ValueError("AI cevabı JSON formatında değil.")
    validated=AIAnalysis(**data)
    
    return validated.model_dump()