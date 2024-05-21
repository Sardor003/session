import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../api/instance";
import { AxiosRequestConfig, AxiosResponse } from "axios";

export default interface IRecipe {
  id: string;
  hard: number;
  image: string;
  name: string;
  text: string;
}

interface IRecipePost {
  image: string;
  name: string;
  hard: number;
  text: string;
}

interface IState {
  recipes: IRecipe[];
  isLoading: boolean;
  error: Error | null;
}

const initialState: IState = {
  recipes: [],
  isLoading: false,
  error: null,
};

export const getRecipe = createAsyncThunk("recipe/get", async () => {
  const response = await instance.get("recipe.json");
  const data = response.data;
  const options = Object.keys(data).map((val) => {
    return {
      id: val,
      val,
      ...data[val],
    };
  });
  console.log(options);

  return options;
});

export const addNewRecipe = createAsyncThunk(
  "recipe/post",
  async (payload: IRecipePost, { dispatch }) => {
    await instance.post<
      AxiosRequestConfig,
      AxiosResponse<{
        image: string;
        name: string;
        hard: number;
        text: string;
      }>
    >("recipe.json", payload);
    await dispatch(getRecipe());
  }
);

export const editData = createAsyncThunk(
  "recipe/put",
  async ({ id, payload }: { id: string; payload: IRecipe }) => {
    const response = await instance.put<AxiosRequestConfig, AxiosResponse>(
      `recipe/${id}.json`,
      payload
    );
    return response.data;
  }
);

export const deleteData = createAsyncThunk(
  "recipe/delete",
  async (id: string, { dispatch }) => {
    await instance.delete(`recipe/${id}.json`);
    await dispatch(getRecipe());
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getRecipe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRecipe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.recipes = action.payload;
      })
      .addCase(getRecipe.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error as Error;
      })
      .addCase(addNewRecipe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewRecipe.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addNewRecipe.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error as Error;
      })
      .addCase(deleteData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteData.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error as Error;
      })
      .addCase(editData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editData.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(editData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error as Error;
      });
  },
});

export const RecipeReducer = contactSlice.reducer;
