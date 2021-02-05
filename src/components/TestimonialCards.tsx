import React from 'react';
import Img from 'gatsby-image';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Section } from './Section';

const TestimonialCard = ({ card }: { card: TestimonialCardProps }) => {
  const { logo, signature, text } = card;
  const { childImageSharp } = logo?.localFile || {};
  const dummyUrl = 'hiddenBoost';

  return (
    <div className="col-12 mb-4 mb-xl-0 col-xl-6">
      <div className="p-5 card-border-style h-100 d-flex flex-column justify-content-between">
        <div>
          {!!childImageSharp && <Img {...childImageSharp} />}
          <div className="my-5">
            <MDXRenderer>{text.childMdx.body}</MDXRenderer>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <p className="my-0 text-muted">{signature}</p>
          <a href={dummyUrl} className="my-0 ">
            {`Customer Story >`}
          </a>
        </div>
      </div>
    </div>
  );
};

export const TestimonialCards = ({ cards }: { cards: TestimonialCardProps[] }) => (
  <Section>
    <div className="row">
      {cards.map((v) => (
        <TestimonialCard key={v.signature} card={v} />
      ))}
    </div>
  </Section>
);
