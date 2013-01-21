#!/bin/bash

for file in assets/img/content/*@2x.png
do
  # do something on "$file"
  NORMAL=${file/@2x/}
  convert $file -resize '50%' $NORMAL
done