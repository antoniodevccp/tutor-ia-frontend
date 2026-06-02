import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import TopicOutlinedIcon from '@mui/icons-material/TopicOutlined'
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authStore } from '@/features/auth/store/authStore'

export default function AppMenuButton() {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const open = Boolean(anchorEl)

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleNavigate = (path: string) => {
    navigate(path)
    handleClose()
  }

  const handleLogout = () => {
    authStore.logout()
    handleClose()
    navigate('/login', { replace: true })
  }

  return (
    <>
      <IconButton
        onClick={(event) => setAnchorEl(event.currentTarget)}
        sx={{
          position: 'fixed',
          top: 16,
          right: 16,
          zIndex: 1200,
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: 3,
          '&:hover': {
            bgcolor: 'background.paper',
          },
        }}
      >
        <MenuIcon />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => handleNavigate('/')}>
          <ListItemIcon>
            <DashboardOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Dashboard</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => handleNavigate('/topics')}>
          <ListItemIcon>
            <TopicOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Topics</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => handleNavigate('/attempts')}>
          <ListItemIcon>
            <AssignmentTurnedInOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Mis evaluaciones</ListItemText>
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Cerrar sesión</ListItemText>
        </MenuItem>
      </Menu>
    </>
  )
}