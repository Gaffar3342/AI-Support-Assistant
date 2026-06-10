import json
from openai import OpenAI
from config import OPEN_AI_API_KEY,OPENAI_MODEL
from utils.logger import logger
from models.schemas import AIAnalysis

client=openai=OpenAI(api_key=OPEN_AI_API_KEY)
def analyze_message_with_ai(message:str,context:str)->dict:
    prompt=f"""
    You are a professional customer support analysis specialist.
    Analyze the customer message and suggest a helpful reply.
    Use the retrieved context when it is relevant. If the context is
    insufficient, provide a careful general response without inventing facts.

    Retrieved context:
    {context}

    Customer message:
    {message}

    Return only valid JSON in this exact format:
    {{
      "category": "shipping" or "billing" or "technical" or "general",
      "priorty": "low" or "medium" or "high",
      "sentiment": "positive" or "negative" or "neutral",
      "reply": "a concise, professional response to the customer"
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
        raise ValueError("The AI service returned an empty response.")
    try:
        data=json.loads(raw_output)
    except json.JSONDecodeError as e:
        logger.error(f"JSON decode error: {e}")
        raise ValueError("The AI response is not valid JSON.")
    validated=AIAnalysis(**data)

    return validated.model_dump()
