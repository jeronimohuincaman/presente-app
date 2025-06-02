import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './create-user.dto';

export type User = any;

@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService) { }

    private readonly users = [
        {
            userId: 1,
            username: 'john',
            password: 'changeme',
        },
        {
            userId: 2,
            username: 'maria',
            password: 'guess',
        },
    ];

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find((user) => user.username === username);
    }

    async create(payload: CreateUserDto) {
        return this.prisma.user.create({ data: payload });
    }
}
