import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PagesService {
    constructor(private prisma: PrismaService) { }

    async findAll(userId: string) {
        return this.prisma.page.findMany({
            where: { userId, isArchived: false, parentId: null },
            orderBy: { updatedAt: 'desc' },
            include: { subPages: true },
        });
    }

    async findOne(id: string, userId: string) {
        const page = await this.prisma.page.findFirst({
            where: { id, userId, isArchived: false },
            include: {
                blocks: {
                    orderBy: { order: 'asc' },
                },
                subPages: true,
            },
        });

        if (!page) {
            throw new NotFoundException('Page not found');
        }

        return page;
    }

    async create(data: { title: string; userId: string; parentId?: string; icon?: string; coverImage?: string }) {
        return this.prisma.page.create({
            data: {
                title: data.title || 'Untitled',
                userId: data.userId,
                parentId: data.parentId,
                icon: data.icon,
                coverImage: data.coverImage,
            },
        });
    }

    async update(id: string, userId: string, data: any) {
        const page = await this.prisma.page.findFirst({ where: { id, userId } });
        if (!page) throw new NotFoundException('Page not found');

        return this.prisma.page.update({
            where: { id },
            data,
        });
    }

    async archive(id: string, userId: string) {
        const page = await this.prisma.page.findFirst({ where: { id, userId } });
        if (!page) throw new NotFoundException('Page not found');

        // Recursive archiving could be handled here or by just filtering in find
        return this.prisma.page.update({
            where: { id },
            data: { isArchived: true },
        });
    }
}
