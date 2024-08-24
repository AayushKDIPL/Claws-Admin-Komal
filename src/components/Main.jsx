import React from "react";
import '../Style/home.css'
import { Link } from "react-router-dom";

function Main() {
  return (
    <div>
      <body class="home-page">
        <center>
          <h1 class="text-warning mt-4 mb-3">ADMIN PANEL</h1>
        </center>
        <div class="home-screen">
          <div class="card mb-3 d-flex text-bg-secondary justify-content-center">
            <div class="card card-pro text-center text-bg-secondary   ">
              <div class="card-header  ">
                <ul class="nav nav-warning card-header- ">
                  <li class="nav-item">
                    <a
                      class="nav-link active text-warning"
                      aria-current="true"
                      href="#"
                    >
                      Products Details
                    </a>
                  </li>
                </ul>
              </div>
              <div class="card-body  ">
                <h5 class="card-title text-warning mt-2">Total Products</h5>
                <p class="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
                <a href="/listings" class="btn btn-outline-warning mb-3">
                <Link to={"/product"} >view Products</Link>

                </a>
              </div>
            </div>
          </div>

          <div class="row  ">
            <div class="col-sm-6 mb-3 mt-5 mb-sm-0">
              <div class="card border-warning  ">
                <div class="card-body card-b ">
                  <h5 class="card-title title-h bg-light ps-4 text-success">
                    Successfull Product
                  </h5>
                  <p class="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                  <a href="#" class="btn btn btn-success">
                    Check Details
                  </a>
                </div>
              </div>
            </div>
            <div class="col-sm-6 mt-5">
              <div class="card">
                <div class="card-body card-b">
                  <h5 class="card-title title-h bg-light ps-4 text-danger">
                    Failed Product
                  </h5>
                  <p class="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                  <a href="#" class="btn btn btn-danger">
                    Check Details
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="row  ">
            <div class="col-sm-6 mb-3 mt-5 mb-sm-0  ">
              <div class="card border-warning  ">
                <div class="card-body card-b">
                  <h5 class="card-title text-info"> Product Category</h5>
                  <p class="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                  <a href="/showcategory" class="btn btn btn-outline-info">
                  <Link to={"/category"} >view Category</Link>
                  </a>
                </div>
              </div>
            </div>
            <div class="col-sm-6 mt-5  ">
              <div class="card border-warning mb-3 mb-sm-0 ">
                <div class="card-body card-b ">
                  <h5 class="card-title text-info">Add New Product</h5>
                  <p class="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                  <a href="/addproduct" class="btn  btn-outline-info">
                  <Link to={"/new"} > Add New Product</Link>
                   
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}

export default Main;
