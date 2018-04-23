import { Injectable } from '@angular/core';

@Injectable()
export class FlashService {
  public flashes: string[] = [];

  constructor() { }

  add(flash: string) {
    this.flashes.push(flash);
  }

  clear() {
    this.flashes = []
  }
}
