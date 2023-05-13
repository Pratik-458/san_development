import datetime 
import re

now = str(datetime.datetime.now())

fileNumber = re.sub('[^a-zA-Z0-9 \n\.]', '', now)
fileName = "testNote"+fileNumber+".txt"

f = open(fileName, "x")

def main():
    
    writeFile()
    readFile()

def writeFile():

    f = open(fileName, "a")
    f.write("testing file: "+ fileNumber)
    f.close()
    print("file created")

def readFile():
    f = open(fileName, "r")
    print(f.read())
    

if __name__ == "__main__":
    main()