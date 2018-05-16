import { User } from './user';

export class Log {
  id: String;
  category: String;
  description: String;
  date: Date;
  triggeringUser: User;
  rawData: any;

  constructor(log: Log) {
    this.category = log.category;
    this.id = log.id;
    this.description = log.description;
    this.date = new Date(log.date);
    this.triggeringUser = log.triggeringUser ? new User(log.triggeringUser) : undefined;
    this.rawData = log.rawData;
  }
}
