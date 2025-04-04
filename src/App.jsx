import React, { useState, useEffect } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { height } from "@fortawesome/free-brands-svg-icons/fa42Group";

const MilkyWayHero = () => {
  const [scrambledText, setScrambledText] = useState("");
  const actualText =
    "A determined developer crafting digital experiences—slow and steady, but always built to last!";

    const scrambleText = (text) => {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      return text
        .split("")
        .map((char) =>
          /[a-zA-Z]/.test(char) // Only scramble letters
            ? characters[Math.floor(Math.random() * characters.length)]
            : char
        )
        .join("");
    };// end of scrambleText function

  useEffect(() => {
    let interval = setInterval(() => setScrambledText(scrambleText(actualText)), 100);
    setTimeout(() => {
      clearInterval(interval);
      setScrambledText(actualText);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Parallax effect for stars
  useEffect(() => {
    const handleScroll = () => {
      let scrollValue = window.scrollY;
      document.querySelector(".stars-layer-1").style.transform = `translateY(${scrollValue * 0.3}px)`;
      document.querySelector(".stars-layer-2").style.transform = `translateY(${scrollValue * 0.5}px)`;
      document.querySelector(".stars-layer-3").style.transform = `translateY(${scrollValue * 0.7}px)`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Floating & draggable planets with orbit effect
  useEffect(() => {
    window.scrollTo(0, 0);
    const planets = document.querySelectorAll(".planet");

    planets.forEach((planet, index) => {
      let angle = Math.random() * 360; // Random starting position
      const orbitRadius = parseInt(getComputedStyle(planet).getPropertyValue("--orbit-radius")) || (index + 1) * 50;

      function updatePosition() {
        angle += 0.5; // Adjust speed of rotation
        const radian = (angle * Math.PI) / 180;

        // Get center of viewport
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        // Calculate new position
        const x = centerX + orbitRadius * Math.cos(radian) - planet.clientWidth / 2;
        const y = centerY + orbitRadius * Math.sin(radian) - planet.clientHeight / 2;

        planet.style.transform = `translate(${x}px, ${y}px)`;
        requestAnimationFrame(updatePosition);
      }

      updatePosition();

      const handleMouseDown = (e) => {
        isDragging = true;
        offsetX = e.clientX - planet.getBoundingClientRect().left;
        offsetY = e.clientY - planet.getBoundingClientRect().top;
        planet.style.position = "absolute";
        planet.style.cursor = "grabbing";
        planet.style.animation = "none";
      };

      const handleMouseMove = (e) => {
        if (!isDragging) return;
        planet.style.left = `${e.clientX - offsetX}px`;
        planet.style.top = `${e.clientY - offsetY}px`;
      };

      const handleMouseUp = () => {
        isDragging = false;
        planet.style.cursor = "grab";
        planet.style.animation = `float ${2 + Math.random() * 3}s infinite ease-in-out alternate, 
                                  rotate ${10 + Math.random() * 5}s linear infinite`;
      };

      planet.addEventListener("mousedown", handleMouseDown);
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        planet.removeEventListener("mousedown", handleMouseDown);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    });
  }, []);

  // Comet trail effect
  useEffect(() => {
    const createComet = (x, y) => {
      const comet = document.createElement("div");
      comet.className = "comet";
      document.body.appendChild(comet);
      comet.style.left = `${x}px`;
      comet.style.top = `${y}px`;
      setTimeout(() => comet.remove(), 500);
    };

    const handleMouseMove = (e) => createComet(e.clientX, e.clientY);
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  

  return (
    <div className="hero" id="hero">
      <div className="stars"></div>
      <div className="milkyway"></div>
      <div className="shooting-stars">
        <div className="parallax-container">
          <div className="stars stars-layer-1"></div>
          <div className="stars stars-layer-2"></div>
          <div className="stars stars-layer-3"></div>
        </div>
      </div>

      {[
        "mercury",
        "venus",
        "earth",
        "mars",
        "jupiter",
        "saturn",
        "uranus",
        "neptune",
      ].map((planet, index) => (
        <div key={index} className={`planet ${planet}`} style={{ "--orbit-radius": `${(index + 1) * 100}px` }}></div>
      ))}

      <div className="content">
        <h1>Hi! I'm Jomari Z. Francisco</h1>
        <p>{scrambledText}</p>
      </div>
    </div>
  );
};

const Header = () => (
  <header className="header">
    <nav>
      <ul className="nav-list">
        <li><a href="#hero">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#call-to-action">Contact</a></li>
      </ul>
    </nav>
  </header>
);

const AboutSection = () => {
  return (
    <section id="about" className="about-section">
      <div className="container">
      <div className="section-container">
      <h2 style={{ display: "flex", alignSelf: "center", justifyContent: "center" }}>About Me</h2>
      <p>
            Hello! I'm Jomari Z. Francisco, a student at Western Mindanao State University with a passion for designing intuitive user experiences, working with hardware components, and analyzing systems for optimal performance. I enjoy creating innovative and functional solutions that bridge technology and usability.
          </p>
        </div>
        {/* Career Goals Section with Container */}
        <div className="section-container">
          <div className="career-goals">
            <h3>Career Goals</h3>
            <p>
              My career goal is to become a skilled UX/UI Designer, specializing in creating intuitive, user-centered digital experiences that enhance usability and engagement. I aim to work on innovative projects that challenge me to grow creatively and technically, while contributing to the design community through collaboration, open-source initiatives, and mentorship. My focus is on crafting seamless interfaces that solve real-world problems and deliver meaningful value to users and businesses alike.
            </p>
          </div>
        </div>

        {/* Personal Touch Section with Container */}
        <div className="section-container">
          <div className="personal-touch">
            <h3>Hobbies & Fun Fact</h3>
            <p>
              When I'm not designing, I love spending time outdoors, whether it's enjoying a night out with friends or going on nature trips to recharge and find inspiration. I also enjoy exploring new technologies and tinkering with creative projects, like the time I built a mini weather station using Arduino that sends real-time data to my phone! While I used to play a lot of video games, I’ve now shifted my focus to more hands-on and immersive experiences that keep me connected to the world around me.
            </p>
          </div>
        </div>

        {/* Skills Section with Hover Effect */}
        <div className="skills">
          <h3 style={{ marginBottom: "1rem", marginLeft: "1rem", fontSize: "1.8rem" }}>Technical Skills</h3>
          <ul className="skills-grid">
            <li>React</li>
            <li>Next.js</li>
            <li>Node.js</li>
            <li>JavaScript</li>
            <li>HTML/CSS</li>
            <li>Git</li>
          </ul>
        </div>

        {/* Skills I Excel In Section */}
        <div className="skills-expertise">
        <h3 style={{ display: "flex", alignSelf: "center", justifyContent: "center" }}>Skills I Excel In</h3>

          <div className="skill-item">
            <h4>UX/UI Design</h4>
            <p>
              I specialize in creating intuitive and visually appealing user interfaces. My expertise includes wireframing,
              prototyping, and designing user-centered experiences using tools like Figma.
            </p>
          </div>
          <div className="skill-item">
            <h4>System Analysis</h4>
            <p>
              As a system analyst, I excel at understanding complex business requirements and translating them into technical
              solutions. I have experience in process modeling, requirement gathering, and system optimization.
            </p>
          </div>
          <div className="skill-item">
            <h4>Hardware Components (Arduino)</h4>
            <p>
              I have hands-on experience with hardware components, particularly Arduino. I enjoy working on IoT projects,
              prototyping, and integrating hardware with software solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const CallToAction = () => {
  return (
    <section id="call-to-action" className="call-to-action">
      <div className="container">
        <h2>Let's Work Together!</h2>
        <p>
          If you're looking for a passionate developer to bring your ideas to life or collaborate on exciting projects, feel free to reach out. I'm always open to new opportunities and challenges.
        </p>

        {/* Social Media Links with Icons */}
        <div className="social-media">
          <a href="https://www.facebook.com/Jomari.Zabala.Francisco/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} className="social-icon" />
          </a>
          <a href="https://instagram.com/frncsc.jz" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} className="social-icon" />
          </a>
        </div>
      </div>
    </section>
  );
};



const App = () => {
  return (
    <main>
      <Header />
      <MilkyWayHero />
      <AboutSection />
      <CallToAction />
    </main>
  );
};

export default App;