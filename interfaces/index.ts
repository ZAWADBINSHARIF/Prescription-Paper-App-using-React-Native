export interface PrescribedMedicine {
    id: string,
    name: string,
    power: string,
    note?: string,
    medicineMealtime: {
        morning: boolean,
        noon: boolean,
        night: boolean;
    };
}