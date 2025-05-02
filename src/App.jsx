"use client"

import { useState, useEffect, useRef } from "react"
import "./App.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faInstagram, faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons"
import {
  faBars,
  faTimes,
  faArrowRight,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faSearch,
  faFilter,
  faExternalLinkAlt,
  faChevronUp,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"
import profile from "./assets/Jomari Z. Francisco.jpg"

// Update the Header component to ensure proper mobile functionality
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSticky, setIsSticky] = useState(true) // Set to true by default to always show header
  const [activeSection, setActiveSection] = useState("hero")
  const [scrollDirection, setScrollDirection] = useState("up")
  const [lastScrollY, setLastScrollY] = useState(0)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    const handleScroll = () => {
      // Determine scroll direction
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY) {
        setScrollDirection("down")
      } else {
        setScrollDirection("up")
      }
      setLastScrollY(currentScrollY)

      // Determine active section for nav highlighting
      const sections = ["hero", "about", "certificates", "projects", "call-to-action"]
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })

      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest(".nav") && !event.target.closest(".burger-button")) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isMenuOpen])

  return (
    <header className={`header ${scrollDirection === "down" && lastScrollY > 100 ? "header-hidden" : ""}`}>
      <div className="header-content">
        <div className="logo-container">
          <div className="logo-mobile">JZF</div>
          <div className="logo-text">JZF</div>
        </div>
        <nav className={`nav ${isMenuOpen ? "open" : ""}`}>
          <ul className="nav-list">
            {["hero", "about", "certificates", "projects", "call-to-action"].map((section, index) => (
              <li key={index}>
                <a
                  href={`#${section}`}
                  onClick={() => setIsMenuOpen(false)}
                  className={activeSection === section ? "active" : ""}
                >
                  {section === "hero"
                    ? "Home"
                    : section === "call-to-action"
                      ? "Contact"
                      : section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              </li>
            ))}
            <li>
              <a
                href="https://jomarifranciscoblog.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </a>
            </li>
          </ul>
        </nav>
        <button className="burger-button" onClick={toggleMenu} aria-label="Toggle menu">
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
        </button>
      </div>
    </header>
  )
}

// Enhanced Hero Section with Typing Effect
const Hero = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [typedText, setTypedText] = useState("")
  const fullText = "A determined developer crafting digital experiences—slow and steady, but always built to last!"
  const typingSpeed = 50

  useEffect(() => {
    setIsVisible(true)

    // Typing effect
    let i = 0
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.substring(0, i + 1))
        i++
      } else {
        clearInterval(typingInterval)
      }
    }, typingSpeed)

    return () => clearInterval(typingInterval)
  }, [])

  return (
    <section id="hero" className="hero-enhanced">
      {/* Background elements */}
      <div className="hero-background">
        <div className="bg-shape bg-shape-1"></div>
        <div className="bg-shape bg-shape-2"></div>
        <div className="bg-shape bg-shape-3"></div>
        <div className="bg-pattern"></div>
      </div>

      <div className="hero-container">
        <div className="hero-content">
          {/* Text content */}
          <div className={`hero-text-container ${isVisible ? "fade-in" : ""}`}>
            <div className="hero-text-content">
              <div className="hero-badge">Available for Freelance Work</div>
              <h1 className={`hero-title ${isVisible ? "fade-in-delay-3" : ""}`}>Jomari Z. Francisco</h1>

              <div className={`hero-description ${isVisible ? "fade-in-delay-5" : ""}`}>
                <p className="typing-text">
                  {typedText}
                  <span className="cursor"></span>
                </p>
              </div>
            </div>

            <div className={`hero-buttons ${isVisible ? "fade-in-delay-7" : ""}`}>
              <a href="#projects" className="hero-button primary">
                View Projects <FontAwesomeIcon icon={faArrowRight} className="button-icon" />
              </a>
            </div>

            <div className={`hero-social ${isVisible ? "fade-in-delay-9" : ""}`}>
              <a href="https://github.com/JomariFrancisco" target="_blank" rel="noopener noreferrer" className="social-button">
                <FontAwesomeIcon icon={faGithub} />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/jomari-francisco-b88558359/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-button"
              >
                <FontAwesomeIcon icon={faLinkedin} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Image - Improved alignment */}
          <div className={`hero-image-container ${isVisible ? "fade-in-scale" : ""}`}>
            <div className="hero-image-wrapper">
              <div className="hero-image-glow"></div>
              <div className="hero-image-frame">
                <img src={profile || "/placeholder.svg"} alt="Jomari Z. Francisco" className="hero-profile-image" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <div className="scroll-text">Scroll Down</div>
      </div>
    </section>
  )
}

