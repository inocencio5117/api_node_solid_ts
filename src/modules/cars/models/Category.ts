import { v4 as uuid } from 'uuid';

class Category {
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

// eslint-disable-next-line import/prefer-default-export
export { Category };
