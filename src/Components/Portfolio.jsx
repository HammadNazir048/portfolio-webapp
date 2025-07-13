/**
 * Portfolio component
 *
 * Highlights some of  your creations. These can be designs, websites,
 * open source contributions, articles you've written and more.
 *
 * This is a great area for you to to continually add to and refine
 * as you continue to learn and create.
 */

import React from "react";

/**
 * Desk image
 *
 * Below is a sample desk image. Feel free to update this to an image of your choice,
 * updating below imageAltText to string that represents what you see in that image.
 *
 * Need an image? Check out https://unsplash.com to download a photo you
 * freely use on your site.
 */
import image from "../images/Man-with-windowscreen.jpeg";

const imageAltText = "Man-with-windowscreen";

/**
 * Project list
 *
 * An array of objects that will be used to display for your project
 * links section. Below is a sample, update to reflect links you'd like to highlight.
 */
const projectList = [
  {
    title: "AI Powered Video Workflow",
    description: "An AI powered platform that simplifies video editing by intelligently gathering, analyzing, and enhancing multimedia content. It helps creators, editors, and storytellers focus on creativity and narrative flow by reducing manual effort, automating repetitive tasks, improving overall editing efficiency, and enabling faster, smarter content production at scale.",
    url: "https://github.com/HammadNazir048/PicTrail",
  },
  {
    title: "Verified Marketplace for Clean Tech",
    description:
      "Web Based Platform helping homeowners, businesses, and farmers in Pakistan transition to solar energy with ease. It offers AI-driven solar recommendations, verified installers, flexible financing, and after-sales support all in one place. By using real-time satellite data and local conditions.",
    url: "https://www.solarlgao.com",
  },
  {
    title: "ML Pipeline for Classification Data",
    description: "Machine Learning pipeline using Azure ML Designer to predict wine quality based on physicochemical properties. It leverages a drag-and-drop low-code approach to create, train, evaluate, and deploy ML models—all within the Azure ML Studio interface.",
    url: "https://github.com/HammadNazir048/ml-pipeline-wine-azure",
  },
  {
    title: "My Medium Blogs",
    description:
      "I write about AI trends, community building, and real-world tech experiences. From exploring machine learning concepts to empowering developer communities, my blog reflects my journey through innovation and impact",
    url: "https://medium.com/@mhn048c",
  },
];

const Portfolio = () => {
  return (
    <section className="padding" id="portfolio">
      <h2 style={{ textAlign: "center" }}>Portfolio</h2>
      <div style={{ display: "flex", flexDirection: "row", paddingTop: "3rem" }}>
        <div style={{ maxWidth: "40%", alignSelf: "center" }}>
          <img
            src={image}
            style={{ height: "90%", width: "100%", objectFit: "cover" }}
            alt={imageAltText}
          />
        </div>
        <div className="container">
          {projectList.map((project) => (
            <div className="box" key={project.title}>
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                <h3 style={{ flexBasis: "40px" }}>{project.title}</h3>
              </a>
              <p className="small">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
