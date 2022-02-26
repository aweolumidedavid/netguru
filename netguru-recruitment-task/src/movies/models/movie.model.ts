import * as mongoose from 'mongoose';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { mongooseSchemaConfig } from '../../utils/database/schema.config';


@Schema(mongooseSchemaConfig)
export class Movie extends mongoose.Document {
  @Prop()
  title: string;

  @Prop()
  released: Date;

  @Prop()
  genre: string;

  @Prop()
  director: string;

  @Prop()
  createdBy: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);


