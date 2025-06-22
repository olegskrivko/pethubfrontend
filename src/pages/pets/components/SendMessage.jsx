// // // // SendMessage.jsx
// // // import React from 'react';
// // // import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
// // // import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
// // // import EventIcon from '@mui/icons-material/Event';
// // // import SendIcon from '@mui/icons-material/Send';
// // // import WrongLocationIcon from '@mui/icons-material/WrongLocation';
// // // import { Avatar, Box, Card, CardContent, Grid, IconButton, TextField, Tooltip, Typography } from '@mui/material';
// // // import { useAuth } from '../../../contexts/AuthContext';
// // // const SendMessage = ({
// // //   message,
// // //   onUploadImage,
// // //   filePreview,
// // //   locationAdded,
// // //   isLocationAdded,
// // //   onAddLocation,
// // //   onRemoveLocation,
// // //   onMessageChange,
// // //   onSendMessage,
// // // }) => {
// // //   const { user } = useAuth();
// // //   const handleFileInputChange = (event) => {
// // //     const file = event.target.files[0];
// // //     if (file) {
// // //       onUploadImage(file);
// // //     }
// // //   };
// // //   return (
// // //     <Card
// // //       sx={{
// // //         borderRadius: 4,
// // //         background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
// // //         background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',
// // //         boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
// // //         marginBottom: '2rem',
// // //       }}
// // //     >
// // //       <CardContent style={{ paddingBottom: '1rem', marginTop: '1rem' }}>
// // //         {/* <Box display="flex" alignItems="center" marginBottom="1rem">
// // //           <Box>
// // //             <Typography variant="h6" sx={{ color: '#16477c' }}>
// // //               Pievieno ziņu
// // //             </Typography>
// // //           </Box>
// // //         </Box> */}
// // //         <Box mb={2}>
// // //           <TextField
// // //             id="message-input"
// // //             label="Ierakstiet savu komentāru šeit..."
// // //             variant="outlined"
// // //             size="small"
// // //             fullWidth
// // //             multiline
// // //             rows={3}
// // //             value={message}
// // //             onChange={(e) => onMessageChange(e.target.value)}
// // //           />
// // //         </Box>
// // //         {filePreview && (
// // //           <Box mb={2} style={{ width: '100%' }}>
// // //             <img src={filePreview} alt="Preview" style={{ width: '100%', height: 'auto' }} />
// // //           </Box>
// // //         )}
// // //         <Box display="flex" justifyContent="space-between">
// // //           <Box>
// // //             {!isLocationAdded ? (
// // //               <Tooltip title="Pievienot atrašanās vietu">
// // //                 <IconButton onClick={onAddLocation} style={{ backgroundColor: '#00b3a4', color: '#fff' }}>
// // //                   <AddLocationAltIcon />
// // //                 </IconButton>
// // //               </Tooltip>
// // //             ) : (
// // //               <Tooltip title="Noņemt atrašanās vietu">
// // //                 <IconButton onClick={onRemoveLocation} style={{ backgroundColor: '#00b3a4', color: '#fff' }}>
// // //                   <WrongLocationIcon />
// // //                 </IconButton>
// // //               </Tooltip>
// // //             )}
// // //             <Tooltip title="Pievienot foto">
// // //               <label htmlFor="photo-upload-input">
// // //                 <IconButton
// // //                   component="span"
// // //                   sx={{
// // //                     backgroundColor: '#00b3a4',
// // //                     marginLeft: '1rem',
// // //                     color: '#fff',
// // //                     '&:hover': { backgroundColor: '#777' },
// // //                   }}
// // //                 >
// // //                   <AddPhotoAlternateIcon />
// // //                 </IconButton>
// // //               </label>
// // //             </Tooltip>
// // //             <input
// // //               accept="image/*"
// // //               id="photo-upload-input"
// // //               type="file"
// // //               onChange={handleFileInputChange}
// // //               style={{ display: 'none' }}
// // //             />
// // //           </Box>
// // //           <Box>
// // //             <Tooltip title="Aizsūtīt">
// // //               <IconButton
// // //                 onClick={() => {
// // //                   onSendMessage();
// // //                   if (isLocationAdded) onRemoveLocation();
// // //                 }}
// // //                 style={{ backgroundColor: '#00b3a4', color: '#fff' }}
// // //               >
// // //                 <SendIcon />
// // //               </IconButton>
// // //             </Tooltip>
// // //           </Box>
// // //         </Box>
// // //       </CardContent>
// // //     </Card>
// // //   );
// // // };
// // // export default SendMessage;
// // import React, { useState } from 'react';
// // import {
// //   AddLocationAlt as AddLocationAltIcon,
// //   AddPhotoAlternate as AddPhotoAlternateIcon,
// //   ExpandLess as ExpandLessIcon,
// //   ExpandMore as ExpandMoreIcon,
// //   Send as SendIcon,
// //   WrongLocation as WrongLocationIcon,
// // } from '@mui/icons-material';
// // import {
// //   Cake as CakeIcon,
// //   ColorLens as ColorLensIcon,
// //   Event as EventIcon,
// //   Height as HeightIcon,
// //   Male as MaleIcon,
// //   MergeType as MergeTypeIcon,
// //   Pets as PetsIcon,
// //   Search as SearchIcon,
// //   Tag as TagIcon,
// //   Texture as TextureIcon,
// // } from '@mui/icons-material';
// // import AddCommentIcon from '@mui/icons-material/AddComment';
// // import {
// //   Avatar,
// //   Box,
// //   Card,
// //   CardContent,
// //   Collapse,
// //   Divider,
// //   Grid,
// //   IconButton,
// //   TextField,
// //   Tooltip,
// //   Typography,
// // } from '@mui/material';
// // import { useAuth } from '../../../contexts/AuthContext';
// // const SendMessage = ({
// //   message,
// //   onUploadImage,
// //   filePreview,
// //   isLocationAdded,
// //   onAddLocation,
// //   onRemoveLocation,
// //   onMessageChange,
// //   onSendMessage,
// // }) => {
// //   const { user } = useAuth();
// //   const [expanded, setExpanded] = useState(false);
// //   const handleToggleExpand = () => setExpanded((prev) => !prev);
// //   const handleFileInputChange = (event) => {
// //     const file = event.target.files[0];
// //     if (file) {
// //       onUploadImage(file);
// //     }
// //   };
// //   return (
// //     <Card
// //       sx={{
// //         borderRadius: 3,
// //         background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',
// //         overflow: 'hidden',
// //       }}
// //     >
// //       {/* Header */}
// //       <Box
// //         sx={{
// //           display: 'flex',
// //           alignItems: 'center',
// //           justifyContent: 'space-between',
// //           pr: 2,
// //           cursor: 'pointer',
// //         }}
// //         onClick={handleToggleExpand}
// //       >
// //         <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
// //           <Typography color="textSecondary">
// //             <Box display="flex" alignItems="center" gap={2}>
// //               <IconButton color="primary" style={{ backgroundColor: '#f7f9fd' }}>
// //                 <AddCommentIcon />
// //               </IconButton>
// //               PIEVIENOT ZIŅOJUMU
// //             </Box>
// //           </Typography>
// //         </Box>
// //         <IconButton>{expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}</IconButton>
// //       </Box>
// //       <Collapse in={expanded}>
// //         <CardContent>
// //           <Box>
// //             <TextField
// //               label="Ierakstiet savu komentāru šeit..."
// //               variant="outlined"
// //               size="small"
// //               fullWidth
// //               multiline
// //               rows={3}
// //               value={message}
// //               onChange={(e) => onMessageChange(e.target.value)}
// //             />
// //           </Box>
// //           {filePreview && (
// //             <Box mt={2}>
// //               <img
// //                 src={filePreview}
// //                 alt="Preview"
// //                 style={{
// //                   width: '100%',
// //                   height: 'auto',
// //                   borderRadius: '0.5rem',
// //                   boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
// //                 }}
// //               />
// //             </Box>
// //           )}
// //           <Box mt={3} display="flex" justifyContent="space-between" alignItems="center">
// //             <Box>
// //               {!isLocationAdded ? (
// //                 <Tooltip title="Pievienot atrašanās vietu">
// //                   <IconButton onClick={onAddLocation} sx={{ backgroundColor: '#00b3a4', color: '#fff', mr: 1 }}>
// //                     <AddLocationAltIcon />
// //                   </IconButton>
// //                 </Tooltip>
// //               ) : (
// //                 <Tooltip title="Noņemt atrašanās vietu">
// //                   <IconButton onClick={onRemoveLocation} sx={{ backgroundColor: '#00b3a4', color: '#fff', mr: 1 }}>
// //                     <WrongLocationIcon />
// //                   </IconButton>
// //                 </Tooltip>
// //               )}
// //               <label htmlFor="photo-upload-input">
// //                 <Tooltip title="Pievienot foto">
// //                   <IconButton
// //                     component="span"
// //                     sx={{
// //                       backgroundColor: '#00b3a4',
// //                       color: '#fff',
// //                       '&:hover': { backgroundColor: '#007c73' },
// //                     }}
// //                   >
// //                     <AddPhotoAlternateIcon />
// //                   </IconButton>
// //                 </Tooltip>
// //               </label>
// //               <input
// //                 accept="image/*"
// //                 id="photo-upload-input"
// //                 type="file"
// //                 onChange={handleFileInputChange}
// //                 style={{ display: 'none' }}
// //               />
// //             </Box>
// //             <Tooltip title="Aizsūtīt ziņu">
// //               <IconButton
// //                 onClick={() => {
// //                   onSendMessage();
// //                   if (isLocationAdded) onRemoveLocation();
// //                 }}
// //                 sx={{
// //                   backgroundColor: '#00b3a4',
// //                   color: '#fff',
// //                   '&:hover': { backgroundColor: '#007c73' },
// //                 }}
// //               >
// //                 <SendIcon />
// //               </IconButton>
// //             </Tooltip>
// //           </Box>
// //         </CardContent>
// //       </Collapse>
// //     </Card>
// //   );
// // };
// // export default SendMessage;
// // SendMessage.js
// import {
//   AddLocationAlt as AddLocationAltIcon,
//   AddPhotoAlternate as AddPhotoAlternateIcon,
//   ExpandLess as ExpandLessIcon,
//   ExpandMore as ExpandMoreIcon,
//   Send as SendIcon,
//   WrongLocation as WrongLocationIcon,
// } from '@mui/icons-material';
// import AddCommentIcon from '@mui/icons-material/AddComment';
// import {
//   Box,
//   Card,
//   CardContent,
//   Collapse,
//   IconButton,
//   TextField,
//   Tooltip,
//   Typography,
// } from '@mui/material';
// const SendMessage = ({
//   message,
//   filePreview,
//   isLocationAdded,
//   onAddLocation,
//   onRemoveLocation,
//   onMessageChange,
//   onSendMessage,
//   onUploadImage,
//   expanded,
//   onToggleExpand,
// }) => {
//   return (
//     <Card
//       sx={{
//         borderRadius: 3,
//         background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',
//         overflow: 'hidden',
//       }}
//     >
//       {/* Header */}
//       <Box
//         sx={{
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           pr: 2,
//           cursor: 'pointer',
//         }}
//         onClick={onToggleExpand}
//       >
//         <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//           <Typography color="textSecondary">
//             <Box display="flex" alignItems="center" gap={2}>
//               <IconButton color="primary" style={{ backgroundColor: '#f7f9fd' }}>
//                 <AddCommentIcon />
//               </IconButton>
//               PIEVIENOT ZIŅOJUMU
//             </Box>
//           </Typography>
//         </Box>
//         <IconButton>{expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}</IconButton>
//       </Box>
//       <Collapse in={expanded}>
//         <CardContent>
//           <Box>
//             <TextField
//               label="Ierakstiet savu komentāru šeit..."
//               variant="outlined"
//               size="small"
//               fullWidth
//               multiline
//               rows={3}
//               value={message}
//               onChange={(e) => onMessageChange(e.target.value)}
//             />
//           </Box>
//           {filePreview && (
//             <Box mt={2}>
//               <img
//                 src={filePreview}
//                 alt="Preview"
//                 style={{
//                   width: '100%',
//                   height: 'auto',
//                   borderRadius: '0.5rem',
//                   boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
//                 }}
//               />
//             </Box>
//           )}
//           <Box mt={3} display="flex" justifyContent="space-between" alignItems="center">
//             <Box>
//               {!isLocationAdded ? (
//                 <Tooltip title="Pievienot atrašanās vietu">
//                   <IconButton onClick={onAddLocation} sx={{ backgroundColor: '#00b3a4', color: '#fff', mr: 1 }}>
//                     <AddLocationAltIcon />
//                   </IconButton>
//                 </Tooltip>
//               ) : (
//                 <Tooltip title="Noņemt atrašanās vietu">
//                   <IconButton onClick={onRemoveLocation} sx={{ backgroundColor: '#00b3a4', color: '#fff', mr: 1 }}>
//                     <WrongLocationIcon />
//                   </IconButton>
//                 </Tooltip>
//               )}
//               <label htmlFor="photo-upload-input">
//                 <Tooltip title="Pievienot foto">
//                   <IconButton
//                     component="span"
//                     sx={{
//                       backgroundColor: '#00b3a4',
//                       color: '#fff',
//                       '&:hover': { backgroundColor: '#007c73' },
//                     }}
//                   >
//                     <AddPhotoAlternateIcon />
//                   </IconButton>
//                 </Tooltip>
//               </label>
//               <input
//                 accept="image/*"
//                 id="photo-upload-input"
//                 type="file"
//                 onChange={(e) => onUploadImage(e.target.files[0])}
//                 style={{ display: 'none' }}
//               />
//             </Box>
//             <Tooltip title="Aizsūtīt ziņu">
//               <IconButton
//                 onClick={onSendMessage}
//                 sx={{
//                   backgroundColor: '#00b3a4',
//                   color: '#fff',
//                   '&:hover': { backgroundColor: '#007c73' },
//                 }}
//               >
//                 <SendIcon />
//               </IconButton>
//             </Tooltip>
//           </Box>
//         </CardContent>
//       </Collapse>
//     </Card>
//   );
// };
// export default SendMessage;
import React, { useState } from 'react';

