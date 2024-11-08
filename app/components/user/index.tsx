import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';

export function User({email}: {
  email: string;
}) {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar>{email[0].toUpperCase()}</Avatar>
    </Stack>
  );
}