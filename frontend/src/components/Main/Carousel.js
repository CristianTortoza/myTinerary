import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from 'reactstrap';

const items = [
  [{
    src: './assets/pekin.png',
    nombre: 'Beijing',
    id: '1'
  },
  {
    src: './assets/Argentina.png',
    nombre: 'Buenos Aires',
    id: '2'
  },
  {
    src: './assets/Paris.png',
    nombre: 'Paris',
    id: '3'
  },
  {
    src: './assets/Roma.png',
    nombre: 'Rome',
    id: '4'
  }],
  [{
    src: './assets/japon.png',
    nombre: 'Osaka',
    id: '5'
  },
  {
    src: './assets/newYork.png',
    nombre: 'New York',
    id: '6'
  },
  {
    src: './assets/londres.png',
    nombre: 'London',
    id: '7'
  },
  {
    src: './assets/madrid.png',
    nombre: 'Madrid',
    id: '8'
  }],
  [{
    src: './assets/Venecia.png',
    nombre: 'Venice',
    id: '9'
  },
  {
    src: './assets/dubai.png',
    nombre: 'Dubai',
    id: '10'
  },
  {
    src: './assets/Sidney.png',
    nombre: 'Sydney',
    id: '11'
  },
  {
    src: './assets/Vancouver.png',
    nombre: 'Vancouver',
    id: '12'
  }]
];

const CarouselMain = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = items.map((item, index) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={index}
      > 
	  	<div className="row contenedorCarrusel">
				{item.map((fotos)=>
					<div   key={fotos.id} className="alturaImagenCarrusel" style={{backgroundImage: `url('${fotos.src}')`}}>
            <h5 className="imagenesCarrusel">{fotos.nombre}</h5>
					</div>
				)}
		</div>		
      </CarouselItem>
    );
  });

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      <CarouselIndicators items={slides} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
  );
}

export default CarouselMain;