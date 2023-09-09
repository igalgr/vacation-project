import { FieldError, Resolver, useForm } from "react-hook-form";
import { VacationFormData } from "../components/VacationForm/VacationForm";

type FormErrors = {
  [K in keyof VacationFormData]?: FieldError;
};

const resolver: Resolver<VacationFormData> = async (values) => {
  const errors: FormErrors = {};
  const today = new Date().toISOString().split("T")[0];
  const location = window.location.pathname;

  if (!values.destination) {
    errors.destination = {
      type: "required",
      message: "Destination is required",
    };
  }

  if (!values.description) {
    errors.description = {
      type: "required",
      message: "Description is required",
    };
  }

  if (!values.startDate) {
    errors.startDate = {
      type: "required",
      message: "Start date is required",
    };
  }

  if (values.startDate < today) {
    errors.startDate = {
      type: "required",
      message: "Start date must be in the future",
    };
  }

  if (new Date(values.startDate) > new Date(values.endDate)) {
    errors.startDate = {
      type: "required",
      message: "Start date must be before end date",
    };
  }

  if (!values.endDate) {
    errors.endDate = {
      type: "required",
      message: "End date is required",
    };
  }

  if (location === "/editVacation") {
    if (values.endDate < today) {
      errors.endDate = {
        type: "required",
        message: "End date must be in the future",
      };
    }

    if (new Date(values.endDate) < new Date(values.startDate)) {
      errors.endDate = {
        type: "required",
        message: "End date must be after start date",
      };
    }
  }

  if (!values.startDate)
    if (!values.price) {
      errors.price = {
        type: "required",
        message: "Price is required",
      };
    }

  if (values.price < 0 || values.price > 10000) {
    errors.price = {
      type: "required",
      message: "Price must be between 0 and 10000",
    };
  }

  return {
    values: Object.keys(errors).length > 0 ? {} : values,
    errors,
  };
};

export const useVacationValid = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VacationFormData>({ resolver });

  return { register, handleSubmit, errors, setValue };
};