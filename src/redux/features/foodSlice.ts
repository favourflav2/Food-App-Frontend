import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dayjs from "dayjs";


import {
  get_Desert,
  get_Order_Date,
  get_Pasta,
  get_Pizza,
  get_Popular,
  get_Salad,
  stripe_Payment,
} from "../api/foodApi";

interface FoodState {
  //Getting Data From postgres
  popularData: Array<any>;
  pizzaData: Array<any>;
  pastaData: Array<any>;
  saladData: Array<any>;
  desertData: Array<any>;

  // Cart
  cart: Array<any>;

  // Time
  OrderDate: string | number | null | undefined;
  DateState: dayjs.Dayjs | null | string;
  TimeState: dayjs.Dayjs | null | string;

  //Loading & Error
  loading: boolean;
  error: any;

  // Modal state
  pizzaModal: boolean;
  pastaModal: boolean;
  saladModal: boolean;
  desertModal: boolean;

  // Cart Modals
  pizzaCartModal: boolean;
  pastaCartModal:boolean
  saladCartModal:boolean
  desertCartModal: boolean

  // Seleced Item
  selectedItem: any;

  
  
}

const date = new Date();
const formatDate = dayjs(date).format("ddd, MMMM D h:mma");
const year = dayjs().format("YYYY-MM-DD");
const time = dayjs().format("YYYY-MM-DDThh:mm");

const initialState: FoodState = {
  popularData: [],
  pizzaData: [],
  pastaData: [],
  saladData: [],
  desertData: [],

  cart: [],

  OrderDate: formatDate,
  DateState: dayjs(year),
  TimeState: dayjs(time),

  loading: false,
  error: "",

  pizzaModal: false,
  pastaModal: false,
  saladModal: false,
  desertModal: false,

  pizzaCartModal: false,
  pastaCartModal: false,
  saladCartModal: false,
  desertCartModal:false,

  selectedItem: null,

  
};

export const getPopular = createAsyncThunk(
  "popular",
  async (_, { rejectWithValue }) => {
    try {
      const res = await get_Popular();
      return res.data;
    } catch (e: any) {
      return rejectWithValue(e.response.data.status_message);
    }
  }
);

export const getPizza = createAsyncThunk(
  "pizza",
  async (_, { rejectWithValue }) => {
    try {
      const res = await get_Pizza();
      return res.data;
    } catch (e: any) {
      return rejectWithValue(e.response.data.status_message);
    }
  }
);

export const getPasta = createAsyncThunk(
  "pasta",
  async (_, { rejectWithValue }) => {
    try {
      const res = await get_Pasta();
      return res.data;
    } catch (e: any) {
      return rejectWithValue(e.response.data.status_message);
    }
  }
);

export const getSalad = createAsyncThunk(
  "salad",
  async (_, { rejectWithValue }) => {
    try {
      const res = await get_Salad();
      return res.data;
    } catch (e: any) {
      return rejectWithValue(e.response.data.status_message);
    }
  }
);

export const getDesert = createAsyncThunk(
  "desert",
  async (_, { rejectWithValue }) => {
    try {
      const res = await get_Desert();
      return res.data;
    } catch (e: any) {
      return rejectWithValue(e.response.data.status_message);
    }
  }
);

export const getOrderDate = createAsyncThunk(
  "orderDate",
  async (data:any, { rejectWithValue }) => {
    try {
      const res = await get_Order_Date(data);
      return res.data;
    } catch (e: any) {
      return rejectWithValue(e.response.data.status_message);
    }
  }
);

export const stripePayment = createAsyncThunk(
  'stripe',
  async ({date,cart}:any,{ rejectWithValue }) => {

    try{
      const res = await stripe_Payment({date,cart})
      //console.log(res.data.url)
      
      window.location = res.data.url
      return res.data

    }catch(e:any){
      return rejectWithValue(e.response.data.status_message);
    }
  }
)

