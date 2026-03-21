import React, { useEffect, useState } from "react";
import "../styles.css";

function Home() {

  const baseImages = [
    "../public/p1.jpg",
    "../public/p2.jpg",
    "../public/p3.jpg",
    "../public/p4.jpg",
    "../public/p5.jpg",
  ];

  const images = [...baseImages, ...baseImages, ...baseImages];
  const [index, setIndex] = useState(0);

useEffect(() => {
  const slider = setInterval(() => {
    setIndex((prev) => (prev + 1) % baseImages.length);
  }, 3000);

  return () => clearInterval(slider);
}, []);

  return (
    <div className="home">

      {/* HERO */}
      <section className="hero">

        <div className="hero-text">
          <h1>SkillBridge</h1>

          <h2>Connect Skills with Impact</h2>

          <p>
            A micro-volunteering platform connecting skilled individuals
            with short-term impactful tasks.
          </p>

          <button className="cta">Get Started</button>
        </div>


        {/* IMAGE SLIDER */}
        <div className="carousel-container">
  <div className="carousel-track">

    {Array.from({ length: 5 }).map((_, i) => {

      const imgIndex = (index + i) % baseImages.length;

      const distance = Math.abs(i - 2); // center card
      const scale = Math.max(1 - distance * 0.2, 0.6);

      return (
        <div
          key={i}
          className="carousel-card"
          style={{
            transform: `scale(${scale})`,
            transition: "transform 0.6s ease"
          }}
        >
          <img src={baseImages[imgIndex]} alt="" />
        </div>
      );
    })}

  </div>
</div>



      </section>



      {/* FEATURES INTRO */}

      <section className="intro">
        <h2>Everything You Need to Contribute</h2>

        <p>
          Discover meaningful tasks, collaborate with organizations,
          and create real-world impact using your skills.
        </p>
      </section>



      {/* FEATURES GRID */}

      <section className="features">

        <div className="feature large">
          <h3>Collaboration</h3>
          <p>Work together with organizations and volunteers.</p>
        </div>

        <div className="feature small">
          <h3>Task Marketplace</h3>
          <p>Find impactful micro-volunteering tasks.</p>
        </div>

        <div className="feature small">
          <h3>Scheduling</h3>
          <p>Plan and manage your volunteer time.</p>
        </div>

        <div className="feature large">
          <h3>Impact Tracking</h3>
          <p>See the difference your skills create.</p>
        </div>

      </section>



      {/* STATS */}

      <section className="stats">

        <h2>Real Impact Through Skills</h2>

        <div className="stats-grid">

          <div className="stat">
            <h3>500+</h3>
            <p>Tasks Completed</p>
          </div>

          <div className="stat">
            <h3>200+</h3>
            <p>Volunteers</p>
          </div>

          <div className="stat">
            <h3>80+</h3>
            <p>Organizations</p>
          </div>

          <div className="stat">
            <h3>1200+</h3>
            <p>Hours Contributed</p>
          </div>

        </div>

      </section>



      {/* CTA */}

      <section className="cta-section">

        <h2>Start Making an Impact Today</h2>

        <p>
          Join SkillBridge and contribute your skills to meaningful causes.
        </p>

        <button className="cta">Explore Tasks</button>

      </section>

    </div>
  );
}

export default Home;