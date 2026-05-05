import "../LightController/LightController.css";
import { SlidersHorizontal } from "lucide-react";


type DimmerProps = {
    label: string;
    checked: boolean;
    onChange: (value: boolean) => void;
};

export default function Dimmer({ label, checked, onChange }: DimmerProps) {
    return (
        <div className="card">
            <div className="card-header">
                <SlidersHorizontal className="icon" />
                <span className="title">{label}</span>
            </div>

            <label className="switch">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                />
                <span className="slider"></span>
            </label>
        </div>
    );
}
