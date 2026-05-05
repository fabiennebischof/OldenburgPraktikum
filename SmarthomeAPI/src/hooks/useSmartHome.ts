import { useState } from "react";
import { api } from "../Api/api";
import { LIGHTS } from "../constants/lights";
import type { Room } from "../constants/lights";

export function useSmartHome() {
    const [lights, setLights] = useState({
        hallway: false,
        bedroom: false,
        dim1: false,
        dim2: false,
    });

    const [rgbEnabled, setRgbEnabled] = useState<Record<Room, boolean>>({
        living: false,
        bedroom: false,
        hallway: false,
    });

    const [rgb, setRgb] = useState<Record<Room, { r: number; g: number; b: number }>>({
        living: { r: 255, g: 0, b: 0 },
        bedroom: { r: 0, g: 255, b: 0 },
        hallway: { r: 0, g: 0, b: 255 },
    });

    const [brightness, setBrightness] = useState<Record<Room, number>>({
        living: 255,
        bedroom: 255,
        hallway: 255,
    });

    const toggle = async (key: keyof typeof lights, apiKey: string, value: boolean) => {
        setLights(prev => ({ ...prev, [key]: value }));
        try {
            await api.put(`/values/${apiKey}`, { value: value ? 1 : 0 });
        } catch (err) {
            console.error(err);
        }
    };

    const toggleRGB = async (room: Room, value: boolean) => {
        setRgbEnabled(prev => ({ ...prev, [room]: value }));
        try {
            await api.put(`/values/${LIGHTS.rgb[room].base}`, { value: value ? 1 : 0 });
        } catch (err) {
            console.error(err);
        }
    };

    const updateRGB = async (room: Room, key: "r" | "g" | "b", value: number) => {
        if (!rgbEnabled[room]) return;

        const updated = { ...rgb[room], [key]: value };
        setRgb(prev => ({ ...prev, [room]: updated }));

        try {
            await Promise.all([
                api.put(`/values/${LIGHTS.rgb[room].r}`, { value: updated.r }),
                api.put(`/values/${LIGHTS.rgb[room].g}`, { value: updated.g }),
                api.put(`/values/${LIGHTS.rgb[room].b}`, { value: updated.b }),
            ]);
        } catch (err) {
            console.error(err);
        }
    };

    const updateBrightness = async (room: Room, value: number) => {
        if (!rgbEnabled[room]) return;

        setBrightness(prev => ({ ...prev, [room]: value }));

        try {
            await api.put(`/values/${LIGHTS.rgb[room].brightness}`, { value });
        } catch (err) {
            console.error(err);
        }
    };

    const setAll = async (value: 0 | 1) => {
        const on = value === 1;

        setLights(prev =>
            Object.fromEntries(
                Object.keys(prev).map(key => [key, on])
            ) as typeof prev
        );

        setRgbEnabled(prev =>
            Object.fromEntries(
                Object.keys(prev).map(key => [key, on])
            ) as typeof prev
        );

        setBrightness(prev =>
            Object.fromEntries(
                Object.keys(prev).map(key => [key, on ? 255 : 0])
            ) as typeof prev
        );

        try {
            await api.put(`/values/${LIGHTS.all}`, { value });
        } catch (err) {
            console.error(err);
        }
    };

    return {
        lights,
        rgbEnabled,
        rgb,
        brightness,
        toggle,
        toggleRGB,
        updateRGB,
        updateBrightness,
        setAll,
    };
}