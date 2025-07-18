import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

// BookmarksIndexPage.tsx
export default function BookmarksIndexPage() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Bookmarks</h2>
      <ul className="space-y-2">
        <li>
          <Link to="/user-profile/bookmarks/pets" className="text-blue-600 hover:underline">
            🐶 Pet Bookmarks
          </Link>
        </li>
        <li>
          <Link to="/user-profile/bookmarks/services" className="text-blue-600 hover:underline">
            🧰 Service Bookmarks
          </Link>
        </li>
      </ul>
    </div>
  );
}
