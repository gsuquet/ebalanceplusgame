import * as mqtt from 'mqtt/dist/mqtt.min';
import { connectToBroker, disconnectFromBroker, publishMessage, subscribeToTopic, unsubscribeFromTopic } from '../helpers/mqtt';
import { ConnectionParameters, Player } from '../types/Multiplayer';

export const useMultiplayerStore = defineStore({
    id: 'MultiplayerStore',
    state: () => {
        return {
          connectionParameters: {
              host: 'test.mosquitto.org',
              port: 8080,
              protocol: 'ws',
              endpoint: '',
              options: {
                username: '',
                password: '',
                clean: true,
                connectTimeout: 30 * 1000, // ms
                reconnectPeriod: 4 * 1000, // ms
                clientId: useGameParametersStore().getUserId,
              }
          } as ConnectionParameters,
          playersList: [] as Player[],
          mainTopic: 'e_balance_plus_game',
          receiveNews: '',
          client: {} as mqtt.MqttClient,
          subscribeSuccess: false,
          connecting: false,
          retryTimes: 0,
        };
    },
    actions: {
      initializeStore() {
        this.client.connected = false
        this.retryTimes = 0
        this.connecting = false
        this.subscribeSuccess = false
      },
      addPlayerToPlayersList(player: Player) {
        this.playersList = this.playersList.concat(player);
      },
      handleOnReConnect() {
        this.retryTimes += 1
        if (this.retryTimes > 5 && this.client) {
          try {
            this.client.end()
            this.initializeStore()
            console.log('Connection maxReconnectTimes limit, stop retry')
          } catch (error:any) {
            console.log(error.toString())
          }
        }
      },
      createConnection() {
        try {
          this.connecting = true
          const { protocol, host, port, endpoint, options } = this.connectionParameters
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
              this.handleIncomingMessage(topic, message.toString());
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
      joinGame(gameId:string) {
        this.mainTopic='e_balance_plus_game/'+gameId;
        const user = useGameParametersStore().getUser;
        user.isConnected = true;
        return subscribeToTopic(this.client, this.mainTopic+'/players', 1, true) && publishMessage(this.client, this.mainTopic+'/new_player', 1, true ,user);
      },
      createGame(gameId:string) {
        this.mainTopic='e_balance_plus_game/'+gameId;
        const user = useGameParametersStore().getUser;
        user.isHost = true;
        user.isConnected = true;
        this.addPlayerToPlayersList(user);
        subscribeToTopic(this.client, this.mainTopic+'/new_player', 1, true);
        return publishMessage(this.client, this.mainTopic+'/players', 1, true ,this.playersList);
      },
      handleIncomingMessage(topic:string, message:string) {
        this.handleNewPlayerMessage(topic, message);
        this.handlePlayersListMessage(topic, message);
      },
      handleNewPlayerMessage(topic : string, message : string) {
        if (topic === this.mainTopic+'/new_player' && useGameParametersStore().isUserHost) {
          const newPlayer = JSON.parse(message) as Player;
          this.addPlayerToPlayersList(newPlayer);
          publishMessage(this.client, this.mainTopic+'/players', 1, true ,this.playersList);
        }
      },
      handlePlayersListMessage(topic : string, message : string) {
        if (topic === this.mainTopic+'/players' && !useGameParametersStore().isUserHost) {
          this.playersList = JSON.parse(message) as Player[];
        }
      },
      doUnSubscribe() {
        const topic = "topic/browser";
        unsubscribeFromTopic(this.client, topic);
      },
      destroyConnection() {
        if (this.client.connected) {
          disconnectFromBroker(this.client) ? this.initializeStore() : console.log('Disconnect failed')
        }
      }
    },
    getters: {
    }
});