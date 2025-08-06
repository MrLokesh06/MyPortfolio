"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Download,
  ExternalLink,
  Code,
  Brain,
  Camera,
  ShoppingCart,
  Globe,
  MessageSquare,
  GraduationCap,
  Award,
  Briefcase,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")

  // Projects Slider Component
  function ProjectsSlider({ projects }: { projects: any[] }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const projectsPerView = 3
    const totalSlides = Math.ceil(projects.length / projectsPerView)

    const nextSlide = () => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides)
    }

    const prevSlide = () => {
      setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
    }

    const getVisibleProjects = () => {
      const startIndex = currentIndex * projectsPerView
      const endIndex = Math.min(startIndex + projectsPerView, projects.length)
      return projects.slice(startIndex, endIndex)
    }

    const visibleProjects = getVisibleProjects()

    return (
      <div className="relative">
        {/* Navigation Arrows */}
        {projects.length > projectsPerView && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm shadow-lg rounded-full p-3 hover:bg-white hover:shadow-xl transition-all duration-300 group"
            >
              <ChevronLeft className="w-6 h-6 text-slate-600 group-hover:text-blue-600 transition-colors" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm shadow-lg rounded-full p-3 hover:bg-white hover:shadow-xl transition-all duration-300 group"
            >
              <ChevronRight className="w-6 h-6 text-slate-600 group-hover:text-blue-600 transition-colors" />
            </button>
          </>
        )}

        {/* Projects Container */}
        <div className="mx-12">
          {/* Removed initial, animate, exit, and transition from this motion.div */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleProjects.map((project, index) => (
              <motion.div key={`${currentIndex}-${index}`} whileHover={{ scale: 1.05 }}>
                <Card className="h-full min-h-[300px] hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {project.icon}
                        <CardTitle className="text-xl">{project.title}</CardTitle>
                      </div>
                      <Badge
                        variant={
                          project.status === "Live"
                            ? "default"
                            : project.status === "In Development"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {project.status}
                      </Badge>
                    </div>
                    <CardDescription className="text-base leading-relaxed">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="outline">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    {project.link && (
                      <Button variant="outline" size="sm" className="w-full bg-transparent mb-2" asChild>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Visit Project
                        </a>
                      </Button>
                    )}
                    {project.github && (
                      <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <Github className="w-4 h-4" />
                          GitHub
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        {projects.length > projectsPerView && (
          <div className="flex justify-center mt-12 gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 scale-125"
                    : "bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    )
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "education", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const skills = {
    programming: ["Python", "C", "SQL", "Java", "JavaScript", "HTML/CSS"],
    frameworks: ["Node.js", "Flask", "Pandas", "NumPy", "Matplotlib"],
    tools: ["VS Code", "Visual Studio", "PyCharm", "IntelliJ", "Eclipse"],
    other: [
      "AI-based Development",
      "Shopify Development",
      "Content Creation",
      "Photography",
      "Videography",
      "Social Media Marketing",
    ],
  }

  const projects = [
    {
      title: "BarathBot",
      description:
        "A multilingual chatbot for Indian users that supports native languages and provides information about government jobs, culture, and more.",
      tech: ["Python", "NLP", "AI", "Web Development"],
      status: "In Development",
      icon: <MessageSquare className="w-6 h-6" />,
    },
    {
      title: "Viboura.in - Real-Time File & Text Sharing",
      description:
        "A live web application for sending and receiving files or text over the internet or local WIFI with WebSockets for fast, seamless communication.",
      tech: ["Node.js", "Python", "WebSockets", "Real-time Communication"],
      status: "Live",
      link: "https://viboura.in",
      github: "https://github.com/viboura",
      icon: <Globe className="w-6 h-6" />,
    },
    {
      title: "Text-to-Image Generation using Stable Diffusion",
      description:
        "Built a web-based AI image generator using Stable Diffusion with Hugging Face API integration and Gradio-based UI for generating images from text prompts.",
      tech: ["Python", "Stable Diffusion", "Hugging Face API", "Gradio", "CUDA"],
      status: "Completed",
      github: "https://github.com/your-repo-for-text-to-image", // Added GitHub link
      icon: <Brain className="w-6 h-6" />,
    },
    {
      title: "Shopify Clothing Brand",
      description:
        "Ran my own Shopify store for 3 months, handling design, development, and management. Customized themes using Liquid, HTML, and CSS.",
      tech: ["Shopify", "Liquid", "HTML/CSS", "E-commerce"],
      status: "Completed",
      icon: <ShoppingCart className="w-6 h-6" />,
    },
    {
      title: "Portfolio Website",
      description:
        "A modern, responsive portfolio website built with Next.js, featuring smooth animations, dark mode support, and optimized performance.",
      tech: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
      status: "Live",
      icon: <Code className="w-6 h-6" />,
    },
  ]

  const certifications = [
    {
      name: "Wadhwani Foundation C1 Certification",
      link: "/Wadhwani.pdf",
    },
    {
      name: "NPTEL Machine Learning Certificate",
      link: "/NPTEL_Ml.pdf",
    },
    {
      name: "Infosys AI Certification",
      link: "/Infosys.pdf",
    },
    {
      name: "Coursera Specialization",
      link: "/Coursera.pdf",
    },
    {
      name: "AWS Machine Learning Certification",
      link: "/AWS.pdf",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-slate-200/50 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-2xl font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Dumpala Lokesh
              </span>
            </motion.div>
            <div className="hidden md:flex space-x-8">
              {["home", "about", "skills", "projects", "education", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-colors ${
                    activeSection === section
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-extrabold"
                      : "text-slate-700 hover:text-slate-900"
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="pt-32 pb-20 px-4 min-h-screen flex items-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-4">
                Hi, I'm
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Dumpala Lokesh
                </span>
              </h1>
              <p className="text-xl text-slate-700 mb-2">B.Tech CSE-AIML Student & Full Stack Developer</p>
              <p className="text-lg text-slate-600 mb-8">
                Passionate about AI, web development, and creating innovative solutions that make a difference.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={() => scrollToSection("projects")}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                >
                  View My Work
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 bg-white/80 backdrop-blur-sm shadow-md"
                  asChild
                >
                  <a href="/LokeshResume.pdf" download="LokeshResume.pdf">
                    <Download className="w-4 h-4" />
                    Download Resume
                  </a>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="w-80 h-80 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 p-1 shadow-2xl">
                  <div className="w-full h-full rounded-full bg-slate-200 flex items-center justify-center">
                    <img
                      src="/lokesh.png"
                      alt="Dumpala Lokesh"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white rounded-full p-3 shadow-lg">
                  <Code className="w-8 h-8 text-blue-600" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 bg-gradient-to-r from-white via-slate-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-4">About Me</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                I'm a passionate B.Tech 4th year student specializing in Computer Science with Artificial Intelligence
                and Machine Learning at MRCET. With a strong academic background (8.5 CGPA) and diverse skill set, I
                love creating innovative solutions that bridge technology and real-world problems.
              </p>
              <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                Beyond coding, I'm deeply involved in creative pursuits like photography, videography, and content
                creation. I've also ventured into entrepreneurship with my e-commerce clothing brand and developed
                several web applications that are making a real impact.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-slate-700">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span>Hyderabad, India</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                  <span>MRCET, CSE-AIML</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              <Card className="text-center p-6 bg-white/80 backdrop-blur-sm shadow-lg">
                <Brain className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-slate-800 mb-2">AI Enthusiast</h3>
                <p className="text-sm text-slate-600">Passionate about machine learning and AI applications</p>
              </Card>
              <Card className="text-center p-6 bg-white/80 backdrop-blur-sm shadow-lg">
                <Code className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold text-slate-800 mb-2">Full Stack Developer</h3>
                <p className="text-sm text-slate-600">Building end-to-end web applications</p>
              </Card>
              <Card className="text-center p-6 bg-white/80 backdrop-blur-sm shadow-lg">
                <Camera className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-slate-800 mb-2">Creative Professional</h3>
                <p className="text-sm text-slate-600">Photography, videography, and content creation</p>
              </Card>
              <Card className="text-center p-6 bg-white/80 backdrop-blur-sm shadow-lg">
                <Briefcase className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <h3 className="font-semibold text-slate-800 mb-2">Entrepreneur</h3>
                <p className="text-sm text-slate-600">E-commerce and business development</p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 px-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Skills & Expertise</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="h-full bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-600">
                    <Code className="w-5 h-5" />
                    Languages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {["Python", "C", "SQL", "Java", "JavaScript", "HTML/CSS"].map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="h-full bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-600">
                    <Brain className="w-5 h-5" />
                    Frameworks & Libraries
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {["Node.js", "Flask", "Pandas", "NumPy", "Matplotlib"].map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="h-full bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <Code className="w-5 h-5" />
                    Developer Tools
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {["VS Code", "Visual Studio", "PyCharm", "IntelliJ", "Eclipse"].map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="h-full bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-600">
                    <Camera className="w-5 h-5" />
                    Other Skills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "AI Development",
                      "Shopify",
                      "Content Creation",
                      "Photography",
                      "Videography",
                      "Social Media Marketing",
                    ].map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-4 bg-gradient-to-r from-cyan-50 via-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Featured Projects</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </motion.div>

          {/* Projects Slider - Now wrapped with whileInView */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <ProjectsSlider projects={projects} />
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-16 px-4 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Education & Certifications</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-blue-600" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg">B.Tech in CSE-AIML</h3>
                    <p className="text-slate-700">Malla Reddy College of Engineering and Technology (MRCET)</p>
                    <p className="text-slate-600">Currently 4th Year • CGPA: 8.5</p>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="font-semibold text-lg">Intermediate (12th)</h3>
                    <p className="text-slate-700">Sri Chaitanya Jr. Kalasala, Hyderabad, Suchitra</p>
                    <p className="text-slate-600">805 marks</p>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="font-semibold text-lg">High School (10th)</h3>
                    <p className="text-slate-700">Sada Shiva High School, Hyderabad, Old Bowenpally</p>
                    <p className="text-slate-600">10%</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-purple-600" />
                    Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {certifications.map((cert, index) => (
                      <motion.div
                        key={cert.name}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 p-3 bg-white/70 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => window.open(cert.link, "_blank")}
                      >
                        <Award className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        <span className="text-slate-700 hover:text-blue-600 transition-colors">{cert.name}</span>
                        <ExternalLink className="w-3 h-3 text-slate-400 ml-auto" />
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 bg-gradient-to-r from-violet-50 via-purple-50 to-fuchsia-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Let's Connect</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"></div>
            <p className="text-lg text-slate-700 max-w-2xl mx-auto">
              I'm always open to discussing new opportunities, collaborations, or just having a chat about technology
              and innovation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <Card className="p-8 bg-white/90 backdrop-blur-sm shadow-xl">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">Email</h3>
                      <p className="text-slate-700">dumpalalokesh01@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">Phone</h3>
                      <p className="text-slate-700">+91-9154772445</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">Location</h3>
                      <p className="text-slate-700">Hyderabad, India</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-800 mb-4">Follow Me</h3>
                  <div className="flex flex-col gap-3">
                    <Button variant="outline" className="justify-start bg-white/80 backdrop-blur-sm" asChild>
                      <a
                        href="https://github.com/MrLokesh06"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3"
                      >
                        <Github className="w-5 h-5" />
                        GitHub
                      </a>
                    </Button>
                    <Button variant="outline" className="justify-start bg-white/80 backdrop-blur-sm" asChild>
                      <a
                        href="https://www.linkedin.com/in/d-lokesh-2063b1291/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3"
                      >
                        <Linkedin className="w-5 h-5" />
                        LinkedIn
                      </a>
                    </Button>
                    <Button variant="outline" className="justify-start bg-white/80 backdrop-blur-sm" asChild>
                      <a
                        href="https://viboura.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3"
                      >
                        <Globe className="w-5 h-5" />
                        Viboura.in
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-800 to-slate-900 text-slate-300 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-400">© 2025 Dumpala Lokesh. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
