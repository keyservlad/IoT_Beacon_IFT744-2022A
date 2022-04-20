import requests
import json
from bluepy.btle import Scanner, DefaultDelegate
from pprint import pprint

SERVER_URL = "http://192.168.43.73:8080/handleDiscovery/"
PI_MAC = "dca6324dc474"
PI_X = 400
PI_Y = 600

class ScanDelegate(DefaultDelegate):
    def __init__(self):
        DefaultDelegate.__init__(self)
        self.addr_list = {}

    def handleDiscovery(self, dev, isNewDev, isNewData):

        scanData = {}
        for (addtype, desc, value) in dev.getScanData():
            scanData[desc]=value
        
        if dev.addr not in self.addr_list:            
            self.addr_list[dev.addr] = [dev.rssi]
        else:
            self.addr_list[dev.addr].append(dev.rssi)
            if(len(self.addr_list[dev.addr])==5):
                avg_rssi = sum(self.addr_list[dev.addr])/5
                obj = {
                        "addr":dev.addr,
                        "addrType":dev.addrType,
                        "rssi":avg_rssi,
                        "beacon":{
                            "addr":PI_MAC,
                            "x":PI_X,
                            "y":PI_Y
                        },
                        "scanData":scanData
                    }
                self.addr_list[dev.addr].pop(0)
                print(obj)
                try:
                    requests.post(SERVER_URL, json = obj)
                except:
                    print("Error Connecting!!")

scanner = Scanner().withDelegate(ScanDelegate())
while(True):
    try:
        devices = scanner.scan(10.0)    
    except:
        time.sleep(2)



#devices = scanner.scan(10.0)
#for dev in devices:
#    print("Device %s (%s), RSSI=%d dB" % (dev.addr, dev.addrType, dev.rssi))
#    for (adtype, desc, value) in dev.getScanData():
#        print("  %s = %s" % (desc, value))
