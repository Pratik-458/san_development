import speech_recognition as sr
import json
import requests
from flask import Flask
app = Flask(__name__)

def main():
  r = sr.Recognizer()
  # f = open("recognized.txt", "w")

  with sr.Microphone() as source:
    r.adjust_for_ambient_noise(source)
    print("Please Say something")
    audio = r.listen(source)

    try:
      print("You have said: \n " + r.recognize_google(audio))
      with open('recognized.txt', 'w') as f:
        f.write(r.recognize_google(audio))

      # Read the contents of the file
      # with open("recognized.txt", "r") as r:
      #   read_contents = r.read()

      data = {
           "content": read_contents
          }
      # with open("recognized.json","w") as j:
      #   j.write(json_data)

      json_data = json.dumps(data)

      @app.route("/")
      def hello():
        return json_data
      hello()

      print(json_data)

      with open("recognized.json","w") as j:
        j.write(json_data)

      # Send the JSON data to the API
      # url = "http://localhost:3005/api"
      # headers = {"Content-Type": "application/json"}
      # response = requests.post(url, data=json_data, headers=headers)

      # Check the response
      # if response.status_code == 200:
      #   print("File sent successfully!")
      # else:
      #   print("Error sending file: {}".format(response.text))
      
      f.close()

    except Exception as e:
      print("Error.. " + str(e))

if __name__ == "__main__":
  main()
  app.run(port=8000)