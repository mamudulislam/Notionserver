import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { PagesService } from './pages.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('pages')
@UseGuards(AuthGuard('jwt'))
export class PagesController {
    constructor(private readonly pagesService: PagesService) { }

    @Post()
    create(@Body() createPageDto: { title: string; parentId?: string; icon?: string; coverImage?: string }, @Req() req: any) {
        return this.pagesService.create({ ...createPageDto, userId: req.user.userId });
    }

    @Get()
    findAll(@Req() req: any) {
        return this.pagesService.findAll(req.user.userId);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Req() req: any) {
        return this.pagesService.findOne(id, req.user.userId);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePageDto: any, @Req() req: any) {
        return this.pagesService.update(id, req.user.userId, updatePageDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Req() req: any) {
        return this.pagesService.archive(id, req.user.userId);
    }
}
