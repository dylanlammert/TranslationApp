"""
Learn more about the googletrans API from python
https://pypi.org/project/googletrans/#description 
"""
from googletrans import Translator
import speechRecognition as sTT
from textToSpeech import textTS as tTS
import asyncio
from datetime import datetime

# @brief this function is the main shell to specify when each subfunction is run 
#        the user selects native langauge and the language they want to translate to. 
# 
# @param fromlang = the native language of the user
#
# @param tolang = the language to which the user wants to translate
# 
# @return this is the main shell of the translating program returns nothing 
# 
# @pre = the user's microphone and speakers work properly 
# 
# @post = calls the tTS function to send the audio to the users speaker
##
async def startTranslating(fromlang, tolang):
    print('if you wish to quit the program stop speaking')

    while(True):
        someinput = await sTT.speechToText()
        if (someinput == -1 or someinput == 1 ):
            print("Translation stopped!")
            break
        now = datetime.now()
        print('Start time= ' + now.strftime("%H:%M:%S"))
        translatedText = await translateText(str(someinput), fromlang, tolang)
        print(translatedText)
        now = datetime.now()
        print('midpoint time= ' + now.strftime("%H:%M:%S"))
        await tTS(translatedText, tolang)
        now = datetime.now()
        print('End time= ' + now.strftime("%H:%M:%S"))
'''
I will change this to a c++ multithreaded controller for the program 
that calls python scripts to work around the Python GIL
'''

# @brief This function takes an input and calls the google translate
#        API to translate it to a specified language. 
#
# @param someinput = a string that is captured from the textTS function 
#
# @param dest= a 2 char string signifying the langauge abrieviation of 
#        langauge the user wishes to translate to. 
# 
# @param src= a 2 char string signifying the language of the native speaker
# 
# @return = a text string from the object translator
# 
# @pre = speechToText function is able to understand what the user said 
#        and returns a string to be translated.
# 
# @post = translator class goes out of scope. 
##
async def translateText( someinput, fromlang, tolang ):
    # creates a new object instance of the class Translator
    # this class will go out of scope once the function is finished executing
    translator = Translator()
    #calls the translate method from the Translator class
    result = await translator.translate( text= str(someinput), dest= str(tolang), src= str(fromlang))
    return result.text

# use this to return a text view
async def translateSTT(fromlang, tolang):
    someinput = await sTT.speechToText()
    translatedText = await translateText(str(someinput), fromlang, tolang)
    print(translatedText)
    return translatedText

if __name__ == '__main__':
    asyncio.run(startTranslating('en', 'es'))
# this will be moved to main.py once I finish testing the functions 


