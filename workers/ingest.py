from langchain_community.document_loaders import PyPDFLoader

import wget

url = "https://example.com/documents/syllabi/MATH3250.pdf"  # Replace with actual URL
wget.download(url, "documents/syllabi/MATH3250.pdf")

loader = PyPDFLoader("documents/syllabi/MATH3250.pdf")
pages = loader.load_and_split()

import os 
from dotenv import load_dotenv
load_dotenv()

from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings

chroma = Chroma.from_documents(pages, OpenAIEmbeddings(model="text-embedding-3-large"), persist_directory="chroma")


