import { useEffect, useState } from 'react';

interface IProps {
  className: string;
  images: string[];
  animal: Function;
}

const Carousel = ({ className, images, animal }: IProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex((prevIndex) => {
      animal((prevIndex - 1 + images.length) % images.length);
      return(prevIndex - 1 + images.length) % images.length
    });
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => {
      animal((prevIndex + 1) % images.length);
      return(prevIndex + 1) % images.length
    });
  };

  useEffect(() => {
    animal(0);
  }, []);

  return (
    <div className={`relative rounded-xl overflow-hidden ${className}`}>
      {images.map((image: string, index: number) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
        >
          <img src={image} alt={`Slide ${index}`} className="w-full h-full object-cover" />
        </div>
      ))}
      <button
        onClick={prevImage}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
      >
        &lt;
      </button>
      <button
        onClick={nextImage}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
      >
        &gt;
      </button>
    </div>
  );
};

export default Carousel;
