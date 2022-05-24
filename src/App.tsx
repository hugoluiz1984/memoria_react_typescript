import * as C from './App.styles';
import logoImage from './assets/logo.png';
import RestartIcon from './svgs/restart.svg'
import PauseIcon from './svgs/pause.svg';
import PlayIcon from './svgs/play.svg'
import {InfoItem} from './components/InfoItem';
import {Button} from './components/Button';
import {GridItem} from './components/GridItem';
import { useEffect, useState } from 'react';
import {GridItemType} from './types/GridItemType';
import {items} from './data/items';
import {formatTime} from './helpers/formatTime';


const App = () => {

  const [playing, setPlaying] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [showCount, setShowCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);

  useEffect(()=>{
    resetAndCreateGrid()
  },[])

  useEffect(()=>{
    const timer = setInterval(() => {
      if(playing){
        setTimeElapsed(timeElapsed + 1);
      }
    }, 1000);
    return() => clearInterval(timer)
  },[playing, timeElapsed])

  //verificar se o icones são iguais
  useEffect(() => {
    if(showCount === 2) {
      let opened = gridItems.filter(item => item.show === true);
      if(opened.length === 2) {
        //se são igual mudar o permanentShow
        
        if(opened[0].item === opened[1].item) {
          let tmpGrid = [...gridItems];
          for(let i in tmpGrid) {
            if(tmpGrid[i].show) {
              tmpGrid[i].permanentShow = true;
              tmpGrid[i].show = false;
            }
          }
          setGridItems(tmpGrid);
          setShowCount(0);
        }else { //se são diferente mudar o show
          setTimeout(()=>{
            let tmpGrid = [...gridItems];
            for(let i in tmpGrid) {
              tmpGrid[i].show = false;
  
            }
            setGridItems(tmpGrid);
            setShowCount(0);
          }, 1000)
          
        }


        setMoveCount( moveCount => moveCount+1);
      }
    }
  

  }, [showCount, gridItems])
  
  useEffect(()=>{
    if(moveCount>0  && gridItems.every(item => item.permanentShow)){
      setPlaying(false);
    }
  },[moveCount,gridItems])



  const resetAndCreateGrid = () => {
    //passo 1 - reiniciar o jogo
    setTimeElapsed(0);
    setMoveCount(0);
    setShowCount(0);
    

    //passo 2 - criar a grid 
    let tmpGrid: GridItemType[] = [];

    for (let i = 0; i < items.length * 2; i++) {
      tmpGrid.push({ 
        item: null,
        show: false,
        permanentShow: false
      });
    }
    //passo 3 - preencher o grid item
    for (let w = 0; w < 2; w++) {
      for (let i = 0; i < items.length; i++){
        let pos = -1;
        while(pos < 0 || tmpGrid[pos].item !== null){//repete enquanto não encontra uma posição nula
          pos = Math.floor(Math.random() * (items.length * 2));
          console.log(pos)
          console.log(tmpGrid[pos])
        }
        tmpGrid[pos].item = i;
        
      }
    }
    //passo 5 - jogar no started
    setGridItems(tmpGrid);
    //passo 6 - começar o jogo
    setPlaying(true);

  }

  const handleItemClick = (index: number) => {
    if(playing && index !== null && showCount < 2){
      let tmpGrid = [...gridItems];

      if(tmpGrid[index].permanentShow === false && tmpGrid[index].show === false) {
        tmpGrid[index].show = true;
        setShowCount(showCount + 1);
      }

      setGridItems(tmpGrid);
    }
  }
  const pauseGame = () => {
    setPlaying(!playing);
  }

  return (
    <C.Container>
      <C.Info>
        <C.LogoLink href="">
          <img src={logoImage} alt="Logo" width="200"/>
        </C.LogoLink>

        <C.InfoArea>
          <InfoItem label='Tempo' value={formatTime(timeElapsed)}/>
          <InfoItem label='Movimentos' value={moveCount.toString()}/>
        </C.InfoArea>
        <Button label='Reiniciar' icon={RestartIcon} onClick={resetAndCreateGrid} />
        <Button label={playing ?'Pausar': 'Continuar'} icon={playing ? PauseIcon : PlayIcon} onClick={pauseGame} />
      </C.Info>
      <C.gridArea>
        <C.Grid>
          {gridItems.map((item, index) =>(
            <GridItem
              key={index}
              item={item}
              onClick={() => handleItemClick(index)}
            />
          ))}
        </C.Grid>
      </C.gridArea>
    </C.Container>
  )
}
export default App;
