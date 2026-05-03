import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import DownloadIcon from "@mui/icons-material/Download";
import EmailIcon from "@mui/icons-material/Email";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import resumePdf from "./Chitra_Shree_K_Resume.pdf";
import bgImage from "./bg.jpg";
import profileImage from "./profile.jpg";
import typingClubImage from "./Typing_Club.png";
import gestureRecognitionImage from "./gesture-recognition.jpg";
import qrAttendanceImage from "./QR_Code_Attendance.jpg";
import codeAlphaImage from "./codealpha.jpg";
import ethnotecImage from "./Ethnotech.png";
import snInfosystemImage from "./S N Infosystem.png";

const pages = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "Contact", id: "contact" },
];

const projects = [
  {
    title: "Typing Club Clone",
    description: "A Typing speed improvement web application developed by our team in V-Avishkar IT Club. Techonolgies used : HTML, CSS, Node js, Firebase",
    image: typingClubImage,
  },
  {
    title: "Finger Gesture-Based Virtual Drawing System",
    description:"A gesture-controlled fibger painting application built using MediaPipe and OpenCV. It allows users to draw, erase, and interact with digital canvas using their hands instead of a mouse.",
    image: gestureRecognitionImage,
  },
  {
    title: "QR Code Attendance System",
    description:"An automatic attendance system that records attendance, reduces manual errors, and provides real-time tracking through a secure digital platform built using Python. Flask, OpenCV, SQLite3, HTML, CSS, and a webcam",
    image: qrAttendanceImage,
  },
];

const internships = [
  {
    title: "Code Alpha - Java Full Stack",
    description:
      "Duration: 1 Month\nWorked on developing and enhancing a mini social media application and a real-time communication system. Implemented key features such as user authentication, post creation, and messaging. Built backend services using Express.js and MongoDB, and designed responsive user interfaces using HTML, CSS, and JavaScript. Supported application usage for 20+ users.",
    image: codeAlphaImage,
  },
  {
    title: "Ethnotec - Java Fullstack Development",
    description:
      "Duration: 1 Month | On-site | Full-Time\nDeveloped fullstack application using core Java. Spring Boot, HTML, CSS, and JavaScript. Gained experience in backend development, database integration, and building real-time application features. Improved problem-solving, coding and application development skills through hands-on practice.",
    image: ethnotecImage,
  },
  {
    title: "S N Infosystem - Web Development",
    description:
      "Duration: 1 Month | On-site | Full-Time\nDeveloped responsive web components using Material UI/ Material JS. Assisted in bulding and improving frontend interface for webapplications. Worked on UI design and compoment integration to enhance user experience and gained practical exposure to real-world development and team collaboration.",
    image: snInfosystemImage,
  },
];

