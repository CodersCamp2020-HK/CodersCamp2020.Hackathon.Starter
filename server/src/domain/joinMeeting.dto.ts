class JoinMeetingDTO {
  // @IsString()
  meetingName: string;

  // @IsString()
  name: string;

  // @IsEmail()
  email?: string;

  password?: string;

  ownerId?: string;
}

export { JoinMeetingDTO };
