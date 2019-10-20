enum Role { Admin, Normal }
enum Gender { Male, Female }

export class CreateUserDto {
  readonly name: string;
  readonly email: string;
  readonly username: string;
  readonly password: string;
  readonly gender: Gender;
  readonly birdthday?: Date;
  readonly role?: Role;
}

export class UpdateUserDto {
  readonly name: string;
  readonly email: string;
  readonly username: string;
  readonly password: string;
  readonly gender: Gender;
  readonly birdthday?: Date;
  readonly role?: Role;
}

  