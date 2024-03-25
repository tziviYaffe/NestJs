import { Injectable, NotFoundException } from '@nestjs/common';
import { PersonDTO } from 'src/DTO/person.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Person } from './person.model';

//כדי שקונטרולר יוכל לעבוד מול סרביס
Injectable();
export class PersonService {
  constructor(
    @InjectModel('Person') private readonly personModel: Model<Person>,
  ) {}

  async addPerson(name: string, age: number) {
    const newPeson = new this.personModel({
      name,
      age,
    });
    const result = await newPeson.save();
    return result.id as string;
  }

  async getAllPerson() {
    const persons = await this.personModel.find().exec();
    return persons.map((per) => ({
      id: per.id,
      name: per.name,
      age: per.age,
    }));
  }

  async getPerson(id: string): Promise<Person> {
    let person;
    try {
      person = await this.personModel.findById(id);
    } catch (error) {
      throw new NotFoundException('Could not find person.');
    }
    if (!person) throw new NotFoundException('Could not find person.');
    return person;
  }

  async getSinglePerson(perId: string) {
    const person = await this.getPerson(perId);
    return {
      id: person.id,
      name: person.name,
      age: person.age,
    };
  }

  async updatePerson(perId: string, name: string, age: number) {
    const updatedPerson = await this.getPerson(perId);
    if (name) {
      updatedPerson.name = name;
    }
    if (age) updatedPerson.age = age;
    updatedPerson.save();
  }

  async deletePerson(perId: string) {
    const result = await this.personModel.deleteOne({ _id: perId }).exec();
  }
}
