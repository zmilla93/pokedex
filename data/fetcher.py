import os
import json
import requests

rawDir = os.path.dirname(__file__) + "\\raw\\"
cleanDir = os.path.dirname(__file__) + "\\clean\\"

list = []
baseUrl = "https://pokeapi.co/api/v2/version-group/"

print("Fetching data...")
for i in range(1, 28):
    data = requests.get(baseUrl + str(i))
    list.append(json.loads(data.text))
    print("\t" + "Fetching file #" + str(i) + "...")

outFile = open(rawDir + "version_group_map.json", "w")
outFile.write(json.dumps(list, indent=4))
outFile.close()
print("Success!")
