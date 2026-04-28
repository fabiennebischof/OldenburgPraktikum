import { api } from "../api";
import './LightController.css';

function LightController() {

    const handlePutEverythingOut = async () => {
        try {
            const res = await api.put("/values/a02k", {
                value: 0
            });
            console.log(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleGet = async () => {
        try {
            const res = await api.get("/uiconfig");
            console.log(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    //Flur
    const handlePut = async () => {
        try {
            const res = await api.put("/values/a001", {
                value: 0
            });
            console.log(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>LightController funktioniert</h1>
            <button className="button" onClick={handleGet}>
                GET
            </button>
            <button className="button" onClick={handlePut}>
                PUT
            </button>
            <button className="button" onClick={handlePutEverythingOut}>
                PUT EVERYTHING OUT
            </button>
        </div>
    );
}

export default LightController;
