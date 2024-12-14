import { PaymentElement } from "@stripe/react-stripe-js";

interface CardInputProps {
    isSubmitting: boolean;
    setIsValidCard: (status: boolean) => void;
}

export const CardInput: React.FC<CardInputProps> = ({ isSubmitting, setIsValidCard }) => {
    console.log("isSubmitting", isSubmitting);
    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <PaymentElement onChange={(event) => setIsValidCard(event.complete)} />
        </form>
    );
};
