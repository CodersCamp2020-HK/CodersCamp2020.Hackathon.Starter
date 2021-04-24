class JoinMeetingDTO {
  // @IsString()
  meetingName: string;

  // @IsString()
  name: string;

  // @IsEmail()
  email: string;

  ownerId?: string;
}

export { JoinMeetingDTO };
