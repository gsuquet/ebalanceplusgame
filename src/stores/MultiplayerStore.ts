import * as mqtt from 'mqtt/dist/mqtt.min';
import { connectToBroker, disconnectFromBroker, publishMessage, subscribeToTopic, unsubscribeFromTopic } from '../helpers/mqtt';

export const useMultiplayerStore = defineStore({
    id: 'MultiplayerStore',
    state: () => {
        return {
            connection: {
                protocol: 'ws',
                host: 'test.mosquitto.org',
                port: 8080, // ws: 8083; wss: 8084
                endpoint: '',
                // for more options, please refer to https://github.com/mqttjs/MQTT.js#mqttclientstreambuilder-options
                clean: true,
                connectTimeout: 30 * 1000, // ms
                reconnectPeriod: 4000, // ms
                clientId: useGameParametersStore().userId,
                // auth
                username: '',
                password: '',
              },
              publish: {
                topic: 'topic/browser',
                qos: 0,
                payload: '{ "msg": "Hello, I am browser." }',
              },
              receiveNews: '',
              qosList: [0, 1, 2],
              client: {} as mqtt.MqttClient,
              subscribeSuccess: false,
              connecting: false,
              retryTimes: 0,
        };
    },
    actions: {
      initData() {
        this.client.connected = false
        this.retryTimes = 0
        this.connecting = false
        this.subscribeSuccess = false
      },
      handleOnReConnect() {
        this.retryTimes += 1
        if (this.retryTimes > 5 && this.client) {
          try {
            this.client.end()
            this.initData()
            console.log('Connection maxReconnectTimes limit, stop retry')
          } catch (error:any) {
            console.log(error.toString())
          }
        }
      },
      createConnection() {
        try {
          this.connecting = true
          const { protocol, host, port, endpoint, ...options } = this.connection
          const connectUrl = `${protocol}://${host}:${port}${endpoint}`
          this.client = connectToBroker(connectUrl, options)
          if (this.client.on) {
            this.client.on('connect', () => {
                this.connecting = false
                this.client.connected = true
                console.log('Connection succeeded!')
            })
            this.client.on('reconnect', this.handleOnReConnect)
            this.client.on('error', error => {
              console.log('Connection failed', error)
            })
            this.client.on('message', (topic, message) => {
              this.receiveNews = this.receiveNews.concat(message.toString())
              console.log(`Received message ${message} from topic ${topic}`)
            })
            this.client.on('close', () => {
              this.client.connected = false
              this.destroyConnection();
            })
          }
        } catch (error) {
          this.connecting = false
          console.log('mqtt.connect error', error)
        }
      },
      // subscribe topic
      // https://github.com/mqttjs/MQTT.js#mqttclientsubscribetopictopic-arraytopic-object-options-callback
      joinGame(gameId:string) {
        const topic = 'e_balance_plus_game/'+gameId;
        subscribeToTopic(this.client, topic, 1, false);
      },
      createGame(gameId:string, payload:string) {
        const topic = 'e_balance_plus_game/'+gameId;
        publishMessage(this.client, topic, 1, false ,payload);
      },
      // unsubscribe topic
      // https://github.com/mqttjs/MQTT.js#mqttclientunsubscribetopictopic-array-options-callback
      doUnSubscribe() {
        const topic = "topic/browser";
        unsubscribeFromTopic(this.client, topic);
      },
      // publish message
      // https://github.com/mqttjs/MQTT.js#mqttclientpublishtopic-message-options-callback
      
      // disconnect
      // https://github.com/mqttjs/MQTT.js#mqttclientendforce-options-callback
      destroyConnection() {
        if (this.client.connected) {
          disconnectFromBroker(this.client) ? this.initData() : console.log('Disconnect failed')
        }
      },
      handleProtocolChange(value:string) {
        this.connection.port = value === 'wss' ? 8084 : 8083
      },
    },
    getters: {
    }
});
