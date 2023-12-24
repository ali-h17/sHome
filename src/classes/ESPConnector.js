import { w3cwebsocket } from 'websocket';

class ESPConnector {
    constructor(ip, callback) {
        this.ip = ip;
        this.callback = callback;
        this.connected = false;
        this.recievedInitalSate = false;
    }

    connect(setIsLoading) {
		if (this.connected)
			return;

        this.ws = new w3cwebsocket(this.ip);

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

    send(message) {
        if (this.ws && this.connected) {
            this.ws.send(JSON.stringify(message));
            console.log('Sent Message:', message);
        } else {
            console.warn('WebSocket connection not established.');
        }
    }

    handleWebSocketMessage(message) {
        if (this.callback) {
			let msg = JSON.parse(message);
            this.callback(msg);
        }
    }

    close() {
        if (this.ws) {
            this.ws.close();
            this.connected = false;
        }
    }

    isConnected() {
        return this.connected;
    }
}

export default ESPConnector;

