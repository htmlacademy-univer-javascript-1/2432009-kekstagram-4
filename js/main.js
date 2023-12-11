import { drawMiniatures } from './small-pictures.js';
import { getPhotoDescription } from './data.js';
import { initEditPopup } from './edit-popup.js';


const renderedPhotos = getPhotoDescription();
drawMiniatures(renderedPhotos);
initEditPopup();
