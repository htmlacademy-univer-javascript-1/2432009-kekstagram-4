import { drawMiniatures } from "./small-pictures.js";
import { getPhotoDescription } from "./data.js";
const renderPhotoPreview = getPhotoDescription();
drawMiniatures(renderPhotoPreview);
