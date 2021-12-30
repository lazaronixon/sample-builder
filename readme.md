# Sample Builder

## What is this?
This app is an automation to prepare waves for sampling faster.
- Set root note based on file name.
- Set loop region based on a percent size.

## Why?
I have a keyboard Korg PA3xle that I can load sound samples, it took me a lot of time preparing these files to be loaded into the keyboard. I had two choices, set this values on the keyboard or using a windows machine, both methods very boring and slow.

## Usage
Given these files and that you want to set a root note and a loop using the last 30% of the sound.

```
RealGtrP41.wav
RealGtrP44.wav
RealGtrP47.wav
RealGtrP50.wav
RealGtrP53.wav
RealGtrP56.wav
RealGtrP59.wav
RealGtrP62.wav
RealGtrP65.wav

node <path>/sample-builder --root "RealGtrP(\d+)" --loop 30
```
