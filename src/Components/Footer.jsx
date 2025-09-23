import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
  useTheme,
  alpha,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiArrowUp,
  FiSend,
} from 'react-icons/fi';
import {
  FaTwitter,
  FaLinkedinIn,
  FaGithub,
  FaDiscord,
  FaYoutube,
} from 'react-icons/fa';
import { HiSparkles, HiLightningBolt } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

// Styled Components
const FooterContainer = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.02)} 0%, ${alpha(theme.palette.secondary.main, 0.02)} 50%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
  backdropFilter: 'blur(20px)',
  borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, transparent)`,
    animation: 'shimmer 3s ease-in-out infinite',
  },
  '@keyframes shimmer': {
    '0%': { opacity: 0.5 },
    '50%': { opacity: 1 },
    '100%': { opacity: 0.5 },
  },
}));

const FooterSection = styled(Box)(({ theme }) => ({
  '& .section-title': {
    color: theme.palette.text.primary,
    fontWeight: 700,
    marginBottom: theme.spacing(2),
    fontSize: '1.1rem',
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '-8px',
      left: 0,
      width: '30px',
      height: '3px',
      borderRadius: '2px',
      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    },
  },
  '& .footer-link': {
    color: theme.palette.text.secondary,
    textDecoration: 'none',
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    padding: theme.spacing(0.5, 0),
    borderRadius: theme.spacing(1),
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      color: theme.palette.primary.main,
      paddingLeft: theme.spacing(1),
      transform: 'translateX(8px)',
    },
  },
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  width: '45px',
  height: '45px',
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  borderRadius: '12px',
  color: theme.palette.text.secondary,
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover': {
    transform: 'translateY(-5px) scale(1.1)',
    boxShadow: `0 15px 35px ${alpha(theme.palette.primary.main, 0.3)}`,
    color: theme.palette.common.white,
    '&::before': {
      opacity: 1,
    },
    '& > svg': {
      position: 'relative',
      zIndex: 1,
    },
  },
}));

const ScrollToTopButton = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  bottom: '30px',
  right: '30px',
  width: '55px',
  height: '55px',
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  color: theme.palette.common.white,
  borderRadius: '50%',
  boxShadow: `0 10px 30px ${alpha(theme.palette.primary.main, 0.4)}`,
  zIndex: 1000,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px) scale(1.1)',
    boxShadow: `0 15px 40px ${alpha(theme.palette.primary.main, 0.5)}`,
  },
  '&:active': {
    transform: 'translateY(-2px) scale(1.05)',
  },
}));

const NewsletterBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '20px',
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)}, ${alpha(theme.palette.secondary.main, 0.05)})`,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  backdropFilter: 'blur(10px)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: `linear-gradient(90deg, transparent, ${alpha(theme.palette.primary.main, 0.1)}, transparent)`,
    animation: 'slideIn 2s ease-in-out infinite',
  },
  '@keyframes slideIn': {
    '0%': { left: '-100%' },
    '100%': { left: '100%' },
  },
}));

