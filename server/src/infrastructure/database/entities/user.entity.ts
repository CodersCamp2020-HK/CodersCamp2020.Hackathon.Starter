import { ApiProperty } from '@nestjs/swagger';
import { CrudValidationGroups } from '@nestjsx/crud';
import { Exclude } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from '../../../domain/userRole';
import { Project } from './project.entity';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity()
class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: string;

  @Exclude()
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.NORMAL,
  })
  role: UserRole;

  @ApiProperty()
  @Column({
    length: 50,
    unique: true,
  })
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsEmail()
  @MaxLength(50)
  email: string;

  @ApiProperty()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column({
    length: 72,
  })
  @IsString()
  password: string;

  @ApiProperty()
  @Column({ length: 50, nullable: true })
  @IsOptional({ always: true })
  @IsString()
  @MaxLength(50)
  @MinLength(1)
  name: string;

  @ApiProperty()
  @Column({ length: 50, nullable: true })
  @IsOptional({ always: true })
  @IsString()
  @MaxLength(50)
  @MinLength(1)
  surname: string;

  @ApiProperty({ type: Project, isArray: true })
  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];

  @Exclude()
  @CreateDateColumn()
  createdDate: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedDate: Date;

  @Exclude()
  @DeleteDateColumn()
  deletedDate: Date;
}

export { User };
