import { Init, Singleton, UtilsService } from '@abstractflo/atlas-shared';
import { mongoose } from '@typegoose/typegoose';
import { ConfigInterface } from '../interfaces/config.interface';

@Singleton
export class TypegooseDbService {

  @Init()
  public async connect(): Promise<void> {
    const connectionString = this.getConnectionString();

    try {
      await mongoose.connect(connectionString, {});
      UtilsService.logLoaded('Typegoose Plugin');
    } catch (e) {
      UtilsService.logError(e);
      throw e;
    }

  }

  /**
   * Generates the connection string for the mongodb connection
   * @returns {string}
   * @private
   */
  private getConnectionString(): string {
    const config = this.getConfig();
    const connectionString = `mongodb://${config.user}:${config.password}@${config.host}:${config.port}/${config.schema}`;

    return config.connectionString || connectionString;
  }


  /**
   * Return the MongoDB Connection Options or a key
   *
   * @return {string | ConfigInterface | null}
   * @private
   */
  private getConfig(): ConfigInterface
  private getConfig(key: string): string | null;
  private getConfig(key?: string): string | null | ConfigInterface {
    const config: ConfigInterface = {
      user: process.env.MONGODB_USER,
      schema: process.env.MONGODB_SCHEMA,
      password: process.env.MONGODB_PASSWORD,
      port: process.env.MONGODB_PORT,
      host: process.env.MONGODB_HOST,
      connectionString: process.env.MONGODB_CONNECTION_STRING
    };

    return key ? config[key] || null : config;
  }
}
