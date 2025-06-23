import { AiFillCaretRight } from "react-icons/ai";
import styles from "./PhotoGrid.module.css";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

const PhotoGrid = ({ photos }) => {
  return (
    <div className={styles.photoGrid}>
      <PhotoProvider>
        <div className={styles.imageGrid}>
          {photos.map(({ src }, index) => (
            <PhotoView key={index} src={src}>
              <img className={styles.image} src={src} alt="" />
            </PhotoView>
          ))}
        </div>
      </PhotoProvider>
    </div>
  );
};

export default PhotoGrid;
