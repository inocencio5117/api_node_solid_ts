import { v4 as uuid } from "uuid";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("categories")
class Category {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  createdAt: Date;

  @CreateDateColumn()
  description: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

// eslint-disable-next-line import/prefer-default-export
export { Category };