// Animated Section Component for Scroll Animations
const AnimatedSection = ({ id, className, children }) => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section id={id} ref={sectionRef} className={`${className} ${isVisible ? "section-visible" : "section-hidden"}`}>
      {children}
    </section>
  )
}

// Enhanced About Section with Skill Bars and Timeline
const AboutSection = () => {
  const skills = [
    { name: "React", level: 85 },
    { name: "Next.js", level: 75 },
    { name: "Node.js", level: 70 },
    { name: "JavaScript", level: 90 },
    { name: "HTML/CSS", level: 95 },
    { name: "Git", level: 80 },
  ]

  const timeline = [
    {
      year: "2021 - Present",
      title: "Information Technology Student",
      organization: "Western Mindanao State University",
      
    },
    {
      year: "2019 - 2021",
      title: "Humanities and Social Science Student",
      organization: "Saint Joseph School Foundation Incorporated",
      
    },
    {
      year: "2015 - 2019",
      title: "High School ",
      organization: "Zamboanga National Highschool West",
      
    },

    {
      year: "2009 - 2015",
      title: "Elementary",
      organization: "Southcom Elementary School",
      
    },
  ]

  return (
    <AnimatedSection id="about" className="about-section">
      <div className="section-background">
        <div className="bg-shape about-shape-1"></div>
        <div className="bg-shape about-shape-2"></div>
      </div>
      <div className="container">
        <div className="section-header">
          <h2>About Me</h2>
          <div className="section-divider">
            <span></span>
          </div>
        </div>

        {/* Added container for intro */}
        <div className="about-intro-container">
          <p className="about-intro">
            Hello! I'm Jomari Z. Francisco, a student at Western Mindanao State University with a passion for designing
            intuitive user experiences, working with hardware components, and analyzing systems for optimal performance.
            I enjoy creating innovative and functional solutions that bridge technology and usability.
          </p>
        </div>

        <div className="about-grid">
          <div className="about-column">
            {/* Added container for career goals */}
            <div className="about-content-container">
              <h3>Career Goals</h3>
              <p>
                My career goal is to become a skilled UX/UI Designer, specializing in creating intuitive, user-centered
                digital experiences that enhance usability and engagement. I aim to work on innovative projects that
                challenge me to grow creatively and technically.
              </p>
            </div>

            {/* Added container for hobbies */}
            <div className="about-content-container">
              <h3>Hobbies & Fun Fact</h3>
              <p>
                When I'm not designing, I love spending time outdoors, enjoying nature trips, and exploring new
                technologies. I also built a mini weather station using Arduino that sends real-time data to my phone!
              </p>
            </div>
          </div>

          <div className="about-column">
            <div className="skills-expertise">
              <h3>Skills I Excel In</h3>
              <div className="skill-cards">
                <div className="skill-card">
                  <div className="skill-icon ux-icon">UX</div>
                  <h4>UX/UI Design</h4>
                  <p>
                    Specializing in intuitive, visually appealing user interfaces. Experienced in wireframing,
                    prototyping, and designing user-centered experiences using Figma.
                  </p>
                </div>
                <div className="skill-card">
                  <div className="skill-icon sa-icon">SA</div>
                  <h4>System Analysis</h4>
                  <p>
                    Understanding complex business requirements and translating them into technical solutions. Skilled
                    in process modeling, requirement gathering, and system optimization.
                  </p>
                </div>
                <div className="skill-card">
                  <div className="skill-icon hw-icon">HW</div>
                  <h4>Hardware Components</h4>
                  <p>
                    Hands-on experience with Arduino and IoT projects, integrating hardware with software solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Added container for skills section */}
        <div className="about-content-container skills-section">
          <h3>Technical Skills</h3>
          <div className="skills-bars">
            {skills.map((skill, index) => (
              <div className="skill-bar-container" key={index}>
                <div className="skill-info">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-percentage">{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <div className="skill-progress" style={{ width: `${skill.level}%` }} data-level={skill.level}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Added container for timeline section */}
        <div className="about-content-container timeline-section">
          <h3>Education </h3>
          <div className="timeline">
            {timeline.map((item, index) => (
              <div className="timeline-item" key={index}>
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="timeline-year">{item.year}</div>
                  <h4 className="timeline-title">{item.title}</h4>
                  <div className="timeline-organization">{item.organization}</div>
                  <p className="timeline-description">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}

// Enhanced Certificates Section with Carousel for Mobile
const CertificatesSection = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState("All")
  const [currentSlide, setCurrentSlide] = useState(0)
  const carouselRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  // Add these variables inside the CertificatesSection component, after the existing state variables:
  const [touchStartX, setTouchStartX] = useState(0)
  const [touchEndX, setTouchEndX] = useState(0)
  const [isSwiping, setIsSwiping] = useState(false)
  const [swipeDistance, setSwipeDistance] = useState(0)

  const certificates = [
    {
      title: "Python for Beginners",
      issuer: "Simplilearn",
      year: "2025",
      category: "Programming",
    },
    {
      title: "Advanced Python",
      issuer: "Simplilearn",
      year: "2025",
      category: "Programming",
    },
    {
      title: "Machine Learning for Beginners",
      issuer: "Simplilearn",
      year: "2025",
      category: "AI/ML",
    },
    {
      title: "Machine Learning Algorithms",
      issuer: "Simplilearn",
      year: "2025",
      category: "AI/ML",
    },
    {
      title: "AI ML Projects",
      issuer: "Simplilearn",
      year: "2025",
      category: "AI/ML",
    },
    {
      title: "PMP Basics",
      issuer: "Simplilearn",
      year: "2025",
      category: "Management",
    },
    {
      title: "Salesforce Administrator & App Builder",
      issuer: "Simplilearn",
      year: "2025",
      category: "Development",
    },
    {
      title: "Fundamentals of Data Structures in C",
      issuer: "Simplilearn",
      year: "2025",
      category: "Programming",
    },
    {
      title: "Getting Started with Full Stack Java Development",
      issuer: "Simplilearn",
      year: "2025",
      category: "Development",
    },
    {
      title: "CISSP Security Assessment & Testing",
      issuer: "Simplilearn",
      year: "2025",
      category: "Security",
    },
    {
      title: "Introduction to C#",
      issuer: "Simplilearn",
      year: "2025",
      category: "Programming",
    },
    {
      title: "Machine Learning with R",
      issuer: "Simplilearn",
      year: "2025",
      category: "AI/ML",
    },
  ]

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Get unique categories for filter
  const categories = ["All", ...new Set(certificates.map((cert) => cert.category))]

  // Filter certificates based on search term and active filter
  const filteredCertificates = certificates.filter((cert) => {
    const matchesSearch =
      cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = activeFilter === "All" || cert.category === activeFilter
    return matchesSearch && matchesFilter
  })

  // Carousel navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === filteredCertificates.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? filteredCertificates.length - 1 : prev - 1))
  }

  // Reset current slide when filter changes
  useEffect(() => {
    setCurrentSlide(0)
  }, [activeFilter, searchTerm])

  // Add these functions inside the CertificatesSection component, before the return statement:
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX)
    setIsSwiping(true)
    setSwipeDistance(0)
  }

  const handleTouchMove = (e) => {
    if (!isSwiping) return
    const currentX = e.touches[0].clientX
    const distance = currentX - touchStartX
    setSwipeDistance(distance)
    setTouchEndX(currentX)
  }

  const handleTouchEnd = () => {
    setIsSwiping(false)

    // Minimum distance required for a swipe
    const minSwipeDistance = 50

    if (Math.abs(touchEndX - touchStartX) < minSwipeDistance) {
      // This was just a tap or a small movement, not a swipe
      setSwipeDistance(0)
      return
    }

    if (touchEndX < touchStartX) {
      // Swipe left - go to next slide
      nextSlide()
    } else {
      // Swipe right - go to previous slide
      prevSlide()
    }

    // Reset swipe distance with a small delay for animation
    setTimeout(() => {
      setSwipeDistance(0)
    }, 50)
  }

  return (
    <AnimatedSection id="certificates" className="certificates-section">
      <div className="section-background">
        <div className="bg-shape cert-shape-1"></div>
        <div className="bg-shape cert-shape-2"></div>
      </div>
      <div className="container">
        <div className="section-header">
          <h2>Certificates</h2>
          <div className="section-divider">
            <span></span>
          </div>
        </div>

        <div className="certificates-controls">
          <div className="search-container">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              type="text"
              placeholder="Search certificates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-container">
            <div className="filter-label">
              <FontAwesomeIcon icon={faFilter} className="filter-icon" />
              <span>Filter:</span>
            </div>
            <div className="filter-options">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`filter-button ${activeFilter === category ? "active" : ""}`}
                  onClick={() => setActiveFilter(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Grid View */}
        <div className="certificates-grid desktop-only">
          {filteredCertificates.length > 0 ? (
            filteredCertificates.map((cert, index) => (
              <div className="certificate-card" key={index} data-category={cert.category}>
                <div className="certificate-content">
                  <h4>{cert.title}</h4>
                  <p>
                    Issued by {cert.issuer} | {cert.year}
                  </p>
                  <span className="certificate-category">{cert.category}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">No certificates found matching your search.</div>
          )}
        </div>

        {/* Mobile Carousel View */}
{filteredCertificates.length > 0 && (
  <div className="certificates-carousel-container mobile-only">
    <div
      className="certificates-carousel"
      ref={carouselRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        transform: `translateX(-${currentSlide * 100}%) ${
          isSwiping ? `translateX(${swipeDistance}px)` : ""
        }`,
      }}
    >
      {filteredCertificates.map((cert, index) => (
        <div
          className="certificate-slide"
          key={index}
        >
          <div className="certificate-card" data-category={cert.category}>
            <div className="certificate-content">
              <h4>{cert.title}</h4>
              <p>
                Issued by {cert.issuer} | {cert.year}
              </p>
              <span className="certificate-category">{cert.category}</span>
            </div>
          </div>
        </div>
      ))}
    </div>

    
  </div>
)}

{filteredCertificates.length === 0 && (
  <div className="no-results mobile-only">No certificates found matching your search.</div>
)}

      </div>
    </AnimatedSection>
  )
}

// Enhanced Projects Section with Carousel and Filtering
const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState("All")

  const projects = [
    {
      title: "Portfolio Website",
      description: "A personal portfolio website built with React and modern CSS.",
      category: "Web Development",
      image: "/placeholder.svg?height=300&width=500",
      link: "#",
    },
    {
      title: "Weather App",
      description: "A weather application that shows current weather and forecasts.",
      category: "Web Development",
      image: "/placeholder.svg?height=300&width=500",
      link: "#",
    },
    {
      title: "E-commerce Platform",
      description: "A full-featured e-commerce platform with product management.",
      category: "Full Stack",
      image: "/placeholder.svg?height=300&width=500",
      link: "#",
    },
    {
      title: "Task Management System",
      description: "A task management application with user authentication.",
      category: "Full Stack",
      image: "/placeholder.svg?height=300&width=500",
      link: "#",
    },
    {
      title: "Mobile Banking UI",
      description: "UI/UX design for a mobile banking application.",
      category: "UI/UX Design",
      image: "/placeholder.svg?height=300&width=500",
      link: "#",
    },
    {
      title: "Smart Home Dashboard",
      description: "Dashboard for controlling smart home devices.",
      category: "IoT",
      image: "/placeholder.svg?height=300&width=500",
      link: "#",
    },
  ]

  // Get unique categories for filter
  const categories = ["All", ...new Set(projects.map((project) => project.category))]

  // Filter projects based on active filter
  const filteredProjects = projects.filter((project) => activeFilter === "All" || project.category === activeFilter)

  return (
    <AnimatedSection id="projects" className="projects-section">
      <div className="section-background">
        <div className="bg-shape project-shape-1"></div>
        <div className="bg-shape project-shape-2"></div>
      </div>
      <div className="container">
        <div className="section-header">
          <h2>Projects</h2>
          <div className="section-divider">
            <span></span>
          </div>
        </div>

        <div className="projects-filter">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`filter-button ${activeFilter === category ? "active" : ""}`}
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <div className="project-card" key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="project-image">
                  <img src={project.image || "/placeholder.svg"} alt={project.title} />
                  <div className="project-overlay">
                    <a href={project.link} className="project-link" target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon icon={faExternalLinkAlt} />
                    </a>
                  </div>
                </div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <span className="project-category">{project.category}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">No projects found in this category.</div>
          )}
        </div>
      </div>
    </AnimatedSection>
  )
}