const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    setOrderDate: (state) => {
      const date = dayjs(
        `${state.DateState} ${state.TimeState}`,
        "YYYY-MM-DD hh:mma"
      ).format("ddd, MMMM D h:mma");
      state.OrderDate = date;
    },
    setDateState: (state, action) => {
      //console.log(dayjs(action.payload).format('YYYY-MM-DD'))
      state.DateState = dayjs(action.payload).format("YYYY-MM-DD");
      console.log(state.DateState);
    },
    setTimeState: (state, action) => {
      state.TimeState = dayjs(action.payload).format("hh:mma");
      console.log(state.TimeState);
    },
    setHandleClose: (state, action) => {
      //console.log(action.payload)
      if (action.payload === "pizza") {
        state.pizzaModal = false;
        state.selectedItem = null;
      } else if (action.payload === "pasta") {
        state.pastaModal = false;
        state.selectedItem = null;
      } else if (action.payload === "salad") {
        state.saladModal = false;
        state.selectedItem = null;
      } else if (action.payload === "desert") {
        state.desertModal = false;
        state.selectedItem = null;
      } else if (action.payload === "pizzaCart") {
        state.pizzaCartModal = false;
        state.selectedItem = null;
      } else if (action.payload === "pastaCart") {
        state.pastaCartModal = false;
        state.selectedItem = null;
      } else if (action.payload === "saladCart") {
        state.saladCartModal = false;
        state.selectedItem = null;
      } else if (action.payload === "desertCart") {
        state.desertCartModal = false;
        state.selectedItem = null;
      } 
    },
    setHandleOpen: (state, action) => {
      //console.log(action.payload)
      if (action.payload.foodtype === "pizza") {
        state.selectedItem = action.payload;
        state.pizzaModal = true;
      } else if (action.payload.foodtype === "pasta") {
        state.selectedItem = action.payload;
        state.pastaModal = true;
      } else if (action.payload.foodtype === "salad") {
        state.selectedItem = action.payload;
        state.saladModal = true;
      } else if (action.payload.foodtype === "desert") {
        state.selectedItem = action.payload;
        state.desertModal = true;
      } else if (action.payload.typeOfModal === "pizzaCart") {
        state.selectedItem = action.payload;
        state.pizzaCartModal = true;
      } else if (action.payload.typeOfModal === "pastaCart") {
        state.selectedItem = action.payload;
        state.pastaCartModal = true;
      } else if (action.payload.typeOfModal === "saladCart") {
        state.selectedItem = action.payload;
        state.saladCartModal = true;
      } else if (action.payload.typeOfModal === "desertCart") {
        state.selectedItem = action.payload;
        state.desertCartModal = true;
      }
    },
    addToCart: (state, action) => {
      state.cart.push(action.payload);
      //console.log(action.payload)
    },
    updateCart: (state, action) => {
      const index = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      const newArr = [...state.cart];
      newArr[index] = action.payload;
      state.cart = newArr;
      console.log(state.cart);
    },
    deleteFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },
    setClearCart: (state) => {
      state.cart = []
      state.OrderDate = formatDate
    }
    
  },
  extraReducers(builder) {
    builder

      // Popular
      .addCase(getPopular.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPopular.fulfilled, (state, action) => {
        state.loading = false;
        state.popularData = action.payload;
      })
      .addCase(getPopular.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Pizza
      .addCase(getPizza.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPizza.fulfilled, (state, action) => {
        state.loading = false;
        state.pizzaData = action.payload;
      })
      .addCase(getPizza.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Pasta
      .addCase(getPasta.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPasta.fulfilled, (state, action) => {
        state.loading = false;
        state.pastaData = action.payload;
      })
      .addCase(getPasta.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Salad
      .addCase(getSalad.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSalad.fulfilled, (state, action) => {
        state.loading = false;
        state.saladData = action.payload;
      })
      .addCase(getSalad.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Desert
      .addCase(getDesert.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDesert.fulfilled, (state, action) => {
        state.loading = false;
        state.desertData = action.payload;
      })
      .addCase(getDesert.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Order date
      .addCase(getOrderDate.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderDate.fulfilled, (state, action) => {
        state.loading = false;
        //state.desertData = action.payload;
      })
      .addCase(getOrderDate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Stripe
      .addCase(stripePayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(stripePayment.fulfilled, (state, action) => {
        state.loading = false;
        //state.desertData = action.payload;
      })
      .addCase(stripePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default foodSlice.reducer;
export const {
  setTimeState,
  setDateState,
  setOrderDate,
  setHandleClose,
  setHandleOpen,
  addToCart,
  updateCart,
  deleteFromCart,
  setClearCart
} = foodSlice.actions;
