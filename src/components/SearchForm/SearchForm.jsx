import PropTypes from "prop-types";
import clsx from "clsx";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import styles from "./SearchForm.module.css";

import useDecadeList from "../../hooks/useDecadeList.js";
import useGenreList from "../../hooks/useGenreList.js";
import useCountryList from "../../hooks/useCountryList.js";

import TextInput from "../TextInput/TextInput.jsx";
import Multiselect from "../Multiselect/Multiselect.jsx";
import Select from "../Select/Select.jsx";

const formSchema = Yup.object({
  artist: Yup.string().test(
    "validate if artist not empty",
    "Artist must be between 2 and 80 characters and only letters, hyphen and space are allowed ",
    (value) => {
      if (value.length > 0) {
        return (
          value.length > 1 &&
          value.length < 81 &&
          value.match(/^[a-zA-Z-\s]+$/g)
        );
      }
      return true;
    }
  ),
  genres: Yup.array().of(Yup.string()).max(3, "Max number of genres is ${max}"),
  decade: Yup.string(),
  country: Yup.string(),
});

function SearchForm({
  defaultValues = {
    artist: "",
    genres: [],
    decade: "",
    country: "",
  },
  onSubmit,
}) {
  const decadeList = useDecadeList();
  const genreList = useGenreList();
  const countryList = useCountryList();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(formSchema),
  });

  const isErrorsEmpty =
    errors.artist || errors.genres || errors.decade || errors.country;

  return (
    <form
      className={styles.root}
      role="search"
      action=""
      method="GET"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={clsx(styles.isWideMobile, styles.isWideDesktop)}>
        <TextInput
          placeholder="Artist"
          name="artist"
          isError={!!errors.artist}
          register={register}
        />
      </div>

      <div className={clsx(styles.holder)}>
        <Controller
          name="genres"
          control={control}
          render={({ field }) => (
            <Multiselect
              placeholder="Genres"
              value={field.value}
              isError={!!errors.genres}
              options={genreList.data.map((genre) => ({
                label: genre.title,
                value: genre.id.toString(),
              }))}
              onChange={field.onChange}
            />
          )}
        />
      </div>

      <div className={clsx(styles.holder)}>
        <Controller
          name="decade"
          control={control}
          render={({ field }) => (
            <Select
              placeholder="Decade"
              value={field.value}
              isError={!!errors.decade}
              options={decadeList.map((decade) => ({
                label: decade.name,
                value: decade.id.toString(),
              }))}
              onChange={field.onChange}
            />
          )}
        />
      </div>
      <div
        className={clsx(
          styles.holder,
          styles.isWideMobile,
          styles.isWideDesktop
        )}
      >
        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <Select
              placeholder="Country"
              value={field.value}
              isError={!!errors.country}
              options={countryList.data.map((country) => ({
                label: country.title,
                value: country.id,
              }))}
              onChange={field.onChange}
            />
          )}
        />
      </div>
      <button
        className={clsx("button button__primary")}
        type="submit"
        disabled={!isDirty}
      >
        Search
      </button>
      <button
        className={clsx("button button__reset")}
        type="reset"
        onClick={() => reset()}
      >
        Reset
      </button>
      {isErrorsEmpty && (
        <ul className={styles.errors}>
          Please, fix following errors to proceed
          {errors.artist && (
            <li className={styles.errorMessage}>{errors.artist.message}</li>
          )}
          {errors.genres && (
            <li className={styles.errorMessage}>{errors.genres.message}</li>
          )}
          {errors.decade && (
            <li className={styles.errorMessage}>{errors.decade.message}</li>
          )}
          {errors.country && (
            <li className={styles.errorMessage}>{errors.country.message}</li>
          )}
        </ul>
      )}
    </form>
  );
}

const defaultValues = PropTypes.shape({
  artist: PropTypes.string,
  genres: PropTypes.string,
  decade: PropTypes.string,
  country: PropTypes.string,
});

SearchForm.propTypes = {
  defaultValues: defaultValues,
  onSubmit: PropTypes.func,
};

export default SearchForm;
