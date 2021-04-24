import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
import { MeetingService } from '../../application/meeting.service';
import { CreateMeetingDTO } from '../../domain/createMeeting.dto';
import { ConfigService } from '@nestjs/config';
import {
  GlobalConfig,
  GlobalConfigKey,
} from '../../configuration/configs/global.config';

class MeetingCreatedDTO {
  @ApiProperty()
  ownerId: string;

  @ApiProperty()
  url: string;
}
@ApiTags('Meeting')
@Controller('meetings')
class MeetingController {
  private readonly url: string;
  constructor(
    configService: ConfigService,
    private readonly meetingService: MeetingService,
  ) {
    this.url = configService.get<GlobalConfig>(GlobalConfigKey).http.url;
  }

  @ApiOkResponse({
    type: MeetingCreatedDTO,
  })
  @Post()
  async createMeeting(@Body() dto: CreateMeetingDTO) {
    const { ownerId, meetingName } = this.meetingService.createMeeting(dto);
    return { ownerId, url: `${this.url}/meeting/${meetingName}` };
  }
}

export { MeetingController };
