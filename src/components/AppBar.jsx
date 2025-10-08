import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Simuladores', path: '/simuladores' },
  { name: 'Cursos', path: '/cursos' },
  { name: 'Contacte-nos', path: '/contacte-nos' },
];
const settings = [
  { name: 'Perfil', path: '/profile' },
  { name: 'Meus Favoritos', path: '/favorites' }, // Novo item para favoritos
  // Outros itens de configuração podem ser adicionados aqui
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { currentUser, logout, userName, isAdmin } = useAuth(); // Obtém isAdmin do contexto
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    setAnchorElUser(null);
    try {
      await logout();
      navigate('/login');
      alert('Sessão terminada com sucesso!');
    } catch (error) {
      console.error('Erro ao terminar sessão:', error);
      alert('Erro ao terminar sessão.');
    }
  };

  return (
    <AppBar position="static" sx={{ borderRadius: '10px', marginBottom: '10px', backgroundColor: '#007DAB' }}>
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <CurrencyExchangeIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            OwnProject
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu} component={Link} to={page.path}>
                  <Typography sx={{ textAlign: 'center' }}>{page.name}</Typography>
                </MenuItem>
              ))}
              {!currentUser && (
                <MenuItem onClick={handleCloseNavMenu} component={Link} to="/login">
                  <Typography sx={{ textAlign: 'center' }}>Login</Typography>
                </MenuItem>
              )}
              {!currentUser && (
                <MenuItem onClick={handleCloseNavMenu} component={Link} to="/register">
                  <Typography sx={{ textAlign: 'center' }}>Registar</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
          <CurrencyExchangeIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            OwnProject
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  fontWeight: 600,
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.1) translate(-2px)'
                  }
                }}
                component={Link}
                to={page.path}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}> {/* Adicionado display: flex e alignItems: center */}
            {!currentUser && (
              <Button
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  fontWeight: 600,
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.1) translate(-2px)'
                  },
                  marginRight: '10px' // Espaçamento entre os botões
                }}
                component={Link}
                to="/login"
              >
                Login
              </Button>
            )}
            {!currentUser && (
              <Button
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  fontWeight: 600,
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.1) translate(-2px)'
                  },
                  marginRight: '10px' // Espaçamento antes do avatar
                }}
                component={Link}
                to="/register"
              >
                Registar
              </Button>
            )}

            {currentUser && (
              <Tooltip title={userName || "Open settings"}> {/* Tooltip com o nome do utilizador */}
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar>{userName ? userName.charAt(0).toUpperCase() : ''}</Avatar> {/* Exibe a primeira letra do nome */}
                </IconButton>
              </Tooltip>
            )}

            {currentUser && (
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting.name} onClick={handleCloseUserMenu} component={Link} to={setting.path}>
                    <Typography sx={{ textAlign: 'center' }}>{setting.name}</Typography>
                  </MenuItem>
                ))}
                {isAdmin && ( // Apenas mostra o link se for admin
                  <MenuItem onClick={handleCloseUserMenu} component={Link} to="/admin-dashboard">
                    <Typography sx={{ textAlign: 'center' }}>Admin Dashboard</Typography>
                  </MenuItem>
                )}
                <MenuItem onClick={handleLogout}>
                  <Typography sx={{ textAlign: 'center' }}>Sair</Typography>
                </MenuItem>
              </Menu>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;