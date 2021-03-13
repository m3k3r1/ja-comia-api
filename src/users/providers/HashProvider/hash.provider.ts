export default interface HashProvider {
  generateHash(payload: string): Promise<string>;
  comparesHash(payload: string, hashed: string): Promise<boolean>;
}
