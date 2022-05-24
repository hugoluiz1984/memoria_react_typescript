import * as C from './App.styles';
import logoImage from './assets/logo.png';
import RestartIcon from './svgs/restart.svg'
import {InfoItem} from './components/InfoItem';
import {Button} from './components/Button';


const App = () => {

  const resetAndCreateGrid = () => {

  }

  return (
    <C.Container>
      <C.Info>
        <C.LogoLink href="">
          <img src={logoImage} alt="Logo" width="200"/>
        </C.LogoLink>

        <C.InfoArea>
          <InfoItem label='Tempo' value="00:00"/>
          <InfoItem label='Movimentos' value="0"/>
        </C.InfoArea>
        <Button label='Reiniciar' icon={RestartIcon} onClick={resetAndCreateGrid} />
        
      </C.Info>
      <C.gridArea>
        ...
      </C.gridArea>
    </C.Container>
  )
}
export default App;
