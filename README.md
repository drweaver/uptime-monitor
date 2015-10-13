# uptime-monitor
Uptime monitor built with node.  Notifications sent by pushbullet.

Requires pushbullet account and the api key set via environment variable ```export PUSHBULLET=<api_key>```

Requires a config.json file in the root folder containing e.g.:

```
[                                                                                                                           
    {
        "name": "Google",
        "website": "http://www.google.com",
        "interval": 5                                                                                                       
    },                                                                                                                      
    {
        "name": "Cloud9",
        "website": "http://c9.io",
        "interval": 30
    }
]     
```
