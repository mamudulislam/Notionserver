import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BlocksService } from './blocks.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('blocks')
@UseGuards(AuthGuard('jwt'))
export class BlocksController {
    constructor(private readonly blocksService: BlocksService) { }

    @Post()
    create(@Body() createBlockDto: { type: string; content?: string; pageId: string; order: number }) {
        return this.blocksService.create(createBlockDto);
    }

    @Get('page/:pageId')
    findAll(@Param('pageId') pageId: string) {
        return this.blocksService.findAllByPage(pageId);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateBlockDto: { type?: string; content?: string; order?: number }) {
        return this.blocksService.update(id, updateBlockDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.blocksService.remove(id);
    }

    @Post('reorder/:pageId')
    reorder(@Param('pageId') pageId: string, @Body('orders') orders: { id: string; order: number }[]) {
        return this.blocksService.reorder(pageId, orders);
    }
}
