import React from "react";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsOps";
import { useFormik } from "formik";
import * as yup from "yup";
import css from "../ContactForm/ContactForm.module.css";

export default function ContactsForm() {
  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    phone: yup
      .string()
      .matches(/^[0-9]+$/, "Phone number must be only digits")
      .required("Phone number is required"),
  });
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      dispatch(addContact(values));
      resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={css.form}>
      <div className={css.field}>
        <input
          type="text"
          id="name"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          placeholder="Name"
        />
        {formik.touched.name && formik.errors.name ? (
          <div className={css.error}>{formik.errors.name}</div>
        ) : null}
      </div>
      <div className={css.field}>
        <input
          type="text"
          id="phone"
          name="phone"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
          placeholder="Phone"
        />
        {formik.touched.phone && formik.errors.phone ? (
          <div className={css.error}>{formik.errors.phone}</div>
        ) : null}
      </div>
      <button type="submit">Add Contact</button>
    </form>
  );
}
