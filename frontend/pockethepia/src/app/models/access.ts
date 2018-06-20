import { User } from './user';
import { Room } from './room';

export class Access {
  id: String;
  user: User;
  room: Room;
  startDate: Date;
  endDate: Date;
  startTime: number;
  endTime: number;

  constructor(access: Access) {
    this.id = access.id;
    this.user = new User(access.user);
    this.room = new Room(access.room);
    this.startDate = new Date(access.startDate);
    this.endDate = access.endDate ? new Date(access.endDate) : undefined;
    this.startTime = access.startTime;
    this.endTime = access.endTime;
  }

  private static minutesPastMidnightToTimeString(time: number): String {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    const hoursString = `0${hours}`.slice(-2);
    const minutesString = `0${minutes}`.slice(-2);
    return `${hoursString}:${minutesString}`;
  }

  startTimeString(): String {
    return Access.minutesPastMidnightToTimeString(this.startTime);
  }

  endTimeString(): String {
    return Access.minutesPastMidnightToTimeString(this.endTime);
  }
}
