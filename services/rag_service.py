import chromadb
from pypdf import PdfReader
from openai import OpenAI
from config import OPEN_AI_API_KEY,EMBEDDING_MODEL,CHROMA_PATH

client_openai=OpenAI(api_key=OPEN_AI_API_KEY)
client_chroma=chromadb.PersistentClient(path=CHROMA_PATH)
collection=client_chroma.get_or_create_collection(name="support_knowledge_base")
def extract_text_from_pdf(pdf_path:str)->str:
    reader=PdfReader(pdf_path)
    full_text=""
    for page in reader.pages:
        text=page.extract_text()
        if text:
            full_text+=text+"\n"
    return full_text
def chunk_text(text:str,chunk_size:int=500,overlap:int=50):
    chunks=[]
    start=0
    while start<len(text):
        end=start+chunk_size
        chunk=text[start:end]
        chunks.append(chunk)
        start+=chunk_size-overlap
    return chunks
def create_embeddings(text:str):
    response=client_openai.embeddings.create(model=EMBEDDING_MODEL,input=text)
    return response.data[0].embedding
def index_pdf(pdf_path:str,source_name:str):
    full_text=extract_text_from_pdf(pdf_path)
    chunks=chunk_text(full_text)
    ids=[]
    embeddings=[]
    metadatas=[]
    
    for i,chunk in enumerate(chunks):
        ids.append(f"{source_name}_chunk_{i}")
        embeddings.append(create_embeddings(chunk))
        metadatas.append({"source":source_name,"chunk_index":i})
    collection.add(documents=chunks,ids=ids,embeddings=embeddings,metadatas=metadatas)
    
    return {"source":source_name,"chunks_index":len(chunks)}
def retrieve_context(question:str,n_results:int=5):
    question_embedding=create_embeddings(question)
    results=collection.query(query_embeddings=[question_embedding],n_results=n_results)
    contexts=results['documents'][0]
    return "\n".join(contexts)