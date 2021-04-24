import { ApiProperty } from '@nestjs/swagger';

class CreateMeetingDTO {
  @ApiProperty()
  meetingName: string;

  @ApiProperty()
  password?: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;
}

export { CreateMeetingDTO };
