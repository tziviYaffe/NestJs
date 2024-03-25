import { Module } from '@nestjs/common';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonSchema } from './person.model';

@Module({
  //הזרקת תלות
  imports: [
    MongooseModule.forFeature([{ name: 'Person', schema: PersonSchema }]),
  ],
  controllers: [PersonController],
  providers: [PersonService],
})
export class PersonModule {}
