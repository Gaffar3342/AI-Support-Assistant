from database.sqlite_db import get_connection

def save_tickets(user_message,category,priorty,sentiment,ai_reply,status):
    conn=get_connection()
    cursor=conn.cursor()
    cursor.execute('''INSERT INTO tickets (user_message,category,priorty,sentiment,ai_reply,status) VALUES (?,?,?,?,?,?)''',
                   (user_message,category,priorty,sentiment,ai_reply,status))
    conn.commit()
    conn.close()

def get_all_tickets():
    conn=get_connection()
    cursor=conn.cursor()
    cursor.execute('''SELECT id,user_message,category,priorty,sentiment,ai_reply,status,created_at FROM tickets ORDER BY id DESC''')
    rows=cursor.fetchall()
    conn.close()
    tickets=[]
    for row in rows:
        tickets.append({
            "id":row[0],
            "user_message":row[1],
            "category":row[2],
            "priorty":row[3],
            "sentiment":row[4],
            "ai_reply":row[5],
            "status":row[6],
            "created_at":row[7]
        })
    return tickets 

def get_ticket_by_id(ticket_id):
    conn=get_connection()
    cursor=conn.cursor()
    cursor.execute('''SELECT id,
                   user_message,
                   category,
                   priorty,
                   sentiment,
                   ai_reply,
                   status,
                   created_at
                   FROM tickets
                   WHERE id=?
                   ''',(ticket_id,))
    row=cursor.fetchone()
    conn.close()
    if row is None:
        return None
    return{
        "id":row[0],
        "user_message":row[1],
        "category":row[2],
        "priorty":row[3],
        "sentiment":row[4],
        "ai_reply":row[5],
        "status":row[6],
        "created_at":row[7]
    }