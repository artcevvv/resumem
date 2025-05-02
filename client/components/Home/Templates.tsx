import React from "react";
import Container from "../Global/Container";

function Templates() {
  const galleryItems = [
    {
      id: "1",
      content: (
        <div className="h-[300px] md:h-[400px] bg-red rounded-2xl">
          <h1>Template 1</h1>
        </div>
      ),
    },
    {
      id: "2",
      content: (
        <div className="h-[300px] md:h-[400px] bg-blue rounded-2xl">
          <h1>Template 2</h1>
        </div>
      ),
    },
    {
      id: "3",
      content: (
        <div className="h-[300px] md:h-[400px] bg-pink rounded-2xl">
          <h1>Template 3</h1>
        </div>
      ),
    },
    {
      id: "4",
      content: (
        <div className="h-[300px] md:h-[400px] bg-green rounded-2xl">
          <h1>Template 4</h1>
        </div>
      ),
    },
  ];

  return (
    <section className="py-8 md:py-16">
      <Container>
        <div className="bg-background w-full max-w-3xl mx-auto text-center py-6 px-4 md:px-20 rounded-3xl mb-8 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold">
            Choose from a variety of top-tier templates and create your resume
            in just minutes
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryItems.map((item) => item.content)}
        </div>
      </Container>
    </section>
  );
}

export default Templates;
