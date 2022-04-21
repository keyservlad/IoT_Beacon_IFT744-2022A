//
//  ViewController.swift
//  iBeaconsApp
//
//  Created by Arnaud on 2022-04-11.
//

import UIKit

import CoreBluetooth
import CoreLocation

class ViewController: UIViewController, CBPeripheralManagerDelegate {
    
    @IBOutlet weak var uuidValue: UILabel!
    @IBOutlet weak var majorValue: UILabel!
    @IBOutlet weak var minorValue: UILabel!
    @IBOutlet weak var identityValue: UILabel!
    @IBOutlet weak var beaconStatus: UILabel!
    
    
    var localBeacon: CLBeaconRegion!
    var beaconPeripheralData: NSDictionary!
    var peripheralManager: CBPeripheralManager!
    let localBeaconUUID = "F651C4C7-B4BC-4656-B246-AF8B709EF297"
    let localBeaconMajor: CLBeaconMajorValue = 123
    let localBeaconMinor: CLBeaconMinorValue = 456
    let identifier = "Put your identifier here"
    
    
    func initLocalBeacon() {
        if localBeacon != nil {
            stopLocalBeacon()
        }
        let uuid = UUID(uuidString: localBeaconUUID)!
        localBeacon = CLBeaconRegion(proximityUUID: uuid, major: localBeaconMajor, minor: localBeaconMinor, identifier: identifier)
        beaconPeripheralData = localBeacon.peripheralData(withMeasuredPower: nil)
        peripheralManager = CBPeripheralManager(delegate: self, queue: nil, options: nil)
    }
    func stopLocalBeacon() {
        peripheralManager.stopAdvertising()
        peripheralManager = nil
        beaconPeripheralData = nil
        localBeacon = nil
    }
    func peripheralManagerDidUpdateState(_ peripheral: CBPeripheralManager) {
        if peripheral.state == .poweredOn {
            peripheralManager.startAdvertising(beaconPeripheralData as? [String: Any])
        }
        else if peripheral.state == .poweredOff {
            peripheralManager.stopAdvertising()
        }
    }
    
    @IBOutlet weak var startButton: UIButton!
    @IBOutlet weak var stopButton: UIButton!
    
    // MARK: Action
    @IBAction func startButton(_ sender: Any) {
        initLocalBeacon()
        startButton.isHidden = true
        stopButton.isHidden = false
        beaconStatus.text = "ON"
    }
    @IBAction func stopButton(_ sender: Any) {
        stopLocalBeacon()
        startButton.isHidden = false
        stopButton.isHidden = true
        beaconStatus.text = "OFF"
    }
    
    
    

    
    override func viewDidLoad() {
        super.viewDidLoad()
        stopButton.isHidden = true
        uuidValue.text = localBeaconUUID
        majorValue.text = String(localBeaconMajor)
        minorValue.text = String(localBeaconMinor)
        identityValue.text = identifier
        beaconStatus.text = "OFF"
    }
    
    
}

