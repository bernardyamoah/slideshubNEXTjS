// components/Slides.tsx
import React from 'react';
import UserSlidesCard from './UserSlidesCard';

interface SlidesProps {
  slides: Slide[];
  userId: string;
}

const Slides: React.FC<SlidesProps> = ({ slides, userId }) => (
  <>
    {slides.map((slide) => (
      <UserSlidesCard
        key={slide.$id}
        user_id={userId}
        {...slide}
        timePosted={slide.$createdAt}
        id={slide.$id}
      />
    ))}
  </>
);

export default Slides;