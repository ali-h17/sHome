import { w3cwebsocket } from 'websocket';

class ESPConnector {
    private ip: String;
    private ws!: w3cwebsocket;
    private callback: Function;
    private connected: Boolean;
    private recievedInitalSate: Boolean;


    constructor(ip: String, callback: Function) {
        this.ip = ip;
        this.callback = callback;
        this.connected = false;
        this.recievedInitalSate = false;
    }

    public connect(setIsLoading: Function) {
		if (this.connected)
			return;

        this.ws = new w3cwebsocket(this.ip as string);

        this.ws.onopen = () => {
            console.log('WebSocket Connection Established');
            this.connected = true;
        };
        
        this.ws.onmessage = (event) => {
            console.log('Received Message:', (event.data));

            this.handleWebSocketMessage(event.data);
            
            if (!this.recievedInitalSate) {
                setIsLoading(false);
                this.recievedInitalSate = true;
            }
        };

        this.ws.onclose = (event) => {
            console.log(`Connection Closed: ${event.code} - ${event.reason}`);
            this.connected = false;
        };

        this.ws.onerror = (error) => {
            console.error('WebSocket Connection Error:', error);
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

export default ESPConnector;

