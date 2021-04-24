import { ApiProperty } from '@nestjs/swagger';

class CreateMeetingDTO {
  @ApiProperty()
  meetingName: string;

  @ApiProperty({ required: false })
  password?: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;
}

export { CreateMeetingDTO };
