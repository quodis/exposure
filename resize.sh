#!/bin/bash
outputDir=assets/img/content

rm $outputDir/*.*

for file in assets/img/content/source/*@2x*
do
  # do something on "$file"
  filename=$(basename "$file")
  extension="${filename##*.}"
  filename="${filename%.*}"
  normal=${filename/@2x/}

  huge="$normal-huge"
  largeDouble="$normal-large@2x"
  large="$normal-large"
  mediumDouble="$normal-medium@2x"
  medium="$normal-medium"
  smallDouble="$normal-small@2x"
  small="$normal-small"

  cp $file $outputDir/$huge.$extension
  cp $file $outputDir/$largeDouble.$extension

  convert $file -resize '50%' $outputDir/$large.$extension
  convert $file -resize '50%' $outputDir/$mediumDouble.$extension

  convert $file -resize '25%' $outputDir/$medium.$extension
  convert $file -resize '25%' $outputDir/$smallDouble.$extension

  convert $file -resize '12.5%' $outputDir/$small.$extension
done