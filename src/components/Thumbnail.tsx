import React, { useEffect, useRef, useState } from "react";
import useMeasure from "react-use-measure";
import './ImageScrollCard.css';

interface ImageScrollCardProps {
    imageUrl: string;
}

const Thumbnail: React.FC<ImageScrollCardProps> = ({ imageUrl }) => {
    const [imageHeight, setImageHeight] = useState<number>(0);
    const [ref, { height: containerHeight, width: containerWidth }] = useMeasure();
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (containerWidth > 0 && imgRef.current) {
            setImageHeight(imgRef.current.offsetHeight);
        }
    }, [containerWidth]);

    const handleImageLoad = () => {
        if (imgRef.current) {
            setImageHeight(imgRef.current.offsetHeight);
        }
    };

    const dynamicStyle = {
        '--image-height': `-${imageHeight}px`,
        '--container-height': `${containerHeight}px`,
    } as React.CSSProperties;

  return (
    <div className="scroll-card" style={dynamicStyle} ref={ref}>
        <img
            ref={imgRef}
            src={imageUrl}
            alt="Preview"
            onLoad={handleImageLoad}
            style={{ width: '100%', height: 'auto' }}
        />
    </div>
  );
};

export default Thumbnail;