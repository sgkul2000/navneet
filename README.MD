# Navneet - "Eternally new"
Navneets is a new tab extension for Developers.This is more of a workaroud for safari. This is a Inspired by [Tabliss](https://tabliss.io) which is a new tab extension available for Firefox and Chrome. This project was started as a proof of concept of existance of newtab extensions for safari. This can also be used with other browsers, the procedure remains same.

## Features
 - You get the time and greeting with your first name
 - A quote is also displayed using [They Said so](https://quotes.rest) and [quotable.io](https://quotable.io) (default to quote of the day but can be swtiched to random)
 - A random background is chose from the wide collection of [Unsplash](https://unsplash.com) (Optionally you can choose keywords to lookup)
 - You also get the weather of your current location from [Open weather API](https://openweathermap.org/api) (You can also  enter the location manually)

## Project setup
the only thing you need to setup s a file called config.js which contains the apikeys for [Open weather API](https://openweathermap.org/api) and [Unsplash API](https://api.unsplash.com/)
It looks something like this:
```JavaScript
var config = {
    "OWA_API_KEY":"Your Open weather api key",
    "UNSPLASH_API_KEY": "Your unsplash access token"
}
```

## Browser setup
Once you have the repo colned locally and the config file ready then all you have to do is setup safari to use this as your new tab. 
 - Step one: get the url to the file:
    you can do this by droping the newtab.html file directly into the addressbar of your browser using finder, spotlight or alfred and you can get the url to the localfile (should look something like this : "file:///Users/shreesh/Documents/webD/tabliss/newtab.html")
 - Step two: set the file url as the new tab url:
    This can be done by going to the safari settings by using Cmd + "," or y going to Safari > Preferences..
    In the general tab change "New tab opens with" and "New window opens with" to "Homepage" and then change the Homepage address to the file url from step 1.

__Viola, There you have it__

# Tech Stack
This was build with [Vue.js](https://vuejs.org) and [Halfmoon](https://gethalfmoon.com).


_Feel free to contribute._