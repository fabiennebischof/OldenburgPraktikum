import { api } from "../api";
import './LightController.css';

function LightController() {

    //all off
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
    const handleLight1 = async () => {
        try {

            const ourCheckbox = document.querySelector("#switch");

            if(!document.getElementById("switch") == null) 
            {

                if(true)
                {
                    const res = await api.put("/values/a001", 
                    {
                    value: 0
                    });
                    console.log(res.data);
                
                    return;
                }
                
            }
        } 
        catch (err) 
        {
            console.error(err);
        }
    };

    return (
        <div>
            <p>Light 1</p>
            <label onClick={handleLight1}>
                <input type="checkbox" className="switch" id="switch"/>
                <span className="slider"></span>
            </label>

            <br />

            <button className="button" onClick={handlePutEverythingOut}>
                PUT EVERYTHING OUT
            </button>
            <button className="button" onClick={handleLight1}>
                Light 1
            </button>
            <button className="button" onClick={handleGet}>
                GET
            </button>
            <button className="button" onClick={handleLight1}>
                PUT
            </button>
        </div>
    );
}

export default LightController;
