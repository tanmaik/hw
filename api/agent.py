from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
import os 
load_dotenv()

from langchain_community.tools.tavily_search import TavilySearchResults

search = TavilySearchResults(max_results=2)
tools = [search]

model = ChatOpenAI(model="gpt-4o", api_key=os.getenv("OPENAI_API_KEY"))
model_with_tools = model.bind_tools(tools)

from langchain_core.messages import HumanMessage
response = model_with_tools.invoke([HumanMessage(content="What's the weather in SF?")])

print(f"ContentString: {response.content}")
print(f"ToolCalls: {response.tool_calls}")

from langgraph.prebuilt import create_react_agent

agent_executor = create_react_agent(model, tools)

response = agent_executor.invoke({"messages": [HumanMessage(content="hi!")]})

response["messages"]