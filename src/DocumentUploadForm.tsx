import { Close } from "@mui/icons-material";
import { Box, IconButton, Stack, TextField, Typography } from "@mui/material";
import type { FC } from "react";
import type { UseFormRegister } from "react-hook-form";
import type { FormData } from "./types";

type Props = {
  title: string;
  register: UseFormRegister<FormData>;
  registerIndex: number;
  error: boolean;
  errorMessage: string;
  onDelete: () => void;
};

export const DocumentUploadForm: FC<Props> = ({
  title,
  error,
  errorMessage,
  registerIndex,
  register,
  onDelete,
}) => (
  <Box mt={9}>
    <Stack direction="row" spacing={2} alignItems="center">
      <Typography>{title}</Typography>
      <TextField
        label="Type"
        type="text"
        variant="filled"
        {...register(`files.${registerIndex}.type`)}
        error={error}
        helperText={errorMessage}
      />
      <IconButton onClick={onDelete}>
        <Close />
      </IconButton>
    </Stack>
  </Box>
);
