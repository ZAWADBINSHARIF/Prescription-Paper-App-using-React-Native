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
    day: string;
    note?: string,
    medicineMealtime: MedicineMealtime;
}