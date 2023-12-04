import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  publicBlogs:{
    loading:true,
    blogs:[],
    errors:null,
  },
  myPublicBlogs:{
    loading:true,
    blogs:[],
    errors:null,
  },
  myPrivateBlogs:{
    loading:true,
    blogs:[],
    errors:{},
  },
  readingBlog:{
    loading:true,
    blog:[],
    readit:false,
    errors:null,
  }
};

let host = "http://localhost:5000";
// const authtoken = localStorage.getItem("token");



export const readingBlog = createAsyncThunk(
  "blogSlice/readingBlog",
  async (id) => {
    console.log("Running getReadingBlogs")
    let url = `${host}/api/blogs/blog/${id}`;
    let response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      }
    });
    let blog = await response.json();
    return blog;
  }
);
export const getPublicBlogs = createAsyncThunk(
  "blogSlice/getPublicBlogs",
  async () => {
    console.log("Running getPublicBlogs")
    let url = `${host}/api/blogs/publicBlogs`;
    let response = await fetch(url);
  // {
  //   "success": true,
  //   "blogs": [
  //     {
  //       "_id": "650836c555a27f1489e1219d",
  //       "title": "daadtahaf",
  //       "tag": [],
  //       "description": "\nLorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, ipsam totam cumque laborum repellendus atque quaerat cum est eveniet laboriosam, corporis eaque quibusdam nulla repellat consequatur? Ipsum, at excepturi! Eius!",
  //       "public": true,
  //       "author": "Anonymous",
  //       "date": "2023-09-18T11:38:45.687Z",
  //       "__v": 0
  //     },
  //   ]
  // }
    let blogs = await response.json();
    return blogs;
  }
);
export const addBlog = createAsyncThunk("blogSlice/addBlogs", async () => {
  let url = `${host}/api/blogs/addBlog`;
  try {
    console.log("Adding blog");
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        email: "jaya@gmail.com",
        name: "Naniiaafifadfadf",
        user: "nani",
        title: "daadtahaf",
        description:
          "fdallfdjajdfkadfajdfalkjfdkkkkkkkkkkkkkkkk kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkfda llfdjkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkfdallfdjajdfkadfajdfkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",
        author: "Nanii",
        tags: ["hello", "mellow", "jello"],
      }),
    });
    let nblog = await response.json();
    return nblog;
  } catch (error) {
    return error;
  }
});
export const getUserBlogs = createAsyncThunk("blogSlice/getUserBlogs", async () => {
  let url = `${host}/api/blogs/myBlogs`;
  console.log(url);
  let response = await fetch(url,{
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token"),
    },
  });
  let data = await response.json();
  console.log("userBlogs", data);
  return data;
});

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPublicBlogs.fulfilled, (state, action) => {
      // state.publicBlogs.loaded=true;
      console.log("getPublicBlogs fulfilled is running", action);
      if(action.payload.success){
        state.publicBlogs.blogs = action.payload.blogs;
      }else{
        state.publicBlogs.errors = action.payload.error;
      }
      state.publicBlogs.loading = false;
      console.log("state public blogs after fetching", state.publicBlogs.loading);
    });
    builder.addCase(getPublicBlogs.rejected, (state, action) => {
      console.log("getPublicBlogs rejected is running", action)
      state.publicBlogs.errors = action.error;
      state.publicBlogs.loading = false;
    });
    builder.addCase(readingBlog.fulfilled,(state,action)=>{
      console.log("readingBlog fulfilled is running",action);
      if(action.payload.success){
        state.readingBlog.blog=action.payload.blog;
        state.readingBlog.readit= action.payload.blog.readit;
        state.readingBlog.loading=false;
      }else{
        state.readingBlog.errors= action.payload.error;
        state.readingBlog.loading=false;
      }
    })
    builder.addCase(readingBlog.rejected, (state,action)=>{
      state.readingBlog.errors=action.payload.error;
      state.readingBlog.loading=false;
    })
    builder.addCase(getUserBlogs.fulfilled, (state, action) => {
      console.log("userBlogs", action.payload);
      if(action.payload.success){
        state.myPrivateBlogs.blogs = action.payload.private;
        state.myPublicBlogs.blogs = action.payload.public;
      }else{
        state.myPrivateBlogs.errors=action.error;
        state.myPublicBlogs.errors=action.error;
      }
      state.myPrivateBlogs.loading=false;
      state.myPublicBlogs.loading=false;
      console.log("state my blogs after fetching", state.publicBlogs.loading);
    });
    builder.addCase(getUserBlogs.rejected, (state, action) => {
      console.log("getBlogs rejected", action);
      state.myPrivateBlogs.errors=action.error;
      state.myPublicBlogs.errors=action.error;
      state.myPrivateBlogs.loading=false;
      state.myPublicBlogs.loading=false;
      console.log("state my blogs after fetching", state.publicBlogs.loading);
    });
    builder.addCase(addBlog.fulfilled, (state, action) => {
      if(action.payload.success){
        if(action.payload.blog.public){
          state.publicBlogs.blogs = state.publicBlogs.blogs.concat(action.payload.blog);
          state.myBlogs.public = state.myBlogs.public.concat(action.payload.blog);
          console.log(state.myBlogs.public);
          console.log(state.publicBlogs.blogs);
          
        }else{
          state.myBlogs.private = state.myBlogs.private.concat(action.payload.blog);
          console.log(state.myBlogs.private);
        }
      }
    });
  },
});

export const readit = (state)=> state.blogs.readingBlog.readit;
export const reading= (state)=> state.blogs.readingBlog;
export const myPrivateBlogs = (state) => state.blogs.myPrivateBlogs;
export const myPublicBlogs = (state) => state.blogs.myPublicBlogs;
export const allPublicBlogs = (state) => state.blogs.publicBlogs;
export default blogSlice.reducer;