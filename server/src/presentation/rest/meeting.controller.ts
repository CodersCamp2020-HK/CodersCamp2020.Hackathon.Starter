import { Body, Controller, Post, Redirect, Res } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MeetingService } from '../../application/meeting.service';
import { CreateMeetingDTO } from '../../domain/createMeeting.dto';
import { Response as ExResponse } from 'express';
import { ConfigService } from '@nestjs/config';
import {
  GlobalConfig,
  GlobalConfigKey,
} from '../../configuration/configs/global.config';

@ApiTags('Meeting')
@Controller('meeting')
class MeetingController {
  private readonly url: string;
  constructor(
    configService: ConfigService,
    private readonly meetingService: MeetingService,
  ) {
    this.url = configService.get<GlobalConfig>(GlobalConfigKey).http.url;
  }

  @ApiOkResponse()
  @Post()
  @Redirect()
  async createMeeting(
    @Body() dto: CreateMeetingDTO,
    @Res({ passthrough: true }) resp: ExResponse,
  ) {
    const { ownerId, meetingName } = this.meetingService.createMeeting(dto);
    resp.cookie('onwer_id', ownerId, { path: `/${meetingName}` });
    return { url: `${this.url}/${meetingName}` };
  }
}

export { MeetingController };
