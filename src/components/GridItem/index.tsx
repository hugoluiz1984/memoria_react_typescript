import * as C from './styles';
import {GridItemType} from '../../types/GridItemType'
import backImage from '../../assets/back.png';
import {items} from '../../data/items'

type Props = {
    item: GridItemType,
    onClick: () => void;
}
export const GridItem = ({item, onClick}: Props) => {
    return (
        <C.Container onClick={onClick} showBackground={item.permanentShow || item.show}>
            {!item.permanentShow && !item.show &&
                <C.Icon src={backImage} alt="" opacity={.1} />
            }
            {
                (item.permanentShow || item.show)&& item.item != null &&
                <C.Icon src={items[item.item].icon} alt="" />
            }
        </C.Container>
    )
}