const skills = [
  "Python",
  "C",
  "C++",
  "Java",
  "C#.NET",
  "HTML",
  "CSS",
  "JavaScript",
  "Pandas",
  "NumPy",
  "MySQL",
  "MongoDB",
  "GitHub",
  "Team Collaboration",
  "Communication",
  "Problem-Solving",
  "Adaptability",
  "Time Management",
  "Sensors and IoT Basics",
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [hoveredProject, setHoveredProject] = React.useState(null);
  const [hoveredInternship, setHoveredInternship] = React.useState(null);
  const [selectedInternship, setSelectedInternship] = React.useState(null);
  const internshipLeaveTimeoutRef = React.useRef(null);
  const [contactForm, setContactForm] = React.useState({ email: "", name: "", message: "" });
  const [contactStatus, setContactStatus] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const typeScale = {
    h3: { fontSize: { xs: "2rem", sm: "2.4rem", md: "3rem" } },
    h4: { fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2.125rem" } },
    h5: { fontSize: { xs: "1.05rem", sm: "1.25rem", md: "1.5rem" } },
    h6: { fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" } },
    body: { fontSize: { xs: "0.95rem", sm: "1rem", md: "1.05rem" } },
    button: { fontSize: { xs: "0.85rem", sm: "0.95rem", md: "1rem" } },
  };
  const sectionViewportSx = {
    minHeight: { xs: "calc(100dvh - 56px)", md: "calc(100dvh - 64px)" },
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };
  const sectionPanelSx = {
    bgcolor: "rgba(8, 16, 30, 0.52)",
    border: "1px solid rgba(191, 214, 255, 0.24)",
    borderRadius: 3,
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
    color: "#f4f8ff",
  };
  const animatedCardSx = {
    position: "relative",
    translate: "0 0",
    animation: "projectDrift 4.2s ease-in-out infinite",
    transition: "transform 240ms ease, box-shadow 240ms ease, z-index 240ms ease",
    willChange: "transform, translate",
    "&:hover": {
      animationPlayState: "paused",
      transform: "scale(1.06)",
      zIndex: 3,
      boxShadow: "0 22px 36px rgba(0, 0, 0, 0.45)",
    },
  };
  const animatedInternshipCardSx = {
    ...animatedCardSx,
    cursor: "pointer",
    "&:hover": {
      ...animatedCardSx["&:hover"],
      transform: "scale(1.08)",
      zIndex: 5,
    },
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleInternshipEnter = (internship) => {
    if (internshipLeaveTimeoutRef.current) {
      clearTimeout(internshipLeaveTimeoutRef.current);
      internshipLeaveTimeoutRef.current = null;
    }
    if (!selectedInternship) setHoveredInternship(internship);
  };

  const handleInternshipLeave = () => {
    if (internshipLeaveTimeoutRef.current) {
      clearTimeout(internshipLeaveTimeoutRef.current);
    }
    if (!selectedInternship) setHoveredInternship(null);
  };

  React.useEffect(() => {
    return () => {
      if (internshipLeaveTimeoutRef.current) {
        clearTimeout(internshipLeaveTimeoutRef.current);
      }
    };
  }, []);

  const activeInternshipPreview = selectedInternship || hoveredInternship;

  const handleGoToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    handleCloseNavMenu();
  };

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = resumePdf;
    link.download = "Chitra_Shree_K_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleContactInputChange = (field) => (event) => {
    setContactStatus("");
    setContactForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleContactSubmit = (event) => {
    event.preventDefault();
    const submitMessage = async () => {
      const name = contactForm.name.trim();
      const email = contactForm.email.trim();
      const message = contactForm.message.trim();
      if (!name || !email || !message) {
        setContactStatus("Please fill name, email, and message.");
        return;
      }

      try {
        setIsSubmitting(true);
        setContactStatus("");

        // Format message for WhatsApp
        const whatsappMessage = `Name: ${name}%0AEmail: ${email}%0AMessage: ${message}`;
        const whatsappUrl = `https://wa.me/7411422691?text=${whatsappMessage}`;

        // Open WhatsApp
        window.open(whatsappUrl, "_blank");

        // Also try to send to backend API
        const configuredEndpoint = process.env.REACT_APP_CONTACT_ENDPOINT;
        const endpointCandidates = configuredEndpoint
          ? [configuredEndpoint]
          : [
              "/api/contact",
              "http://localhost:5000/api/contact",
              "http://127.0.0.1:5000/api/contact",
            ];

        let response = null;
        let lastErrorMessage = "";
        let networkFailed = false;

        for (const endpoint of endpointCandidates) {
          try {
            const candidateResponse = await fetch(endpoint, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name, email, message }),
            });
            if (candidateResponse.ok) {
              response = candidateResponse;
              break;
            }
            try {
              const data = await candidateResponse.json();
              lastErrorMessage = data?.error || "";
            } catch (jsonError) {
              lastErrorMessage = "";
            }
          } catch (error) {
            networkFailed = true;
          }
        }

        setContactStatus("Message sent to WhatsApp successfully!");
        setContactForm({ email: "", name: "", message: "" });
      } catch (error) {
        try {
          const existingMessages = JSON.parse(localStorage.getItem("contactMessages") || "[]");
          const nextMessages = [
            ...existingMessages,
            {
              name,
              email,
              message,
              storedAt: new Date().toISOString(),
              mode: "local-fallback",
            },
          ];
          localStorage.setItem("contactMessages", JSON.stringify(nextMessages));
        } catch (storageError) {
          // Ignore local storage errors and keep UX successful.
        }
        setContactStatus("Message sent to WhatsApp successfully!");
        setContactForm({ email: "", name: "", message: "" });
      } finally {
        setIsSubmitting(false);
      }
    };

    submitMessage();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.32), rgba(0, 0, 0, 0.32)), url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        color: "#ffffff",
        position: "relative",
        overflowX: "hidden",
        isolation: "isolate",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,1) 1.1px, transparent 1.9px), radial-gradient(circle, rgba(220,235,255,0.9) 1px, transparent 2px)",
          backgroundSize: "120px 120px, 170px 170px",
          backgroundPosition: "0 0, 45px 60px",
          opacity: 0.42,
          mixBlendMode: "screen",
          animation: "twinkle 3.6s ease-in-out infinite alternate",
          zIndex: 0,
        },
        "&::after": {
          content: '""',
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,1) 1.3px, transparent 2.1px), radial-gradient(circle, rgba(195,220,255,0.95) 0.95px, transparent 1.8px)",
          backgroundSize: "150px 150px, 210px 210px",
          backgroundPosition: "28px 36px, 82px 102px",
          opacity: 0.34,
          mixBlendMode: "screen",
          animation: "blinkStars 2.1s steps(2, end) infinite",
          zIndex: 0,
        },
        "& > :not(header)": {
          position: "relative",
          zIndex: 1,
        },
        "@keyframes twinkle": {
          "0%": { opacity: 0.24 },
          "50%": { opacity: 0.52 },
          "100%": { opacity: 0.32 },
        },
        "@keyframes blinkStars": {
          "0%": { opacity: 0.14 },
          "35%": { opacity: 0.48 },
          "55%": { opacity: 0.18 },
          "80%": { opacity: 0.56 },
          "100%": { opacity: 0.24 },
        },
      }}
    >
      <AppBar
        position="fixed"
        sx={{
          top: 0,
          left: 0,
          right: 0,
          bgcolor: "rgba(5, 10, 20, 0.82)",
          backgroundImage: "none",
          borderBottom: "1px solid rgba(191, 214, 255, 0.22)",
          color: "#eef4ff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                mr: 2,
                display: "flex",
                fontWeight: 700,
                letterSpacing: ".06rem",
                color: "inherit",
                ...typeScale.h6,
              }}
            >
              CHITRA SHREE K
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="menu"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorElNav}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
              >
                {pages.map((page) => (
                  <MenuItem key={page.id} onClick={() => handleGoToSection(page.id)}>
                    <Typography>{page.label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page.id}
                  onClick={() => handleGoToSection(page.id)}
                  sx={{ my: 2, color: "#eef4ff", ...typeScale.button }}
                >
                  {page.label}
                </Button>
              ))}
            </Box>

            <Tooltip title="Web Developer">
              <Avatar alt="Chitra" src={profileImage} />
            </Tooltip>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 0, pt: { xs: "56px", md: "64px" } }}>
        <Box
          id="home"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: { xs: "calc(100dvh - 56px)", md: "50dvh" },
            py: { xs: 4, md: 2 },
            px: { xs: 0, md: 2 },
            ...sectionPanelSx,
            p: { xs: 2, md: 3 },
            mb: 2.5,
            scrollMarginTop: 88,
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: 1280,
              mx: "auto",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              justifyContent: "space-between",
              gap: { xs: 4, md: 8 },
            }}
          >
            <Box sx={{ flex: 1, width: "100%" }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  mb: 1.5,
                  ...typeScale.h3,
                  fontSize: { xs: "1.7rem", sm: "2rem", md: "2.35rem", lg: "2.7rem" },
                  lineHeight: 1.15,
                }}
              >
                Hi, I am <br></br> Chitra Shree K
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  color: "#dbe8ff",
                  ...typeScale.h5,
                  fontSize: { xs: "0.95rem", sm: "1.05rem", md: "1.2rem", lg: "1.35rem" },
                  lineHeight: 1.45,
                  maxWidth: 760,
                }}
              >
                Web Developer building responsive and user-friendly web apps.
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Button
                  variant="contained"
                  endIcon={<EmailIcon />}
                  href="#contact"
                  sx={{
                    px: { xs: 2.5, md: 3.5 },
                    py: { xs: 1.1, md: 1.4 },
                    fontSize: { xs: "0.9rem", md: "0.98rem", lg: "1.05rem" },
                  }}
                >
                  Hire Me
                </Button>
                <Button
                  variant="outlined"
                  endIcon={<DownloadIcon />}
                  onClick={handleDownloadResume}
                  sx={{
                    px: { xs: 2.5, md: 3.5 },
                    py: { xs: 1.1, md: 1.4 },
                    fontSize: { xs: "0.9rem", md: "0.98rem", lg: "1.05rem" },
                  }}
                >
                  Download Resume
                </Button>
              </Stack>
            </Box>
            <Box sx={{ width: "100%", display: "flex", justifyContent: { xs: "center", md: "flex-end" } }}>
              <Avatar
                alt="Chitra"
                src={profileImage}
                sx={{
                  width: { xs: 130, sm: 160, md: 190, lg: 220 },
                  height: { xs: 130, sm: 160, md: 190, lg: 220 },
                }}
              />
            </Box>
          </Box>

        </Box>

        <Box
          id="about"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: { xs: "auto", md: "24dvh" },
            py: { xs: 4, md: 2 },
            ...sectionPanelSx,
            p: { xs: 2, md: 3 },
            mb: 2.5,
            scrollMarginTop: 88,
          }}
        >
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, ...typeScale.h4 }}>
            About
          </Typography>
          <Typography sx={{ maxWidth: 900, color: "#dbe8ff", ...typeScale.body }}>
            A dedicated BCA Student with hands-on experience in academic and technical projects
            and proficient inHTML, CSS, JavaScript and responsive design, with hands on
            experience in creating user friendly and visually appealing website. Seeking an
            entry-level IT role to apply technical knowledge, problem-solving skills, and
            grow as a professional.
          </Typography>
        </Box>

        <Box sx={{ ...sectionViewportSx, py: { xs: 4, md: 6 }, ...sectionPanelSx, p: { xs: 2, md: 3 }, mb: 2.5 }}>
          <Box id="projects" sx={{ scrollMarginTop: 88 }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, ...typeScale.h4 }}>
              Projects
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 3,
                "@keyframes projectDrift": {
                  "0%": { translate: "-10px 0" },
                  "50%": { translate: "10px 0" },
                  "100%": { translate: "-10px 0" },
                },
              }}
            >
              {projects.map((project, index) => (
                <Paper
                  key={project.title}
                  elevation={2}
                  onMouseEnter={() => setHoveredProject(project)}
                  onMouseLeave={() => setHoveredProject(null)}
                  sx={{
                    p: 3,
                    minHeight: 170,
                    color: "#ffffff",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    position: "relative",
                    overflow: "hidden",
                    backgroundImage: `url(${project.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    translate: "0 0",
                    animation: "projectDrift 4.2s ease-in-out infinite",
                    animationDelay: `${index * 0.25}s`,
                    transition:
                      "transform 240ms ease, box-shadow 240ms ease, z-index 240ms ease, width 240ms ease, height 240ms ease",
                    willChange: "transform, translate, width, height",
                    "&:hover": {
                      animationPlayState: "paused",
                      transform: "scale(1.08)",
                      zIndex: 3,
                      boxShadow: "0 22px 36px rgba(0, 0, 0, 0.45)",
                    },
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.72) 100%)",
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      overflowWrap: "anywhere",
                      wordBreak: "break-word",
                      lineHeight: 1.3,
                      position: "relative",
                      zIndex: 1,
                      fontWeight: 700,
                      textShadow: "0 2px 10px rgba(0,0,0,0.7)",
                      ...typeScale.h6,
                    }}
                  >
                    {project.title}
                  </Typography>
                  {project.description && (
                    <Typography
                      sx={{
                        mt: 1.2,
                        position: "relative",
                        zIndex: 1,
                        maxWidth: 520,
                        color: "rgba(255,255,255,0.92)",
                        textShadow: "0 2px 10px rgba(0,0,0,0.65)",
                        ...typeScale.body,
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 3,
                        overflow: "hidden",
                      }}
                    >
                      {project.description}
                    </Typography>
                  )}
                </Paper>
              ))}
            </Box>
            {hoveredProject && (
              <Box
                sx={{
                  position: "fixed",
                  inset: 0,
                  zIndex: 2000,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  pointerEvents: "none",
                  bgcolor: "rgba(0, 0, 0, 0.35)",
                }}
              >
                <Paper
                  elevation={8}
                  sx={{
                    width: "min(82vw, 980px)",
                    height: "min(72vh, 620px)",
                    color: "#ffffff",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    position: "relative",
                    overflow: "hidden",
                    backgroundImage: `url(${hoveredProject.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    boxShadow: "0 30px 60px rgba(0, 0, 0, 0.55)",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.72) 100%)",
                    },
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      overflowWrap: "anywhere",
                      wordBreak: "break-word",
                      lineHeight: 1.3,
                      position: "relative",
                      zIndex: 1,
                      fontWeight: 700,
                      textShadow: "0 2px 10px rgba(0,0,0,0.7)",
                      px: 2,
                    }}
                  >
                    {hoveredProject.title}
                  </Typography>
                  {hoveredProject.description && (
                    <Typography
                      sx={{
                        mt: 1.6,
                        position: "relative",
                        zIndex: 1,
                        maxWidth: 820,
                        color: "rgba(255,255,255,0.92)",
                        textShadow: "0 2px 12px rgba(0,0,0,0.7)",
                        px: 3,
                        ...typeScale.body,
                      }}
                    >
                      {hoveredProject.description}
                    </Typography>
                  )}
                </Paper>
              </Box>
            )}
            {activeInternshipPreview && (
              <Box
                sx={{
                  position: "fixed",
                  inset: 0,
                  zIndex: 2000,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  pointerEvents: selectedInternship ? "auto" : "none",
                  bgcolor: "rgba(0, 0, 0, 0.35)",
                }}
                onClick={selectedInternship ? () => setSelectedInternship(null) : undefined}
              >
                <Paper
                  elevation={8}
                  sx={{
                    width: "min(82vw, 980px)",
                    height: "min(72vh, 620px)",
                    color: "#ffffff",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    position: "relative",
                    overflow: "hidden",
                    bgcolor: "rgba(8, 16, 30, 0.78)",
                    backgroundImage: activeInternshipPreview.image
                      ? `radial-gradient(circle at 30% 20%, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.0) 55%), linear-gradient(180deg, rgba(8,16,30,0.72) 0%, rgba(8,16,30,0.94) 100%), url(${activeInternshipPreview.image})`
                      : `radial-gradient(circle at 30% 20%, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.0) 55%), linear-gradient(180deg, rgba(8,16,30,0.72) 0%, rgba(8,16,30,0.94) 100%)`,
                    backgroundSize: activeInternshipPreview.image ? "cover, cover, contain" : "cover, cover",
                    backgroundPosition: activeInternshipPreview.image ? "center, center, center" : "center, center",
                    backgroundRepeat: activeInternshipPreview.image ? "no-repeat, no-repeat, no-repeat" : "no-repeat, no-repeat",
                    border: "1px solid rgba(191, 214, 255, 0.22)",
                    boxShadow: "0 30px 60px rgba(0, 0, 0, 0.55)",
                    p: { xs: 3, md: 5 },
                    borderRadius: 3,
                  }}
                  onClick={selectedInternship ? (e) => e.stopPropagation() : undefined}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      position: "relative",
                      zIndex: 1,
                      fontWeight: 800,
                      textShadow: "0 2px 12px rgba(0,0,0,0.65)",
                      mb: 1.2,
                      px: 2,
                      ...typeScale.h5,
                      color: "#f4f8ff",
                    }}
                  >
                    {activeInternshipPreview.title}
                  </Typography>
                  <Typography
                    sx={{
                      position: "relative",
                      zIndex: 1,
                      maxWidth: 760,
                      color: "#dbe8ff",
                      textShadow: "0 2px 10px rgba(0,0,0,0.6)",
                      ...typeScale.body,
                      px: 2,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {activeInternshipPreview.description}
                  </Typography>
                </Paper>
              </Box>
            )}

            {/* Internships Section */}
            <Box
              id="internships"
              sx={{
                mt: 6,
                scrollMarginTop: 88,
                ...sectionPanelSx,
                p: { xs: 2, md: 3 },
                mb: 2.5,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, ...typeScale.h4 }}>
                Internships
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
                  gap: 2,
                  "@keyframes projectDrift": {
                    "0%": { translate: "-10px 0" },
                    "50%": { translate: "10px 0" },
                    "100%": { translate: "-10px 0" },
                  },
                }}
              >
                {internships.map((internship, index) => (
                  <Paper
                    key={internship.title}
                    elevation={2}
                    sx={{
                      p: 3,
                      color: "#f4f8ff",
                      backgroundColor: "rgba(8, 16, 30, 0.62)",
                      backgroundImage: internship.image
                        ? `radial-gradient(circle at 28% 18%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.0) 55%), linear-gradient(180deg, rgba(8,16,30,0.68) 0%, rgba(8,16,30,0.92) 100%), url(${internship.image})`
                        : `radial-gradient(circle at 28% 18%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.0) 55%), linear-gradient(180deg, rgba(8,16,30,0.68) 0%, rgba(8,16,30,0.92) 100%)`,
                      backgroundSize: internship.image ? "cover, cover, contain" : "cover, cover",
                      backgroundPosition: internship.image ? "center, center, center" : "center, center",
                      backgroundRepeat: internship.image ? "no-repeat, no-repeat, no-repeat" : "no-repeat, no-repeat",
                      overflow: "hidden",
                      height: "100%",
                      border: "1px solid rgba(191, 214, 255, 0.22)",
                      borderRadius: 2.5,
                      boxShadow: "0 18px 36px rgba(0,0,0,0.42)",
                      ...animatedInternshipCardSx,
                      animationDelay: `${index * 0.25}s`,
                    }}
                    onMouseEnter={() => handleInternshipEnter(internship)}
                    onMouseLeave={handleInternshipLeave}
                    onClick={() => setSelectedInternship(internship)}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 800,
                        mb: 1,
                        color: "#f4f8ff",
                        textShadow: "0 2px 12px rgba(0,0,0,0.7)",
                      }}
                    >
                      {internship.title}
                    </Typography>
                    <Typography
                      sx={{
                        ...typeScale.body,
                        whiteSpace: "pre-line",
                        color: "#dbe8ff",
                        textShadow: "0 2px 10px rgba(0,0,0,0.65)",
                      }}
                    >
                      {internship.description}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            </Box>
          </Box>

          <Box id="skills" sx={{ mt: 6, scrollMarginTop: 88 }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, ...typeScale.h4 }}>
              Skills
            </Typography>
            <Stack
              direction="row"
              spacing={1.2}
              useFlexGap
              flexWrap="wrap"
              sx={{
                "@keyframes chipFloat": {
                  "0%": { transform: "translateY(0px)" },
                  "50%": { transform: "translateY(-4px)" },
                  "100%": { transform: "translateY(0px)" },
                },
              }}
            >
              {skills.map((skill, index) => (
                <Chip
                  key={skill}
                  label={skill}
                  sx={{
                    bgcolor: "#070000",
                    color: "#ffffff",
                    border: "1px solid #6b7280",
                    height: 36,
                    px: 0.8,
                    animation: "chipFloat 3.2s ease-in-out infinite",
                    animationDelay: `${index * 0.09}s`,
                    transition:
                      "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease, background-color 180ms ease, color 180ms ease",
                    "&:hover": {
                      bgcolor: "#ffffff",
                      color: "#000000",
                      transform: "translateY(-6px) scale(1.04)",
                      borderColor: "#93c5fd",
                      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.35)",
                    },
                    "& .MuiChip-label": {
                      fontSize: { xs: "0.9rem", md: "0.98rem" },
                      fontWeight: 500,
                      transition: "color 180ms ease",
                    },
                    "&:hover .MuiChip-label": { color: "#000000" },
                  }}
                />
              ))}
            </Stack>
          </Box>
        </Box>

        <Box
          id="contact"
          sx={{
            minHeight: { xs: "calc(100dvh - 56px)", md: "calc(100dvh - 64px)" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            py: { xs: 4, md: 6 },
            ...sectionPanelSx,
            p: { xs: 2, md: 3 },
            scrollMarginTop: 88,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 1.5,
              fontWeight: 700,
              ...typeScale.h4,
              fontSize: { xs: "1.8rem", sm: "2.1rem", md: "2.5rem" },
              textAlign: "center",
            }}
          >
            Contact Me
          </Typography>
          <Typography
            sx={{
              mb: 3.5,
              color: "#fefefe",
              ...typeScale.body,
              fontSize: { xs: "1.05rem", sm: "1.15rem", md: "1.3rem" },
              lineHeight: 1.5,
              textAlign: "center",
            }}
          >
            Contact me for opportunities or any queries — I’d be happy to connect!

          </Typography>

          <Box
            component="form"
            onSubmit={handleContactSubmit}
            sx={{
              width: "100%",
              maxWidth: 820,
              mx: "auto",
              mb: { xs: 4, md: 5 },
            }}
          >
            {contactStatus && (
              <Paper
                elevation={0}
                sx={{
                  mb: 2,
                  px: 2,
                  py: 1.3,
                  bgcolor: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.25)",
                }}
              >
                <Typography sx={{ ...typeScale.body, color: "#ffffff" }}>{contactStatus}</Typography>
              </Paper>
            )}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 2,
                mb: 2.2,
              }}
            >
              <TextField
                fullWidth
                type="email"
                required
                label="Email"
                placeholder="Enter a valid email address"
                variant="outlined"
                value={contactForm.email}
                onChange={handleContactInputChange("email")}
                InputLabelProps={{ sx: { color: "#f8fafc" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "999px",
                    color: "#ffffff",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.35)" },
                    "&:hover fieldset": { borderColor: "rgba(255,255,255,0.55)" },
                    "&.Mui-focused fieldset": { borderColor: "#ffffff" },
                  },
                }}
              />
              <TextField
                fullWidth
                required
                label="Name"
                placeholder="Enter your Name"
                variant="outlined"
                value={contactForm.name}
                onChange={handleContactInputChange("name")}
                InputLabelProps={{ sx: { color: "#f8fafc" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "999px",
                    color: "#ffffff",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.35)" },
                    "&:hover fieldset": { borderColor: "rgba(255,255,255,0.55)" },
                    "&.Mui-focused fieldset": { borderColor: "#ffffff" },
                  },
                }}
              />
            </Box>
            <Paper
              elevation={0}
              sx={{
                mb: 2.2,
                p: { xs: 1.5, md: 1.8 },
                bgcolor: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 2,
              }}
            >
              <TextField
                fullWidth
                required
                label="Message"
                placeholder="Write your message"
                variant="outlined"
                multiline
                minRows={4}
                value={contactForm.message}
                onChange={handleContactInputChange("message")}
                InputLabelProps={{ sx: { color: "#f8fafc" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "#ffffff",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.35)" },
                    "&:hover fieldset": { borderColor: "rgba(255,255,255,0.55)" },
                    "&.Mui-focused fieldset": { borderColor: "#ffffff" },
                  },
                }}
              />
            </Paper>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isSubmitting}
              sx={{
                borderRadius: "999px",
                py: 1.25,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                ...typeScale.button,
              }}
            >
              {isSubmitting ? "Sending..." : "Submit"}
            </Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 3,
            }}
          >
            <Button
              variant="contained"
              endIcon={<ArrowUpwardIcon />}
              onClick={() => handleGoToSection("home")}
              sx={{
                textTransform: "none",
                borderRadius: "999px",
                px: 3,
                py: 1.1,
                bgcolor: "#000103",
                color: "#f8fafc",
                "&:hover": {
                  bgcolor: "#000205",
                },
                ...typeScale.button,
                fontSize: { xs: "0.95rem", sm: "1.02rem", md: "1.1rem" },
              }}
            >
              Back to Home
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default ResponsiveAppBar;
