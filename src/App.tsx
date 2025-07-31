import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Input, Stack, Typography } from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";
import { DocumentUploadForm } from "./DocumentUploadForm";
import { buggedSchema, workingSchema } from "./schema";
import type { FormData } from "./types";

function App() {
  const {
    register,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(buggedSchema),
    mode: "onChange",
  });

  const {
    register: register2,
    control: control2,
    formState: { errors: errors2 },
  } = useForm<FormData>({
    resolver: yupResolver(workingSchema),
    mode: "onChange",
  });

  const {
    fields,
    append: appendFile,
    remove: removeFile,
  } = useFieldArray({
    control,
    name: "files",
  });

  const {
    fields: fields2,
    append: appendFile2,
    remove: removeFile2,
  } = useFieldArray({
    control: control2,
    name: "files",
  });

  const onFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (fields.length === 0) {
      appendFile({ type: undefined });
      appendFile2({ type: undefined });
    }

    e.target.value = "";
  };

  return (
    <Box component="form" sx={{ maxWidth: 800, p: 3 }}>
      <Stack spacing={2}>
        <Typography>Upload a file</Typography>
        <Input
          type="file"
          inputProps={{ accept: "*" }}
          onChange={onFileUpload}
        />
      </Stack>

      {fields.map((field, index) => (
        <DocumentUploadForm
          key={field.id}
          register={register}
          title="bugged Schema - showing error early"
          registerIndex={index}
          error={!!errors.files?.[index]?.type}
          errorMessage={errors.files?.[index]?.type?.message}
          onDelete={() => removeFile(index)}
        />
      ))}

      {fields2.map((field, index) => (
        <DocumentUploadForm
          key={field.id}
          register={register2}
          title="working Schema - not showing error if user not interacted"
          registerIndex={index}
          error={!!errors2.files?.[index]?.type}
          errorMessage={errors2.files?.[index]?.type?.message}
          onDelete={() => removeFile2(index)}
        />
      ))}
    </Box>
  );
}

export default App;
