import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonDTO } from 'src/DTO/person.dto';

@Controller('person')
export class PersonController {
  //אם הקונטרולר מקבל בקשת get מ person
  //זאת הפונקציה שצריכה להיות מופעלת

  //כדי הקונטרולר יוכל לפנות לסרביס
  //נשתמש ב dependency injuctuon
  //כעת יש מופע אחד עם מצביע אליו
  constructor(private srv: PersonService) {}

  @Get()
  async getPersons() {
    const persons = await this.srv.getAllPerson();
    return persons;
  }

  @Get(':id')
  getPerson(@Param('id') personID: string) {
    return this.srv.getSinglePerson(personID);
  }

  @Post()
  async addPerson(@Body('name') perName: string, @Body('age') perAge: number) {
    const generatedId = await this.srv.addPerson(perName, perAge);
    return { id: generatedId };
  }

  @Put(':id')
  async updatePerson(
    @Param('id') perId: string,
    @Body('name') perNmae: string,
    @Body('age') perAge: number,
  ) {
    await this.srv.updatePerson(perId, perNmae, perAge);
    return 'Updated!';
  }

  @Delete(':id')
  async deletePerson(@Param('id') perId: string) {
    await this.srv.deletePerson(perId);
    return 'Deleted!';
  }
}
