from fastapi import FastAPI,HTTPException
from database.sqlite_db import init_db
from models.schemas import SupportRequest
from services.rag_service import index_pdf,retrieve_context
from services.ai_service import analyze_message_with_ai
from services.ticket_service import save_tickets,get_all_tickets,get_ticket_by_id
from fastapi.middleware.cors import CORSMiddleware

app=FastAPI(
    title="AI SUPPORT ASSISTANT",
    version="1.0.0"
)

init_db()

@app.get("/")
def root():
    return{"message":"AI Support Assistant is running"}

@app.post("/knowledge/index")
def index_knowledge_base():
    try:
        result=index_pdf(pdf_path="knowledge_base/support_kb.pdf",source_name="support_kb.pdf")
        return {"success":True
                ,"result":result}
    except Exception as e:
        raise HTTPException(status_code=500,detail=str(e)) 
@app.post("/support/analyze")
def analyze_support(request:SupportRequest):
    if len(request.message.strip())==0:
        raise HTTPException(status_code=400,detail="Message cannot be empty")
    try:
        context=retrieve_context(request.message)
        analysis=analyze_message_with_ai(message=request.message,context=context)
        save_tickets(user_message=request.message,
                     category=analysis['category'],
                     priorty=analysis['priorty'],
                     sentiment=analysis['sentiment'],
                     ai_reply=analysis['reply'],
                     status="open")
        
        return{"success":True,"context_used":context,"analysis":analysis}
    except ValueError as e :
        raise HTTPException(status_code=502,detail={"error_code":str(e),"message":"AI invalid output"})
    except Exception as e:
        raise HTTPException(status_code=500,detail={"error_code":str(e),"message":"AI analysis failed"})
@app.get("/tickets")
def list_tickets():
    tickets=get_all_tickets()
    return {"success":True,"count":len(tickets),"tickets":tickets}

@app.get("/ticket/{ticket_id}")
def get_ticket_by_id_route(ticket_id: int):
    ticket = get_ticket_by_id(ticket_id)
    if ticket is None:
        raise HTTPException(
            status_code=404,
            detail={
                "error_code": "TICKET_NOT_FOUND",
                "message": "ticket not found"
            }
        )
    return {"success": True, "ticket": ticket}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
