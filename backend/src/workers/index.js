export class WorkerManager {
  constructor() {
    this.workers = [];
  }

  registrar(workerInstance) {
    this.workers.push(workerInstance);
  }

  registrarWorkers(avaliableWorkers) {
    for (const WorkerClass of avaliableWorkers) {
      const workerInstance = new WorkerClass();
      this.registrar(workerInstance);
    }
  }

  async iniciarTodos() {
    for (const worker of this.workers) {
      await worker.start();
    }
  }
}
