import os
import json

inDir = os.path.dirname(__file__) + "\\raw\\"
outDir = os.path.dirname(__file__) + "\\clean\\"


def nameConverter(value):
    return value["name"]


def passthrough(value):
    return value


def versionGroupMap(value):
    versions = []
    for version in value["versions"]:
        versions.append(version["name"])
    # return {value["name"]: versions}
    return {"key": value["name"], "value": versions}


def processFile(inFileName, outFileName, func, useResultKey=True):
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
    if (useResultKey):
        inData = inData["results"]
    for value in inData:
        outData.append(func(value))

    # Write Output
    outFile = open(outDir + outFileName, "w")
    outFile.write(json.dumps(outData, indent=4))
    outFile.close()


def processFileToObj(inFileName, outFileName, func, useResultKey=True):
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
    outData = {}
    if (useResultKey):
        inData = inData["results"]
    print("Doin stuff....")
    for value in inData:
        result = func(value)
        outData[result["key"]] = result["value"]

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
processFile("versions", None, nameConverter)
processFileToObj("version_group_map", None, versionGroupMap, False)

print("Processing complete!")
