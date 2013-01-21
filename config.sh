#!/bin/bash

start="1"
string="images: ["
firstEntry=true

for file in assets/img/content/*@2x.png
do
  # do something on "$file"
  filename=$(basename "$file")
  normal=${filename/@2x.png/}
  first=${filename:0:1}

  if [ $first == $start ]
  then
  	if $firstEntry
  	then
  		firstEntry=false
  		string="$string'$normal'"
  	else
  		string="$string, '$normal'"
  	fi
  else
  	string="$string] images: ["
  	firstEntry=true
  	start="$first"
  fi
done

string="$string]"

echo $string | cat -$1 > temp
mv temp config.txt