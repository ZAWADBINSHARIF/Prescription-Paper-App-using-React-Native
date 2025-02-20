import { PatientDetails, Prescription, PrescribedMedicine } from "@/interfaces";
import db from "./db";


export const initializeDatabase = async () => {

    try {
        (await db).execAsync("PRAGMA foreign_keys = ON;");

        (await db).execAsync(`
            CREATE TABLE IF NOT EXISTS patients (
                _id INTEGER PRIMARY KEY AUTOINCREMENT, 
                name TEXT NOT NULL, 
                age INTEGER NOT NULL, 
                pressure TEXT, 
                diabetic TEXT, 
                blood TEXT
            );
    `);

        (await db).execAsync(`
            CREATE TABLE IF NOT EXISTS medicines (
                _id INTEGER PRIMARY KEY AUTOINCREMENT, 
                patient_id INTEGER, 
                name TEXT, 
                power TEXT,
                medicineMealtime TEXT, 
                days INTEGER, 
                note TEXT, 
                FOREIGN KEY (patient_id) REFERENCES patients(_id) ON DELETE CASCADE
            );
    `);
        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
};

export const getSinglePrescription = async (patient_id: number) => {
    try {
        const results: any[] = await (await db).getAllAsync(`
            SELECT p._id AS patient_id, p.name AS patient_name, p.age, p.pressure, p.diabetic, p.blood,
                   m._id AS medicine_id, m.name AS medicine_name, m.power, m.medicineMealtime, m.days, m.note
            FROM patients p
            LEFT JOIN medicines m ON m.patient_id = p._id
            WHERE p._id = ?;
        `, [patient_id]);

        if (results.length === 0) {
            console.log(`No prescription found for patient with ID ${patient_id}`);
            return null;
        }

        const patient: Prescription = {
            patient_id: results[0].patient_id,
            name: results[0].patient_name,
            age: results[0].age,
            pressure: results[0].pressure,
            diabetic: results[0].diabetic,
            blood: results[0].blood,
            medicines: []
        };

        results.forEach((row: any) => {
            if (row.medicine_id) {
                patient.medicines.push({
                    id: row.medicine_id,
                    name: row.medicine_name,
                    power: row.power,
                    medicineMealtime: JSON.parse(row.medicineMealtime),
                    days: row.days,
                    note: row.note
                });
            }
        });

        return patient;

    } catch (error) {
        console.error("Error fetching prescription:", error);
        return null;
    }
};

export const getAllPrescriptions = async () => {

    let allPrescriptions: Prescription[] | null = null;

    try {
        const results = await (await db).getAllAsync(`
            SELECT p._id AS patient_id, p.name AS patient_name, p.age, p.pressure, p.diabetic, p.blood,
                   m._id AS medicine_id, m.name AS medicine_name, m.power, m.medicineMealtime, m.days, m.note
            FROM patients p
            LEFT JOIN medicines m ON m.patient_id = p._id
            GROUP BY p._id;
        `);

        const patientsMap = new Map();

        results.forEach((row: any) => {
            if (!patientsMap.has(row.patient_id)) {
                patientsMap.set(row.patient_id, {
                    patient_id: row.patient_id,
                    name: row.patient_name,
                    age: row.age,
                    pressure: row.pressure,
                    diabetic: row.diabetic,
                    blood: row.blood,
                    medicines: []
                });
            }
            if (row.medicine_id) {
                patientsMap.get(row.patient_id).medicines.push({
                    medicine_id: row.medicine_id,
                    name: row.medicine_name,
                    power: row.power,
                    medicineMealtime: JSON.parse(row.medicineMealtime),
                    days: row.days,
                    note: row.note
                });
            }
        });
        allPrescriptions = Array.from(patientsMap.values());
        console.log(allPrescriptions);
        return allPrescriptions;
    } catch (error) {
        console.error("Error adding patient:", error);
    }
};

export const addPatient = async (patient: PatientDetails) => {
    try {
        const result = (await db).runAsync(`
      INSERT INTO patients (name, age, pressure, diabetic, blood) 
      VALUES (?, ?, ?, ?, ?);
    `, [patient.name, patient.age, patient.pressure, patient.diabetic, patient.blood]);

        console.log("Patient added successfully");

        return (await result).lastInsertRowId;

    } catch (error) {
        console.error("Error adding patient:", error);
    }
};

export const addMedicines = async (patient_id: number, medicines: PrescribedMedicine[]) => {
    try {

        for (const medicine of medicines) {

            const medicineMealtimeJson = JSON.stringify(medicine.medicineMealtime);

            const result = await (await db).runAsync(
                `INSERT INTO medicines (patient_id, name, power, medicineMealtime, days, note) VALUES (?, ?, ?, ?, ?, ?);`,
                [
                    patient_id,
                    medicine.name,
                    medicine.power,
                    medicineMealtimeJson,
                    medicine.days,
                    medicine.note ?? null
                ]
            );

            console.log(result.lastInsertRowId);
        }

        console.log("Medicines added successfully");
    } catch (error) {
        console.error("Error adding medicines:", error);
    }
};

export const deletePatientById = async (patient_id: number) => {
    try {
        const result = await (await db).runAsync(`
            DELETE FROM patients WHERE _id = ?;
        `, [patient_id]);

        console.log(`Patient with ID ${patient_id} deleted successfully`);

        return result;
    } catch (error) {
        console.error("Error deleting patient:", error);
    }
};


