// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Bars } from 'react-loader-spinner';
//#00BFFF
function Spinner() {
    return (
        <div className="spinner">
            <Bars type="Bars" color="#00BFFF" height={50} width={50} />
        </div>
    );
}

export default Spinner;