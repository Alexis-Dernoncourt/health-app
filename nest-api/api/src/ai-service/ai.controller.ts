import {
  BadRequestException,
  Controller,
  FileTypeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AiService } from './ai.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { ImageUploadBody } from './dto/ai.dto';

@ApiBearerAuth()
@Controller('/api/v1/ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('analyze-recipe')
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: (_, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return cb(
            new BadRequestException('Only image files are allowed!'),
            false,
          );
        }
        cb(null, true);
      },
      limits: { fileSize: 5 * 1024 * 1024, fields: 0, files: 1 },
    }),
  )
  @ApiBody({
    description: 'Image upload body',
    required: true,
    type: ImageUploadBody,
  })
  @ApiConsumes('multipart/form-data')
  async analyzeRecipe(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ })],
      }),
    )
    image: Express.Multer.File,
  ) {
    return this.aiService.analyzeRecipe(image.buffer.toString('base64'));
  }
}
