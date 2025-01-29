import { MedicineMealtime, PatientDetails, PrescribedMedicine } from '@/interfaces';
import React, { createContext, useEffect, useState } from 'react';
import * as Crypto from 'expo-crypto';
import { useColorScheme } from 'nativewind';
import useLocalStorage from '@/hooks/useLocalStorage';
import { ColorSchemeName } from 'nativewind/dist/style-sheet/color-scheme';


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

    const handlePatientDetailsValue = (key: keyof PatientDetails, value: string) => {
        setPatientDetails({ ...patientDetails, [key]: value });
    };

    const handleAddMedicineForm = () => {

        const id = Crypto.randomUUID();
        const newMedicine: PrescribedMedicine = {
            id,
            name: "",
            power: "",
            day: "",
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
            if (!item.name || !item.day || (!item.medicineMealtime.morning && !item.medicineMealtime.noon && !item.medicineMealtime.night)) {
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

    const handleSaveAndCreatePDF = () => {
        if (!checkInvalidInputValue())
            return;

        console.log("PDF");
    };

    return <GlobalContext.Provider
        value={{
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
            handleSaveAndCreatePDF
        }}
    >
        {children}
    </GlobalContext.Provider>;
};

export default GlobalValueProvider;

