import { v4 as uuid } from 'uuid'

class Specification {
  id?: string;

  name: string;

  createdAt: Date;

  description: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }

}

export { Specification }