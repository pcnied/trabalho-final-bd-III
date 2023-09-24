import { appEnvs } from "../app/envs";
import { createServer } from "./config";
import { DatabaseConnection } from "./database";

Promise.all([DatabaseConnection.connect()])
  .then(() => {
    // Executa aqui quando as promises de conexão forem resolvidas
    const app = createServer();

    // START DO SERVER
    app.listen(appEnvs.port, () =>
      console.log(`Servidor rodando na porta ${appEnvs.port} 🚀`)
    );
  })
  .catch((err) => {
    // Executa aqui se estourar algum erro nas promises (conexão rejeitada)
    console.log(err);
  });
