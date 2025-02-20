import * as SQLite from 'expo-sqlite';

// Open (or create) the database
const db = SQLite.openDatabaseAsync('prescriptions.db');

export default db;
