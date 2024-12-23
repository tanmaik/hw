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

from langgraph.prebuilt import create_react_agent

agent_executor = create_react_agent(model, tools)

async def process_agent_response():
    async for event in agent_executor.astream_events(
        {"messages": [HumanMessage(content="what is the recent news about the united healthcare ceo")]}, version="v1"
    ):
        kind = event["event"]
        if kind == "on_chain_start":
            if event["name"] == "Agent":
                print(f"Starting agent: {event['name']} with input: {event['data'].get('input')}")
        elif kind == "on_chain_end":
            if event["name"] == "Agent":
                print()
                print("--")
                print(f"Done agent: {event['name']} with output: {event['data'].get('output')['output']}")
        if kind == "on_chat_model_stream":
            content = event["data"]["chunk"].content
            if content:
                print(content, end="")
        elif kind == "on_tool_start":
            print("--")
            print(f"Starting tool: {event['name']} with inputs: {event['data'].get('input')}")
        elif kind == "on_tool_end":
            print(f"Done tool: {event['name']}")
            print(f"Tool output was: {event['data'].get('output')}")
            print("--")

# Add this at the bottom to run the async function
if __name__ == "__main__":
    import asyncio
    asyncio.run(process_agent_response())