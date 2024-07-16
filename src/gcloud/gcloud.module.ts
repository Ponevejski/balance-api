// src/storage/storage.module.ts
import { Storage } from '@google-cloud/storage';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [
    {
      provide: Storage,
      useFactory: (configService: ConfigService) => {
        return new Storage({
          projectId: configService.get<string>('GC_PROJECT_ID'),
          credentials: {
            client_email: configService.get<string>('GC_CLIENT_EMAIL'),
            private_key: configService
              .get<string>('GC_PRIVATE_KEY')
              .replace(/\\n/g, '\n'),
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [Storage],
})
export class GCloudModule {}
