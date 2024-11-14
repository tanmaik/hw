from langchain_community.document_loaders import PyPDFLoader

loader = PyPDFLoader("documents/syllabi/MATH3250.pdf")
pages = loader.load_and_split()

print(pages[0])