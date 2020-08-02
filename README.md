# Automations

This repository contains scripts to automate simple tasks.

## Scripts

All scripts are based on Node.js and webpack. Install dependencies with `npm install` and build the scripts with `npm run build`. The scripts are available in the `dist` folder.

### listen

This script is used to detect if a device is reachable in your network. I use it to detect if my mobile phone is connected to my wifi. If not (which means I am not home), it shuts down my screen. When I come back, I get notified about the time I was gone.

`node dist/listen.js [ip]` (replace [ip] with the device IP)

This script is only tested on Windows.

## License

MIT
