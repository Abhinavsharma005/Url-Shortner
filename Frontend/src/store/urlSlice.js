import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { shortenUrl as shortenUrlApi, getUrls as getUrlsApi, deleteUrl as deleteUrlApi } from '../api';

export const shortenUrl = createAsyncThunk(
  'url/shorten',
  async (data, { rejectWithValue }) => {
    try {
      const response = await shortenUrlApi(data);
      console.log('API Response:', response.data); // Debug log
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to shorten URL');
    }
  }
);

export const fetchUrls = createAsyncThunk(
  'url/fetchUrls',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUrlsApi();
      return response.data.codes;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch URLs');
    }
  }
);

export const deleteUrl = createAsyncThunk(
  'url/delete',
  async (id, { rejectWithValue }) => {
    try {
      await deleteUrlApi(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to delete URL');
    }
  }
);

const urlSlice = createSlice({
  name: 'url',
  initialState: {
    urls: [],
    currentUrl: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentUrl: (state) => {
      state.currentUrl = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(shortenUrl.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(shortenUrl.fulfilled, (state, action) => {
        state.loading = false;
        console.log('Storing currentUrl:', action.payload); // Debug
        state.currentUrl = action.payload;
      })
      .addCase(shortenUrl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUrls.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUrls.fulfilled, (state, action) => {
        state.loading = false;
        state.urls = action.payload;
      })
      .addCase(fetchUrls.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUrl.fulfilled, (state, action) => {
        state.urls = state.urls.filter(url => url.id !== action.payload);
      });
  },
});

export const { clearCurrentUrl, clearError } = urlSlice.actions;
export default urlSlice.reducer;