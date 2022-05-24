import * as C from './App.styles';
import logoImage from './assets/logo.png';

const App = () => {

  return (
    <C.Container>
      <C.Info>
        <C.LogoLink href="">
          <img src={logoImage} alt="Logo" width="200"/>
        </C.LogoLink>

        <C.InfoArea>
          ...
        </C.InfoArea>
        <button>Reiniciar</button>
      </C.Info>
      <C.gridArea>

      </C.gridArea>
    </C.Container>
  )
}
export default App;
