import * as Yup from "yup";

export const buggedSchema = Yup.object({
  files: Yup.array()
    .of(
      Yup.object({
        type: Yup.string().required("You have To Input Type"),
      })
    )
    .min(1, "At least one file is required"),
});

export const workingSchema = Yup.object({
  files: Yup.array()
    .of(
      Yup.object({
        type: Yup.string().required("You have To Input Type"),
      })
    )
    .test((input, { createError }) => {
      if (input && input.length > 1) return true;
      else {
        createError({ message: "should have atleast 1 item " });
      }
    }),
});
