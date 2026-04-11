import { seed } from "../data/seed.js";

// ==== CONFIG ====
const DB_NAME = "centralBankDB";
const DB_VERSION = 1;   

let db;

// ==== OPEN DATABASE ====

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const upgradeDB = event.target.result;

      if (!upgradeDB.objectStoreNames.contains("users")) {
        upgradeDB.createObjectStore("users", { keyPath: "username" });
      }
      if (!upgradeDB.objectStoreNames.contains("banks")) {
        upgradeDB.createObjectStore("banks", { keyPath: "bankId" });
      }
      if (!upgradeDB.objectStoreNames.contains("customers")) {
        upgradeDB.createObjectStore("customers", { keyPath: "customerId" });
      }
      if (!upgradeDB.objectStoreNames.contains("accounts")) {
        upgradeDB.createObjectStore("accounts", { keyPath: "accountNumber" });
      }

      console.log("Object stores created/verified.");
    };

    // IMPORTANT: must be outside onupgradeneeded
    request.onsuccess = (event) => {
      db = event.target.result;
      resolve(db);
    };

    request.onerror = () => reject("Failed to open IndexedDB");
  });
}



// ==== ADD DATA ====

function addDataToDB(storeName, data) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction([storeName], "readwrite");
    const store = tx.objectStore(storeName);

    data.forEach(item => store.put(item));

    tx.oncomplete = resolve;
    tx.onerror = () => reject("Failed inserting to " + storeName);
  });
}


// ==== INITIALIZE ====

async function initializeIndexedDB() {
  try {
    await openDB();
    console.log("IndexedDB opened.");

    // Check if already seeded
    const tx = db.transaction(["banks"], "readonly");
    const countReq = tx.objectStore("banks").count();

    countReq.onsuccess = async () => {
      if (countReq.result === 0) {
        console.log("Seeding database...");

        await addDataToDB("users", seed.users);
        await addDataToDB("banks", seed.banks);
        await addDataToDB("customers", seed.customers);
        await addDataToDB("accounts", seed.accounts);

        console.log("Database seeded.");
      } else {
        console.log("Database already contains data. Skipping seeding.");
      }

      document.dispatchEvent(new CustomEvent("indexedDBReady"));
    };
  } catch (err) {
    console.error("Initialization failed:", err);

    document.dispatchEvent(
      new CustomEvent("indexedDBReady", { detail: { error: err } })
    );
  }
}


// ==== FETCH HELPERS ====

window.getUsersFromDB = () => {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(["users"], "readonly");
    const store = tx.objectStore("users");
    const req = store.getAll();

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject("Error getting users");
  });
};

window.getBanksFromDB = () => {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(["banks"], "readonly");
    const store = tx.objectStore("banks");
    const req = store.getAll();

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject("Error getting banks");
  });
};

window.getCustomersFromDB = () => {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(["customers"], "readonly");
    const store = tx.objectStore("customers");
    const req = store.getAll();

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject("Error getting customers");
  });
};

window.getAccountsFromDB = () => {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(["accounts"], "readonly");
    const store = tx.objectStore("accounts");
    const req = store.getAll();

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject("Error getting accounts");
  });
};


// ==== START ====
initializeIndexedDB();
