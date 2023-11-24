import { drawMiniatures } from './small-pictures.js';
import { getPhotoDescription } from './data.js';
const renderedPhotos = getPhotoDescription();
drawMiniatures(renderedPhotos);
