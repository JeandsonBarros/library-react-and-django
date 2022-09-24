import './Layouts.css'
import { Switch } from "@nextui-org/react";
import { BsFillMoonStarsFill, BsSunFill } from "react-icons/bs";


function Header({ setIsDark, isDark }) {

    return (
        
            <header>

                <div style={{display:'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <h2>Library</h2>
                    <img style={{ marginLeft: 10 }} src={require('../imgs/logo.png')} width='50' alt="Jeandson Barros" />
                </div>

                <Switch
                    checked={!isDark}
                    size="xl"
                    iconOn={<BsSunFill />}
                    iconOff={<BsFillMoonStarsFill />}
                    onChange={() => {
                        
                        setIsDark(!isDark)
                        
                    }}
                />

            </header>
            
        
    );
}

export default Header;