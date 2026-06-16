import { sendGTMEvent } from "@next/third-parties/google";
import { FormButtonProps } from "@/types/types";

export default function FormButton({ campaign }: FormButtonProps) {

    const handleFormClick =() => {
        sendGTMEvent({
            event: "form_submit_whatsapp",
            form_name: `landing_page`,
            campaign: campaign
        });

        setTimeout(() => {
            window.location.href = "https://wa.me/556199216585?text=Ol%C3%A1,%20vim%20pelo%20site";
        }, 500);
    };

    return (
        <button 
        
        onClick={handleFormClick} 
        className="bg-button text-buttonText hover:bg-hover shadow-lg shadow-highlight/20 px-5 py-2 cursor-pointer">
            Enviar
        </button>
    )
}