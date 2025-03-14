import React from "react";
import blogImg from "../../Assets/Blog1.png";
const Blogs = () => {
  return (
    <div className="container-fluid">
      <h1 className="Recent-title text-center mt-5">Recent Blogs</h1>
      <div className="row px-md-5 px-2 pb-0 my-md-2 my-1">
        <div className="col-md-3">
          <div className="card blog-card p-2 mt-2 border border-black">
            <img src={blogImg} className="img-fluid" alt="" />
            <div className="py-3">
              <h5 className="blog-title">Lorem Ipsum Heading</h5>
              <p className="blog-text">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.{" "}
              </p>
              <h6 className="blog-subtitle mb-2 text-muted">
                November ,20 2024
              </h6>
              <a href="/#" className="blog-link">
                View More
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card blog-card p-2 mt-2 border border-black">
            <img src={blogImg} className="img-fluid" alt="" />
            <div className="py-3">
              <h5 className="blog-title">Lorem Ipsum Heading</h5>
              <p className="blog-text">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.{" "}
              </p>
              <h6 className="blog-subtitle mb-2 text-muted">
                November ,20 2024
              </h6>
              <a href="/#" className="blog-link">
                View More
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card blog-card p-2 mt-2 border border-black">
            <img src={blogImg} className="img-fluid" alt="" />
            <div className="py-3">
              <h5 className="blog-title">Lorem Ipsum Heading</h5>
              <p className="blog-text">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.{" "}
              </p>
              <h6 className="blog-subtitle mb-2 text-muted">
                November ,20 2024
              </h6>
              <a href="/#" className="blog-link">
                View More
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card blog-card p-2 mt-2 border border-black">
            <img src={blogImg} className="img-fluid" alt="" />
            <div className="py-3">
              <h5 className="blog-title">Lorem Ipsum Heading</h5>
              <p className="blog-text">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.{" "}
              </p>
              <h6 className="blog-subtitle mb-2 text-muted">
                November ,20 2024
              </h6>
              <a href="/#" className="blog-link">
                View More
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-5">
        <button className="btn btn-outline-warning btn-lg float-center ">
          EXPLORE MORE
        </button>
        </div>  
    </div>
  );
};

export default Blogs;
