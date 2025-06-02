import { IsString, IsOptional, IsInt, IsDate, MaxLength } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @MaxLength(255)
    username: string;

    @IsString()
    @MaxLength(255)
    firstName: string;

    @IsString()
    @MaxLength(255)
    lastName: string;

    @IsOptional()
    @IsInt()
    isActive?: number;

    @IsOptional()
    @IsDate()
    createdAt?: Date;

    @IsOptional()
    @IsDate()
    updatedAt?: Date;

    @IsOptional()
    @IsDate()
    deletedAt?: Date | null;
}
