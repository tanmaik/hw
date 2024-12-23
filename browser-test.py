import os
import sys

from langchain_openai import ChatOpenAI
import json
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import asyncio

from browser_use import Agent, Browser, Controller
from browser_use.browser.context import BrowserContextConfig
from browser_use.browser.browser import BrowserConfig


controller = Controller()

@controller.action('Ask human to sign in once you see the Duo screen')
def ask_human_to_sign_in() -> str:
  return input(f'\n\nInput: ')

async def main():
    browser = Browser(config=BrowserConfig(chrome_instance_path='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'))

    async with await browser.new_context() as context:

      model = ChatOpenAI(model='gpt-4o')
   
      agent1 = Agent(
            task='Open canvas.its.virginia.edu and look at my assignments.',
            llm=model,
            browser_context=context,
            controller=controller
      )
    
      await agent1.run()


asyncio.run(main())