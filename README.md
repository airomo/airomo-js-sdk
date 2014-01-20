Airomo JS SDK
=============

Airomo JS SDK is simple way to get access to the Aromo app search service on your websit.


## Instalation

To add Airomo JS SDK to your website use `airomo.min.js` file from the repo or just insert scrip tag to your page: 

`<script type="text/javascript" src="http://static.airomo.com/js-sdk/airomo.min.js"></script>`


## Simple usage

To perform simple search you only need to call airomo.search() functions with proppes options object and callback function.

Example: 

    var options = {
        query: "cars",
        clientId:
        appKey: 
    };
    
    airomo.search(options, function(error, data) {
        if(!error) {
            console.log(data);
        }
    });


## airomo Object description: 


`airomo` object has two methods: search and setEnv

`airomo.search(options, callback)` 
       
    options = {                     //Object of options.
                
        clientId: <String>          // valid app clientId
        apiKey:   <String>          // valid app api key
        
        query: <String>             // query string for search by query
        url: <String>               // url string for contextual search by URL
        metaKeywords: <String>      // meta keywords list (no formatting needed) 
                                    // for contextual search by keywords
        
        platforms: <Int>            // filter by application platform 
                                    // 1 – iOS application, 
                                    // 2 – Android application 
                                    // by default – all platforms

        stores: <Int>               // filter by application origin store
                                    // 1 - iTunes AppStore( for iOS apps) ;
                                    // 2 - Google Play(for Android apps) ;
                                    // 3 - Amazon App Store(for Android apps) ;
                                    // 4 - Nook App Store(for Android apps) ;
                                    // by default - all stores

        price: <String>             // filtering by free/paid applications
                                    // "free" - for free apps
                                    // "paid" - for paid apps
                                    // by default - all apps

        categories: <Array of Ints> // list of category Ids for filtering. 
                                    // See the list of categories at the bottom
        tags: <Array of Strings>    // list of tags, e.g. [“sport”, “soccer”]
        offset: <Int>               // search offset, default = 0
        size: <int>                 // number of apps in result per request, default = 10

        ssf: <Boolean>              // Show Social Fields,
                                    // set true go get "social" fiels in results
       };

    callback = function(error, data)
        
        error <Boolean> or <Object>  {  // false if there is no error
            error: <Boolean>,           // true if error occurs
            errorMessage: <String>      // error description
        };

        data <Null> or <Object> {       // null if error occurs
            results: <Array>            // search results
            searchToken: <string>       // current serach token
            total: <Int>                // total results number
        };

airomo.setEnv(envOptions)               // use this method to preset app options, 
                                        // like clientId and apiKey for every further api calls

    envOptions <Object> {
            clientId: <String>          // valid app clientId
            apiKey:   <String>          // valid app api key
    }



NOTE :  Airomo apiKey and clientId can be generated from http://developer.airomo.com/apps/



## App categories list


    id      name
    
    1       Books & Reference
    2       Business
    3       Education
    4       Entertainment
    5       Finance
    6       Games
    31      Action
    32      Adventure
    33      Arcade
    34      Board
    35      Card
    36      Casino
    37      Dice
    38      Educational
    39      Family
    40      Kids
    41      Music
    42      Puzzle
    43      Racing
    44      Role Playing
    45      Simulation
    46      Sports
    47      Strategy
    48      Trivia
    49      Word
    50      Misc
    7       Health & Fitness
    8       Lifestyle
    9       Media & Video
    10      Medical
    11      Music & Audio
    12      Navigation
    13      News & Magazines
    14      Photography
    15      Productivity
    17      Social
    16      Shopping
    19      Travel & Local
    18      Sports
    21      Weather
    20      Utilities
    23      Personalization

## Sample App using the Airomo SDK

Source code for the sample app using the SDK is at  ./sample-app

Working sample app  : http://airomo.github.io/airomo-js-sdk/blog-integration/
