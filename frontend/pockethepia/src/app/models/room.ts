import { Area } from './area';

export class Room {
  id: String;
  name: String;
  area: Area;

  constructor(room: Room) {
    this.id = room.id;
    this.name = room.name;
    this.area = new Area(room.area);
  }
}
