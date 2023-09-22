import os
import json

inDir = os.path.dirname(__file__) + "\\raw\\"
outDir = os.path.dirname(__file__) + "\\clean\\"


def nameConverter(value):
    return value["name"]


def passthrough(value):
    return value


def processFile(inFileName, outFileName, func):
    inFileName = inFileName + ".json"
    if outFileName == None:
        outFileName = inFileName
    else:
        outFileName = outFileName + ".json"
    # Parse input file
    inFile = open(inDir + inFileName, "r")
    inData = json.load(inFile)
    inFile.close()

    # Convert data
    outData = []
    # print(inData["results"])
    for value in inData["results"]:
        outData.append(func(value))

    # Write Output
    outFile = open(outDir + outFileName, "w")
    outFile.write(json.dumps(outData, indent=4))
    outFile.close()


# Process all files
print("Processing data...")
processFile("pokemon", None, nameConverter)
processFile("version_groups", None, nameConverter)
processFile("move_learn_method", None, nameConverter)
processFile("types", None, nameConverter)
print("Processing complete!")