// Enhanced Call to Action Section with Contact Form
const CallToAction = () => {
  return (
    <AnimatedSection id="call-to-action" className="call-to-action">
      <div className="section-background">
        <div className="bg-shape cta-shape-1"></div>
        <div className="bg-shape cta-shape-2"></div>
      </div>
      <div className="container">
        <div className="section-header">
          <h2>Let's Work Together!</h2>
          <div className="section-divider">
            <span></span>
          </div>
        </div>

        <p className="cta-intro">
          If you're looking for a passionate developer to bring your ideas to life or collaborate on exciting projects,
          feel free to reach out. I'm always open to new opportunities and challenges.
        </p>

        <div className="contact-grid">
          <div className="contact-card">
            <div className="contact-icon">
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <div className="contact-details">
              <h3>Email</h3>
              <p>jzfdgreat@gmail.com</p>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-icon">
              <FontAwesomeIcon icon={faPhone} />
            </div>
            <div className="contact-details">
              <h3>Phone</h3>
              <p>+63 969696969</p>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-icon">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
            </div>
            <div className="contact-details">
              <h3>Location</h3>
              <p>Zamboanga City, Philippines</p>
            </div>
          </div>
        </div>

        <div className="social-media-container">
          <h3>Connect With Me</h3>
          <div className="social-icons">
            <a
              href="https://www.facebook.com/francisco.jz/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-link"
            >
              <FontAwesomeIcon icon={faFacebook} className="social-icon" />
            </a>
            <a
              href="https://instagram.com/frncsc.jz"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-link"
            >
              <FontAwesomeIcon icon={faInstagram} className="social-icon" />
            </a>
            <a
              href="https://www.linkedin.com/in/jomari-francisco-b88558359/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-link"
            >
              <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
            </a>
            <a href="https://github.com/JomariFrancisco" target="_blank" rel="noopener noreferrer" className="social-icon-link">
              <FontAwesomeIcon icon={faGithub} className="social-icon" />
            </a>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}

// Footer Component
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#273f4f"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <div className="logo-text">JZF</div>
            <p>Crafting digital experiences with passion and precision.</p>
          </div>

          <div className="footer-social">
            <h4>Connect</h4>
            <div className="footer-social-icons">
              <a href="https://www.facebook.com/francisco.jz/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="https://instagram.com/frncsc.jz" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a
                href="https://www.linkedin.com/in/jomari-francisco-b88558359/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a href="https://github.com/JomariFrancisco" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Jomari Z. Francisco. All rights reserved.</p>
          <p>
            Designed and built with <span className="heart">❤</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

const App = () => {
  // Scroll to top button functionality
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <main>
      <Header />
      <Hero />
      <AboutSection />
      <CertificatesSection />
      <ProjectsSection />
      <CallToAction />
      <Footer />

      {showScrollTop && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          <FontAwesomeIcon icon={faChevronUp} />
        </button>
      )}
    </main>
  )
}

export default App
