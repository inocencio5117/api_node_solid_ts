import {
  createConnection,
  getConnectionManager,
  getConnectionOptions,
} from "typeorm";

interface IOptions {
  host: string;
}

getConnectionOptions().then((options) => {
  const newOptions = options as IOptions;
  newOptions.host = "database_ignite";

  createConnection({
    ...options,
  });
});

// const connectionManager = getConnectionManager();

// if(!connectionManager.has("default")){
//     // ? load connection options from ormconfig or environment
//     const connectionOptions = await getConnectionOptions();
//     connectionManager.create(connectionOptions);
// }

// // ? connect to the database
// try {
//     db = connectionManager.get();
//     await db.connect();
// } catch (error) {
//     console.log(error);
//     return;
// }
