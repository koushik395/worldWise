import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

import supabase from "../supabase";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error("Unknown action type");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });

      let { data: cities, error } = await supabase.from("cities").select("*");

      console.log(cities);

      if (error) {
        dispatch({
          type: "rejected",
          payload: "There was an error Loading the cities...",
        });
        return;
      }
      dispatch({ type: "cities/loaded", payload: cities });
    }
    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;
      dispatch({ type: "loading" });
      let { data: city, error } = await supabase
        .from("cities")
        .select("*")
        .eq("id", Number(id))
        .single();
      console.log(city);
      if (error) {
        dispatch({
          type: "rejected",
          payload: "There was an error Loading the city...",
        });
        return;
      }
      dispatch({ type: "city/loaded", payload: city });
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    console.log(newCity);
    const { data, error } = await supabase
      .from("cities")
      .insert([{ ...newCity }])
      .select()
      .single();

    console.log(data);

    if (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error creating the city...",
      });
      return;
    }
    dispatch({ type: "city/created", payload: data });
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });

    const { error } = await supabase
      .from("cities")
      .delete()
      .eq("id", Number(id));

    if (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error creating the city...",
      });
      return;
    }
    dispatch({ type: "city/deleted", payload: id });
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
        error,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("Cities Context was used outside the cities Provider!");
  return context;
}

export { CitiesProvider, useCities };
