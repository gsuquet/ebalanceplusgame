import * as mqtt from 'mqtt/dist/mqtt.min';
import { connectToBroker, disconnectFromBroker, publishMessage, subscribeToTopic, unsubscribeFromTopic } from '../helpers/mqtt';

export const useMqttStore = defineStore({
    id: 'MqttStore',
    state: () => {
        return {
            connection: {
                protocol: 'ws',
                host: 'broker.emqx.io',
                // ws: 8083; wss: 8084
                port: 8083,
                endpoint: '/mqtt',
                // for more options, please refer to https://github.com/mqttjs/MQTT.js#mqttclientstreambuilder-options
                clean: true,
                connectTimeout: 30 * 1000, // ms
                reconnectPeriod: 4000, // ms
                clientId:
                  'emqx_vue_' +
                  Math.random()
                    .toString(16)
                    .substring(2, 8),
                // auth
                username: 'emqx_test',
                password: 'emqx_test',
              },
              subscription: {
                topic: 'topic/mqttx',
                qos: 0,
              },
              publish: {
                topic: 'topic/browser',
                qos: 0,
                payload: '{ "msg": "Hello, I am browser." }',
              },
              receiveNews: '',
              qosList: [0, 1, 2],
              client: {
                connected: false,
                mqttClient: {} as mqtt.MqttClient,
              },
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
        if (this.retryTimes > 5 && this.client.mqttClient) {
          try {
            this.client.mqttClient.end()
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
          this.client.mqttClient = connectToBroker(connectUrl, options)
          if (this.client.mqttClient.on) {
            this.client.mqttClient.on('connect', () => {
                this.connecting = false
                this.client.connected = true
                console.log('Connection succeeded!')
            })
            this.client.mqttClient.on('reconnect', this.handleOnReConnect)
            this.client.mqttClient.on('error', error => {
              console.log('Connection failed', error)
            })
            this.client.mqttClient.on('message', (topic, message) => {
              this.receiveNews = this.receiveNews.concat(message.toString())
              console.log(`Received message ${message} from topic ${topic}`)
            })
            this.client.mqttClient.on('close', () => {
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
      doSubscribe() {
        const { topic, qos } = this.subscription
        subscribeToTopic(this.client.mqttClient, topic, 1, false);
      },
      // unsubscribe topic
      // https://github.com/mqttjs/MQTT.js#mqttclientunsubscribetopictopic-array-options-callback
      doUnSubscribe() {
        const { topic } = this.subscription
        unsubscribeFromTopic(this.client.mqttClient, topic);
      },
      // publish message
      // https://github.com/mqttjs/MQTT.js#mqttclientpublishtopic-message-options-callback
      doPublish() {
        const { topic, qos, payload } = this.publish
        publishMessage(this.client.mqttClient, topic, qos, false ,payload);
      },
      // disconnect
      // https://github.com/mqttjs/MQTT.js#mqttclientendforce-options-callback
      destroyConnection() {
        if (this.client.connected) {
          disconnectFromBroker(this.client.mqttClient) ? this.initData() : console.log('Disconnect failed')
        }
      },
      handleProtocolChange(value:string) {
        this.connection.port = value === 'wss' ? 8084 : 8083
      },
    },
    getters: {
    }
});
