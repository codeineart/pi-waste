(function() {
	'use strict';

	class EmbodiedDevice {
		constructor() {
			this.device = null;
			this.server = null;
			this._characteristics = new Map();
			this.pedal = '12345678-9012-3456-7890-123456789011';
			this.gsr = '12345678-9012-3456-7890-123456789022';
			this.corazon = '12345678-9012-3456-7890-123456789033';
		}
		connect() {
			var embodiedService = "11223344-5566-7788-9900-aabbccddeeff";
			return navigator.bluetooth.requestDevice({filters:[{services: [embodiedService] }]})
			.then(device => {
				this.device = device;
				return device.gatt.connect();
			})
			.then(server => {
				this.server = server;
				return Promise.all([
					server.getPrimaryService(embodiedService).then(service => {
						return Promise.all([
							//Pedal
							this._cacheCharacteristic(service, this.pedal),
							//GSR
							this._cacheCharacteristic(service, this.gsr),
							//HeartRate
							this._cacheCharacteristic(service, this.corazon),
						])
					})
				]);
			})
		}

		/* Disconnect */

		disconnect() {
			console.log('Desconectando bluetooth')
			return this.device.gatt.disconnect();		
		}


		/* Heart Rate Service */
		startNotificationsEmbodied(characteristic) {
			return this._startNotifications(characteristic);
		}
		stopNotificationsEmbodied(characteristic) {
			return this._stopNotifications(characteristic);
		}

		_cacheCharacteristic(service, characteristicUuid) {
			return service.getCharacteristic(characteristicUuid)
			.then(characteristic => {
				this._characteristics.set(characteristicUuid, characteristic);
			});
		}
		_readCharacteristicValue(characteristicUuid) {
			let characteristic = this._characteristics.get(characteristicUuid);
			return characteristic.readValue()
			.then(value => {
				// In Chrome 50+, a DataView is returned instead of an ArrayBuffer.
				value = value.buffer ? value : new DataView(value);
				return value;
			});
		}
		_writeCharacteristicValue(characteristicUuid, value) {
			let characteristic = this._characteristics.get(characteristicUuid);
			return characteristic.writeValue(value);
		}
		_startNotifications(characteristicUuid) {
			let characteristic = this._characteristics.get(characteristicUuid);
			// Returns characteristic to set up characteristicvaluechanged event
			// handlers in the resolved promise.
			return characteristic.startNotifications()
			.then(() => characteristic);
		}
		_stopNotifications(characteristicUuid) {
			let characteristic = this._characteristics.get(characteristicUuid);
			// Returns characteristic to remove characteristicvaluechanged event
			// handlers in the resolved promise.
			return characteristic.stopNotifications()
			.then(() => characteristic);
		}
	}

	window.EmbodiedDevice = new EmbodiedDevice();

})();
