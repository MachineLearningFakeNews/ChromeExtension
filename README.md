# Fake News Chrome Extension

![logo](https://cloud.githubusercontent.com/assets/560721/26270165/1c1753f0-3cae-11e7-8cb3-8cc4e95f1484.png)

This extension displays a credibility percentage of a new source currently opened in the Chrome tab.

Our extension utilizes [OpenSources](http://www.opensources.co/) data set for detecting Fake News [domains](http://github.com/BigMcLargeHuge/opensources/blob/master/sources/sources.csv). 

## Testing

1. Download or clone the repository (project).
2. Launch Chrome
3. Under Settings > Extensions, check Developer Mode. Some buttons should appear.
4. Click "Load unpacked extension". The extension should appear as an Chrome action button.
5. Select the projet folder. The extension should be loaded.
6. Visting a website e.g. wikileaks.org for minor consideration, www.weeklyworldnews.com (Safe for work from what we have seen) for fake news result. Note that some of the sites listed in our sources file are not safe for work, and may contain graphic images.
7. Click on the action button.

