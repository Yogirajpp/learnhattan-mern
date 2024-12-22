import {
    LogInWithAnonAadhaar,
    useAnonAadhaar,
    AnonAadhaarProof,
} from "@anon-aadhaar/react";

import { useEffect } from "react";

const AadharButton = () => {
    const [anonAadhaar] = useAnonAadhaar();

    useEffect(() => {
        console.log("Anon Aadhaar status: ", anonAadhaar.status);
        console.log("connected")
    }, [anonAadhaar]);

    return (
        <>
            <LogInWithAnonAadhaar 
                nullifierSeed={1234} 
                fieldsToReveal={["revealAgeAbove18", "revealPinCode"]} 
            />
            {anonAadhaar?.status === "logged-in" && (
                <AnonAadhaarProof code={JSON.stringify(anonAadhaar.anonAadhaarProof, null, 2)} />
            )}
        </>
    );
};

export default AadharButton;
