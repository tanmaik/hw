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

class Assignment(BaseModel):
    name: str
    due_date: Optional[str]
    assignment_details: str = Field(description='Should include all details of what to do for the assignment, the rubric, etc. A student should be able to do the whole assignment based on solely this information, so make sure it is very detailed and comprehensive.')
   

@controller.action('Ask human to bypass a screen')
def ask_human_to_bypass() -> str:
  return input(f'\n\nPress enter to continue')

@controller.action('Save an assignment to a file', param_model=Assignment)
def save_assignment(assignment: Assignment) -> str:
    print(assignment)


async def main():
    browser = Browser(config=BrowserConfig(chrome_instance_path='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'))

    async with await browser.new_context() as context:

      model = ChatOpenAI(model='gpt-4o')
   
      task = '''Open https://canvas.its.virginia.edu and look for all the assignments for the course CS3130. An assignment is anything that is due. 
      Explore all parts of the website like you are a student and explore the website. 
      You may leave the Canvas website to find more information.
      Do not stop until you know that you have looked at all the information related to this course.
      Every time you find an assignment, save it to a file using save_assignment; dig into each assignment further to make sure that you are getting the full details to do the assignment. We should never have to refer to the actual teacher given assignment details, because your description should be that good.
      If you get to a login screen (or a screen that you cannot pass), use ask_human_to_bypass to ask the human to sign in.
      '''
    
      agent1 = Agent(
            task=task,
            llm=model,
            browser_context=context,
            controller=controller
      )
    
      await agent1.run()


asyncio.run(main())
