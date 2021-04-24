import { Logger, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MeetingService } from '../../application/meeting.service';
import { BroadcastDTO } from '../../domain/broadcast.dto';
import { CreateMeetingDTO } from '../../domain/createMeeting.dto';
import { InformationNotification } from '../../domain/information.dto';
import { JoinMeetingDTO } from '../../domain/joinMeeting.dto';
import { TimeEvent } from '../../domain/timeEvent.dto';

@WebSocketGateway()
class MeetingGateway {
  constructor(private readonly meetingService: MeetingService) {}

  @WebSocketServer()
  server: Server;

  @UsePipes(new ValidationPipe())
  @SubscribeMessage('createMeeting')
  createMeeting(
    @MessageBody() body: CreateMeetingDTO,
    @ConnectedSocket() client: Socket,
  ): WsResponse<unknown> {
    Logger.verbose(body, 'WebSocketServer[createMeeting]');
    const resp = this.meetingService.createMeeting(body, client);
    return { event: 'connected', data: resp };
  }

  @UsePipes(new ValidationPipe())
  @SubscribeMessage('joinMeeting')
  joinMeeting(
    @MessageBody() body: JoinMeetingDTO,
    @ConnectedSocket() client: Socket,
  ): WsResponse<unknown> {
    Logger.verbose(body, 'WebSocketServer[joinMeeting]');
    const resp = this.meetingService.joinMeeting(body, client);
    return { event: 'connected', data: resp };
  }

  @UsePipes(new ValidationPipe())
  @SubscribeMessage('broadcast')
  broadcast(@MessageBody() body: BroadcastDTO) {
    Logger.verbose(body, 'WebSocketServer[broadcast]');
    this.meetingService.broadcast(body);
  }

  @UsePipes(new ValidationPipe())
  @SubscribeMessage('information_event')
  onInformationEvent(@MessageBody() body: InformationNotification) {
    Logger.verbose(body, 'WebSocketServer[onInformationEvent]');
    this.meetingService.onInformationEvent(body);
  }

  @UsePipes(new ValidationPipe())
  @SubscribeMessage('time_event')
  onTimeEvent(@MessageBody() body: TimeEvent) {
    Logger.verbose(body, 'WebSocketServer[onTimeEvent]');
    this.meetingService.onTimeEvent(body);
  }
}

export { MeetingGateway };
