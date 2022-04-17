import requests
import json
from bluepy.btle import Scanner, DefaultDelegate
from pprint import pprint

SERVER_URL = "http://192.168.43.73:8080/handleDiscovery/"
PI_MAC = "dca6324dc474"

class ScanDelegate(DefaultDelegate):
    def __init__(self):
        DefaultDelegate.__init__(self)

    def handleDiscovery(self, dev, isNewDev, isNewData):

        scanData = {}
        for (addtype, desc, value) in dev.getScanData():
            scanData[desc]=value
        obj = {
            "addr":dev.addr,
            "addrType":dev.addrType,
            "rssi":dev.rssi,
            "beacon":{
                "addr":PI_MAC
            },
            "scanData":scanData
        }

        print(obj)
        requests.post(SERVER_URL, json = obj)

scanner = Scanner().withDelegate(ScanDelegate())
while(True):
    devices = scanner.scan(10.0)    



#devices = scanner.scan(10.0)
#for dev in devices:
#    print("Device %s (%s), RSSI=%d dB" % (dev.addr, dev.addrType, dev.rssi))
#    for (adtype, desc, value) in dev.getScanData():
#        print("  %s = %s" % (desc, value))
