import type { ModelData } from "../models/Model";

export class ModelCache {
  private readonly databaseName = "binaire-models";
  private readonly storeName = "models";
  private readonly databaseVersion = 1;

  private openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(
        this.databaseName,
        this.databaseVersion
      );

      request.onupgradeneeded = () => {
        const db = request.result;

        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName);
        }
      };

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  saveModels(models: ModelData[]): Promise<void> {
    return this.openDatabase().then((db) => {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(
          this.storeName,
          "readwrite"
        );

        const store = transaction.objectStore(
          this.storeName
        );

        store.put(models, "all-models");

        transaction.oncomplete = () => {
          db.close();
          resolve();
        };

        transaction.onerror = () => {
          db.close();
          reject(transaction.error);
        };
      });
    });
  }

  getModels(): Promise<ModelData[] | null> {
    return this.openDatabase().then((db) => {
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(
          this.storeName,
          "readonly"
        );

        const store = transaction.objectStore(
          this.storeName
        );

        const request = store.get("all-models");

        request.onsuccess = () => {
          db.close();
          resolve(request.result ?? null);
        };

        request.onerror = () => {
          db.close();
          reject(request.error);
        };
      });
    });
  }
}