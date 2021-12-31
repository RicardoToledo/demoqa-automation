import widgets from '../../pages/widgetsPage';
import { URL } from '../../data/constants'

fixture `Widgets: Interaction with widgets`
    .page `${URL.PRODUCTION}/slider`;

test.only ('Succesfully drag slider to random value (0-100)', async () => {
    await widgets.dragSlider();
});