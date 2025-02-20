import { MedicineMealtime, PatientDetails, PrescribedMedicine, Prescription } from '@/interfaces';
import React, { createContext, useState } from 'react';
import * as Crypto from 'expo-crypto';
import { addMedicines, addPatient, getAllPrescriptions } from '@/database/prescription';
import { router } from 'expo-router';


interface GlobalContextInterface {
    patientDetails: PatientDetails;
    setPatientDetails: React.Dispatch<React.SetStateAction<PatientDetails>>;
    handlePatientDetailsValue: (key: keyof PatientDetails, value: string) => void;
    patientDetailsError: boolean;
    prescribedMedicines: PrescribedMedicine[],
    medicineFormErrorsIDs: string[];
    setPrescribedMedicines: React.Dispatch<React.SetStateAction<PrescribedMedicine[]>>;
    handleAddMedicineForm: () => void;
    handleRemoveMedicineForm: (id: string) => void;
    setPrescribedMedicineValue: (id: string, key: keyof PrescribedMedicine, value: string | MedicineMealtime) => void;
    handleSaveAndCreatePDF: () => void;
    getPrescriptionsFromDatabase: () => Promise<void>;
    allPrescriptions: Prescription[];
}


export const GlobalContext = createContext<GlobalContextInterface | null>(null);

const GlobalValueProvider = ({ children }: { children: React.ReactNode; }) => {

    const [patientDetails, setPatientDetails] = useState<PatientDetails>({
        name: "",
        age: "",
        pressure: "",
        diabetic: "",
        blood: ""
    });
    const [prescribedMedicines, setPrescribedMedicines] = useState<PrescribedMedicine[]>([]);
    const [medicineFormErrorsIDs, setMedicineFormErrorsIDs] = useState<string[]>([]);
    const [patientDetailsError, setPatientDetailsError] = useState(false);
    const [allPrescriptions, setAllPrescriptions] = useState<Prescription[]>([]);

    const handlePatientDetailsValue = (key: keyof PatientDetails, value: string) => {
        setPatientDetails({ ...patientDetails, [key]: value });
    };

    const handleAddMedicineForm = () => {

        const id = Crypto.randomUUID();
        const newMedicine: PrescribedMedicine = {
            id,
            name: "",
            power: "",
            days: "",
            medicineMealtime: {
                morning: false,
                noon: false,
                night: false
            },
        };

        setPrescribedMedicines(prev => {
            return [...prev, newMedicine];
        });
    };

    const handleRemoveMedicineForm = (id: string) => {
        setPrescribedMedicines(prev => [...prev.filter(item => item.id !== id)]);
    };

    const setPrescribedMedicineValue = (id: string, key: keyof PrescribedMedicine, value: string | MedicineMealtime) => {
        setPrescribedMedicines(prev => {
            return prev.map(item => {
                if (item.id === id) {
                    return { ...item, [key]: value };
                }

                return item;
            });
        });
    };

    const checkInvalidInputValue = (): boolean => {
        const errorFormIDs = prescribedMedicines.filter(item => {
            if (!item.name || !item.days || (!item.medicineMealtime.morning && !item.medicineMealtime.noon && !item.medicineMealtime.night)) {
                return item;
            }
        }).map(item => item.id);

        setMedicineFormErrorsIDs(errorFormIDs);

        if (!patientDetails.name || !patientDetails.age) {
            setPatientDetailsError(true);
            return false;
        } else {
            setPatientDetailsError(false);
        }

        if (errorFormIDs.length > 0) {
            return false;
        }

        return true;
    };

    const handleSaveAndCreatePDF = async () => {
        if (!checkInvalidInputValue())
            return;

        const newPatietID = await addPatient(patientDetails);

        if (newPatietID) {
            console.log(newPatietID);
            await addMedicines(newPatietID, prescribedMedicines);
        }
        getAllPrescriptions();
        router.push('/files');
    };

    const getPrescriptionsFromDatabase = async () => {

        const prescriptions = await getAllPrescriptions();

        if (prescriptions) {
            setAllPrescriptions(prescriptions);
        }
    };

    return <GlobalContext.Provider
        value={{
            allPrescriptions,
            patientDetails,
            setPatientDetails,
            handlePatientDetailsValue,
            patientDetailsError,
            prescribedMedicines,
            medicineFormErrorsIDs,
            setPrescribedMedicines,
            handleAddMedicineForm,
            handleRemoveMedicineForm,
            setPrescribedMedicineValue,
            handleSaveAndCreatePDF,
            getPrescriptionsFromDatabase
        }}
    >
        {children}
    </GlobalContext.Provider>;
};

export default GlobalValueProvider;

