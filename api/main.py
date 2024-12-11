from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os 
import json
from .agent import chat
from supabase import create_client, Client
load_dotenv()  

url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)

app = Flask(__name__)
CORS(app)
 
@app.post("/chat")
def create_chat():
    try:
        print('creating chat')
        response = supabase.table("chats").upsert({ "messages": [] }).execute()
        return response.data
    except Exception as e:
        print(f"Error: {str(e)}")
        return {"error": str(e)}, 500
    
@app.get("/test")
def test_message():
    print("getting response")
    response = chat()
    print(response)
    return response

def start_server():
    app.run(debug=True)
