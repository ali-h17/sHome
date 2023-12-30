import { w3cwebsocket } from 'websocket';

export default class ESPConnector {
	private readonly ip: String;
	private ws!: w3cwebsocket;
	private readonly callback: Function;
	private connected: Boolean;
	private receivedInitialState: Boolean;

	constructor(ip: String, callback: Function) {
		this.ip = ip;
		this.callback = callback;
		this.connected = false;
		this.receivedInitialState = false;
	}

	public connect(setIsLoading: Function) {
		if (this.connected) return;

		this.ws = new w3cwebsocket(this.ip as string);

		this.ws.onopen = () => {
			console.log('WebSocket Connection Established');
			this.connected = true;
		};

		this.ws.onmessage = (event) => {
			console.log('Received Message:', event.data);

			this.handleWebSocketMessage(event.data);

			if (!this.receivedInitialState) {
				setIsLoading(false);
				this.receivedInitialState = true;
			}
		};

		this.ws.onclose = () => {
			console.log('Connection Closed');
			this.connected = false;
		};

		this.ws.onerror = () => {
			console.error('WebSocket Connection Error');
		};
	}

	public send(message: any) {
		if (this.ws && this.connected) {
			this.ws.send(JSON.stringify(message));
			console.log('Sent Message:', message);
		} else {
			console.warn('WebSocket connection not established.');
		}
	}

	private handleWebSocketMessage(message: any) {
		if (this.callback) {
			let msg = JSON.parse(message);
			this.callback(msg);
		}
	}

	public close() {
		if (this.ws) {
			this.ws.close();
			this.connected = false;
		}
	}
}

