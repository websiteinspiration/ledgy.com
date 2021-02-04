import React from 'react';
import Img from 'gatsby-image';

const TestimonialCard = ({ card }: { card: TestimonialCardProps }) => {
  const { logo, signature, text } = card;
  const { localFile } = logo;
  const { childImageSharp } = localFile || {};
  const dummyUrl = 'hiddenBoost';

  return (
    <div className="col-12 col-xl-6 p-3">
      <div className="col-12 p-5 testimonial-card">
        <div className="testimonial-image-wrapper ">
          {!!childImageSharp && (
            <Img {...childImageSharp} className="testimonial-image img-responsive" />
          )}
        </div>

        <p className="my-5 ">{text.childMdx.body}</p>

        <div className="row d-flex justify-content-between">
          <p className="col-6 my-0 text-muted">{signature}</p>
          <a href={dummyUrl} className="my-0 ">
            {`Customer Story >`}
          </a>
        </div>
      </div>
    </div>
  );
};

export const TestimonialGrid = ({ cards }: { cards: TestimonialCardProps[] }) => (
  <div className="container p-4 d-flex">
    {cards.map((v) => (
      <TestimonialCard key={v.logo.title} card={v} />
    ))}
  </div>
);
