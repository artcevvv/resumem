import React from "react";
import Container from "../Global/Container";
import Gallery from "../Global/Gallery";

function Templates() {
  const galleryItems = [
    {
      id: 1,
      content: (
        <div className="h-[400px] bg-red">
          <h1>qwers</h1>
        </div>
      ),
    },
    {
      id: 2,
      content: (
        <div className="w-[200px], h-[400px] bg-blue">
          <h1>qwers</h1>
        </div>
      ),
    },
    {
      id: 3,
      content: (
        <div className="w-[200px], h-[400px] bg-pink">
          <h1>qwers</h1>
        </div>
      ),
    },
    {
      id: 4,
      content: (
        <div className="w-[200px], h-[400px] bg-green">
          <h1>qwers</h1>
        </div>
      ),
    },
  ];
  return (
    <section className="flex flex-col items-center">
      <Container>
        <div className="bg-background max-w-3xl text-center py-6 px-20 rounded-3xl">
          <h2 className="text-3xl font-bold">
            Choose from a variety of top-tier templates and create your resume
            in just minutes
          </h2>
        </div>
        <Gallery items={galleryItems} mode="grid" gridColumns={4} />
      </Container>
    </section>
  );
}

export default Templates;
