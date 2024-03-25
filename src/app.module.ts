import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonController } from './person/person.controller';
import { PersonService } from './person/person.service';
import { PersonModule } from './person/person.module';

@Module({
  imports: [
    PersonModule,
    MongooseModule.forRoot('mongodb://localhost:27017/NestJs'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
