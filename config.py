import os 
from dotenv import load_dotenv
load_dotenv()
OPEN_AI_API_KEY=os.getenv("OPEN_AI_API_KEY")
APP_API_KEY=os.getenv("APP_API_KEY")

OPENAI_MODEL=os.getenv("OPENAI_MODEL", "gpt-4.1-mini")
EMBEDDING_MODEL=os.getenv("EMBEDDING_MODEL", "text-embedding-3-small")

DB_NAME=os.getenv("DB_NAME", "support.db")
CHROMA_PATH=os.getenv("CHROMA_PATH", "./vector_store/chroma_db")