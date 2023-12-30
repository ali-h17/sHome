import {useEffect, useMemo, useState} from 'react';
import Model from './components/Model';
import Controls from './components/Controls';
import ESPConnector from './classes/ESPConnector';
import Spinner from './components/Spinner';

import './styles/App.css';
import IState from './interfaces/IState';
import Dashboard from './components/Dashboard';
import Button from './components/Button';



const init: IState = {
    isGarageOpen: false,
    manual: false,
    isLocked: true,
    isWindowOpen: false,
    isLeftLightOn: true,
    isRightLightOn: false,
    lightColor: 0xff0000,
    isRaining: false,
    temp: 19,
    humidity: 68,
    fire: false,

};

function App(): JSX.Element {
    const [state, setState] = useState<IState>(init);
    const [isPreview, setIsPreview] = useState<Boolean>(false);
    const [isLoading, setIsLoading] = useState<Boolean>(true);

    const espConnector = useMemo(
        () => new ESPConnector('ws://192.168.82.85:80/ws', setState),
        []
    );




    useEffect(() => {
        if (isPreview) {
            espConnector.close();
            setIsLoading(false);
            return;
        }

        espConnector.connect(setIsLoading);
    }, [isPreview]);


    if (isLoading) {
        return (
            <div className="loading-screen">
                <p>Connecting...</p>
                <Spinner/>
                <Button onClick={() => setIsPreview(true)}>Preview</Button>
            </div>
        );
    }

    return (
        <>
            <div className="app">
                <div className="model-container">
                    <Model state={state}/>
                </div>

                <div className="side-container">
                    <Dashboard state={state}/>

                    <Controls
                        state={state}
                        setState={setState}
                        espConnector={espConnector}
                    />
                </div>
            </div>
        </>
    );
}

export default App;
