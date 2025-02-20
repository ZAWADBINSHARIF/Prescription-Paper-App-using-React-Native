export interface PatientDetails {
    name: string;
    age: string;
    pressure: string;
    diabetic: string;
    blood: string;
}

export interface MedicineMealtime {
    morning: boolean,
    noon: boolean,
    night: boolean;
}

export interface PrescribedMedicine {
    id: string,
    name: string,
    power: string,
    days: string;
    note?: string,
    medicineMealtime: MedicineMealtime;
}

export interface Prescription extends PatientDetails {
    patient_id: number,
    medicines: PrescribedMedicine[];
}