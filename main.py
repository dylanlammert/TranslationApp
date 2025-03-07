import googleTranslate
import os
import asyncio

def clear_terminal():
    os.system('cls' if os.name == 'nt' else 'clear')


clear_terminal()
asyncio.run(googleTranslate.startTranslating('en', 'es'))