from os import listdir
from os.path import isfile, join

mypath = "./svg"

f= open("icons.css","w+")

for scale in range(1, 11):
	scale = scale*10
	scale = str(scale)
	f.write(".icon"+scale+"{width: "+scale+"px !important;height: "+scale+"px !important;}\n")

for file in listdir(mypath):
    f.write(".octicon-"+file.split(".")[0]+"{content:url(../svg/"+file+")}\n")

f.close()