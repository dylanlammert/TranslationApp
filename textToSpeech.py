"""
Read more about gTTS here
https://gtts.readthedocs.io/en/latest/
"""

from gtts import gTTS
#Find a new library to use playsound has too many bugs
from playsound3 import playsound

# @brief This function calls the gTTS google API method that takes
#        a textinput and saves a mp3 file of a voice bot saying the
#        text specified. Uses an accent from the tolang
# 
# @param textinput = string text that will be processed through the 
#        text to speech API from google.
# 
# @param tolang = 2 char sring language abrieviation that the google
#        API will use to add an accent for the speech.
# 
# @pre = textinput and tolang are strings 
# 
# @post = .mp3 file has saved the audio
##
async def textTS(textinput, tolang):
    tts = gTTS(textinput, lang= tolang)
    filename = 'audioToOutput.mp3'
    tts.save(filename)
    playsound('./'+filename)

# Next Steps: an offline version of this
# look here for more info https://thepythoncode.com/article/convert-text-to-speech-in-python 

if __name__ == '__main__':
    import asyncio
    asyncio.run(textTS("Hello, how are you?", 'en'));