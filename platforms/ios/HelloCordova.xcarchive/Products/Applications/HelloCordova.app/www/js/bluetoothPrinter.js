document.addEventListener('deviceready', onDeviceReady, false);

let selectedDeviceId = null;

function onDeviceReady() {
    console.log('Device is ready');
    initializeBluetooth();
}

// Khởi tạo Bluetooth
function initializeBluetooth() {
    window.plugins.toast.show('Đang quét thiết bị Bluetooth', 'short', 'center');
    console.log('Initializing Bluetooth...');
    bluetoothSerial.isEnabled(
        () => console.log('Bluetooth is enabled'),
        () => bluetoothSerial.enable(
            () => console.log('Bluetooth has been enabled'),
            () => console.log('Failed to enable Bluetooth')
        )
    );
}

// Quét các thiết bị Bluetooth
function scanForBluetoothDevices() {
    window.plugins.toast.show('Đang quét thiết bị Bluetooth', 'short', 'center');
    console.log('Scanning for Bluetooth devices...');
    return new Promise((resolve, reject) => {
        bluetoothSerial.list(
            (devices) => {
                console.log('Found devices:', devices);
                resolve(devices);
            },
            (error) => {
                console.error('Error scanning for devices:', error);
                reject(error);
            }
        );
    });
}

// Chọn thiết bị để kết nối
function selectDevice(deviceId) {
    window.plugins.toast.show(`Đã chọn thiết bị ID: ${deviceId}`, 'short', 'center');
    console.log(`Connecting to device ID: ${deviceId}`);
    selectedDeviceId = deviceId;
    bluetoothSerial.connect(
        deviceId,
        () => console.log(`Connected to device: ${deviceId}`),
        (error) => console.error('Failed to connect:', error)
    );
}

// In tài liệu
function printToSelectedDevice(data) {
    window.plugins.toast.show('Đang in tài liệu', 'short', 'center');
    if (!selectedDeviceId) {
        console.error('No device selected for printing');
        return;
    }
    console.log('Printing to selected device:', data);
    bluetoothSerial.write(
        data,
        () => console.log('Print command sent successfully'),
        (error) => console.error('Failed to send print command:', error)
    );
}

// Sử dụng các hàm trên qua giao diện hoặc các nút bấm
function onScanDevicesClick() {
    scanForBluetoothDevices().then((devices) => {
        devices.forEach((device) => {
            console.log(`Device found: ${device.name} - ${device.id}`);
            // Hiển thị các thiết bị trong giao diện nếu muốn
        });
    }).catch((error) => console.error('Error in device scan:', error));
}

function onSelectDeviceClick(deviceId) {
    selectDevice(deviceId);
}

function onPrintClick() {
    const printData = 'Hello from Cordova Bluetooth Printer!'; // Dữ liệu cần in
    printToSelectedDevice(printData);
}