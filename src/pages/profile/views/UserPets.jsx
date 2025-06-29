import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DeleteIcon from '@mui/icons-material/Delete';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import EditIcon from '@mui/icons-material/Edit';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockOutlineIcon from '@mui/icons-material/LockOutline';
import PetsIcon from '@mui/icons-material/Pets';
import { MenuItem, Modal, Select } from '@mui/material';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  IconButton,
  Link as MuiLink,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
// ✅ Import missing icon
import axios from 'axios';
import Lottie from 'lottie-react';
import { useSnackbar } from 'notistack';

import spinnerAnimation from '../../../assets/Animation-1749725645616.json';
import { useAuth } from '../../../contexts/AuthContext';
import { getFinalStatusLabel, getStatusLabel, getSpeciesLabel } from '../../../constants/Choices';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function UserPets() {
  const { t } = useTranslation('userPets');
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [petToDelete, setPetToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [ownedPets, setOwnedPets] = useState([]);
  const [quota, setQuota] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const initialStatus = selectedPet?.status;

  const finalStatusOptions = {
    1: [
      // lost
      { value: 1, label: t('choices.finalStatus.1') },
      { value: 8, label: t('choices.finalStatus.8') },
      { value: 7, label: t('choices.finalStatus.7') },
      { value: 9, label: t('choices.finalStatus.9') },
    ],

    2: [
      // found
      { value: 1, label: t('choices.finalStatus.1') },
      { value: 2, label: t('choices.finalStatus.2') },
      { value: 3, label: t('choices.finalStatus.3') },
      { value: 4, label: t('choices.finalStatus.4') },
      { value: 9, label: t('choices.finalStatus.9') },
    ],
    3: [
      // seen
      { value: 1, label: t('choices.finalStatus.1') },
      { value: 5, label: t('choices.finalStatus.5') },
      { value: 6, label: t('choices.finalStatus.6') },
      { value: 7, label: t('choices.finalStatus.7') },
      { value: 9, label: t('choices.finalStatus.9') },
    ],
  };
  console.log('selectedPet', selectedPet);
  const fetchUserPetsAndQuota = async () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      setError(t('messages.errors.mustBeLoggedIn'));
      setLoading(false);
      return;
    }

    try {
      const [petsRes, quotaRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/accounts/user-pets/`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        }),
        axios.get(`${API_BASE_URL}/api/pets/pet-quota/`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        }),
      ]);

      setOwnedPets(petsRes.data);
      setQuota(quotaRes.data);
    } catch (error) {
      console.error('Error fetching pets or quota:', error);
      setError(t('messages.errors.fetchFailed'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserPetsAndQuota();
  }, []);

  const openDeleteDialog = (pet) => {
    setPetToDelete(pet);
    setDeleteDialogOpen(true);
  };
  const handleEditPet = (pet) => {
    setSelectedPet(pet);
    setNewStatus(pet.final_status || '');
    setEditModalOpen(true);
  };

  if (loading) {
    return (
      <Container>
        <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ width: 180, height: 180 }}>
            <Lottie animationData={spinnerAnimation} loop autoplay />
          </Box>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography variant="h5" color="error" align="center">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="lg" disableGutters>
      <Box sx={{ my: { xs: 2, sm: 2, md: 3, lg: 4, xl: 4 } }}>
        {/* Header */}
        <Typography
          component="h1"
          align="center"
          sx={{
            fontWeight: 800,
            fontSize: {
              xs: '1.5rem',
              sm: '2rem',
              md: '2.5rem',
              lg: '2.5rem',
            },
            mb: 5,
            background: 'linear-gradient(60deg, #16477c 0%, #00b5ad 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {t('title')}
        </Typography>
        {/* Quota */}
        {/* {quota && (
          <Card
            sx={{
              p: { xs: 1, sm: 2 },
              mb: 4,
              borderRadius: 3,
              background: 'linear-gradient(90deg, #edf4ff 0%, #f3faff 100%)',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }} gutterBottom>
              Jūsu limits
            </Typography>
            <Typography variant="body2" component="p" sx={{ mb: 1 }}>
              Atļautais mājdzīvnieku skaits: <strong>{quota.limit}</strong>
            </Typography>
            <Typography variant="body2" component="p" sx={{ mb: 1 }}>
              Pašreiz izmantots: <strong>{quota.used}</strong>
            </Typography>
            <Box mt={3}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                Abonementu limiti:
              </Typography>
              <Box display="flex" gap={2} flexWrap="wrap">
                <Chip label="Freemium: 1" size="small" color="primary" />
                <Chip label="Plus: 3" size="small" color="primary" />
                <Chip label="Premium: 5" size="small" color="primary" />
              </Box>
            </Box>
          </Card>
        )} */}

        {/* Pets List */}
        {ownedPets.length === 0 ? (
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            <Paper
              sx={{
                p: { xs: 1, sm: 2 },
                borderRadius: 3,
                background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  background: 'linear-gradient(90deg, #d0f0f5 0%, #e3fbff 100%)',
                },
              }}
            >
              <Box display="flex" alignItems="center">
                <IconButton color="primary" style={{ backgroundColor: '#f7f9fd', cursor: 'default' }}>
                  <BookmarkIcon />
                </IconButton>
                <Typography variant="body1" color="textSecondary" sx={{ ml: { xs: 1, sm: 2 } }}>
                  {t('emptyState')}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ) : (
          <Grid container spacing={2}>
            {ownedPets.map((pet) => (
              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }} key={pet.id}>
                <Card
                  sx={{
                    p: { xs: 1, sm: 2 },
                    borderRadius: 3,
                    background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      background: 'linear-gradient(90deg, #d0f0f5 0%, #e3fbff 100%)',
                    },
                  }}
                >
                  <Box display="flex" alignItems="center">
                    <MuiLink href={`/pets/${pet.id}`} underline="none">
                      <Avatar
                        src={pet.pet_image_1}
                        alt={getSpeciesLabel(pet.species, t) || t('unknown')}
                        sx={{ width: 64, height: 64, mr: { xs: 1, sm: 2 }, cursor: 'pointer' }}
                      />
                    </MuiLink>
                    <Box flexGrow={1}>
                      <Typography variant="h6">
                        <Chip label={getSpeciesLabel(pet.species, t) || t('unknown')} size="small" color="primary" />
                      </Typography>
                      {/* <Typography variant="body2" color="textSecondary" fontSize="0.8rem">
                        {pet.final_status === 1 ? pet.status_display : pet.final_status_display}
                      </Typography> */}
                      <Box display="flex" alignItems="center" justifyContent="flex-start" gap={1.5}>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 500,
                            fontSize: '0.6rem',
                            color: 'primary.main',
                            textTransform: 'uppercase',
                          }}
                        >
                          {getStatusLabel(pet.status, t)}
                        </Typography>

                        <DoubleArrowIcon
                          sx={{
                            color: '#00b5ad',
                            fontSize: 16,
                            opacity: 0.7,
                          }}
                        />

                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 500,
                            fontSize: '0.6rem',
                            color: pet.final_status === 1 ? 'slategray' : 'primary.main',
                            textTransform: 'uppercase',
                          }}
                        >
                          {getFinalStatusLabel(pet.final_status, t)}
                        </Typography>
                      </Box>
                    </Box>
                    {pet.is_closed ? (
                      <Tooltip title={t('tooltips.advertisementClosed')}>
                        <IconButton
                          edge="end"
                          size="small"
                          onClick={() => handleEditPet(pet)}
                          color="info"
                          aria-label="delete"
                          sx={{ mr: 1 }}
                        >
                          <LockOutlineIcon />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip title={t('tooltips.close')}>
                        <IconButton
                          edge="end"
                          size="small"
                          onClick={() => handleEditPet(pet)}
                          color="info"
                          aria-label="delete"
                          sx={{ mr: 1 }}
                        >
                          <LockOpenIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                    {/* <Tooltip title="Rediģēt">
                      <IconButton color="primary" onClick={() => handleEditPet(pet)} sx={{ mr: 1 }}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip> */}
                    <Tooltip title={t('tooltips.delete')}>
                      {/* <IconButton color="error" onClick={() => handleDeletePet(pet.id)}>
                      <DeleteIcon />
                    </IconButton> */}
                      <IconButton color="error" size="small" onClick={() => openDeleteDialog(pet)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Footer */}
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mt={4}>
            <Link
              to="/user-profile"
              style={{
                color: '#00b5ad',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.875rem',
                fontWeight: '500',
              }}
            >
              <ArrowBackIcon fontSize="small" />
              {t('back')}
            </Link>

            {quota && quota.remaining <= 0 ? (
              <Box
                sx={{
                  color: 'gray',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  opacity: 0.5,
                  cursor: 'not-allowed',
                }}
              >
                <AddIcon fontSize="small" />
                {t('add')}
              </Box>
            ) : (
              <Link
                to="/add-pet"
                style={{
                  color: '#00b5ad',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                }}
              >
                <AddIcon fontSize="small" />
                {t('add')}
              </Link>
            )}

            {/* <Button
              component={Link}
              to="/add-pet"
              startIcon={<AddIcon />}
              disabled={quota && quota.remaining <= 0}
              size="small"
              sx={{
                textTransform: 'none',
              }}
            >
              Pievienot
            </Button> */}
          </Box>
        </Grid>

        {/* Edit Dialog */}
        <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)} maxWidth="xs" fullWidth>
          <DialogTitle>{t('modals.editStatus.title')}</DialogTitle>
          <DialogContent>
            {/* <Select fullWidth value={newStatus} onChange={(e) => setNewStatus(e.target.value)} sx={{ mt: 1, mb: 2 }}>
            <MenuItem value={1}>Nav atrisināts</MenuItem>
            <MenuItem value={2}>Atgriezts saimniekam</MenuItem>
            <MenuItem value={3}>Nodots patversmei</MenuItem>
            <MenuItem value={4}>Joprojām tiek meklēts</MenuItem>
            <MenuItem value={5}>Nav aktuāli</MenuItem>
            <MenuItem value={6}>Atradies miris</MenuItem>
            <MenuItem value={7}>Saimnieks neatrasts</MenuItem>
          </Select> */}
            <Select fullWidth value={newStatus} onChange={(e) => setNewStatus(e.target.value)} sx={{ mt: 1, mb: 2 }}>
              {(finalStatusOptions[initialStatus] || []).map(({ value, label }) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditModalOpen(false)}>{t('modals.editStatus.cancel')}</Button>
            <Button
              variant="contained"
              onClick={async () => {
                try {
                  const accessToken = localStorage.getItem('access_token');
                  await axios.patch(
                    `${API_BASE_URL}/api/accounts/user-pets/${selectedPet.id}/update/`,
                    { final_status: newStatus },
                    { headers: { Authorization: `Bearer ${accessToken}` } },
                  );
                  await fetchUserPetsAndQuota();
                  setEditModalOpen(false);
                } catch (err) {
                  console.error('Error updating status', err);
                  enqueueSnackbar(t('messages.errors.updateFailed'), { variant: 'error' });
                }
              }}
            >
              {t('modals.editStatus.save')}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Dialog */}
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          aria-labelledby="delete-confirmation-dialog"
        >
          <DialogTitle id="delete-confirmation-dialog" sx={{ p: { xs: 2, sm: 2 } }}>
            {t('modals.delete.title')}
          </DialogTitle>
          <DialogContent sx={{ p: { xs: 2, sm: 2 } }}>
            <Typography>
              {t('modals.delete.message', { species: getSpeciesLabel(petToDelete?.species, t) || t('unknown') })}
            </Typography>
          </DialogContent>
          <DialogActions sx={{ p: { xs: 2, sm: 2 } }}>
            <Button onClick={() => setDeleteDialogOpen(false)} disabled={deleting}>
              {t('modals.delete.cancel')}
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={async () => {
                if (!petToDelete) return;
                setDeleting(true);
                const accessToken = localStorage.getItem('access_token');
                try {
                  const response = await fetch(`${API_BASE_URL}/api/accounts/user-pets/${petToDelete.id}/delete/`, {
                    method: 'DELETE',
                    headers: {
                      Authorization: `Bearer ${accessToken}`,
                      'Content-Type': 'application/json',
                    },
                  });

                  if (response.ok) {
                    enqueueSnackbar(t('messages.success.petDeleted'), { variant: 'success' });
                    await fetchUserPetsAndQuota(); // refetch pets after delete
                    setDeleteDialogOpen(false);
                    setPetToDelete(null);
                  } else {
                    const errorData = await response.json();
                    enqueueSnackbar(`Kļūda: ${errorData.detail}`, { variant: 'error' });
                  }
                } catch (error) {
                  console.error('Error deleting pet:', error);
                  enqueueSnackbar(t('messages.errors.deleteFailed'), { variant: 'error' });
                } finally {
                  setDeleting(false);
                }
              }}
              disabled={deleting}
            >
              {deleting ? t('modals.delete.deleting') : t('modals.delete.delete')}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
}

export default UserPets;
