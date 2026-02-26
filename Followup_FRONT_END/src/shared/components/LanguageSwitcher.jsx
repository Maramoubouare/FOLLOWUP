import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { Globe, ChevronDown } from 'lucide-react';
import { useTranslation } from '../../contexts/I18nContext';

export const LanguageSwitcher = ({ variant = "outlined", light = false }) => {
  const { lng, setLng } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <>
      <Button 
        variant={variant} 
        onClick={(e) => setAnchorEl(e.currentTarget)} 
        startIcon={<Globe size={16} />} 
        endIcon={<ChevronDown size={14} />}
        sx={{ 
          color: light ? 'white' : 'inherit', 
          borderColor: light ? 'rgba(255,255,255,0.2)' : 'inherit' 
        }}
      >
        {lng === 'en' ? 'English' : 'Français'}
      </Button>
      <Menu 
        anchorEl={anchorEl} 
        open={Boolean(anchorEl)} 
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => { setLng('en'); setAnchorEl(null); }}>English</MenuItem>
        <MenuItem onClick={() => { setLng('fr'); setAnchorEl(null); }}>Français</MenuItem>
      </Menu>
    </>
  );
};