import {
  AddLocationAlt as AddLocationAltIcon,
  AddPhotoAlternate as AddPhotoAlternateIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  Send as SendIcon,
  WrongLocation as WrongLocationIcon,
} from '@mui/icons-material';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { Box, Card, CardContent, Collapse, IconButton, TextField, Tooltip, Typography } from '@mui/material';

import { useAuth } from '../../../contexts/AuthContext';

const SendMessage = ({
  message,
  onMessageChange,
  onSendMessage,
  onUploadImage,
  filePreview,
  file,
  isLocationAdded,
  onAddLocation,
  onRemoveLocation,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggleExpand = () => setExpanded((prev) => !prev);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onUploadImage(file);
    }
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pr: 2,
          cursor: 'pointer',
        }}
        onClick={handleToggleExpand}
      >
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
          <Typography color="textSecondary">
            <Box display="flex" alignItems="center" gap={2}>
              <IconButton color="primary" style={{ backgroundColor: '#f7f9fd' }}>
                <AddCommentIcon />
              </IconButton>
              PIEVIENOT ZIŅOJUMU
            </Box>
          </Typography>
        </Box>
        <IconButton>{expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}</IconButton>
      </Box>

      <Collapse in={expanded}>
        <CardContent>
          <TextField
            label="Ierakstiet savu komentāru šeit..."
            variant="outlined"
            size="small"
            fullWidth
            multiline
            rows={3}
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
          />

          {/* {filePreview && (
            <Box mt={2}>
              <img
                src={filePreview}
                alt="Preview"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '0.5rem',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                }}
              />
            </Box>
          )} */}
          {filePreview ? (
            <Box mt={2}>
              <img
                src={filePreview}
                alt="Preview"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '0.5rem',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                }}
              />
            </Box>
          ) : file ? (
            <Box mt={2}>
              <Typography variant="body2" color="textSecondary">
                Selected file: {file.name}
              </Typography>
            </Box>
          ) : null}

          <Box mt={3} display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              {!isLocationAdded ? (
                <Tooltip title="Pievienot atrašanās vietu">
                  <IconButton onClick={onAddLocation} sx={{ backgroundColor: '#00b3a4', color: '#fff', mr: 1 }}>
                    <AddLocationAltIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Noņemt atrašanās vietu">
                  <IconButton onClick={onRemoveLocation} sx={{ backgroundColor: '#00b3a4', color: '#fff', mr: 1 }}>
                    <WrongLocationIcon />
                  </IconButton>
                </Tooltip>
              )}

              <label htmlFor="photo-upload-input">
                <Tooltip title="Pievienot foto">
                  <IconButton
                    component="span"
                    sx={{
                      backgroundColor: '#00b3a4',
                      color: '#fff',
                      '&:hover': { backgroundColor: '#007c73' },
                    }}
                  >
                    <AddPhotoAlternateIcon />
                  </IconButton>
                </Tooltip>
              </label>
              <input
                accept="image/*"
                id="photo-upload-input"
                type="file"
                onChange={handleFileInputChange}
                style={{ display: 'none' }}
              />
            </Box>

            <Tooltip title="Aizsūtīt ziņu">
              <IconButton
                onClick={() => {
                  onSendMessage();
                  if (isLocationAdded) onRemoveLocation();
                }}
                sx={{
                  backgroundColor: '#00b3a4',
                  color: '#fff',
                  '&:hover': { backgroundColor: '#007c73' },
                }}
              >
                <SendIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default SendMessage;
