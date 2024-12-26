import os
import sys
from dotenv import load_dotenv
load_dotenv()
from langchain_openai import ChatOpenAI
import json
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import asyncio

from browser_use import Agent, Browser, Controller, SystemPrompt
from browser_use.browser.browser import BrowserConfig
from pydantic import BaseModel, Field
from typing import Optional

controller = Controller()

async def main():
    browser = Browser(config=BrowserConfig(chrome_instance_path='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'))

    async with await browser.new_context() as context:

      model = ChatOpenAI(model='gpt-4o')
   
      task = '''
      You are a news reporter. You are given a news article and you are tasked with writing a summary of the article.
      Gather a bunch of sources that you can on the internet about: 

      Azerbaijan Airlines Flight 8243

      
      Find at least 8 sources and output all of the urls once you find them.
      '''
    
      agent1 = Agent(
            task=task,
            llm=model,
            browser_context=context,
            controller=controller
      )
    
      await agent1.run()


asyncio.run(main())
