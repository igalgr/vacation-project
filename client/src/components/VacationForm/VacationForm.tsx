import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../utils/dbURL_key";
import { updateVacationAction } from "../../redux/VacationReducer";
import { RootState, store } from "../../redux/Store";
import { Vacation } from "../../models/Vacation";
import { useSelector } from "react-redux";
import "./VacationForm.css";
import { useVacationValid } from "../../Hooks/useVacationValid";

export interface VacationFormData {
  destination: string;
  description: string;
  startDate: string;
  endDate: string;
  image: FileList | string;
  price: number;
}

const VacationForm: React.FC = () => {
  const { register, handleSubmit, errors, setValue } = useVacationValid();
  const navigate = useNavigate();
  const vacations = useSelector((state: RootState) => state.vacation.vacations);
  const [vacationValue, setVacationValue] = useState<Vacation | null>();
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    vacationValue?.image as string
  );

  const displayImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          setSelectedImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (vacationValue && vacationValue.image) {
      setSelectedImage(`http://localhost:4000/assets/${vacationValue.image}`);
    }
  }, [vacationValue]);

  const { id } = useParams();
  const isEdit = id;

  useEffect(() => {
    if (!isEdit) return;
    const vacationToUpdate = vacations.find(
      (vacation: Vacation) => vacation.id === Number(id)
    );

    if (vacationToUpdate) {
      const formattedVacation = {
        ...vacationToUpdate,
        startDate: dateFormat(vacationToUpdate.startDate),
        endDate: dateFormat(vacationToUpdate.endDate),
      };

      Object.entries(formattedVacation).forEach(([key, value]) => {
        setValue(key as keyof VacationFormData, value);
      });

      setVacationValue(formattedVacation);
    }
  }, [id, vacations, setValue]);

  const dateFormat = (date: string) => {
    return date.split("T")[0];
  };

  const prepareFormData = (data: VacationFormData) => {
    const formData = new FormData();
    formData.append("destination", data.destination);
    formData.append("description", data.description);
    formData.append("startDate", data.startDate);
    formData.append("endDate", data.endDate);
    formData.append("price", String(data.price));
    formData.append(
      "image",
      typeof data.image === "string" ? data.image : data.image[0]
    );
    return formData;
  };

  const onAdd = async (data: VacationFormData) => {
    const formData = prepareFormData(data);
    try {
      const response = await api.post("/vacations", formData);
      if (response.status === 201) {
        navigate("/home");
      } else {
        return;
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const onEdit = async (data: VacationFormData) => {
    const formData = prepareFormData(data);
    try {
      const response = await api.put(`/vacations/${id}`, formData);
      if (response.status === 200) {
        store.dispatch(updateVacationAction(response.data));
        navigate("/home");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const submit = (data: VacationFormData) => {
    if (isEdit) {
      onEdit(data);
    } else {
      onAdd(data);
    }
  };

  return (
    <div className="form">
      <h1>{isEdit ? "Edit Vacation" : "Add Vacation"}</h1>
      <form onSubmit={handleSubmit(submit)}>
        <input
          {...register("destination", { required: true })}
          type="text"
          placeholder="add destination"
          defaultValue={vacationValue?.destination}
        />
        {errors.destination && (
          <p className="error">{errors.destination.message}</p>
        )}

        <input
          {...register("description", { required: true })}
          type="text"
          placeholder="add description"
          defaultValue={vacationValue?.description}
        />
        {errors.description && (
          <p className="error">{errors.description.message}</p>
        )}

        <input
          {...register("startDate", { required: true })}
          type="date"
          defaultValue={vacationValue?.startDate}
        />
        {errors.startDate && (
          <p className="error">{errors.startDate.message}</p>
        )}

        <input
          {...register("endDate", { required: true })}
          type="date"
          defaultValue={vacationValue?.endDate}
        />
        {errors.endDate && <p className="error">{errors.endDate.message}</p>}

        <input {...register("image")} type="file" onChange={displayImg} />

        <img
          src={selectedImage}
          id="displayUploadingImg"
          alt=""
          style={{ borderRadius: "10px", width: "100%", paddingBottom: "20px" }}
        />

        <input
          {...register("price", { required: true, min: 1, max: 10000 })}
          defaultValue={vacationValue?.price}
          type="number"
          placeholder="add price"
        />
        {errors.price && <p className="error">{errors.price.message}</p>}
        <div className="formButtons">
          <div></div>
          <button className="btnAdd" type="submit">
            {isEdit ? "Edit" : "Add"}
          </button>
          <button className="btnCancel" onClick={() => navigate("/home")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default VacationForm;