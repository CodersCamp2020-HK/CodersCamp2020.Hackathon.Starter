import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';

interface MessageData {
  eventData: string;
}

@WebSocketGateway()
class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  findAll(
    @MessageBody() data: MessageData,
    @ConnectedSocket() client: Socket,
  ): Observable<WsResponse<number>> {
    console.log(data.eventData);
    client.emit('events2', { field1: 'data1', field2: 'data2' });
    return from([1, 2, 3]).pipe(
      map((item) => ({ event: 'events', data: item })),
    );
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    console.log(data);
    return data;
  }
}

export { EventsGateway };
