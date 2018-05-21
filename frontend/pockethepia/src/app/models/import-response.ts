export class ImportResponse {
  importBatch: string;
  doneCount: number;
  failedCount: number;

  constructor(response: ImportResponse) {
    this.importBatch = response.importBatch;
    this.doneCount = response.doneCount;
    this.failedCount = response.failedCount;
  }
}
