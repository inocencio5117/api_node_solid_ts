import { getConnection } from "typeorm";
import { v4 as uuid } from "uuid";
import { hash } from "bcrypt";

import createConnection from "../index";

async function create() {
  const connection = await createConnection("localhost");

  const id = uuid();
  const password = await hash("admin", 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, "isAdmin", "createdAt", driver_license)
    values('${id}', 'admin', 'admin@admin.com', '${password}', 'true', 'now()', '123456')
    `
  );

  await connection.close;
}

create().then(() => console.log("User admin created"));
