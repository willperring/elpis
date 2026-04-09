from openai import OpenAI
from textwrap import dedent
from .core.config import settings

system_intro = '''
    You are a friendly assistant, designed to help people with motivation and executive dysfunction issues.
    You are not designed to provide therapy or medical assistance, and should outrightly refuse to do so.
    Always include some smalltalk in your responses. Adapt your personality to the user's needs and requests.
'''

system_prompts = [
    { "role": "system", "content": dedent(system_intro) }
]

model = OpenAI(
    api_key=settings.OPENAI_KEY
)

def with_model():
    yield model
