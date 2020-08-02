import { spawn, exec } from "child_process";
import notifier from "node-notifier";
import os from "os";
import { convertTime } from "./utils";

const ipAddress = process.argv[2];
if (!ipAddress) {
  throw new Error(
    "You have to enter the IP address of your device (e.g. `node listen.js 192.168.1.100`)"
  );
}
const isWindows = os.platform() === "win32";
const ping = spawn("ping", [isWindows ? "-t" : "-O", ipAddress]);

let isOnline = null;
let offlineTimestamp = null;
ping.stdout.on("data", function (data) {
  const line = data.toString().toLowerCase();
  if (isOnline !== false && line.includes("destination host unreachable")) {
    isOnline = false;
    offlineTimestamp = Date.now();
    console.log("Device is offline");
    if (isWindows) {
      // Make screen completly black
      exec("%systemroot%\\system32\\scrnsave.scr /s");
    } else {
      notifier.notify("Device is unreachable");
    }
  } else if (isOnline !== true && line.includes("time=")) {
    isOnline = true;
    if (!offlineTimestamp) {
      return;
    }
    console.log("Device is online");
    const awayTime = Date.now() - offlineTimestamp;
    notifier.notify({
      title: "Welcome Back!",
      message: `You were away for ${convertTime(awayTime)}`,
    });
  }
});
