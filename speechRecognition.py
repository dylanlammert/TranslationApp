""" 
@github repo https://github.com/Uberi/speech_recognition/blob/offline-recognition/examples/microphone_recognition.py 
"""
import speech_recognition as speech

# @brief This funtion calls upon the speech_recognition library from pypi  to grab 
#        audio from the users microphone and sends that data to a google API to convert
#        it to text. 
# 
# @param 
# 
# @return text = string processed by google API 
# @return -1 = Google could not understand the speech input or no speech was given
# @return 1 = The program was not able to access the google API 
# @pre = user allows the use of their microphone.
# #
async def speechToText():
    r = speech.Recognizer()
    with speech.Microphone() as source:
        print("say something")
        r.adjust_for_ambient_noise(source, duration = .5)
        audioinput = r.listen(source)
        
    try:
        # for testing purposes, we're just using the default API key
        # to use another API key, use `r.recognize_google(audio, key="GOOGLE_SPEECH_RECOGNITION_API_KEY")`
        # instead of `r.recognize_google(audio)`
        text = r.recognize_google(audioinput)
        return text
    except speech.UnknownValueError:
        print("Google Speech Recognition could not understand audio")
        return -1
    except speech.RequestError as e:
        print("Could not request results from Google Speech Recognition service; {0}".format(e))
        return 1


"""
Copyright (c) 2014-, Anthony Zhang <azhang9@gmail.com>
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following 
conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following 
disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived 
from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT 
NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL 
THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES 
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) 
ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
"""