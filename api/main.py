from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os 
from supabase import create_client, Client

url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)

load_dotenv()  

app = Flask(__name__)
CORS(app)

@app.get("/")
def hello():
    response = supabase.table("chats").insert({"chat_id": "123"}).execute()
    return {"message": "Hello from Flask!"}
    
@app.post("/chat")
def create_chat():
    return 