const StatsBox = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(2),
  borderRadius: '16px',
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)}, ${alpha(theme.palette.secondary.main, 0.05)})`,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const Footer = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const quickLinks = [
    { name: 'AI Web Tools', path: '/ai_web_tools', icon: <HiSparkles size={14} /> },
    { name: 'API Tools', path: '/api', icon: <HiLightningBolt size={14} /> },
    { name: 'Database Tools', path: '/db_query', icon: <HiSparkles size={14} /> },
    { name: 'App Tools', path: '/app', icon: <HiLightningBolt size={14} /> },
    { name: 'SEO Tools', path: '/seo_tool', icon: <HiSparkles size={14} /> },
    { name: 'Video Generator', path: '/AI_Video_Generator', icon: <HiLightningBolt size={14} /> },
  ];

  const categories = [
    { name: 'Web Design', path: '/web_design_tools' },
    { name: 'Shopify Store', path: '/shopify_store' },
    { name: 'AI Detection', path: '/ai_free_tools' },
    { name: 'Education Tools', path: '/edu_tool' },
    { name: 'Content Detection', path: '/ai_content_detect' },
    { name: 'AI Humanizer', path: '/ai_humanizor' },
  ];

  const socialLinks = [
    { icon: <FaTwitter />, url: '#', color: '#1DA1F2' },
    { icon: <FaLinkedinIn />, url: '#', color: '#0077B5' },
    { icon: <FaGithub />, url: '#', color: '#333' },
    { icon: <FaDiscord />, url: '#', color: '#7289DA' },
    { icon: <FaYoutube />, url: '#', color: '#FF0000' },
  ];

  return (
    <>
      <FooterContainer component="footer">
        <Container maxWidth="xl" sx={{ py: 6 }}>
          {/* Top Section with Stats */}
          <Grid container spacing={4} sx={{ mb: 6 }}>
            <Grid item xs={12} md={3}>
              <StatsBox>
                <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.main', mb: 1 }}>
                  500+
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  AI Tools Listed
                </Typography>
              </StatsBox>
            </Grid>
            <Grid item xs={12} md={3}>
              <StatsBox>
                <Typography variant="h4" sx={{ fontWeight: 800, color: 'secondary.main', mb: 1 }}>
                  50K+
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Active Users
                </Typography>
              </StatsBox>
            </Grid>
            <Grid item xs={12} md={3}>
              <StatsBox>
                <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.main', mb: 1 }}>
                  25+
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Categories
                </Typography>
              </StatsBox>
            </Grid>
            <Grid item xs={12} md={3}>
              <StatsBox>
                <Typography variant="h4" sx={{ fontWeight: 800, color: 'secondary.main', mb: 1 }}>
                  99%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Uptime
                </Typography>
              </StatsBox>
            </Grid>
          </Grid>

          <Divider sx={{ mb: 6, opacity: 0.1 }} />

          {/* Main Footer Content */}
          <Grid container spacing={4}>
            {/* Brand Section */}
            <Grid item xs={12} md={4}>
              <FooterSection>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    AI Tools Hub
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>
                    Discover the most powerful AI tools to boost your productivity, creativity, and business growth. Your one-stop destination for cutting-edge AI solutions.
                  </Typography>
                </Box>

                {/* Contact Info */}
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                    <FiMail size={16} color={theme.palette.primary.main} />
                    <Typography variant="body2" color="text.secondary">
                      hello@aitoolshub.com
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                    <FiPhone size={16} color={theme.palette.primary.main} />
                    <Typography variant="body2" color="text.secondary">
                      +1 (555) 123-4567
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <FiMapPin size={16} color={theme.palette.primary.main} />
                    <Typography variant="body2" color="text.secondary">
                      San Francisco, CA
                    </Typography>
                  </Box>
                </Box>

                {/* Social Links */}
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {socialLinks.map((social, index) => (
                    <SocialButton key={index} href={social.url}>
                      {social.icon}
                    </SocialButton>
                  ))}
                </Box>
              </FooterSection>
            </Grid>

            {/* Quick Links */}
            <Grid item xs={12} sm={6} md={2}>
              <FooterSection>
                <Typography className="section-title">
                  Popular Tools
                </Typography>
                {quickLinks.map((link, index) => (
                  <Link
                    key={index}
                    className="footer-link"
                    onClick={() => navigate(link.path)}
                    sx={{ cursor: 'pointer' }}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                ))}
              </FooterSection>
            </Grid>

            {/* Categories */}
            <Grid item xs={12} sm={6} md={2}>
              <FooterSection>
                <Typography className="section-title">
                  Categories
                </Typography>
                {categories.map((category, index) => (
                  <Link
                    key={index}
                    className="footer-link"
                    onClick={() => navigate(category.path)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <HiSparkles size={14} />
                    {category.name}
                  </Link>
                ))}
              </FooterSection>
            </Grid>

            {/* Newsletter */}
            <Grid item xs={12} md={4}>
              <FooterSection>
                <Typography className="section-title">
                  Stay Updated
                </Typography>
                <NewsletterBox elevation={0}>
                  <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <HiSparkles size={32} color={theme.palette.primary.main} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, textAlign: 'center' }}>
                    Get AI Tool Updates
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center', lineHeight: 1.6 }}>
                    Subscribe to our newsletter and never miss the latest AI tools and features.
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <Box
                      component="input"
                      placeholder="Enter your email"
                      sx={{
                        flex: 1,
                        p: 1.5,
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                        borderRadius: '12px',
                        background: alpha(theme.palette.background.paper, 0.5),
                        fontSize: '0.9rem',
                        outline: 'none',
                        '&:focus': {
                          border: `1px solid ${theme.palette.primary.main}`,
                        },
                      }}
                    />
                    <IconButton
                      sx={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        color: 'white',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        },
                      }}
                    >
                      <FiSend size={18} />
                    </IconButton>
                  </Box>
                  
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center' }}>
                    By subscribing, you agree to our Privacy Policy
                  </Typography>
                </NewsletterBox>
              </FooterSection>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4, opacity: 0.1 }} />

          {/* Bottom Section */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              © 2024 AI Tools Hub. All rights reserved. Built with ❤️ for AI enthusiasts.
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link href="#" sx={{ color: 'text.secondary', textDecoration: 'none', fontSize: '0.9rem', '&:hover': { color: 'primary.main' } }}>
                Privacy Policy
              </Link>
              <Link href="#" sx={{ color: 'text.secondary', textDecoration: 'none', fontSize: '0.9rem', '&:hover': { color: 'primary.main' } }}>
                Terms of Service
              </Link>
              <Link href="#" sx={{ color: 'text.secondary', textDecoration: 'none', fontSize: '0.9rem', '&:hover': { color: 'primary.main' } }}>
                Contact Us
              </Link>
              <Link href="#" sx={{ color: 'text.secondary', textDecoration: 'none', fontSize: '0.9rem', '&:hover': { color: 'primary.main' } }}>
                Support
              </Link>
            </Box>
          </Box>
        </Container>
      </FooterContainer>

      {/* Scroll to Top Button */}
      <ScrollToTopButton onClick={scrollToTop}>
        <FiArrowUp size={24} />
      </ScrollToTopButton>
    </>
  );
};

export default Footer;
