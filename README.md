# TV CLI

Tested on Samsung UE40MU6120 TV. To use this, you'll want to find your TV's IP address and ensure that port 8001 is open on it and that http://IP:8001/api/v2/ returns some JSON. If it does, you should be good to go.

This script is currently setup to send commands to 192.168.1.100. If you're using the same subnet then you'll just want to set your TV to use a statically assigned IP (192.168.1.100) - that way you wont need to be changing the config all the time.

If you want to use a different IP, you'll just need to set the env variable `NODE_SAMSUNG_TV_IP` (e.g. `export NODE_SAMSUNG_TV_IP=10.0.0.4`).

## Installation

```
npm install -g node-samsung-tv
````

## Use
```
tv COMMAND
```

Supported commands:

```
play
pause
+
-
mute
power
```
