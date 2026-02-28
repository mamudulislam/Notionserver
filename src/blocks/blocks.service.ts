import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BlocksService {
    constructor(private prisma: PrismaService) { }

    async findAllByPage(pageId: string) {
        return this.prisma.block.findMany({
            where: { pageId },
            orderBy: { order: 'asc' },
        });
    }

    async create(data: { type: string; content?: string; pageId: string; order: number }) {
        return this.prisma.block.create({
            data,
        });
    }

    async update(id: string, data: { type?: string; content?: string; order?: number }) {
        const block = await this.prisma.block.findUnique({ where: { id } });
        if (!block) throw new NotFoundException('Block not found');

        return this.prisma.block.update({
            where: { id },
            data,
        });
    }

    async remove(id: string) {
        const block = await this.prisma.block.findUnique({ where: { id } });
        if (!block) throw new NotFoundException('Block not found');

        return this.prisma.block.delete({
            where: { id },
        });
    }

    async reorder(pageId: string, blockOrders: { id: string; order: number }[]) {
        const updates = blockOrders.map((bo) =>
            this.prisma.block.update({
                where: { id: bo.id },
                data: { order: bo.order },
            }),
        );
        return Promise.all(updates);
    }
}
