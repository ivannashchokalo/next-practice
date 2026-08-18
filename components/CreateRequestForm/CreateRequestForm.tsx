"use client";

import { createRequest } from "@/lib/api/requests";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik, Field, FormikHelpers, FieldArray } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

interface FormValues {
  title: string;
  body: string;
  role: string;
  notifications: boolean;
  contactMethod: "email" | "phone";
  tags: string[];
}

const initialValues: FormValues = {
  title: "",
  body: "",
  role: "",
  notifications: false,
  contactMethod: "email",
  tags: [""],
};

const validationSchema = Yup.object({
  title: Yup.string().min(3).required(),
  body: Yup.string().min(10).required(),
  role: Yup.string().required(),
  notifications: Yup.boolean(),
  contactMethod: Yup.string()
    .oneOf(["email", "phone"], "Choose email or phone")
    .required("Contact method is required"),
  tags: Yup.array()
    .min(1, "At least one tag is required")
    .of(
      Yup.string()
        .min(2, "Tag must be at least 2 characters")
        .required("Tag is required"),
    ),
});

export default function CreateRequestForm() {
  const router = useRouter();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
      router.push("/requests");
    },
  });

  const handleSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>,
  ) => {
    mutate(values, {
      onSuccess: () => {
        actions.resetForm();
      },
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched }) => {
        return (
          <Form>
            <Field type="text" name="title" />
            <Field as="textarea" name="body" />
            <Field as="select" name="role">
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="fullstack">Fullstack</option>
            </Field>
            <label htmlFor="notifications">Enable notifications</label>
            <Field type="checkbox" name="notifications" id="notifications" />

            <label>
              Email <Field type="radio" name="contactMethod" value="email" />
            </label>

            <label>
              Phone <Field type="radio" name="contactMethod" value="phone" />
            </label>

            <FieldArray name="tags">
              {({ push, remove }) => (
                <>
                  {values.tags.map((_, index) => (
                    <div key={index}>
                      <Field name={`tags.${index}`} />

                      {index > 0 && (
                        <button type="button" onClick={() => remove(index)}>
                          Remove
                        </button>
                      )}
                    </div>
                  ))}

                  <button type="button" onClick={() => push("")}>
                    Add tag
                  </button>
                </>
              )}
            </FieldArray>

            <button>Send</button>
          </Form>
        );
      }}
    </Formik>
  );
}
